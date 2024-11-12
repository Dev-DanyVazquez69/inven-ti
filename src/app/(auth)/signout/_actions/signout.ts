"use server"

import { signOut } from '@/app/auth'
import { redirect } from 'next/navigation'

const signout = async () => {

    try {
        await signOut()
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
    }
    redirect("/signin")
}

export default signout;