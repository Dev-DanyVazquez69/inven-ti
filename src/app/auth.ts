import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { prisma } from "@/lib/db"
import { compareSync } from "bcrypt-ts"
import { PrismaAdapter } from "@auth/prisma-adapter"


const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(c) {
      console.log(c)
      const email = c.email as string
      const password = c.password as string

      if (!email || !password)
        throw new Error("Credenciais ausentes")

      try {
        const user = await prisma.user.findUnique({
          where: {
            email
          }

        })

        if (!user) {
          throw new Error('Usuário não encontrado')
        }

        if (!compareSync(password, user.password ?? ""))
          throw new Error("Credenciais Inválidas")

        return (user)

      } catch (error) {
        throw new Error(String(error))
      }
    },
  }),
  Google({
    allowDangerousEmailAccountLinking: true
  }),
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")


export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      //Usuários logados são autenticados, caso contrário, redirecionam para a página de login      return !!auth
      return !!auth
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers,
  pages: {
    signIn: "/signin",
    error: "error",
    signOut:"/signout"
  },
})