import styles from './Stack.module.css'
import StackGroup from '../../../../components/stack-group/StackGroup'
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiTailwindcss,
    SiShadcnui,
    SiNodedotjs,
    SiPrisma,
    SiPostgresql,
    SiSupabase,
    SiPython,
    SiJunit5,
    SiGit,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import { FiCpu } from 'react-icons/fi'

const frontend = [
    { icon: <SiReact />, label: 'React' },
    { icon: <SiNextdotjs />, label: 'Next.js (App Router)' },
    { icon: <SiTypescript />, label: 'TypeScript' },
    { icon: <SiJavascript />, label: 'JavaScript' },
    { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
    { icon: <SiShadcnui />, label: 'shadcn/ui' },
    { icon: <SiReact />, label: 'React Native', note: 'Em estudo' },
]

const backend = [
    { icon: <SiNodedotjs />, label: 'Node.js' },
    { icon: <SiPrisma />, label: 'Prisma ORM' },
    { icon: <SiPostgresql />, label: 'PostgreSQL (Supabase)' },
    { icon: <FaJava />, label: 'Java', note: 'Em estudo' },
    { icon: <SiPython />, label: 'Python', note: 'Em estudo' },
]

const tools = [
    { icon: <SiGit />, label: 'Git (conventional commits)' },
    { icon: <SiSupabase />, label: 'Supabase' },
    { icon: <SiJunit5 />, label: 'JUnit' },
    { icon: <FiCpu />, label: 'LLMs' },
]

const Stack = () => {
    return (
        <section className={styles.stack} id="stack">
            <div className={styles.inner}>
                <h2 className={styles.title}>
                    Minhas Stacks<span className="cursor">_</span>
                </h2>

                <div className={styles.intro}>
                    <p className={styles.text}>
                        Minha stack gira em torno do ecossistema <b>Next.js, React, TypeScript, Prisma e PostgreSQL</b>,
                        que uso em projetos reais e na criação de conteúdo para cursos. Também estou
                        ampliando meus conhecimentos em React Native, Java e Python.
                    </p>
                </div>

                <div className={styles.groups}>
                    <StackGroup title="Frontend" items={frontend} />
                    <StackGroup title="Backend" items={backend} />
                    <StackGroup title="Ferramentas" items={tools} />
                </div>
            </div>
        </section>
    )
}

export default Stack
