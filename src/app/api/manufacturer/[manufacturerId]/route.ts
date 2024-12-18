import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { handleApiError } from "@/app/utils/handleApiError"
import { manufacturerSchema } from "@/schema/manufacturer"

//Deletar Marca
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ manufacturerId: number }> }
) {
    const manufacturerId = Number((await params).manufacturerId)

    try {
        const manufacturer = await prisma.manufacturer.findFirst({
            where: {
                id: manufacturerId
            }
        })
        if (manufacturer === null) {
            return NextResponse.json({ erro: "O ID não corresponde a nenhuma marca cadastrada" }, { status: 500 })
        }

        await prisma.manufacturer.delete({
            where: {
                id: manufacturerId
            }
        })
        return NextResponse.json({ sucesso: "Marca deletada com sucesso" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}

//atualizar colaborador
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ manufacturerId: number }> }
) {
    const manufacturerId = (Number((await params).manufacturerId))

    const body = await request.json()
    const bodyVerifiqued = manufacturerSchema.parse(body)

    try {
        const [manufacturerIsExist, nameManufacturerIsExist] = await Promise.all([
            prisma.manufacturer.findFirst({
                where: {
                    id: manufacturerId
                },
            }),
            prisma.manufacturer.findFirst({
                where: {
                    name: bodyVerifiqued.name
                }
            })

        ])

        if (manufacturerIsExist === null)
            return NextResponse.json({ erro: "O ID não corresponde a nenhuma marca cadastrado" }, { status: 401 })

        if (nameManufacturerIsExist !== null && nameManufacturerIsExist?.name !== bodyVerifiqued.name)
            return NextResponse.json({ erro: "Já existe uma marca com esse nome" }, { status: 500 })

        await prisma.manufacturer.update({
            where: {
                id: manufacturerId
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