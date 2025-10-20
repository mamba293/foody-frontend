import { z } from "zod"

export const businessProfileSchema = z.object({
    name: z
        .string()
        .min(2, "Business name must be at least 2 characters")
        .max(100, "Business name must be less than 100 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    phone: z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number format"),
    openingHours: z.string().min(5, "Opening hours are required"),
})

export const boxSchema = z
    .object({
        name: z
            .string()
            .min(3, "Box name must be at least 3 characters")
            .max(100, "Box name must be less than 100 characters"),
        description: z
            .string()
            .min(10, "Description must be at least 10 characters")
            .max(300, "Description must be less than 300 characters"),
        price: z.number().min(0.01, "Price must be greater than 0").max(10000, "Price must be less than 10000"),
        originalPrice: z
            .number()
            .min(0.01, "Original price must be greater than 0")
            .max(10000, "Original price must be less than 10000"),
        weight: z.number().min(0.1, "Weight must be at least 0.1 kg").max(100, "Weight must be less than 100 kg"),
        quantity: z
            .number()
            .int("Quantity must be a whole number")
            .min(1, "Quantity must be at least 1")
            .max(100, "Quantity must be less than 100"),
        pickupTimeStart: z.string().min(1, "Pickup start time is required"),
        pickupTimeEnd: z.string().min(1, "Pickup end time is required"),
    })
    .refine((data) => data.originalPrice > data.price, {
        message: "Original price must be greater than discounted price",
        path: ["originalPrice"],
    })

export const clientProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .regex(/^\+?[\d\s-()]+$/, "Invalid phone number format")
        .optional(),
})

export const paymentMethodSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
    cardHolder: z.string().min(2, "Card holder name must be at least 2 characters"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
    cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
})

export const orderSchema = z.object({
    boxId: z.string().min(1, "Box ID is required"),
    quantity: z.number().int("Quantity must be a whole number").min(1, "Quantity must be at least 1"),
    paymentMethodId: z.string().min(1, "Payment method is required"),
})
