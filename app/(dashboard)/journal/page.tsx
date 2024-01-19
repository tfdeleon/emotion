import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import { analyze } from '@/utils/ai'


const getEntries = async () =>{
    const user = await getUserByClerkID()
    const entries = await prisma.journalEntry.findMany({
        where:{
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc'
        },
    })

    await analyze('Who is Lebron James')

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()
    return (
    <div className="p-10 bg-blue-400/70 h-full">
        <h2 className="text-3xl mb-8"> Pages </h2>
    <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
            {entries.map(entry =>(
                <Link href={`/journal/${entry.id}`} key={entry.id}>
                <EntryCard key={entry.id} entry={entry}/>
                </Link>
            ))}
        </div>
    </div>
    )
}

export default JournalPage
