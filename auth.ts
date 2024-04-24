import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from "./lib/db";
import authConfig from "./auth.config";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    callbacks: {
        
    },
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
});