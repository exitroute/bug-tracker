import { Progress } from "@chakra-ui/progress"
import React from "react"
import { FileError } from "react-dropzone"
import { UploadFileHeader } from "./UploadFileHeader"

export interface UploadErrorProps {
  file: File
  onDelete: (file: File) => void
  errors: FileError[]
}

export function UploadError({ file, onDelete, errors }: UploadErrorProps) {
  return (
    <>
      <UploadFileHeader file={file} onDelete={onDelete} />
      <Progress value={100} colorScheme="pink" />
      {errors.map((error, i) => (
        <div key={i}>{error.message}</div>
      ))}
    </>
  )
}
