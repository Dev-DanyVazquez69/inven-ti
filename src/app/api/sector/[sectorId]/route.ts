import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sectorUpdateSchema } from "@/schema/sector"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ sectorId: string }> }
) {
    const sectorId = (await params).sectorId

    try {
        const sector = await prisma.sector.findUnique({
            where: {
                id: sectorId
            }
        })
        if (sector === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum setor cadastrado" }, { status: 500 })
        }
        return NextResponse.json({ sector: sector }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}
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
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum setor cadastrado" }, { status: 500 })
        }

        await prisma.sector.delete({
            where: {
                id: sectorId
            }
        })
        return NextResponse.json({ sector: "Setor deletado com sucesso" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ sectorId: string }> }
) {
    try {
        const sectorId = (await params).sectorId

        const body = await request.json();
        const validatedData = sectorUpdateSchema.parse(body);

        const sector = await prisma.sector.findUnique({
            where: {
                id: sectorId
            }
        })
        if (sector === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum setor cadastrado" }, { status: 500 })
        }
        
        await prisma.sector.update({
            where: {
                id: sectorId
            },
            data: validatedData
        })
        return NextResponse.json({ sector: "As informações do setor foram atualizadas" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}