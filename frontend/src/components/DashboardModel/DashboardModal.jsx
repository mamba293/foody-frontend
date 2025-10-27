import { useForm } from "react-hook-form";
import styles from "./DashboardModal.module.css";

export default function DashboardModal() {
 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
 } = useForm();

 const onSubmit = (data) => {
  console.log(data);
 };

 return (
  <div className={styles.overlay}>
   <div className={styles.modal}>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
     <div className={styles.inputGroup}>
      <label className={styles.label}>
       <h3>Как вас зовут?</h3>
       <input
        className={styles.input}
        type="text"
        placeholder="Введите ваше имя"
        {...register("name", {
         required: "Имя обязательно для заполнения",
         minLength: {
          value: 2,
          message: "Имя должно содержать минимум 2 символа",
         },
        })}
       />
      </label>
      {errors.name && (
       <span className={styles.error}>{errors.name.message}</span>
      )}
     </div>

     <div className={styles.buttonGroup}>
      <button className={styles.button} type="submit" disabled={isSubmitting}>
       {isSubmitting ? "Загрузка..." : "Ок"}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}
