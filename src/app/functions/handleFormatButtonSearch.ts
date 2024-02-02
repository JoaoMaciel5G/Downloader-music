import { Dispatch, SetStateAction } from "react"
import { InfoFormats } from "../types/infoFormatsState"

export async function handleFormatButtonSearch(url: string | undefined, setLoading: Dispatch<SetStateAction<boolean>>, setInfo: Dispatch<SetStateAction<InfoFormats | undefined>>) {
    setLoading(true)
    const url_API = process.env.NEXT_PUBLIC_URL_API
    
    const response = await fetch(`${url_API}/getAudioFormats`, {
      method: "POST",
      body: JSON.stringify({
        "url_video": url
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    setInfo(data)
    setLoading(false)
}