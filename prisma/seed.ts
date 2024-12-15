import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient()

const seed = async () => {
    await Promise.all([
        //criar client padrão
        await prisma.client.create({
            data: {
                id: "cm3kkkvno000f356gz3qxuokt",
                name: "Ipam",
            }
        }),
        await prisma.user.create({
            data: {
                id: "cm4a86z3700009kpe7mk0pwpi",
                name: "Daniel",
                email: "daniel@inventi.com.br",
                clientId: "cm3kkkvno000f356gz3qxuokt",
                password: hashSync("Daniel@inventi123", 8)
            }
        }),
        //criar setor padrão
        await prisma.sector.createMany({
            data: [
                {
                    id: "cm3keifxj0009356glxczyvna",
                    name: "supre",
                    coordinator: "Guiomary",
                    clientId: "cm3kkkvno000f356gz3qxuokt"
                },
                {
                    id: "cm3vxgl4900010cl48ybsd5lb",
                    name: "cobep",
                    coordinator: "José Carlos",
                    clientId: "cm3kkkvno000f356gz3qxuokt"
                }
            ]
        }),
        //criar colaborador padrão
        await prisma.collaborator.createMany({
            data: [
                {
                    id: "cm3keiw2v000b356g1xgep7ug",
                    name: "Claire",
                    sectorId: "cm3keifxj0009356glxczyvna",
                    clientId: "cm3kkkvno000f356gz3qxuokt"
                },
                {
                    id: "cm3vxhl5x00020cl41s5l7viu",
                    name: "Rosa",
                    sectorId: "cm3vxgl4900010cl48ybsd5lb",
                    clientId: "cm3kkkvno000f356gz3qxuokt"
                }
            ]
        }),
        //criar fabricante padrão
        await prisma.manufacturer.createMany({
            data: [
                {
                    id: 1,
                    name: "Asus",
                    clientId: "cm3kkkvno000f356gz3qxuokt"
                },
                {
                    id: 2,
                    name: "c3tech",
                    clientId: "cm3kkkvno000f356gz3qxuokt"
                }
            ],
        }),
        //criar propietário padrão
        await prisma.owner.createMany({
            data: [
                {
                    id: 1,
                    name: "ipam",
                    clientId: "cm3kkkvno000f356gz3qxuokt"
                },
                {
                    id: 2,
                    name: "alucom",
                    clientId: "cm3kkkvno000f356gz3qxuokt"
                }
            ]
        }),
        await prisma.typeDevice.createMany({
            data: [
                {
                    id: 1,
                    name: "desktop",
                },
                {
                    id: 2,
                    name: "notebook",
                },
                {
                    id: 3,
                    name: "impressora",
                },
                {
                    id: 4,
                    name: "switch",
                },
                {
                    id: 5,
                    name: "monitor",
                },
                {
                    id: 6,
                    name: "teclado",
                },
                {
                    id: 7,
                    name: "mouse",
                },
                {
                    id: 8,
                    name: "nobreak",
                }
            ]
        }),
        //criar dispositivo padrão
        await prisma.device.create({
            data: {
                id: "cm3kemht8000d356gjcqmy1db",
                name: "notebook alucom",
                collaboratorId: "cm3keiw2v000b356g1xgep7ug",
                description: "notebook alucom",
                image: "https://m.media-amazon.com/images/I/61GXHXSa4TL._AC_SL1500_.jpg",
                manufacturerId: 1,
                registerNumber: 45454,
                sectorId: "cm3keifxj0009356glxczyvna",
                clientId: "cm3kkkvno000f356gz3qxuokt",
                ownerId: 1,
                typeDeviceId: 2
            }
        })
    ])
}


seed().then(() => {
    console.log('Banco de dados preenchido')
    prisma.$disconnect()
})