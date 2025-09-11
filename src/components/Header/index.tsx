import { PiMoonFill } from "react-icons/pi"
import Container from "../Container"
import styles from "./Header.module.css"
import { useWindowBehavior } from "../../hooks/use-window-behavior"

const Header = () => {
    const { scrolling } = useWindowBehavior()

    return (
        <header className={styles.header + (scrolling ? ` ${styles.scrolling}` : "")}>
            <Container className={styles.header__container}>
                <h1 className={styles.header__title}>Where in the world?</h1>

                <div className={styles.header__theme}>
                    <button className="button clear">
                        <PiMoonFill />
                        Dark Mode
                    </button>
                </div>
            </Container>
        </header>
    )
}

export default Header