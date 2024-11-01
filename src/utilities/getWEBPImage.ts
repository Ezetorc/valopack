import Compressor from 'compressorjs'

interface getWEBPImageProps {
  url: string
  quality: number
  convertSize: number
}

export async function getWEBPImage ({
  url,
  quality,
  convertSize
}: getWEBPImageProps): Promise<string> {
  const response: Response = await fetch(url)
  const blob: Blob = await response.blob()

  return new Promise((resolve, reject) => {
    new Compressor(blob, {
      quality: quality ?? 0.6,
      convertSize: convertSize ?? 500000,
      mimeType: 'image/webp',
      success (result) {
        resolve(URL.createObjectURL(result))
      },
      error (error) {
        reject(error)
      }
    })
  })
}
