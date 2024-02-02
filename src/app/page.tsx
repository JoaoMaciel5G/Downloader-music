"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download} from "lucide-react"
import { useRef, useState } from "react"
import Spin from "@/components/spin"
import { handleDownloadArchive } from "./functions/handleDownloadArchive"
import { InfoFormats } from "./types/infoFormatsState"
import { handleFormatButtonSearch } from "./functions/handleFormatButtonSearch"
import Title from "@/components/Title"
import FormatsAudio from "@/components/FormatsAudio"
import FormatsVideo from "@/components/FormatsVideo"

export default function Home() {
  const valueInput = useRef<HTMLInputElement | undefined>()
  const [valueSelect, setValueSelect] = useState<string>()
  const videoFormatArchive = valueSelect?.split(" ")[0]
  const audioOrVideoFormat = valueSelect?.includes("kbps") ? Number(valueSelect.split(" ")[0]) : valueSelect?.includes("video") ? valueSelect.split(" ")[1]  : ""
  const [loading, setLoading] = useState<boolean>(false)
  const [erro, setErro] = useState<string | boolean | undefined>(false)
  const [info, setInfo] = useState<InfoFormats>()

  return (
    <main className="mt-20 mx-4 space-y-8">
      <Title/>
      <div>
        <div className="flex gap-3">
          <Input placeholder="URL" ref={valueInput} />
        <Button size={"lg"}  onClick={() => handleFormatButtonSearch(valueInput?.current?.value, setLoading, setInfo)}>{loading ? <Spin/> : <span className="flex items-center gap-2"><Search size={18}/>Pesquisar</span>}</Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">{info?.title}</h2>
      </div>
      <div>
        <FormatsAudio info={info} setValueSelect={setValueSelect}/>
        <FormatsVideo info={info} setValueSelect={setValueSelect}/>
        <div className="w-full mt-4">
          <Button size={"lg"} className="flex items-center gap2 py-4 w-full" onClick={()=>handleDownloadArchive(valueInput?.current?.value, info?.title, audioOrVideoFormat, videoFormatArchive)}><Download size={18}/>Download</Button> 
        </div>
      </div>
    </main>
  );
}