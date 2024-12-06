import { z } from 'zod';
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { devicePostSchema } from "@/schema/device";
import { devicePostRequestApi } from '@/interfaces/devices';
import { TypeFilter } from '@/interfaces/filters';
import { auth } from '@/app/auth';

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
    const filters: TypeFilter = {};
    if (collaborator) filters.collaboratorId = collaborator;
    if (owner) filters.ownerId = Number(owner);
    if (sector) filters.sectorId = sector
    if (manufacturer) filters.manufacturerId = Number(manufacturer)

    if (!session)
        return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })

    try {

        const clientId = await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            select: {
                clientId: true
            }
        })

        if (clientId?.clientId === null)
            return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" }, { status: 409 })

        console.log(`filtros: ${JSON.stringify(filters)}`)

        const devices = await prisma.device.findMany({
            where: {
                clientId: clientId?.clientId,
                ...filters,
                ...(search && { name: { contains: search } }),
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
                registerNumber: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                updatedAt: "desc"
            }
        })

        if (devices === null)
            return NextResponse.json({ erro: "o cliente a qual o usuário está vinculado não possui dispositivos cadastrados" }, { status: 409 })

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

    const session = await auth()

    try {

        if (!session)
            return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })

        const body: devicePostRequestApi = await request.json()
        devicePostSchema.parse(body);

        const [collaboratorIsValid, sectorIsValid] = await Promise.all([

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
        ])

        if ((collaboratorIsValid === null) || (sectorIsValid === null))
            return NextResponse.json({ erro: "o id do colaborador ou setor não correspodem a nenhum registro" }, { status: 401 })

        const newDevice = await prisma.device.create({
            data: {
                name: body.name,
                description: body.description,
                sectorId: body.sectorId,
                collaboratorId: body.collaboratorId,
                clientId: session.user.id ?? "",
                image: body.image,
                registerNumber: body.registerNumber,
                manufacturerId: body.manufacturerId,
                ownerId: body.ownerId,
                typeDeviceId: body.typeDeviceId
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