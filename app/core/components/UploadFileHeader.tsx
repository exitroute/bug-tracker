export interface UploadFileHeaderProps {
  file: File
  onDelete: (file: File) => void
}

export function UploadFileHeader({ file, onDelete }: UploadFileHeaderProps) {
  return (
    <div>
      {file.name}{" "}
      <button type="button" onClick={() => onDelete(file)}>
        Delete
      </button>
    </div>
  )
}
