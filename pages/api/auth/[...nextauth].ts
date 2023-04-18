import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // ...more providers here
    ],
    callbacks: {
        jwt: async ({user, token}) => {
            if (user) {
                token.uid = user.id;
            }
            return token
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid
            }
            return session
        }
    },
    session: {
        strategy: 'jwt'
    }
})

