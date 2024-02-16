import { InfoFormats } from "@/app/types/infoFormatsState";
import { Music4 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function FormatsAudio({info, setValueSelect}: {info: InfoFormats | undefined, setValueSelect: Dispatch<SetStateAction<string | undefined>>}){
    return (
        <div className="mx-80">
            <div className="my-4">
                <h2 className="text-xl font-semibold">Música</h2> 
            </div>
            {
                info && info?.audioFormats.map((item, index)=>(
                    <div key={index} className="flex justify-between h-10 px-2 py-6 hover:bg-zinc-600 hover:bg-opacity-40 rounded-md">
                        <div className="flex gap-x-3 items-center">
                        <Music4 size={30}/>
                        <p>({item.format})</p>
                        </div>
                        <div className=" flex items-center">
                        <input
                            type="radio"
                            className="h-7 w-7 rounded-full flex items-center justify-center border-2 border-white appearance-none cursor-pointer position-relative before:content-[''] before:absolute before:h-4 before:w-4 before:rounded-full before:bg-white before:opacity-0 checked:before:opacity-100"
                            value={`${item.format}`}
                            name="group"
                            onChange={(e)=>setValueSelect(e.target.value)}
                        />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}