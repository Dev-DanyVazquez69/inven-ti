import { PrismaClient } from '@prisma/client'
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
        //criar setor padrão
        await prisma.sector.create({
            data: {
                id: "cm3keifxj0009356glxczyvna",
                name: "supre",
                coordinator: "Guiomary",
                clientId: "cm3kkkvno000f356gz3qxuokt"
            }
        }),
        //criar colaborador padrão
        await prisma.collaborator.create({
            data: {
                id: "cm3keiw2v000b356g1xgep7ug",
                name: "Claire",
                sectorId: "cm3keifxj0009356glxczyvna",
                clientId: "cm3kkkvno000f356gz3qxuokt"
            }
        }),
        //criar dispositivo padrão
        await prisma.device.create({
            data: {
                id: "cm3kemht8000d356gjcqmy1db",
                name: "notebook alucom",
                collaboratorId: "cm3keiw2v000b356g1xgep7ug",
                description: "notebook alucom",
                image: "https://m.media-amazon.com/images/I/61GXHXSa4TL._AC_SL1500_.jpg",
                manufacturer: "Asus",
                registerNumber: 45454,
                sectorId: "cm3keifxj0009356glxczyvna",
                clientId: "cm3kkkvno000f356gz3qxuokt"
            }
        })
    ])
}


seed().then(() => {
    console.log('Banco de dados preenchido')
    prisma.$disconnect()
})