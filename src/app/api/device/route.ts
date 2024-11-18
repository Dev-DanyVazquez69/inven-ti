import { z } from 'zod';
import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/app/auth"
import { devicePostSchema } from "@/schema/device"
import { deviceRequestApi } from '@/interfaces/devices';

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
        console.log(session)
        if (userClient?.clientId === null)
            return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" })

        const devices = await prisma.device.findMany({
            where: {
                clientId: userClient?.clientId
            }
        })

        if (devices === null)
            return NextResponse.json({ erro: "o cliente a qual o usuário está vinculado não possui dispositivos cadastrados" })

        return NextResponse.json({ devices: devices }, { status: 200 })

    } catch (erro) {
        return NextResponse.json({ erro: erro }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {

    try {
        const body: deviceRequestApi = await request.json()
        devicePostSchema.parse(body);

        const [ collaboratorIsValid, sectorIsValid, clientIsValid ] = await Promise.all([
            
            prisma.collaborator.findFirst({
                where: {
                    id: body.collaboratorId
                }
            }),
            
            prisma.sector.findFirst({
                where: {
                    id: body.sectorId
                }
            }),
            prisma.client.findFirst({
                where: {
                    id: body.clientId
                }
            })
        ])

        if((collaboratorIsValid === null) || (sectorIsValid === null) || (clientIsValid === null))
            return NextResponse.json({erro: "o id do colaborador, cliente ou setor não correspodem a nenhum registro"}, {status: 500})

        const newDevice = await prisma.device.create({
            data: {
                name: body.name,
                description: body.description,
                sectorId: body.sectorId,
                collaboratorId: body.collaboratorId,
                clientId: body.clientId,
                image: body.image,
                registerNumber: body.registerNumber,
                manufacturer: body.manufacturer,
            }
        })
            
        return NextResponse.json({ sucesso: newDevice}, { status: 201 })
        
    } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json({errorFormatBody: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Erro do servidor' }, { status: 500 });
      }
}