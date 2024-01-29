import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <main className="mt-52 mx-4 space-y-16">
      <div>
        <h2 className="text-4xl font-bold">Download de video e musicas online</h2>
      </div>
      <div className="flex gap-3">
        <Input placeholder="URL"/>
        <Button size={"lg"}  className="flex items-center gap-2"><Search size={18}/>Download</Button>
      </div>
      <div>
        
      </div>
    </main>
  );
}
