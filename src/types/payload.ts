export interface Media {
  id: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width?: number
  height?: number
  sizes?: {
    [key: string]: {
      url: string
      width: number
      height: number
    }
  }
}
