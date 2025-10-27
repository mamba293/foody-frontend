import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthService } from "./../../services/authService.js";
import registerSchema from "./shema.js";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
 const {
  register,
  formState: { errors, isSubmitting },
  handleSubmit,
  setError,
 } = useForm({
  resolver: zodResolver(registerSchema),
 });

 const onSubmit = async (userData) => {
  try {
   const data = await AuthService.register(userData);
   console.log(data);
   alert("Check your email for activation link!");
  } catch (error) {
   console.log(error);
   setError("email", {
    message: "Этот email уже зарегистрирован",
   });
  }
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
   <label>
    Введите Email
    <input {...register("email")} type="text" />
    {errors.email && <span>{errors.email.message}</span>}
   </label>
   <label>
    Введи номер телефона
    <input {...register("phone")} type="text" />
    {errors.phone && <span>{errors.phone.message}</span>}
   </label>
   <label>
    Введи пароль
    <input {...register("password")} type="password" />
    {errors.password && <span>{errors.password.message}</span>}
   </label>
   <button disabled={isSubmitting} type="submit">
    {isSubmitting ? "Загрузка..." : "Зарегестрироваться"}
   </button>
  </form>
 );
}
