import { z } from 'zod';
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getUserBd } from '@/app/utils/get-user-bd';
import { bodyPostCollaborator } from '@/interfaces/collaborator';
import { collaboratorPostSchema } from '@/schema/collaborator';

const user = await getUserBd()

//CONSULTAR DISPOSITIVOS
export async function GET() {

    try {

        if (!user)
            return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })
        if (user.clientId === null)
            return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" }, { status: 409 })
        console.log(`user: ${user}`)

        const collaborator = await prisma.collaborator.findMany({
            where: {
                clientId: user.clientId
            },
        })

        if (collaborator === null)
            return NextResponse.json({ erro: "o cliente a qual o usuário está vinculado não possui colaboradores cadastrados" }, { status: 409 })

        return NextResponse.json({ collaborator: collaborator }, { status: 200 })

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
        const body: bodyPostCollaborator = await request.json()
        collaboratorPostSchema.parse(body);
        console.log(body)
        const newsector = await prisma.collaborator.create({
            data: {
                name: body.name,
                clientId: user?.clientId,
                sectorId: body.sectorId,
                imageProfile: body.imageProfile ?? null

            }
        })

        return NextResponse.json({ sucesso: newsector }, { status: 201 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ errorFormatBody: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: `Erro do servidor -> ${error}` }, { status: 500 });
    }
}