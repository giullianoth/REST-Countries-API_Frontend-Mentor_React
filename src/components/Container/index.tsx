import type { ReactNode } from "react"
import styles from "./Container.module.css"

type Props = {
    children?: ReactNode
}

const Container = ({ children }: Props) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Container