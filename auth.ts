import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";


declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole
        } & DefaultSession["user"]
    }
}

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({user, account}){
            //Allow OAuth without email verification
            if(account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id as string);
            
            //Prevent sign in without email verification
            if(!existingUser?.emailVerified) return false;

            //TODO: Add 2FA 

            return true;
        },
        async session({ token, session }) {
            console.log({ sessionToken: token, session });
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token
            }
            const existingUser = await getUserById(token.sub);
            if (!existingUser) {
                return token;
            }
            token.role = existingUser.role;
            return token;
        }
    },
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
});