import { AiOutlineArrowLeft } from "react-icons/ai"
import Container from "../../components/Container"
import styles from "./NotFound.module.css"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    const handleReturnToPage = () => {
        navigate(-1)
    }

    return (
        <section className={styles.notFound}>
            <Container>
                <p>
                    <strong>This page doesn't exist.</strong>
                </p>

                <p>

                    <button className="button" onClick={handleReturnToPage}>
                        <AiOutlineArrowLeft />
                        Back
                    </button>
                </p>
            </Container>
        </section>
    )
}

export default NotFound