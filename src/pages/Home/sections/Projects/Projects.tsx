import { useState } from 'react'
import styles from './Projects.module.css'
import ProjectCard, { type ProjectCardProps } from '../../../../components/project-card/ProjectCard'
import { FaChevronDown  } from "react-icons/fa6"

const PAGE_SIZE = 3

//importacao de todas as imagens dos projetos que estiverem em images/projetos
const projectImages = import.meta.glob('../../../../assets/images/projetos/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const img = (filename: string) =>
    projectImages[`../../../../assets/images/projetos/${filename}`]



//importacao dos videos de preview dos projetos
const projectVideos = import.meta.glob('../../../../assets/videos/**/*.{mp4,webm}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const vid = (path: string) =>
    projectVideos[`../../../../assets/videos/${path}`]



//conteudo dos cards dos projetos
const projects: ProjectCardProps[] = [
    {
    category: 'JavaScript',
    title: 'Expression Lab',
    description: 'Aplicação de visão computacional que roda direto no navegador, usando a webcam para detectar gestos com as mãos e expressões faciais em tempo real. O projeto reconhece gestos personalizados e os associa a imagens e GIFs, explorando a detecção de landmarks faciais e manuais com MediaPipe.',
    stack: ['JavaScript', 'MediaPipe', 'Vite', 'Canvas API', 'WebRTC'],
    image: img('img-expression-lab.png'),
    video: vid('prj-expression-lab/video-expression-lab.mp4'),
    repoUrl: 'https://github.com/guedescss/expression-lab',
    },
    {
        category: 'Front-end',
        title: 'Movie APP Filmes e Séries',
        description: 'Aplicação para explorar filmes, séries e animes, integrada a diferentes APIs para consulta e exibição de conteúdos. O projeto utiliza componentização e separação de serviços, buscando manter o código organizado, reutilizável e escalável.',
        stack: ['React', 'Next.js', 'Typescript', 'SCSS', 'API'],
        image: img('img-movies-app.png'),
        video: vid('prj-movies-app/movies-app-caiote.mp4'),
        repoUrl: 'https://github.com/guedescss/movies-app',
    },
]


const Projects = () => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
    const visibleProjects = projects.slice(0, visibleCount)
    const isExpanded = visibleCount >= projects.length
    const canToggle = projects.length > PAGE_SIZE

    const handleToggle = () => {
        if (isExpanded) {
            setVisibleCount(PAGE_SIZE)
            // volta o scroll pro início da seção, já que a grade encolhe
            document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
            setVisibleCount((count) => count + PAGE_SIZE)
        }
    }

    return (
        <section className={styles.projects} id="projetos">
            <div className={styles.inner}>
                <h2 className={styles.title}>
                    Projetos<span className="cursor">_</span>
                </h2>

                <div className={styles.grid}>
                    {visibleProjects.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>

                {canToggle && (
                    <button className={styles.more} type="button" onClick={handleToggle}>
                        {isExpanded ? 'Ocultar projetos' : 'Ver mais projetos'}
                        <FaChevronDown className={isExpanded ? styles.moreIconUp : styles.moreIcon} />
                    </button>
                )}
            </div>
        </section>
    )
}

export default Projects
