import { prisma } from "@/lib/db";
//import { auth } from "../auth";


export const getUserBd = async () => {

    //const session = await auth()
    const session = {
        user: {
            id: "cm3w7yqiq0000w4lwolimymtg"
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user?.id
        },
    })

    return user
}