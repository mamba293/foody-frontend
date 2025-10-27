import { useNavigate } from "react-router-dom";

import styles from "./DashboardPage.module.css";
import DashboardModal from "./../../components/DashboardModel/DashboardModal";
import { useState } from "react";

export default function DashboardPage() {
 const [isOpenModal, setIsOpenModal] = useState(false);

 const nav = useNavigate();

 const onClientClick = () => setIsOpenModal((prev) => !prev);

 const onBusinessClick = () => nav("/business");

 return (
  <>
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
   {isOpenModal && <DashboardModal />}
  </>
 );
}
