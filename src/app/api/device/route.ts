import { z } from 'zod';
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";
import { devicePostSchema } from "@/schema/device";
import { devicePostRequestApi } from '@/interfaces/devices';

//CONSULTAR DISPOSITIVOS
export async function GET(request: NextRequest) {

    const session = await auth()
    const { searchParams } = new URL(request.url);
    const collaborator = searchParams.get("collaborator");
    const search = searchParams.get("search");
    const owner = searchParams.get("owner")
    const manufacturer = searchParams.get("manufacturer")
    const sector = searchParams.get("sector")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {};
    if (collaborator) filters.collaboratorId = collaborator;
    if (owner) filters.ownerId = Number(owner);
    if (sector) filters.sectorId = sector
    if (manufacturer) filters.manufacturerId = Number(manufacturer)

    console.log(filters)

    if (!session)
        return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })

    try {
        const userClient = await prisma.user.findFirst({
            where: {
                id: session?.user?.id,
            },
            select: {
                clientId: true
            }
        })
        if (userClient?.clientId === null || userClient === null)
            return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" })
        console.log(`userClient: ${userClient}`)
        const devices = await prisma.device.findMany({
            where: {
                clientId: userClient?.clientId,
                ...filters,
                ...(search && { name: { contains: search } }),
            },
            orderBy: {
                updatedAt: "desc"
            }
        })

        if (devices === null)
            return NextResponse.json({ erro: "o cliente a qual o usuário está vinculado não possui dispositivos cadastrados" })

        return NextResponse.json({ devices: devices }, { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {

            return NextResponse.json(
                { errors: error.errors.map((err) => ({ path: err.path, message: err.message })) },
                { status: 400 }
            );
        }

        // Erro genérico
        return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
    }
}

//CRIAR DISPOSITIVO
export async function POST(request: NextRequest) {

    try {
        const body: devicePostRequestApi = await request.json()
        devicePostSchema.parse(body);

        const [collaboratorIsValid, sectorIsValid, clientIsValid] = await Promise.all([

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

        if ((collaboratorIsValid === null) || (sectorIsValid === null) || (clientIsValid === null))
            return NextResponse.json({ erro: "o id do colaborador, cliente ou setor não correspodem a nenhum registro" }, { status: 500 })

        const newDevice = await prisma.device.create({
            data: {
                name: body.name,
                description: body.description,
                sectorId: body.sectorId,
                collaboratorId: body.collaboratorId,
                clientId: body.clientId,
                image: body.image,
                registerNumber: body.registerNumber,
                manufacturerId: body.manufacturerId,
                ownerId: body.ownerId
            }
        })

        return NextResponse.json({ sucesso: newDevice }, { status: 201 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ errorFormatBody: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Erro do servidor' }, { status: 500 });
    }
}