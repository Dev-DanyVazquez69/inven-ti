import { z } from 'zod';
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { sectorPostSchema } from '@/schema/sector';
import { bodyPostSector } from '@/interfaces/sector';
import { getUserBd } from '@/app/utils/get-user-bd';

const user = await getUserBd()

//CONSULTAR DISPOSITIVOS
export async function GET() {


    try {

        if (!user)
            return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })
        if (user.clientId === null)
            return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" }, { status: 409 })
        console.log(`user: ${user}`)
        const sectors = await prisma.sector.findMany({
            where: {
                clientId: user.clientId
            },
        })

        if (sectors === null)
            return NextResponse.json({ erro: "o cliente a qual o usuário está vinculado não possui setores cadastrados" }, { status: 409 })

        return NextResponse.json({ sectors: sectors }, { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {

            return NextResponse.json(
                { errors: error.errors.map((err) => ({ path: err.path, message: err.message })) },
                { status: 400 }
            );
        }

        // Erro genérico
        return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
    }
}
//CRIAR DISPOSITIVO
export async function POST(request: NextRequest) {

    if (!user)
        return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })
    if (user.clientId === null)
        return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" }, { status: 409 })

    try {
        const body: bodyPostSector = await request.json()
        sectorPostSchema.parse(body);
        console.log(body)
        const newsector = await prisma.sector.create({
            data: {
                name: body.name,
                clientId: user?.clientId,
                coordinator: body.coordinator ?? null

            }
        })

        return NextResponse.json({ sucesso: newsector }, { status: 201 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ errorFormatBody: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Erro do servidor' }, { status: 500 });
    }
}