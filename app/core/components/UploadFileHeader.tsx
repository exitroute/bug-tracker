export interface UploadFileHeaderProps {
  file: File
  onDelete: (file: File) => void
}

export function UploadFileHeader({ file, onDelete }: UploadFileHeaderProps) {
  return (
    <div>
      {file.name} <button onClick={() => onDelete(file)}>Delete</button>
    </div>
  )
}
