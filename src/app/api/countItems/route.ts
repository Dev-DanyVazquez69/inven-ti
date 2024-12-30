import { auth } from "@/app/auth";
import { handleApiError } from "@/app/utils/handleApiError";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    const session = await auth()

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

        const countDeviceTypes = await prisma.device.groupBy({
            by: ['typeDeviceId'], // Campo pelo qual você quer agrupar (relacione com a FK do tipo)
            _count: {
                id: true, // Conta os dispositivos pelo campo `id`
            },
        });

        const countSectors = await prisma.collaborator.groupBy({
            by: ['sectorId'], // Campo pelo qual você quer agrupar (relacione com a FK do tipo)
            _count: {
                id: true, // Conta os dispositivos pelo campo `id`
            },
        });

        const countDeviceInTypes = await Promise.all(
            countDeviceTypes.map(async (group) => {
                const type = await prisma.typeDevice.findUnique({
                    where: { id: group.typeDeviceId ?? 0 },
                });

                return {
                    typeId: group.typeDeviceId,
                    typeName: type?.name ?? "Tipo Desconhecido", // Nome do tipo de dispositivo
                    count: group._count.id,
                };
            })
        );

        const countCollaboratorsInSectors = await Promise.all(
            countSectors.map(async (group) => {
                const type = await prisma.sector.findUnique({
                    where: { id: group.sectorId ?? "" },
                });

                return {
                    typeId: group.sectorId,
                    typeName: type?.name ?? "Tipo Desconhecido", // Nome do tipo de dispositivo
                    count: group._count.id,
                };
            })
        );

        return NextResponse.json({ countItems: { countCollaboratorsInSectors, countDeviceInTypes } }, { status: 200 })

    } catch (error) {
        return handleApiError(error);

    }
}