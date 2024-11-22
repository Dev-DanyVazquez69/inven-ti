import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { devicePostSchema } from "@/schema/device"

export async function GET(
    { params }: { params: Promise<{ deviceId: string }> }
) {
    const deviceId = (await params).deviceId

    try {
        const device = await prisma.device.findUnique({
            where: {
                id: deviceId
            }
        })
        if (device === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum dispositivo cadastrado" }, { status: 500 })
        }
        return NextResponse.json({ device: device }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}
export async function DELETE(
    { params }: { params: Promise<{ deviceId: string }> }
) {
    const deviceId = (await params).deviceId

    try {
        const device = await prisma.device.findUnique({
            where: {
                id: deviceId
            }
        })
        if (device === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum dispositivo cadastrado" }, { status: 500 })
        }

        prisma.device.delete({
            where: {
                id: deviceId
            }
        })
        return NextResponse.json({ device: "Dispositio deletado com sucesso" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ deviceId: string }> }
) {
    try {
        const deviceId = (await params).deviceId

        const body = await request.json();
        const validatedData = devicePostSchema.parse(body);

        const device = await prisma.device.findUnique({
            where: {
                id: deviceId
            }
        })
        if (device === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum dispositivo cadastrado" }, { status: 500 })
        }

        prisma.device.update({
            where: {
                id: deviceId
            },
            data: validatedData
        })
        return NextResponse.json({ device: "Dispositio deletado com sucesso" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Erro: error }, { status: 500 })
    }
}