"use client"

import { Button } from "@/components/ui/button"
import { Search, Download} from "lucide-react"
import { useRef, useState } from "react"
import { handleDownloadArchive } from "./functions/handleDownloadArchive"
import { InfoFormats } from "./types/infoFormatsState"
import Title from "@/components/Title"
import FormatsAudio from "@/components/FormatsAudio"
import FormatsVideo from "@/components/FormatsVideo"
import SearchComponent from "@/components/SearchAndDownloadComponents"

export default function Home() {
  const [valueSelect, setValueSelect] = useState<string>()
  const videoFormatArchive = valueSelect?.split(" ")[0]
  const audioOrVideoFormat = valueSelect?.includes("kbps") ? Number(valueSelect.split(" ")[0]) : valueSelect?.includes("video") ? valueSelect.split(" ")[1]  : ""
  const [loading, setLoading] = useState<boolean>(false)
  const [info, setInfo] = useState<InfoFormats>()

  return (
    <main className="mt-20 mx-4 space-y-8">
      <Title/>
      <div>
        <SearchComponent/>
      </div>
      <div>
        <h2 className="text-xl font-semibold">{info?.title}</h2>
      </div>
      <div>
        <FormatsAudio info={info} setValueSelect={setValueSelect}/>
        <FormatsVideo info={info} setValueSelect={setValueSelect}/>
        <div className="w-full my-4">
          <Button size={"lg"} className="flex items-center gap2 py-4 w-full" onClick={()=>handleDownloadArchive(valueInput?.current?.value, info?.title, audioOrVideoFormat, videoFormatArchive)}><Download size={18}/>Download</Button> 
        </div>
      </div>
    </main>
  );
}