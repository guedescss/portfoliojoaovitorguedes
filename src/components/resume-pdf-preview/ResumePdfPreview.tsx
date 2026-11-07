import { useEffect, useRef, useState } from 'react'
import type { PDFDocumentLoadingTask } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import styles from './ResumePdfPreview.module.css'

type ResumePdfPreviewProps = {
    src: string
}

const ResumePdfPreview = ({ src }: ResumePdfPreviewProps) => {
    const previewRef = useRef<HTMLDivElement>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const preview = previewRef.current
        if (!preview) return

        let cancelled = false
        let resizeTimeout: number | undefined
        let renderVersion = 0
        let resizeObserver: ResizeObserver | undefined
        let loadingTask: PDFDocumentLoadingTask | undefined

        const loadAndRender = async () => {
            try {
                const pdfjsLib = await import('pdfjs-dist')
                if (cancelled) return
                pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl
                loadingTask = pdfjsLib.getDocument({ url: src })
                const pdf = await loadingTask.promise
                if (cancelled) return

                const renderPages = async () => {
                    const version = ++renderVersion
                    const width = preview.clientWidth
                    if (!width) return

                    preview.replaceChildren()

                    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
                        const page = await pdf.getPage(pageNumber)
                        if (cancelled || version !== renderVersion) return

                        const baseViewport = page.getViewport({ scale: 1 })
                        const viewport = page.getViewport({ scale: width / baseViewport.width })
                        const outputScale = Math.min(window.devicePixelRatio || 1, 2)
                        const canvas = document.createElement('canvas')
                        const context = canvas.getContext('2d')
                        if (!context) throw new Error('Não foi possível exibir a página do currículo.')

                        canvas.width = Math.floor(viewport.width * outputScale)
                        canvas.height = Math.floor(viewport.height * outputScale)
                        canvas.style.width = `${viewport.width}px`
                        canvas.style.height = `${viewport.height}px`
                        canvas.setAttribute('role', 'img')
                        canvas.setAttribute('aria-label', `Página ${pageNumber} do currículo`)
                        preview.append(canvas)

                        await page.render({
                            canvas,
                            canvasContext: context,
                            viewport,
                            transform: outputScale === 1
                                ? undefined
                                : [outputScale, 0, 0, outputScale, 0, 0],
                        }).promise

                        if (cancelled || version !== renderVersion) return
                    }
                }

                const scheduleRender = () => {
                    window.clearTimeout(resizeTimeout)
                    resizeTimeout = window.setTimeout(() => {
                        void renderPages().catch((renderError: unknown) => {
                            if (!cancelled) {
                                setError(
                                    renderError instanceof Error
                                        ? renderError.message
                                        : 'Não foi possível exibir o currículo.',
                                )
                            }
                        })
                    }, 80)
                }

                resizeObserver = new ResizeObserver(scheduleRender)
                resizeObserver.observe(preview)
                scheduleRender()
            } catch (loadError) {
                if (!cancelled) {
                    setError(
                        loadError instanceof Error
                            ? loadError.message
                            : 'Não foi possível carregar o currículo.',
                    )
                }
            }
        }

        void loadAndRender()

        return () => {
            cancelled = true
            renderVersion += 1
            window.clearTimeout(resizeTimeout)
            resizeObserver?.disconnect()
            void loadingTask?.destroy()
        }
    }, [src])

    return (
        <div className={styles.preview} aria-label="Prévia do currículo">
            <div className={styles.pages} ref={previewRef} />
            {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
    )
}

export default ResumePdfPreview
