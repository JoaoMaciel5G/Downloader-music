
import { NextRequest, NextResponse } from "next/server";

import ytdl from "ytdl-core";

export async function POST(request: NextRequest){
    try {
        const {url_video, formatArchive, quality} = await request.json()
        const response = NextResponse.next()
        const title = (await ytdl.getInfo(url_video)).player_response.videoDetails
        
        if(!url_video){
            return NextResponse.json({error: "Url não inserida"})
        }
        
        if(!quality){
            return NextResponse.json({error: "Formato do arquivo não inserido"})
        }

        if(formatArchive == "video"){
            const video = ytdl(url_video, {filter: format => format.qualityLabel === quality})
            response.headers.set(`Content-Disposition`, `attachment; filename=${title}.mp4`);
            response.headers.set('Content-Type', 'video/mp4');
            video.pipe(response)
            return
        }

        const video = ytdl(url_video, {filter: format => format.audioBitrate === quality})
        response.headers.set(`Content-Disposition`, `attachment; filename=${title}.mp3`);
        response.headers.set('Content-Type', 'audio/mpeg');
        const un = video.pipe(response)
        console.log(un)
    } catch (error) {
        return NextResponse.json({error: `Erro no download ${error}`}, {status: 500})
    }
}