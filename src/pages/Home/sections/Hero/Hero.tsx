import { useEffect, useRef, useState, type MouseEvent } from 'react'
import styles from './Hero.module.css'
import { FaGithub } from "react-icons/fa";
import { FaDownload } from 'react-icons/fa'
import { CiLinkedin } from "react-icons/ci";
import { IoIosContact } from 'react-icons/io';
import { TiDocumentText } from 'react-icons/ti';
import MsgWelcome from '../../../../components/msg-welcome/MsgWelcome'
import FlipCard from '../../../../components/flip-card/FlipCard'
import ResumePdfPreview from '../../../../components/resume-pdf-preview/ResumePdfPreview'
import CurriculoPdf from '../../../../assets/images/curriculo/Curriculo_Joao_Vitor_Atualizado_2026.pdf'
import Avatar from '../../../../assets/images/perfil-draw.png'

const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Hero = () => {
    const heroRef = useRef<HTMLElement>(null)
    const [isResumeOpen, setIsResumeOpen] = useState(false)
    const resumeDialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = resumeDialogRef.current
        if (!dialog) return

        if (isResumeOpen && !dialog.open) {
            dialog.showModal()
        } else if (!isResumeOpen && dialog.open) {
            dialog.close()
        }
    }, [isResumeOpen])

    // atualiza a posição do glow roxo do fundo direto no DOM
    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        if (prefersReducedMotion || !heroRef.current) return

        const rect = heroRef.current.getBoundingClientRect()
        heroRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        heroRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }

    return (
        <section ref={heroRef} className={styles.hero} onMouseMove={handleMouseMove}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <MsgWelcome welcomeText="Welcome to my portfolio" titleText="Desenvolvedor Full Stack" />

                    <p className={styles.tagline}>
                        Gosto de transformar ideias em interfaces criativas,
                        intuitivas e funcionais, criando soluções completas com código limpo,
                        organizado e componentizado.
                    </p>

                    <div className={styles.socials}>
                        <a
                            className={styles.social}
                            href="https://github.com/guedescss"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub aria-hidden />
                            GitHub
                        </a>

                        <a
                            className={styles.social}
                            href="https://www.linkedin.com/in/guedescss/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <CiLinkedin aria-hidden />
                            LinkedIn
                        </a>

                        <a className={styles.social} href="#contato">
                            <IoIosContact aria-hidden />
                            Contato
                        </a>

                        <button
                            className={styles.social}
                            type="button"
                            onClick={() => setIsResumeOpen(true)}
                        >
                            <TiDocumentText aria-hidden />
                            Visualizar CV
                        </button>
                    </div>

                </div>

                <div className={styles.divPhoto}>
                    <div className={styles.photoFrame}>
                        <FlipCard
                            ariaLabel="Virar cartão entre a foto e uma saudação"
                            front={<img src={Avatar} alt="Guedes" />}
                            back={
                                <div className={styles.helloBack}>
                                    <p className={styles.helloEyebrow}>Olá, eu sou</p>
                                    <p className={styles.helloName}>Guedes</p>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>

            <dialog
                ref={resumeDialogRef}
                className={styles.resumeDialog}
                aria-labelledby="resume-dialog-title"
                onCancel={(event) => {
                    event.preventDefault()
                    setIsResumeOpen(false)
                }}
                onClose={() => setIsResumeOpen(false)}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        setIsResumeOpen(false)
                    }
                }}
            >
                <div className={styles.resumeModal}>
                    <header className={styles.resumeHeader}>
                        <div>
                            <p className={styles.resumeEyebrow}>Meu perfil</p>
                            <h2 id="resume-dialog-title">Currículo</h2>
                        </div>
                        <button
                            className={styles.closeResume}
                            type="button"
                            aria-label="Fechar visualização do currículo"
                            onClick={() => setIsResumeOpen(false)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </header>

                    <ResumePdfPreview src={CurriculoPdf} />

                    <footer className={styles.resumeFooter}>
                        <p>Confira meu currículo ou baixe uma cópia em PDF.</p>
                        <a
                            className={styles.downloadResume}
                            href={CurriculoPdf}
                            download="Curriculo_Joao_Vitor_Atualizado_2026.pdf"
                        >
                            <FaDownload aria-hidden />
                            Baixar CV
                        </a>
                    </footer>
                </div>
            </dialog>
        </section>
    )
}

export default Hero
