import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { X, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

async function loadImage(sourceUrl: string): Promise<HTMLImageElement> {
  return await new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Could not load the selected image.'))
    image.src = sourceUrl
  })
}

export async function cropImageSourceToBlob(
  sourceUrl: string,
  aspectRatio: number,
  zoom: number,
  panX: number,
  panY: number,
  outputWidth: number,
): Promise<Blob> {
  const image = await loadImage(sourceUrl)
  const outputHeight = Math.round(outputWidth / aspectRatio)
  const canvas = document.createElement('canvas')
  canvas.width = outputWidth
  canvas.height = outputHeight
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not create a canvas for cropping.')
  }

  const baseScale = Math.max(outputWidth / image.naturalWidth, outputHeight / image.naturalHeight)
  const drawWidth = image.naturalWidth * baseScale * zoom
  const drawHeight = image.naturalHeight * baseScale * zoom
  const x = outputWidth / 2 - drawWidth / 2 + panX
  const y = outputHeight / 2 - drawHeight / 2 + panY

  ctx.clearRect(0, 0, outputWidth, outputHeight)
  ctx.drawImage(image, x, y, drawWidth, drawHeight)

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Could not crop the image.'))
        return
      }
      resolve(blob)
    }, 'image/jpeg', 0.92)
  })
}

interface ImageCropModalProps {
  open: boolean
  sourceUrl: string
  title: string
  aspectRatio: number
  outputWidth?: number
  onCancel: () => void
  onConfirm: (blob: Blob) => Promise<void> | void
}

export default function ImageCropModal({
  open,
  sourceUrl,
  title,
  aspectRatio,
  outputWidth = 1200,
  onCancel,
  onConfirm,
}: ImageCropModalProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [busy, setBusy] = useState(false)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!open) return
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setBusy(false)
    setImageSize({ width: 0, height: 0 })
  }, [open, sourceUrl])

  useEffect(() => {
    if (!open || !viewportRef.current) return
    const element = viewportRef.current
    const updateSize = () => {
      const rect = element.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }
    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(element)
    return () => observer.disconnect()
  }, [open])

  const baseScale = useMemo(() => {
    if (!size.width || !size.height || !imageSize.width || !imageSize.height) return 1
    return Math.max(size.width / imageSize.width, size.height / imageSize.height)
  }, [size, imageSize])

  const previewWidth = imageSize.width ? imageSize.width * baseScale * zoom : '100%'
  const previewHeight = imageSize.height ? imageSize.height * baseScale * zoom : '100%'

  if (!open) return null

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStateRef.current = {
      x: pan.x,
      y: pan.y,
      startX: event.clientX,
      startY: event.clientY,
    }
    setIsDragging(true)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current) return
    const deltaX = event.clientX - dragStateRef.current.startX
    const deltaY = event.clientY - dragStateRef.current.startY
    setPan({ x: dragStateRef.current.x + deltaX, y: dragStateRef.current.y + deltaY })
  }

  const endDrag = () => {
    dragStateRef.current = null
    setIsDragging(false)
  }

  const resetCrop = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const saveCrop = async () => {
    setBusy(true)
    try {
      const outputHeight = Math.round(outputWidth / aspectRatio)
      const scaledPanX = size.width ? (pan.x * outputWidth) / size.width : pan.x
      const scaledPanY = size.height ? (pan.y * outputHeight) / size.height : pan.y
      const blob = await cropImageSourceToBlob(sourceUrl, aspectRatio, zoom, scaledPanX, scaledPanY, outputWidth)
      await onConfirm(blob)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl glass rounded-[2rem] border border-white/10 shadow-luxe overflow-hidden">
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-white/10">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">Crop image</p>
            <h3 className="font-display text-2xl text-white mt-1">{title}</h3>
          </div>
          <button onClick={onCancel} className="text-white/70 hover:text-white" aria-label="Close cropper">
            <X size={22} />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-0">
          <div className="p-5 md:p-6">
            <div
              ref={viewportRef}
              className="relative mx-auto overflow-hidden rounded-[1.5rem] bg-black/40 border border-white/10 select-none"
              style={{ width: '100%', aspectRatio: `${aspectRatio}` }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
            >
              <img
                src={sourceUrl}
                alt="Crop preview"
                draggable={false}
                onLoad={(event) => {
                  const target = event.currentTarget
                  setImageSize({ width: target.naturalWidth, height: target.naturalHeight })
                }}
                className={`absolute left-1/2 top-1/2 max-w-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                  width: typeof previewWidth === 'number' ? `${previewWidth}px` : previewWidth,
                  height: typeof previewHeight === 'number' ? `${previewHeight}px` : previewHeight,
                  transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
                }}
              />
              <div className="absolute inset-0 pointer-events-none border-2 border-white/80 rounded-[1.5rem] shadow-[0_0_0_9999px_rgba(17,24,39,0.35)]" />
            </div>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-5 md:p-6 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/55 font-semibold mb-2">Zoom</p>
              <div className="flex items-center gap-3 text-white/70">
                <ZoomOut size={16} />
                <input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="w-full" />
                <ZoomIn size={16} />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/55 font-semibold mb-2">Help</p>
              <p className="text-sm text-white/65 leading-6">Drag the image to position it, then adjust zoom. The crop is saved in a clean production-ready size.</p>
            </div>

            <button onClick={resetCrop} className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:border-gold/60">
              <RotateCcw size={16} /> Reset crop
            </button>

            <button onClick={saveCrop} disabled={busy} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-4 py-3 text-sm font-semibold text-charcoal shadow-luxe disabled:opacity-60">
              {busy ? 'Saving...' : 'Use cropped image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
