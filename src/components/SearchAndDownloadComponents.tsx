"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download} from "lucide-react"
import { useRef, useState } from "react"
import Spin from "@/components/spin"
import { handleFormatButtonSearch } from "@/app/functions/handleFormatButtonSearch"
import { InfoFormats } from "@/app/types/infoFormatsState"

export default function SearchComponent(){
    const valueInput = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [info, setInfo] = useState<InfoFormats>()
    
    return(
        <div className="flex gap-3">
          <Input placeholder="URL" ref={valueInput} />
          <Button size={"lg"}  onClick={() => handleFormatButtonSearch(valueInput?.current?.value, setLoading, setInfo)}>{loading ? <Spin/> : <span className="flex items-center gap-2"><Search size={18}/>Pesquisar</span>}</Button>
        </div>
    )
}