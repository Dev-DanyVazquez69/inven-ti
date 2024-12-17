import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { handleApiError } from "@/app/utils/handleApiError"
import { ownerSchema } from "@/schema/owner"

//Deletar Marca
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ ownerId: number }> }
) {
    const ownerId = Number((await params).ownerId)

    try {
        const owner = await prisma.owner.findFirst({
            where: {
                id: ownerId
            }
        })
        if (owner === null) {
            return NextResponse.json({ erro: "O ID não corresponde a nenhuma marca cadastrada" }, { status: 500 })
        }

        await prisma.owner.delete({
            where: {
                id: ownerId
            }
        })
        return NextResponse.json({ sucesso: "Marca deletada com sucesso" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}

//atualizar marca
export async function PATCH(    
    request: NextRequest,
    { params }: { params: Promise<{ ownerId: number }> }
) {
    const ownerId = Number((await params).ownerId)

    const body = await request.json()
    const bodyVerifiqued = ownerSchema.parse(body)

    try {
        const [ownerIsExist, nameownerIsExist] = await Promise.all([
            prisma.owner.findFirst({
                where: {
                    id: ownerId
                },
            }),
            prisma.owner.findFirst({
                where: {
                    name: bodyVerifiqued.name
                }
            })

        ])

        if (ownerIsExist === null)
            return NextResponse.json({ erro: "O ID não corresponde a nenhuma marca cadastrado" }, { status: 401 })

        if (nameownerIsExist !== null)
            return NextResponse.json({ erro: "Já existe uma marca com esse nome" }, { status: 500 })

        await prisma.owner.update({
            where: {
                id: ownerId
            },
            data: {
                name: bodyVerifiqued.name,
            }
        })
        return NextResponse.json({ success: "sucesso ao atualizar marca" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}