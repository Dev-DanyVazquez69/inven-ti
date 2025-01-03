import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/app/auth"
import { handleApiError } from "@/app/utils/handleApiError"

export async function GET() {
    const session = await auth()
    if (!session)
        return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })
    try {
        const userClient = await prisma.user.findFirst({
            where: {
                id: session?.user?.id
            },
            select: {
                clientId: true
            }
        })
        if (userClient?.clientId === null)
            return NextResponse.json({ erro: "O usuário não está vinculado a nenhum cliente. Entre em contato com o suporte!" })

        const [collaborator, sector, owner, manufacture, typeDevices] = await Promise.all([

            prisma.collaborator.findMany({
                where: {
                    clientId: userClient?.clientId
                },
                select: {
                    id: true,
                    name: true
                }
            }),

            prisma.sector.findMany({
                where: {
                    clientId: userClient?.clientId
                },
                select: {
                    id: true,
                    name: true
                }
            }),

            prisma.owner.findMany({
                where: {
                    clientId: userClient?.clientId
                },
                select: {
                    id: true,
                    name: true
                }
            }),

            prisma.manufacturer.findMany({
                where: {
                    clientId: userClient?.clientId
                },
                select: {
                    id: true,
                    name: true
                }
            }),

            prisma.typeDevice.findMany({
                select: {
                    id: true,
                    name: true
                }
            }),
        ])

        return NextResponse.json({
            filters: {
                collaborators: collaborator,
                sectors: sector,
                owners: owner,
                manufactures: manufacture,
                typeDevices: typeDevices
            }
        }, { status: 200 })

    } catch (error) {
        return handleApiError(error);
    }
}