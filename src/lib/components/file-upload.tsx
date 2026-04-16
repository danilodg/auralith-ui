import * as React from 'react'
import { Upload, X, FileText, Image } from 'lucide-react'

import { cn } from '../utils/cn'

export interface FileUploadFile {
  id: string
  file: File
  preview?: string
  name: string
  size: number
}

export interface FileUploadProps {
  label?: string
  hint?: string
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  value?: FileUploadFile[]
  onValueChange?: (files: FileUploadFile[]) => void
  disabled?: boolean
  dragActiveLabel?: string
  dropZoneLabel?: string
  className?: string
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

function FileUploadBase({
  accept,
  className,
  disabled,
  dragActiveLabel,
  dropZoneLabel,
  hint,
  label,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  multiple = true,
  onValueChange,
  value: controlledValue,
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = React.useState<FileUploadFile[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = controlledValue !== undefined
  const currentFiles = isControlled ? controlledValue : internalFiles

  const handleFiles = (files: FileList | File[]) => {
    setError(null)
    const fileArray = Array.from(files)
    const acceptedTypes = accept?.split(',').map((t) => t.trim()) || []

    const validFiles: FileUploadFile[] = []
    let sizeError = false

    for (const file of fileArray) {
      if (maxFiles && currentFiles.length + validFiles.length >= maxFiles) {
        setError(`Máximo de ${maxFiles} arquivos`)
        break
      }

      if (maxSize && file.size > maxSize) {
        sizeError = true
        continue
      }

      if (acceptedTypes.length > 0) {
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase())
          }
          if (type.includes('/*')) {
            return file.type.startsWith(type.replace('/*', '/'))
          }
          return file.type === type
        })
        if (!isAccepted) continue
      }

      const fileUpload: FileUploadFile = {
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        preview: isImageFile(file) ? URL.createObjectURL(file) : undefined,
      }
      validFiles.push(fileUpload)
    }

    if (sizeError) {
      setError(`Arquivo excede o limite de ${formatFileSize(maxSize)}`)
    }

    if (validFiles.length > 0) {
      const newFiles = [...currentFiles, ...validFiles]
      if (!isControlled) {
        setInternalFiles(newFiles)
      }
      onValueChange?.(newFiles)
    }
  }

  const removeFile = (id: string) => {
    const fileToRemove = currentFiles.find((f) => f.id === id)
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }
    const newFiles = currentFiles.filter((f) => f.id !== id)
    if (!isControlled) {
      setInternalFiles(newFiles)
    }
    onValueChange?.(newFiles)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (!disabled) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      {label && (
        <span className="text-sm font-medium text-[color:var(--text-main)]">{label}</span>
      )}
      <div
        className={cn(
          'relative cursor-pointer rounded-[8px] border-2 border-dashed border-[var(--card-border)] bg-[var(--surface-base)] p-6 transition-all duration-200',
          isDragging && 'border-[var(--accent-line)] bg-[var(--surface-raised)]',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="sr-only"
        />
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-raised)]">
            <Upload className="h-5 w-5 text-[color:var(--text-muted)]" />
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium text-[color:var(--text-main)]">
              {isDragging ? (dragActiveLabel || 'Solte os arquivos aqui') : (dropZoneLabel || 'Arraste arquivos ou clique para selecionar')}
            </span>
            {accept && (
              <span className="text-xs text-[color:var(--text-muted)]">
                Formatos aceitos: {accept}
              </span>
            )}
            {maxSize && (
              <span className="text-xs text-[color:var(--text-muted)]">
                Máximo: {formatFileSize(maxSize)}
              </span>
            )}
          </div>
        </div>
      </div>

      {error && (
        <span className="text-sm text-[color:var(--status-error)]">{error}</span>
      )}

      {currentFiles.length > 0 && (
        <div className="grid gap-2">
          {currentFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-[8px] border border-[var(--card-border)] bg-[var(--surface-base)] p-2"
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-10 w-10 rounded-[6px] object-cover"
                />
              ) : isImageFile(file.file) ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[var(--surface-raised)]">
                  <Image className="h-5 w-5 text-[color:var(--text-muted)]" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[var(--surface-raised)]">
                  <FileText className="h-5 w-5 text-[color:var(--text-muted)]" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="block truncate text-sm font-medium text-[color:var(--text-main)]">
                  {file.name}
                </span>
                <span className="text-xs text-[color:var(--text-muted)]">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(file.id)
                }}
                className="flex h-8 w-8 items-center justify-center rounded-[6px] text-[color:var(--text-muted)] hover:bg-[var(--surface-raised)] hover:text-[color:var(--text-main)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {hint && !error && (
        <span className="text-sm text-[color:var(--text-muted)]">{hint}</span>
      )}
    </div>
  )
}

export const FileUpload = FileUploadBase
