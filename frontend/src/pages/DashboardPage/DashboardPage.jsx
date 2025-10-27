    import { useNavigate } from "react-router-dom";

    import styles from "./DashboardPage.module.css";

    export default function DashboardPage() {
    const nav = useNavigate();

    const onClientClick = () => nav("/client");

    const onBusinessClick = () => nav("/business");

    return (
    <div className={styles.dashboard}>
    <section>
        <h1>Войти как</h1>
    </section>
    <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={onClientClick}>
        <p>Клиент</p>
        <img src="src/public/png/client.png" alt="Клиент" />
        </button>
        <button className={styles.button} onClick={onBusinessClick}>
        <p>Бизнес</p>
        <img src="src/public/png/business.png" alt="Бизнес" />
        </button>
    </div>
    </div>
    );
    }
