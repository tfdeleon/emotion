const createURL = (path) => {
    return window.location.origin + path
}

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createURL('/api/journal'), {
    method: 'POST',
    body: JSON.stringify({ content: 'new entry' }),
    })
    )

    if (res.ok){
        const data = await res.json()
        return data.data
    }
}
export const updatedEntry = async (id, content) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`),{
    method: 'PATCH',
    body: JSON.stringify({ content }),
}))

if(res.ok){
    const data = await res.json()
    return data.data
}
}
