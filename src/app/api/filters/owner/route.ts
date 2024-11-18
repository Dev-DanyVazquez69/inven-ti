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

        const propietarios = await prisma.owner.findMany({
            where: {
                clientId: userClient?.clientId
            }
        })

        if (propietarios === null)
            return NextResponse.json({ erro: "o cliente a qual o usuário está vinculado não possui colaboradores cadastrados" })

        return NextResponse.json({ Setores: propietarios }, { status: 200 })

    } catch (erro) {
        return NextResponse.json({ erro: erro }, { status: 500 })
    }
}