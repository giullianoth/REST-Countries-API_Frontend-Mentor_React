import Container from "../Container"
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container className={styles.footer__container}>
                Challenge by <a href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca" target="_blank">Frontend Mentor</a>.
                Coded by <a href="https://github.com/giullianoth" target="_blank">Giulliano Guimarães</a>.
            </Container>
        </footer>
    )
}

export default Footer