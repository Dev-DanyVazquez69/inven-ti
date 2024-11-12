"use server"

import { signIn } from '@/app/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

const login = async (FormData: FormData) => {

    const { email, password } = Object.fromEntries(FormData.entries())

    try {
        await signIn('credentials', { email, password })
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin')
                error.message = 'credenciais inválidas'
            throw new Error(String(error))
        }
    }
    redirect("/")
}

export default login;