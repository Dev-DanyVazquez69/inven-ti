import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { handleApiError } from "@/app/utils/handleApiError"
import { sectorSchema } from "@/schema/sector"
import { bodySector } from "@/interfaces/sector"

//Deletar Marca
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ sectorId: string }> }
) {
    const sectorId = (await params).sectorId

    try {
        const sector = await prisma.sector.findFirst({
            where: {
                id: sectorId
            }
        })
        if (sector === null) {
            return NextResponse.json({ erro: "O ID não corresponde a nenhum setor cadastrado" }, { status: 500 })
        }

        await prisma.sector.delete({
            where: {
                id: sectorId
            }
        })
        return NextResponse.json({ sucesso: "Setor deletado com sucesso" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}

//atualizar colaborador
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ sectorId: string }> }
) {
    const sectorId = (await params).sectorId

    const body: bodySector = await request.json()
    const bodyVerifiqued = sectorSchema.parse(body)

    try {
        const [sectorIsExist, namesectorIsExist] = await Promise.all([
            prisma.sector.findFirst({
                where: {
                    id: sectorId
                },
            }),
            prisma.sector.findFirst({
                where: {
                    name: bodyVerifiqued.name
                }
            })

        ])

        if (sectorIsExist === null)
            return NextResponse.json({ erro: "O ID não corresponde a nenhum setor cadastrado" }, { status: 401 })

        if (namesectorIsExist !== null)
            return NextResponse.json({ erro: "Já existe um setor com esse nome" }, { status: 500 })

        await prisma.sector.update({
            where: {
                id: sectorId
            },
            data: {
                name: bodyVerifiqued.name,
            }
        })
        return NextResponse.json({ success: "sucesso ao atualizar setor" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}