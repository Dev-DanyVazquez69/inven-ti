import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
    request: NextRequest,
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