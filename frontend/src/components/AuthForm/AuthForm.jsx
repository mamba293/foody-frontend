import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import authShema from "./shema";
import styles from "./AuthForm.module.css";
import { AuthService } from "./../../services/authService.js";

export default function AuthForm() {
 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  setError,
 } = useForm({
  resolver: zodResolver(authShema),
 });

 const onSubmit = async (userLoginData) => {
  try {
   const data = await AuthService.login(userLoginData);
   localStorage.setItem("token", data.accessToken);
   console.log(data);
  } catch (err) {
   setError("root", {
    message: "Что-то пошло не так",
   });
  }
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)} className={styles.auth_form}>
   <label>Ведите email</label>
   <input type="text" {...register("email")} />
   {errors.email && <span>{errors.email.message}</span>}
   <label>Ведите пароль</label>
   <input type="text" {...register("password")} />
   {errors.password && <span>{errors.password.message}</span>}
   <button disabled={isSubmitting} type="submit">
    {isSubmitting ? "Загрузка..." : "Войти"}
   </button>
   {errors.root && <span>{errors.root.message}</span>}
  </form>
 );
}
