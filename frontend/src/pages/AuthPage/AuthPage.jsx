import { useState } from "react";

import RegisterForm from "./../../components/RegisterForm/RegisterForm";
import AuthForm from "./../../components/AuthForm/AuthForm";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
 const [isAuth, setIsAuth] = useState(false);

 const onClick = () => {
  setIsAuth((prev) => !prev);
 };

 return (
  <div className={styles.page}>
   {isAuth ? <RegisterForm /> : <AuthForm />}
   <span>
    {isAuth ? (
     <button onClick={onClick} className={styles.auth_button}>
      Уже есть аккаунт?{" "}
     </button>
    ) : (
     <button onClick={onClick} className={styles.auth_button}>
      Нет аккаунта?
     </button>
    )}
   </span>
  </div>
 );
}
