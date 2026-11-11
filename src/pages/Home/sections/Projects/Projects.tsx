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

const springBootImages = import.meta.glob('../../../../assets/spring-boot-fotos/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const springBootImg = (filename: string) =>
    springBootImages[`../../../../assets/spring-boot-fotos/${filename}`]



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
        category: 'Full-stack • GraphQL',
        title: 'MindShare',
        description: 'Plataforma de ideias colaborativas onde usuários podem publicar ideias, comentar e votar. API GraphQL com autenticação JWT, refresh tokens e operações para gerenciar usuários, ideias, comentários e votos.',
        stack: ['Node.js', 'Express', 'Apollo Server', 'TypeGraphQL', 'Prisma', 'TypeScript', 'JWT', 'React', 'Vite', 'Tailwind CSS', 'shadcn/ui'],
        image: img('mindshare-preview.png'),
        video: vid('mindshare_apresentacao_v2-preview.mp4'),
        repoUrl: 'https://github.com/guedescss/mindshare',
        liveUrl: 'https://mindshare-sable.vercel.app/',
    },
    {
        category: 'JavaScript',
        title: 'Expression Scanner Meme',
        description: 'Aplicação de visão computacional que roda direto no navegador, usando a webcam para detectar gestos com as mãos e expressões faciais em tempo real. O projeto reconhece gestos personalizados e os associa a imagens e GIFs, explorando a detecção de landmarks faciais e manuais com MediaPipe.',
        stack: ['JavaScript', 'MediaPipe', 'Vite', 'Canvas API', 'WebRTC'],
        image: img('img-expression-lab.png'),
        video: vid('prj-expression-lab/video-expression-lab.mp4'),
        repoUrl: 'https://github.com/guedescss/expressionmemejs',
        liveUrl: 'https://expressionscannermeme.vercel.app/',
    },
    {
        category: 'Full-stack',
        title: 'Plataforma de Sorteios Online',
        description: 'Plataforma para criação e gerenciamento de sorteios online, com uma interface simples para organizar e acompanhar rifas. Desenvolvida com Next.js e API Routes, TypeScript, Prisma ORM e Supabase.',
        stack: ['Next.js', 'API Routes', 'TypeScript', 'Prisma ORM', 'Supabase', 'PostgreSQL'],
        image: img('rifas-foto.png'),
        video: vid('rifasvideo.mp4'),
        repoUrl: 'https://github.com/guedescss/scarfacerifas',
        liveUrl: 'https://scarfacerifas.vercel.app/',
    },
    {
        category: 'Java • Backend',
        title: 'API REST de Profissionais',
        description: 'API REST para consultar e cadastrar profissionais de desenvolvimento de software. Desenvolvida com Spring Boot, Spring Web MVC e Spring Data JPA, com persistência em PostgreSQL.',
        stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Maven', 'Docker Compose'],
        image: springBootImg('imgp.png'),
        previewImages: [
            springBootImg('img1.png'),
            springBootImg('img2.png'),
            springBootImg('img4.jpeg'),
            springBootImg('img5.jpeg'),
            springBootImg('img5.png'),
        ],
        repoUrl: 'https://github.com/guedescss/spring-boot-postgresql',
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
