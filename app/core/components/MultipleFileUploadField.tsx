import React, { useCallback, useEffect, useState } from "react"
import { FileError, FileRejection, useDropzone } from "react-dropzone"
import { useField } from "react-final-form"
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress"
import { UploadError } from "./UploadError"
import { Box, Text } from "@chakra-ui/react"

export interface FilesToUpload {
  file: File
  errors: FileError[]
  url?: string
}

export function MultipleFileUploadField({ input }) {
  const [files, setFiles] = useState<FilesToUpload[]>([])

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["video/*", "image/*", "pdf"],
    maxSize: 300 * 1024,
  })

  return (
    <>
      <Box {...getRootProps()} border="dashed" borderRadius="lg" p={3}>
        <input {...getInputProps()} />

        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Text textAlign="center">Drag 'n' drop some files here, or click to select files</Text>
      </Box>
      {files.map((fileWrapper, i) => (
        <div key={i}>
          {fileWrapper.errors.length ? (
            <UploadError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete} />
          ) : (
            <SingleFileUploadWithProgress
              file={fileWrapper.file}
              onDelete={onDelete}
              onUpload={onUpload}
            />
          )}
        </div>
      ))}
    </>
  )
}
