import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/app/auth"
import { handleApiError } from "@/app/utils/handleApiError"
import { TypeDeviceBody } from "@/interfaces/typeDevice"
import { typeDeviceSchema } from "@/schema/typeDevice"

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

        const typeDevices = await prisma.typeDevice.findMany({
            where: {
                clientId: userClient?.clientId
            },
            orderBy: {
                updatedAt: "desc"
            }
        })

        return NextResponse.json({ typeDevices: typeDevices }, { status: 200 })

    } catch (error) {
        return handleApiError(error);
    }
}

export async function POST(request: NextRequest) {

    const session = await auth()

    try {
        if (!session)
            return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })

        //realiza a verificação dos dados com o ZOD
        const body: TypeDeviceBody = await request.json()
        const bodyVerifiqued = typeDeviceSchema.parse(body);

        //consulta a qual cliente o Usuário está vinculado
        const clientId = await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            select: {
                clientId: true
            }
        })

        if (clientId === null)
            return NextResponse.json({ erro: "o usuário não está vinculado a nenhum cliente" })
        const [nameIsUnique] = await Promise.all([

            prisma.collaborator.findFirst({
                where: {
                    name: bodyVerifiqued.name
                }
            }),
        ])

        // Verificar se o nome informado já existe
        if (nameIsUnique !== null)
            return NextResponse.json({ erro: "Já existe um tipo de dispositivo com esse nome" }, { status: 500 })

        const newtypeDevice = await prisma.typeDevice.create({
            data: {
                name: bodyVerifiqued.name,
                clientId: clientId?.clientId ?? "",
            }
        })

        return NextResponse.json({ sucesso: newtypeDevice }, { status: 201 })

    } catch (error) {
        return handleApiError(error);
    }
}