import { analyze } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    const data = await request.json()
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.create({
        data:{
            userId: user.id,
            content: "Write your content",
        },
    })

    const analysis = await analyze(entry.content)
    await prisma.analysis.create({
        data:{
            entryId: entry.id,
            mood: analysis.mood,
            summary: analysis.summary,
            color: analysis.color,
            negative: analysis.negative,
            subject: analysis.subject,
        },
    })

    revalidatePath('/journal')
    return NextResponse.json({ data:entry })
}
