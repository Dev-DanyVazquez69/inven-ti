import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { collaboratorUpdateSchema } from "@/schema/collaborator"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ collaboratorId: string }> }
) {
    const collaboratorId = (await params).collaboratorId

    try {
        const collaborator = await prisma.collaborator.findUnique({
            where: {
                id: collaboratorId
            }
        })
        if (collaborator === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum colaborador cadastrado" }, { status: 500 })
        }
        return NextResponse.json({ collaborator: collaborator }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}
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
        return NextResponse.json({ collaborator: "Colaborador deletado com sucesso" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ collaboratorId: string }> }
) {
    try {
        const collaboratorId = (await params).collaboratorId

        const body = await request.json();
        const validatedData = collaboratorUpdateSchema.parse(body);

        const collaborator = await prisma.collaborator.findUnique({
            where: {
                id: collaboratorId
            }
        })
        if (collaborator === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum colaborador cadastrado" }, { status: 500 })
        }
        
        await prisma.collaborator.update({
            where: {
                id: collaboratorId
            },
            data: validatedData
        })
        return NextResponse.json({ collaborator: "As informações do colaborador foram atualizadas" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}