import { PiMoon, PiMoonFill } from "react-icons/pi"
import Container from "../Container"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
        <Container>
            <h1 className={styles.header__title}>Where in the world?</h1>

            <div className={styles.header__theme}>
                <button>
                    <PiMoonFill />
                    Dark Mode
                </button>
            </div>
        </Container>
    </header>
  )
}

export default Header