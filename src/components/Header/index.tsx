import Container from "../Container"
import styles from "./Header.module.css"
import { useWindowBehavior } from "../../hooks/window-behavior"
import { useChangeTheme } from "../../hooks/change-theme"
import { useState } from "react"
import { AiFillMoon, AiOutlineMoon } from "react-icons/ai"
import { Link } from "react-router-dom"

const Header = () => {
    const [theme, setTheme] = useState<"dark" | "light">("dark")
    const { scrolling } = useWindowBehavior()
    const changeTheme = useChangeTheme()

    const handleChangeTheme = () => {
        changeTheme(theme === "dark" ? "light" : "dark")
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <header className={styles.header + (scrolling ? ` ${styles.scrolling}` : "")}>
            <Container className={styles.header__container}>
                <h1 className={styles.header__title}>
                    <Link to="/">Where in the world?</Link>
                </h1>

                <div className={styles.header__theme}>
                    <button className="button clear" onClick={handleChangeTheme}>
                        {theme === "dark" ? <AiFillMoon /> : <AiOutlineMoon />}
                        Dark Mode
                    </button>
                </div>
            </Container>
        </header>
    )
}

export default Header