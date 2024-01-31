"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Video, Music4, Download} from "lucide-react"
import { useRef, useState } from "react"
import Spin from "@/components/spin"
import { handleDownloadArchive } from "./functions/handleDownloadArchive"

interface InfoFormats {
  audioFormats: [
    {
      format: string;
    }
  ],
  videoFormats: [
    {
      format: string
    }
  ],
  title: string
}

export default function Home() {
  const valueInput = useRef<HTMLInputElement | undefined>()
  const [valueSelect, setValueSelect] = useState<string>()
  const videoFormatArchive = valueSelect?.split(" ")[0]
  const audioOrVideoFormat = valueSelect?.includes("kbps") ? Number(valueSelect.split(" ")[0]) : valueSelect?.includes("video") ? valueSelect.split(" ")[1]  : ""
  const [loading, setLoading] = useState<boolean>(false)
  const [info, setInfo] = useState<InfoFormats>()
  
  async function handleFormatButtonSearch(url: string | undefined) {
    setLoading(true)
    const response = await fetch("http://localhost:4000/getAudioFormats", {
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

  return (
    <main className="mt-20 mx-4 space-y-8">
      <div>
        <h2 className="text-4xl font-bold">Download de video e musicas online</h2>
      </div>
      <div className="flex gap-3">
        <Input placeholder="URL" ref={valueInput}/>
        <Button size={"lg"}  onClick={()=> handleFormatButtonSearch(valueInput?.current?.value)}>{loading ? <Spin/> : <span className="flex items-center gap-2"><Search size={18}/>Pesquisar</span>}</Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">{info?.title}</h2>
      </div>
      <div>
        <div>
          <div className="my-4">
            <h2 className="text-xl font-semibold">Música</h2> 
          </div>
          {
            info && info.audioFormats.map((item, index)=>(
              <div key={index} className="flex justify-between h-10 px-2 py-6 hover:bg-zinc-600 hover:bg-opacity-40 rounded-md">
                <div className="flex gap-x-3 items-center">
                  <Music4 size={30}/>
                  <p>({item.format})</p>
                </div>
                <div className=" flex items-center">
                  <input
                    type="radio"
                    className="h-7 w-7 rounded-full flex items-center justify-center border-2 border-zinc-950 appearance-none cursor-pointer position-relative before:content-[''] before:absolute before:h-4 before:w-4 before:rounded-full before:bg-zinc-950 before:opacity-0 checked:before:opacity-100"
                    value={`${item.format}`}
                    name="group"
                    onChange={(e)=>setValueSelect(e.target.value)}
                  />
                </div>
              </div>
            ))
          }
        </div>
        <div>
          <div className="my-4">
            <h2 className="text-xl font-semibold">Videos</h2> 
          </div>
          <div>
          {
            info && info.videoFormats.map((item, index)=>(
              <div key={index} className="flex justify-between h-10 px-2 py-6 hover:bg-zinc-600 hover:bg-opacity-40 rounded-md">
                <div className="flex gap-x-3 items-center">
                  <Video size={30}/>
                  <p>({item.format})</p>
                </div>
                <div className=" flex items-center">
                  <input
                    type="radio"
                    className="h-7 w-7 rounded-full flex items-center justify-center border-2 border-zinc-950 appearance-none cursor-pointer position-relative before:content-[''] before:absolute before:h-4 before:w-4 before:rounded-full before:bg-zinc-950 before:opacity-0 checked:before:opacity-100"
                    value={`video ${item.format}`}
                    name="group"
                    onChange={(e)=>setValueSelect(e.target.value)}
                  />
                </div>
              </div>
            ))
          }
          </div>
        </div>
        <div className="w-full mt-4">
         <Button size={"lg"} className="flex items-center gap2 py-4 w-full" onClick={()=>handleDownloadArchive(valueInput?.current?.value, info?.title, audioOrVideoFormat, videoFormatArchive)}><Download size={18}/>Download</Button> 
        </div>
      </div>
    </main>
  );
}