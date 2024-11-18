import NextAuth, { type DefaultSession } from "next-auth"
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


declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    jwt({ token }) {
      return token
    },
    session({ session, token }) {
      return { ...session, id: token.sub }
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
    signOut: "/signout"
  },
})