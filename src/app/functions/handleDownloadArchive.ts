export async function handleDownloadArchive(url: string | undefined, title: string | undefined, quality: string | number, formatArchive?: string) {
    const url_API = process.env.URL_API

    const response = await fetch(`${url_API}`, {
      method: "POST",
      body: JSON.stringify({
        "url_video": url,
        "formatArchive": `${formatArchive == "video" ? formatArchive : ""}`,
        "quality": quality
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.blob()
    const urlBlob = URL.createObjectURL(data)
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = `${title}.${formatArchive == "video" ? "mp4" : "mp3"}`
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}