import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import authShema from "./shema";
import styles from "./AuthForm.module.css";

export default function AuthForm() {
 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
 } = useForm({
  resolver: zodResolver(authShema),
 });

 

 return (
  <form onSubmit={handleSubmit()} className={styles.auth_form}>
   <label>Ведите email</label>
   <input type="text" {...register("email")} />
   {errors.email && <span>{errors.email.message}</span>}
   <label>Ведите пароль</label>
   <input type="text" {...register("password")} />
   {errors.password && <span>{errors.password.message}</span>}

   <button disabled={isSubmitting} type="submit">
    {isSubmitting ? "Загрузка..." : "Войти"}
   </button>
  </form>
 );
}
