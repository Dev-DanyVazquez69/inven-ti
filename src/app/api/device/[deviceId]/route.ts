import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { deviceUpdateSchema } from "@/schema/device"
import { handleApiError } from "@/app/utils/handleApiError"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ deviceId: string }> }
) {
    const deviceId = (await params).deviceId

    try {
        const device = await prisma.device.findUnique({
            where: {
                id: deviceId
            },
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                Collaborator: {
                    select: {
                        name: true
                    }
                },
                Client: {
                    select: {
                        name: true,
                    }
                },
                Manufacturer: {
                    select: {
                        name: true,
                    }
                },
                Owner: {
                    select: {
                        name: true,
                    }
                },
                Sector: {
                    select: {
                        name: true,
                    }
                },
                TypeDevice: {
                    select: {
                        name: true
                    }
                },
                registerNumber: true,
                createdAt: true,
                updatedAt: true,
            },
        })
        if (device === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum dispositivo cadastrado" }, { status: 500 })
        }
        return NextResponse.json({ device: device }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ deviceId: string }> }
) {
    const deviceId = (await params).deviceId

    try {
        const device = await prisma.device.findFirst({
            where: {
                id: deviceId
            }
        })
        if (device === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum dispositivo cadastrado" }, { status: 500 })
        }

        await prisma.device.delete({
            where: {
                id: deviceId
            }
        })
        return NextResponse.json({ device: "Dispositio deletado com sucesso" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ deviceId: string }> }
) {
    try {
        const deviceId = (await params).deviceId

        const body = await request.json();
        const validatedData = deviceUpdateSchema.parse(body);
        const device = await prisma.device.findUnique({
            where: {
                id: deviceId
            }
        })
        if (device === null) {
            return NextResponse.json({ Erro: "O ID não corresponde a nenhum dispositivo cadastrado" }, { status: 500 })
        }
        await prisma.device.update({
            where: {
                id: deviceId
            },
            data: validatedData
        })
        return NextResponse.json({ device: "As informações do dispositivo foram atualizadas" }, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}