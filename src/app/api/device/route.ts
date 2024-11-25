import { z } from 'zod';
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { devicePostSchema } from "@/schema/device";
import { devicePostRequestApi } from '@/interfaces/devices';
import { TypeFilter } from '@/interfaces/filters';
import { getUserBd } from '@/app/utils/get-user-bd';

const user = await getUserBd()

//CONSULTAR DISPOSITIVOS
export async function GET(request: NextRequest) {

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

    console.log(filters)

    if (!user)
        return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })

    try {

        if (user?.clientId === null || user === null)
            return NextResponse.json({ erro: "o usuário não esta vinculado a um cliente" }, { status: 409 })
        console.log(`userClient: ${user}`)
        const devices = await prisma.device.findMany({
            where: {
                clientId: user.clientId,
                ...filters,
                ...(search && { name: { contains: search } }),
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

    try {

        if (!user)
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
            return NextResponse.json({ erro: "o id do colaborador, setor não correspodem a nenhum registro" }, { status: 401 })

        const newDevice = await prisma.device.create({
            data: {
                name: body.name,
                description: body.description,
                sectorId: body.sectorId,
                collaboratorId: body.collaboratorId,
                clientId: user?.clientId ?? "",
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