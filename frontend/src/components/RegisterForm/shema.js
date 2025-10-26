import { z } from 'zod';

const registerSchema = z.object({
    email: z.string()
        .trim()
        .toLowerCase()
        .email({ message: "Некорректный email" }),
    phone: z.string()
        .regex(/^\+?\d{10,15}$/, { message: "Некорректный номер телефона" }),
    password: z.string()
        .min(8, { message: "Пароль должен содержать минимум 8 символов" })
});

export default registerSchema;
