import { Dispatch, SetStateAction } from "react"
import { InfoFormats } from "../types/infoFormatsState"

export async function handleFormatButtonSearch(url: string | undefined, setLoading: Dispatch<SetStateAction<boolean>>, setInfo: Dispatch<SetStateAction<InfoFormats | undefined>>) {
    setLoading(true)
    const response = await fetch(`/api/getFormats?url=${url}`)

    const data = await response.json()
    setInfo(data)
    setLoading(false)
}