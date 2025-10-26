import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUserAction } from "./../../api/userApi.js";
import registerSchema from "./shema.js";

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
   const data = await registerUserAction(userData);
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
  <form onSubmit={handleSubmit(onSubmit)}>
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
    <input {...register("password")} type="text" />
    {errors.password && <span>{errors.password.message}</span>}
   </label>
   <button disabled={isSubmitting} type="submit">
    {isSubmitting ? "Загрузка..." : "Зарегестрироваться"}
   </button>
  </form>
 );
}
