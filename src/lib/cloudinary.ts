function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Could not read the selected file.'))
    reader.readAsDataURL(file)
  })
}

export async function uploadImageToCloudinary(file: File, folder: string): Promise<string> {
  const response = await fetch('/api/cloudinary-upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: await readFileAsDataUrl(file),
      folder,
    }),
  })

  if (!response.ok) {
    let message = 'Cloudinary upload failed.'
    try {
      const data = (await response.json()) as { error?: string }
      if (data?.error) {
        message = data.error
      }
    } catch {
      const text = await response.text()
      if (text) message = text
    }
    throw new Error(message)
  }

  const data = (await response.json()) as { secure_url?: string }
  if (!data.secure_url) {
    throw new Error('Cloudinary did not return an image URL.')
  }

  return data.secure_url
}
