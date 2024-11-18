import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/app/auth"

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
            return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" })

        const allManufactures = await prisma.manufacturer.findMany({
            where: {
                clientId: userClient?.clientId
            },
        })

        if (allManufactures === null)
            return NextResponse.json({ erro: "Não há registro de fabricantes cadastrados no sistema" })


        return NextResponse.json({ collaborator: allManufactures }, { status: 200 })

    } catch (erro) {
        return NextResponse.json({ erro: erro }, { status: 500 })
    }
}