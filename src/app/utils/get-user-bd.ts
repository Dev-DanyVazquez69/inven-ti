import { prisma } from "@/lib/db";
//import { auth } from "../auth";


export const getUserBd = async () => {

    //const session = await auth()
    const session = {
        user: {
            id: "cm3x9i0vq00002b87dnyajc28"
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user?.id
        },
    })

    return user
}