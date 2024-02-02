import { InfoFormats } from "@/app/types/infoFormatsState";
import { Video } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function FormatsVideo({info, setValueSelect}: {info: InfoFormats | undefined, setValueSelect: Dispatch<SetStateAction<string | undefined>>}){
    return(
        <div>
          <div className="my-4">
            <h2 className="text-xl font-semibold">Videos</h2> 
          </div>
          <div>
          {
            info && info?.videoFormats.map((item, index)=>(
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
    )
}