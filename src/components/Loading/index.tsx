import styles from "./Loading.module.css"

type Props = {
    className?: string
}

const Loading = ({ className }: Props) => {
    return (
        <div className={styles.loading + (className ? ` ${className}` : "")}>
            <div className={styles.circle}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    )
}

export default Loading