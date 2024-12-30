/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from '@/app/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

const login = async (_prevState: any, FormData: FormData) => {

    const { email, password } = Object.fromEntries(FormData.entries())

    try {
        await signIn('credentials', { email, password })
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin')
                error.message = 'Credenciais Inválidas'
            return({
                message: error.message,
                status: false
            })
        }
    }
    redirect("/")
}

export default login;