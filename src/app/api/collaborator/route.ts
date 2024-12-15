import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { TypeFilterDevice } from '@/interfaces/filters';
import { auth } from '@/app/auth';
import { bodyPostCollaborator } from '@/interfaces/collaborator';
import { collaboratorPostSchema } from '@/schema/collaborator';
import { handleApiError } from '@/app/utils/handleApiError';

//CONSULTAR COLABORADORES
export async function GET(request: NextRequest) {

    const session = await auth()

    //registrar parametros de busca 
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const sector = searchParams.get("sector")

    const filters: TypeFilterDevice = {};
    if (sector) filters.sectorId = sector

    //verificando se há uma sessão ativa
    if (!session)
        return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })

    //buscar cliente a qual o usuário está vinculado
    try {
        const clientId = await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            select: {
                clientId: true
            }
        })

        //retornar erro caso o usuário não esteja vinculado a nenhum cliente
        if (clientId?.clientId === null)
            return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" }, { status: 409 })

        console.log(`filtros: ${JSON.stringify(filters)}`)

        //consultar colaboradores no banco de dados
        const collaborators = await prisma.collaborator.findMany({
            where: {
                clientId: clientId?.clientId,
                ...filters,
                ...(search && { name: { contains: search } }),
            },
            select: {
                id: true,
                name: true,
                imageProfile: true,
                Device: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                sector: {
                    select: {
                        id: true,
                        name: true
                    }
                },
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
        //verificar se a consulta retornou algum registro
        if (collaborators === null)
            return NextResponse.json({ erro: "o cliente a qual o usuário está vinculado não possui colaboradores cadastrados" }, { status: 409 })

        return NextResponse.json({ collaborators: collaborators }, { status: 200 })

    } catch (error) {
        return handleApiError(error);
    }
}
//CRIAR COLABORADOR
export async function POST(request: NextRequest) {

    const session = await auth()

    try {
        if (!session)
            return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })

        //realiza a verificação dos dados com o ZOD
        const body: bodyPostCollaborator = await request.json()
        const bodyVerifiqued = collaboratorPostSchema.parse(body);

        //consulta a qual cliente o Usuário está vinculado
        const clientId = await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            select: {
                clientId: true
            }
        })

        const [nameIsUnique, sectorIsValid] = await Promise.all([

            prisma.collaborator.findFirst({
                where: {
                    name: bodyVerifiqued.name
                }
            }),
            prisma.sector.findFirst({
                where: {
                    id: body.sectorId
                }
            }),
        ])

        // Verificar se o nome informado já existe
        if (nameIsUnique !== null)
            return NextResponse.json({ erro: "Já existe um Colaborador com esse nome" }, { status: 500 })

        //Verifica se o colaborador e o setor existem
        if (sectorIsValid === null)
            return NextResponse.json({ erro: "o id do setor não correspodem a nenhum registro" }, { status: 401 })

        const newCollaborator = await prisma.collaborator.create({
            data: {
                name: bodyVerifiqued.name,
                sectorId: bodyVerifiqued.sectorId,
                clientId: clientId?.clientId ?? "",
                imageProfile: bodyVerifiqued.imageProfile
            }
        })

        return NextResponse.json({ sucesso: newCollaborator }, { status: 201 })

    } catch (error) {
        return handleApiError(error);
    }
}