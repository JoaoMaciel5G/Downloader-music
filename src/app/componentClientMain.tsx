"use client"

import { Button } from "@/components/ui/button"
import { Search, Download} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"
import Spin from "@/components/spin"
import { handleDownloadArchive } from "./functions/handleDownloadArchive"
import { InfoFormats } from "./types/infoFormatsState"
import Title from "@/components/Title"
import FormatsAudio from "@/components/FormatsAudio"
import { handleFormatButtonSearch } from "@/app/functions/handleFormatButtonSearch"
import FormatsVideo from "@/components/FormatsVideo"

export default function HomeClientComponent() {
  const [valueSelect, setValueSelect] = useState<string>()
  const videoFormatArchive = valueSelect?.split(" ")[0]
  const audioOrVideoFormat = valueSelect?.includes("kbps") ? Number(valueSelect.split(" ")[0]) : valueSelect?.includes("video") ? valueSelect.split(" ")[1]  : ""
  const [info, setInfo] = useState<InfoFormats>()
  const valueInput = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <section className="mt-20 mx-40 space-y-8">
      <Title/>
      <div>
        <div className="gap-3 flex items-center justify-center mt-20">
            <Input placeholder="URL" ref={valueInput}/>
            <Button size={"lg"} onClick={() => handleFormatButtonSearch(valueInput?.current?.value, setLoading, setInfo)}>
              {loading ? <Spin/> : <><Search size={18}/><span className="hidden items-center mx-2 sm:flex">Pesquisar</span></>}
            </Button>
        </div>
      </div>
      <div className="mx-72">
        <h2 className="text-xl font-semibold">{info?.title}</h2>
      </div>
      <div>
        {
          info && (
            <>
              <FormatsAudio info={info} setValueSelect={setValueSelect}/>
              <FormatsVideo info={info} setValueSelect={setValueSelect}/>
            </>
            
          )
        }
      </div>
      <div className="flex flex-col items-center">
        {
          info && (
            <>
              <div className="w-full md:w-1/2 my-4">
                <Button size={"lg"} className="flex items-center gap2 py-4 w-full" onClick={()=>handleDownloadArchive(valueInput?.current?.value, info?.title, audioOrVideoFormat, videoFormatArchive)}><Download size={18}/>Download</Button> 
              </div>
            </>
          )
        } 
        
      </div>
    </section>
  );
}