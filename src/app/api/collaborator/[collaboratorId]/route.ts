import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

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
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum colaborador cadastrado" }, { status: 500 })
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
        return NextResponse.json({ Erro: error }, { status: 500 })
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
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum colaborador cadastrado" }, { status: 500 })
        }

        await prisma.collaborator.delete({
            where: {
                id: collaboratorId
            }
        })
        return NextResponse.json({ device: "Colaborador deletado com sucesso" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}