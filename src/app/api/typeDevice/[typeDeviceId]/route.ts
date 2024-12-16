import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { handleApiError } from "@/app/utils/handleApiError"
import { typeDeviceSchema } from "@/schema/typeDevice"

//Deletar Marca
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ typeDeviceId: number }> }
) {
    const typeDeviceId = (await params).typeDeviceId

    try {
        const typeDevice = await prisma.typeDevice.findFirst({
            where: {
                id: typeDeviceId
            }
        })
        if (typeDevice === null) {
            return NextResponse.json({ erro: "O ID não corresponde a nenhuma marca cadastrada" }, { status: 500 })
        }

        await prisma.typeDevice.delete({
            where: {
                id: typeDeviceId
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
    { params }: { params: Promise<{ typeDeviceId: number }> }
) {
    const typeDeviceId = (await params).typeDeviceId

    const body = await request.json()
    const bodyVerifiqued = typeDeviceSchema.parse(body)

    try {
        const [typeDeviceIsExist, nametypeDeviceIsExist] = await Promise.all([
            prisma.typeDevice.findFirst({
                where: {
                    id: typeDeviceId
                },
            }),
            prisma.typeDevice.findFirst({
                where: {
                    name: bodyVerifiqued.name
                }
            })

        ])

        if (typeDeviceIsExist === null)
            return NextResponse.json({ erro: "O ID não corresponde a nenhum tipo de dispositivo cadastrado" }, { status: 401 })

        if (nametypeDeviceIsExist !== null)
            return NextResponse.json({ erro: "Já existe um tipo de dispositivo com esse nome" }, { status: 500 })

        await prisma.typeDevice.update({
            where: {
                id: typeDeviceId
            },
            data: {
                name: bodyVerifiqued.name,
            }
        })
        return NextResponse.json({ success: "sucesso ao atualizar tipo de dispositivo" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}