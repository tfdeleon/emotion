import { prisma } from "@/utils/db"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/dist/server/api-utils"

const createNewUser = async () => {
    const user = await currentUser()
    const match = await prisma.user.findUnique({
        where:{
            clerkId: user.id as string,
        },
    })

    if(!match){
        await prisma.user.create({
            data:{
                clerkId: user.id,
                email: user?.emailAddresses[0].emailAddress,
            },
        })
    }
    redirect('/journal')
}

const NewUser = async () => {
    await createNewUser()
    return(
        <div>Hi</div>
    )
}

export default NewUser
