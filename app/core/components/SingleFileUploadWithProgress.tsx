import { Progress } from "@chakra-ui/progress"
import React, { useEffect, useState } from "react"
import { UploadFileHeader } from "./UploadFileHeader"

export interface SingleFileUploadWithProgressProps {
  file: File
  onDelete: (file: File) => void
  onUpload: (file: File, url: string) => void
}

export function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
}: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress)
      onUpload(file, url)
    }
    upload()
  }, [])

  return (
    <>
      <UploadFileHeader file={file} onDelete={onDelete} />
      <Progress value={progress} />
    </>
  )
}

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload"
  const key = "docs_upload_example_us_preset"
  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", url)
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText)
      res(response.secure_url)
    }
    xhr.onerror = (e) => rej(e)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentage = (e.loaded / e.total) * 100
        onProgress(Math.round(percentage))
      }
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", key)
    xhr.send(formData)
  })
}
