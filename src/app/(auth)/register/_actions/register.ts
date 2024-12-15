"use server";
import { prisma } from '@/lib/db';
import { hashSync } from 'bcryptjs';
import { redirect } from 'next/navigation';

const register = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        throw new Error('Todos os campos devem estar preenchidos');
    }
    // Verificar se o usuário já existe
    const emailExists = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (emailExists) {
        throw new Error('Email já cadastrado no sistema');
    }

    // Criar o usuário
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 8)
        }
    })
    redirect("/")

};

export default register;
