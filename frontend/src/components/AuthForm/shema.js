import { z } from 'zod';


const authShema = z.object({
    email: z.string()
        .trim()
        .toLowerCase()
        .email({ message: "Некорректный email" }),
    password: z.string()
        .min(8, { message: "Пароль должен содержать минимум 8 символов" })
})

export default authShema;