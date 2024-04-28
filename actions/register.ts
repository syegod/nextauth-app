'use server';
import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import * as z from 'zod'
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {error: "Email already in use!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);

    //TODO: send verification token email

    return { success: "Confirmation email sent!" };
}