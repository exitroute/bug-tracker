import React, { useCallback, useState } from "react"
import { FileError, FileRejection, useDropzone } from "react-dropzone"
import { useField } from "react-final-form"
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress"

export interface FilesToUpload {
  file: File
  errors: FileError[]
  url?: string
}

export function MultipleFileUploadField({ input }) {
  const [files, setFiles] = useState<FilesToUpload[]>([])
  input.onChange(files)

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }))
    setFiles((cur) => [...cur, ...mappedAcc, ...rejFiles])
  }, [])

  useEffect(() => {
    input.onChange(files)
  }, [files, input])

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url }
        }
        return fw
      })
    )
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file))
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      {files.map((fileWrapper, i) => (
        <SingleFileUploadWithProgress
          key={i}
          file={fileWrapper.file}
          onDelete={onDelete}
          onUpload={onUpload}
        />
      ))}
    </>
  )
}
