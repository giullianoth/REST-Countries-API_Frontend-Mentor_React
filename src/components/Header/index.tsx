import { PiMoon, PiMoonFill } from "react-icons/pi"
import Container from "../Container"
import styles from "./Header.module.css"
import { useWindowBehavior } from "../../hooks/window-behavior"
import { useChangeTheme } from "../../hooks/change-theme"
import { useState } from "react"

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
                <h1 className={styles.header__title}>Where in the world?</h1>

                <div className={styles.header__theme}>
                    <button className="button clear" onClick={handleChangeTheme}>
                        {theme === "dark" ? <PiMoonFill /> : <PiMoon />}
                        Dark Mode
                    </button>
                </div>
            </Container>
        </header>
    )
}

export default Header