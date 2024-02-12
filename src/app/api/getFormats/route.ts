import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const url_video = searchParams.get('url')

    try{
        const infoVideos = await ytdl.getInfo(url_video!)

        const getOnlyAudios = infoVideos.formats.filter((audiosInfo) => audiosInfo.hasVideo == false)
        const getOnlyVideo = infoVideos.formats.filter((videosInfo)=>videosInfo.hasVideo == true)

        const audioFormats =  getOnlyAudios.map((format) => ({format: `${format.audioBitrate} kbps`}));
        const videoFormats = getOnlyVideo.filter((item)=> item.container === "mp4").map((format) => ({
                format: `${format.qualityLabel}`,
        }))

        const title = infoVideos.player_response.videoDetails.title

        const info_video =  {
            audioFormats,
            videoFormats,
            title
        }

        return NextResponse.json(info_video, {status: 200})
    }catch(error){
        return NextResponse.json({error: error}, {status: 500})
    }
}