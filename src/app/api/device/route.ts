import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { devicePostSchema } from "@/schema/device";
import { devicePostRequestApi } from '@/interfaces/devices';
import { TypeFilterDevice } from '@/interfaces/filters';
import { auth } from '@/app/auth';
import { handleApiError } from '@/app/utils/handleApiError';

//CONSULTAR DISPOSITIVOS
export async function GET(request: NextRequest) {

    const session = await auth()

    const { searchParams } = new URL(request.url);
    const collaborator = searchParams.get("collaborator");
    const search = searchParams.get("search");
    const owner = searchParams.get("owner")
    const manufacturer = searchParams.get("manufacturer")
    const sector = searchParams.get("sector")
    const typeDevice = searchParams.get("typeDevice")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: TypeFilterDevice = {};
    if (collaborator) filters.collaboratorId = collaborator;
    if (owner) filters.ownerId = Number(owner);
    if (sector) filters.sectorId = sector
    if (manufacturer) filters.manufacturerId = Number(manufacturer)
    if (typeDevice) filters.typeDeviceId = Number(typeDevice)

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
            return NextResponse.json({ erro: "O usuário não está vinculado a nenhum cliente. Entre em contato com o suporte!" }, { status: 409 })

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
                TypeDevice: {
                    select: {
                        name: true
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
        return handleApiError(error);

    }
}
//CRIAR DISPOSITIVO
export async function POST(request: NextRequest) {

    const session = await auth()

    try {
        console.log(`sessão do usuário: ${session}`)
        if (!session)
            return NextResponse.json({ erro: "Acesso não autorizado, Faça login" }, { status: 401 })

        //realiza a verificação dos dados com o ZOD
        const body: devicePostRequestApi = await request.json()
        const bodyVerifiqued = devicePostSchema.parse(body);

        //consulta a qual cliente o Usuário está vinculado
        const clientId = await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            select: {
                clientId: true
            }
        })
        const [nameIsUnique, collaboratorIsValid, sectorIsValid, registerNumberIsUnique] = await Promise.all([
            prisma.device.findFirst({
                where: {
                    name: bodyVerifiqued.name
                }
            }),
            prisma.collaborator.findFirst({
                where: {
                    id: bodyVerifiqued.collaboratorId ?? ""
                }
            }),

            prisma.sector.findFirst({
                where: {
                    id: bodyVerifiqued.sectorId
                }
            }),

            prisma.device.findFirst({
                where: {
                    registerNumber: bodyVerifiqued.registerNumber
                }
            }),
        ])
        if (registerNumberIsUnique !== null)
            return NextResponse.json({ erro: "O numero de registro informado já existe" }, { status: 500 })

        if (nameIsUnique !== null)
            return NextResponse.json({ erro: "Já existe um dispositivo com esse nome" }, { status: 500 })

        if ((collaboratorIsValid === null && body.collaboratorId) || (sectorIsValid === null))
            return NextResponse.json({ erro: "o id do colaborador ou setor não correspodem a nenhum registro" }, { status: 401 })
        console.log(`Dados para criação do dispositivo ${bodyVerifiqued}`)

        const newDevice = await prisma.device.create({
            data: {
                name: bodyVerifiqued.name,
                description: bodyVerifiqued.description,
                sectorId: bodyVerifiqued.sectorId,
                collaboratorId: bodyVerifiqued.collaboratorId,
                clientId: clientId?.clientId ?? "",
                image: bodyVerifiqued.image,
                registerNumber: bodyVerifiqued.registerNumber,
                manufacturerId: bodyVerifiqued.manufacturerId,
                ownerId: bodyVerifiqued.ownerId,
                typeDeviceId: bodyVerifiqued.typeDeviceId
            }
        })

        return NextResponse.json({ sucesso: newDevice }, { status: 201 })

    } catch (error) {
        return handleApiError(error);
    }
}