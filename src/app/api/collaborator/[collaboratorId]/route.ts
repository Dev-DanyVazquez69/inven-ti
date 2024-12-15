import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { collaboratorUpdateSchema } from "@/schema/collaborator"
import { handleApiError } from "@/app/utils/handleApiError"

//Consultar colaborador
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ collaboratorId: string }> }
) {
    const collaboratorId = (await params).collaboratorId

    try {
        const collaboratorIsExist = await prisma.collaborator.findFirst({
            where: {
                id: collaboratorId
            }
        })
        if (collaboratorIsExist === null) {
            return NextResponse.json({ erro: "O ID não corresponde a nenhum colaborador cadastrado" }, { status: 500 })
        }

        const collaborator = await prisma.collaborator.findUnique({
            where: {
                id: collaboratorId
            },
            select: {
                id: true,
                name: true,
                imageProfile: true,
                Device: {
                    select: {
                        id: true,
                        name: true
                    },
                },
                sector: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
        return NextResponse.json({ collaborator: collaborator }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}

//Deletar colaborador
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ collaboratorId: string }> }
) {
    const collaboratorId = (await params).collaboratorId

    try {
        const collaborator = await prisma.collaborator.findFirst({
            where: {
                id: collaboratorId
            }
        })
        if (collaborator === null) {
            return NextResponse.json({ erro: "O ID não corresponde a nenhum colaborador cadastrado" }, { status: 500 })
        }

        await prisma.collaborator.delete({
            where: {
                id: collaboratorId
            }
        })
        return NextResponse.json({ device: "Colaborador deletado com sucesso" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}

//atualizar colaborador
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ collaboratorId: string }> }
) {
    const collaboratorId = (await params).collaboratorId

    const body = await request.json()
    const bodyVerifiqued = collaboratorUpdateSchema.parse(body)

    try {
        const [collaboratorIsExist, nameCollaboratorIsExist] = await Promise.all([
            prisma.collaborator.findFirst({
                where: {
                    id: collaboratorId
                },
            }),
            prisma.collaborator.findFirst({
                where: {
                    name: bodyVerifiqued.name
                }
            })

        ])

        if (collaboratorIsExist === null)
            return NextResponse.json({ erro: "O ID não corresponde a nenhum colaborador cadastrado" }, { status: 401 })

        if (nameCollaboratorIsExist !== null)
            return NextResponse.json({ erro: "Já existe um colaborador com esse nome" }, { status: 500 })

        await prisma.collaborator.update({
            where: {
                id: collaboratorId
            },
            data: {
                name: bodyVerifiqued.name,
                sectorId: bodyVerifiqued.sectorId
            }
        })
        return NextResponse.json({ success: "sucesso ao atualizar colaborador" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}