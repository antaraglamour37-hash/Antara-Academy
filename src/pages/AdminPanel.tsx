import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, ChevronRight, Plus, RefreshCcw, Save, Trash2, Upload } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { uploadImageToCloudinary } from '../lib/cloudinary'
import ImageCropModal from '../components/ImageCropModal'
import type { Course, GalleryItem } from '../data/siteContent'

const categoryOptions = ['Bridal', 'Hairstyle', 'Mehendi', 'Nail Art', 'Certificate'] as const
const cropRatios = {
  course: 4 / 3,
  gallery: 1,
  trainer: 4 / 5,
  logo: 1,
} as const

function toLines(value: string): string[] {
  return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean)
}

function toText(value: string[] | undefined): string {
  return (value ?? []).join('\n')
}

function formatDate(iso?: string) {
  if (!iso) return 'Not saved yet'
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Could not read the selected file.'))
    reader.readAsDataURL(file)
  })
}

async function fileFromBlob(blob: Blob, filename: string): Promise<File> {
  const safeName = filename.replace(/\.[^.]+$/, '') || 'image'
  return new File([blob], `${safeName}.jpg`, { type: 'image/jpeg' })
}

function AdminTextField({ label, value, onChange, placeholder }: { label: string; value: string | number; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.28em] text-white/55 font-semibold">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-2xl bg-white/6 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none" />
    </label>
  )
}

function AdminCheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${checked ? 'border-gold/60 bg-gold/10 text-white' : 'border-white/10 bg-white/6 text-white/70'}`}>
      {label}
    </button>
  )
}

function AdminTextArea({ label, value, onChange, rows = 4, placeholder }: { label: string; value: string; onChange: (value: string) => void; rows?: number; placeholder?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.28em] text-white/55 font-semibold">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} placeholder={placeholder} className="w-full rounded-2xl bg-white/6 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none resize-y" />
    </label>
  )
}

function UploadField({ label, preview, onPick, busy, hint }: { label: string; preview?: string; onPick: (file: File) => Promise<void>; busy?: boolean; hint?: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/55 font-semibold">{label}</p>
          {hint ? <p className="text-xs text-white/35 mt-1">{hint}</p> : null}
        </div>
        <label className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:border-gold/60 cursor-pointer">
          <Upload size={14} /> {busy ? 'Uploading...' : 'Upload'}
          <input type="file" accept="image/*" className="hidden" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; await onPick(file); event.target.value = '' }} />
        </label>
      </div>
      <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5">{preview ? <img src={preview} alt={label} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-white/30 text-sm">No image selected</div>}</div>
    </div>
  )
}

function FeatureEditor({ course, onChange }: { course: Course; onChange: (patch: Partial<Course>) => void }) {
  return <AdminTextArea label="Features" value={toText(course.features)} onChange={(value) => onChange({ features: toLines(value) })} rows={4} placeholder="One feature per line" />
}

function GalleryFeatureEditor({ item, onChange }: { item: GalleryItem; onChange: (patch: Partial<GalleryItem>) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.28em] text-white/55 font-semibold">Category</span>
        <select value={item.category} onChange={(event) => onChange({ category: event.target.value as GalleryItem['category'] })} className="w-full rounded-2xl bg-white/6 border border-white/10 px-4 py-3 text-sm text-white focus:border-gold/60 focus:outline-none">
          {categoryOptions.map((option) => <option key={option} value={option} className="text-charcoal">{option}</option>)}
        </select>
      </label>
      <AdminTextField label="Title" value={item.title || ''} placeholder="Bridal look" onChange={(value) => onChange({ title: value })} />
      <div className="md:col-span-2"><AdminTextArea label="Note" value={item.note || ''} onChange={(value) => onChange({ note: value })} rows={3} placeholder="Optional caption or context for the student work." /></div>
      <div className="md:col-span-2"><AdminTextField label="Gradient fallback" value={item.gradient || ''} onChange={(value) => onChange({ gradient: value })} placeholder="from-gold-light via-gold to-gold-dark" /></div>
    </div>
  )
}

type CropTarget = { kind: 'course' | 'gallery' | 'trainer' | 'logo'; id?: string; sourceUrl: string; fileName: string; aspectRatio: number; title: string }
export default function AdminPanel() {
  const { content, settings, courses, gallery, lastSavedAt, syncError, updateCourse, updateSettings, addCourse, removeCourse, updateGalleryItem, addGalleryItem, removeGalleryItem, resetContent } = useSiteContent()
  const [tab, setTab] = useState<'courses' | 'gallery' | 'settings'>('courses')
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [notice, setNotice] = useState('Edits automatically sync to Firestore and go live instantly.')
  const [cropTarget, setCropTarget] = useState<CropTarget | null>(null)

  const featuredCount = useMemo(() => courses.filter((course) => course.popular).length, [courses])

  const openCropForFile = async (target: Omit<CropTarget, 'sourceUrl'>, file: File) => {
    const sourceUrl = await readAsDataUrl(file)
    setCropTarget({ ...target, sourceUrl })
  }

  const uploadCroppedImage = async (blob: Blob) => {
    if (!cropTarget) return
    setBusyKey(cropTarget.id || cropTarget.kind)
    setNotice('Uploading cropped image to Cloudinary...')
    try {
      const file = await fileFromBlob(blob, cropTarget.fileName)
      const folder = cropTarget.kind === 'course' ? 'courses' : cropTarget.kind === 'gallery' ? 'gallery' : cropTarget.kind === 'trainer' ? 'trainer' : 'logo'
      const imageUrl = await uploadImageToCloudinary(file, `site-images/${folder}`)
      if (cropTarget.kind === 'course' && cropTarget.id) { updateCourse(cropTarget.id, { imageUrl }); setNotice('Course image updated successfully.') }
      if (cropTarget.kind === 'gallery' && cropTarget.id) { updateGalleryItem(cropTarget.id, { imageUrl }); setNotice('Gallery image updated successfully.') }
      if (cropTarget.kind === 'trainer') { updateSettings({ trainerImageUrl: imageUrl }); setNotice('Trainer image updated successfully.') }
      if (cropTarget.kind === 'logo') { updateSettings({ brandLogoUrl: imageUrl }); setNotice('Logo updated successfully.') }
      setCropTarget(null)
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not upload the image.')
    } finally {
      setBusyKey(null)
    }
  }
  return <div className="min-h-screen bg-charcoal text-white"><div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(226,193,112,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(199,154,45,0.12),_transparent_25%)]" /><div className="relative max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-10"><header className="glass rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-luxe"><div><p className="text-xs uppercase tracking-[0.32em] text-gold font-semibold mb-2">Admin Panel</p><h1 className="font-display text-3xl md:text-4xl text-white">MBA Bridal Makeover CMS</h1><p className="text-sm text-white/55 mt-2 max-w-2xl">Edit courses, upload gallery photos, and adjust the live site settings from one place.</p></div><div className="flex flex-wrap gap-3"><Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold hover:border-gold/60 transition-colors">View site <ChevronRight size={16} /></Link><button onClick={() => { if (window.confirm('Reset all content back to the default site copy?')) { resetContent(); setNotice('Content reset to defaults.') } }} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold hover:border-gold/60 transition-colors"><RefreshCcw size={16} /> Reset</button><button onClick={() => { window.localStorage.setItem('mba-academy-site-content', JSON.stringify(content)); setNotice('Saved a fresh local snapshot.') }} className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-sm font-semibold text-charcoal shadow-luxe"><Save size={16} /> Save snapshot</button></div></header>

  <section className="grid md:grid-cols-4 gap-4 mt-6"><div className="glass rounded-2xl p-5"><p className="text-xs uppercase tracking-[0.28em] text-gold/80 font-semibold">Courses</p><p className="mt-2 text-3xl font-display text-white">{courses.length}</p></div><div className="glass rounded-2xl p-5"><p className="text-xs uppercase tracking-[0.28em] text-gold/80 font-semibold">Gallery</p><p className="mt-2 text-3xl font-display text-white">{gallery.length}</p></div><div className="glass rounded-2xl p-5"><p className="text-xs uppercase tracking-[0.28em] text-gold/80 font-semibold">Featured</p><p className="mt-2 text-3xl font-display text-white">{featuredCount}</p></div><div className="glass rounded-2xl p-5"><p className="text-xs uppercase tracking-[0.28em] text-gold/80 font-semibold">Last saved</p><p className="mt-2 text-sm text-white/75">{formatDate(lastSavedAt)}</p><p className={`text-xs mt-1 ${syncError ? 'text-red-400 font-semibold' : 'text-white/35'}`}>{syncError ? `⚠️ Sync Error: ${syncError}` : notice}</p></div></section>

  {syncError ? (
    <div className="mt-6 rounded-2xl bg-red-500/15 border border-red-500/30 p-5 text-red-200 text-sm space-y-2 shadow-luxe">
      <p className="font-semibold text-base flex items-center gap-2">⚠️ Cloud Database Sync Warning</p>
      <p>Your changes are saving to your browser locally, but <strong>NOT syncing to the cloud</strong> due to this error:</p>
      <code className="block bg-black/40 p-3 rounded-xl text-xs font-mono text-red-300">{syncError}</code>
      <p className="text-xs text-red-300/80 pt-1">To fix this, ensure your Firebase Console has <strong>Firestore Database created</strong> and Rules set to <code>allow read, write: if true;</code>.</p>
    </div>
  ) : null}

  <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setTab('courses')} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === 'courses' ? 'bg-gold-gradient text-charcoal shadow-luxe' : 'border border-white/10 text-white/70'}`}>Courses</button><button onClick={() => setTab('gallery')} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === 'gallery' ? 'bg-gold-gradient text-charcoal shadow-luxe' : 'border border-white/10 text-white/70'}`}>Gallery</button><button onClick={() => setTab('settings')} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === 'settings' ? 'bg-gold-gradient text-charcoal shadow-luxe' : 'border border-white/10 text-white/70'}`}>Settings</button></div>
  {tab === 'courses' ? <section className="mt-6 space-y-5"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">Course manager</p><h2 className="font-display text-2xl md:text-3xl text-white mt-1">Edit every course card</h2></div><button onClick={() => { const created = addCourse(); setTab('courses'); setNotice(`Added ${created.id}. Fill in the details below.`) }} className="inline-flex items-center gap-2 rounded-full bg-white text-charcoal px-5 py-2.5 text-sm font-semibold hover:bg-gold/20"><Plus size={16} /> Add course</button></div><div className="grid gap-5">{courses.map((course) => <article key={course.id} className="glass rounded-[1.75rem] p-5 md:p-6 border border-white/10 shadow-luxe"><div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5"><div><p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">{course.id}</p><h3 className="font-display text-2xl text-white mt-1">{course.name || 'Untitled course'}</h3></div><button onClick={() => { if (window.confirm(`Delete ${course.name || course.id}?`)) { removeCourse(course.id); setNotice('Course removed.') } }} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/75 hover:border-red-300 hover:text-red-200"><Trash2 size={16} /> Delete</button></div><div className="grid lg:grid-cols-[280px_1fr] gap-6"><UploadField label="Course image" preview={course.imageUrl} busy={busyKey === course.id} hint="Upload, crop, and save a clean course photo." onPick={(file) => openCropForFile({ kind: 'course', id: course.id, fileName: file.name, aspectRatio: cropRatios.course, title: 'Crop course image' }, file)} /><div className="grid md:grid-cols-2 gap-4"><AdminTextField label="Course name" value={course.name} placeholder="Basic to Advanced Bridal Course" onChange={(value) => updateCourse(course.id, { name: value })} /><AdminTextField label="Price" value={course.price} placeholder="8000" onChange={(value) => updateCourse(course.id, { price: Number(value) || 0 })} /><AdminTextField label="Duration" value={course.duration} placeholder="2 Months" onChange={(value) => updateCourse(course.id, { duration: value })} /><AdminCheckboxField label={course.popular ? 'Featured course' : 'Mark as featured'} checked={Boolean(course.popular)} onChange={(value) => updateCourse(course.id, { popular: value })} /><div className="md:col-span-2"><AdminTextArea label="Description" value={course.description || ''} onChange={(value) => updateCourse(course.id, { description: value })} rows={3} placeholder="Short summary shown in the admin panel or future public templates." /></div><div className="md:col-span-2"><FeatureEditor course={course} onChange={(patch) => updateCourse(course.id, patch)} /></div></div></div></article>)}</div></section>
  : tab === 'gallery' ? <section className="mt-6 space-y-5"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">Gallery manager</p><h2 className="font-display text-2xl md:text-3xl text-white mt-1">Upload student gallery images</h2></div><button onClick={() => { const created = addGalleryItem(); setTab('gallery'); setNotice(`Added ${created.id}. Upload a photo and add details.`) }} className="inline-flex items-center gap-2 rounded-full bg-white text-charcoal px-5 py-2.5 text-sm font-semibold hover:bg-gold/20"><Plus size={16} /> Add gallery item</button></div><div className="grid md:grid-cols-2 gap-5">{gallery.map((item) => <article key={item.id} className="glass rounded-[1.75rem] p-5 md:p-6 border border-white/10 shadow-luxe space-y-4"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">{item.id}</p><h3 className="font-display text-2xl text-white mt-1">{item.title || item.category}</h3></div><button onClick={() => { if (window.confirm(`Delete gallery item ${item.id}?`)) { removeGalleryItem(item.id); setNotice('Gallery item removed.') } }} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/75 hover:border-red-300 hover:text-red-200"><Trash2 size={16} /> Delete</button></div><UploadField label="Gallery image" preview={item.imageUrl} busy={busyKey === item.id} hint="Upload, crop, and save a student photo." onPick={(file) => openCropForFile({ kind: 'gallery', id: item.id, fileName: file.name, aspectRatio: cropRatios.gallery, title: 'Crop gallery image' }, file)} /><GalleryFeatureEditor item={item} onChange={(patch) => updateGalleryItem(item.id, patch)} /></article>)}</div></section>
  : <section className="mt-6 grid lg:grid-cols-2 gap-6"><div className="space-y-6"><div className="glass rounded-[1.75rem] p-5 md:p-6 border border-white/10 shadow-luxe space-y-4"><div><p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">Brand + hero</p><h2 className="font-display text-2xl text-white mt-1">Homepage settings</h2></div><div className="grid md:grid-cols-2 gap-4"><UploadField label="Brand logo" preview={settings.brandLogoUrl} busy={busyKey === 'logo'} hint="Upload a square brand logo." onPick={(file) => openCropForFile({ kind: 'logo', fileName: file.name, aspectRatio: cropRatios.logo, title: 'Crop brand logo' }, file)} /><AdminTextField label="Brand mark" value={settings.brandMark} onChange={(value) => updateSettings({ brandMark: value })} /><AdminTextField label="Brand name" value={settings.brandName} onChange={(value) => updateSettings({ brandName: value })} /><AdminTextField label="Brand tagline" value={settings.brandTagline} onChange={(value) => updateSettings({ brandTagline: value })} /><AdminTextField label="Hero badge" value={settings.heroBadge} onChange={(value) => updateSettings({ heroBadge: value })} /><AdminTextField label="Hero accent" value={settings.heroAccent} onChange={(value) => updateSettings({ heroAccent: value })} /><AdminTextField label="Primary CTA" value={settings.primaryCtaLabel} onChange={(value) => updateSettings({ primaryCtaLabel: value })} /><AdminTextField label="Secondary CTA" value={settings.secondaryCtaLabel} onChange={(value) => updateSettings({ secondaryCtaLabel: value })} /><div className="md:col-span-2"><AdminTextField label="Hero title" value={settings.heroTitle} onChange={(value) => updateSettings({ heroTitle: value })} /></div><div className="md:col-span-2"><AdminTextArea label="Hero description" value={settings.heroDescription} onChange={(value) => updateSettings({ heroDescription: value })} rows={4} /></div><div className="md:col-span-2"><AdminTextArea label="Hero quote" value={settings.heroQuote} onChange={(value) => updateSettings({ heroQuote: value })} rows={2} /></div></div></div><div className="glass rounded-[1.75rem] p-5 md:p-6 border border-white/10 shadow-luxe space-y-4"><div><p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">Trainer</p><h2 className="font-display text-2xl text-white mt-1">Trainer card and socials</h2></div><div className="grid md:grid-cols-2 gap-4"><UploadField label="Trainer image" preview={settings.trainerImageUrl} busy={busyKey === 'trainer'} hint="Crop a portrait-friendly trainer image." onPick={(file) => openCropForFile({ kind: 'trainer', fileName: file.name, aspectRatio: cropRatios.trainer, title: 'Crop trainer image' }, file)} /><div className="space-y-4"><AdminTextField label="Trainer eyebrow" value={settings.trainerEyebrow} onChange={(value) => updateSettings({ trainerEyebrow: value })} /><AdminTextField label="Trainer name" value={settings.trainerName} onChange={(value) => updateSettings({ trainerName: value })} /><AdminTextField label="Trainer role" value={settings.trainerRole} onChange={(value) => updateSettings({ trainerRole: value })} /><AdminTextField label="Instagram URL" value={settings.trainerInstagramUrl} onChange={(value) => updateSettings({ trainerInstagramUrl: value })} /></div><div className="md:col-span-2"><AdminTextArea label="Trainer bio" value={settings.trainerBio} onChange={(value) => updateSettings({ trainerBio: value })} rows={4} /></div></div></div></div><div className="space-y-6"><div className="glass rounded-[1.75rem] p-5 md:p-6 border border-white/10 shadow-luxe space-y-4"><div><p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">Contact</p><h2 className="font-display text-2xl text-white mt-1">Phone, address, and map</h2></div><div className="grid md:grid-cols-2 gap-4"><AdminTextField label="Phone number" value={settings.phoneNumber} onChange={(value) => updateSettings({ phoneNumber: value })} /><AdminTextField label="WhatsApp number" value={settings.whatsappNumber} onChange={(value) => updateSettings({ whatsappNumber: value })} /><AdminTextField label="Business hours" value={settings.businessHours} onChange={(value) => updateSettings({ businessHours: value })} /><AdminTextField label="Footer tagline" value={settings.footerTagline} onChange={(value) => updateSettings({ footerTagline: value })} /><div className="md:col-span-2"><AdminTextArea label="Address" value={settings.address} onChange={(value) => updateSettings({ address: value })} rows={3} /></div><div className="md:col-span-2"><AdminTextField label="Google Maps link" value={settings.mapSearchUrl} onChange={(value) => updateSettings({ mapSearchUrl: value })} /></div><div className="md:col-span-2"><AdminTextField label="Map embed link" value={settings.mapEmbedUrl} onChange={(value) => updateSettings({ mapEmbedUrl: value })} /></div></div></div><div className="glass rounded-[1.75rem] p-5 md:p-6 border border-white/10 shadow-luxe"><p className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">Production</p><h2 className="font-display text-2xl text-white mt-1">Deployment env vars</h2><ul className="mt-4 space-y-3 text-sm text-white/70 leading-6 list-disc list-inside"><li><code>VITE_FIREBASE_API_KEY</code></li><li><code>VITE_FIREBASE_AUTH_DOMAIN</code></li><li><code>VITE_FIREBASE_PROJECT_ID</code></li><li><code>VITE_FIREBASE_MESSAGING_SENDER_ID</code></li><li><code>VITE_FIREBASE_APP_ID</code></li><li><code>VITE_FIREBASE_MEASUREMENT_ID</code> optional</li><li><code>ADMIN_PASSWORD</code> set to <code>antara123</code></li><li><code>ADMIN_SESSION_SECRET</code> set to a long random string</li><li><code>CLOUDINARY_CLOUD_NAME</code></li><li><code>CLOUDINARY_API_KEY</code></li><li><code>CLOUDINARY_API_SECRET</code></li></ul><div className="mt-5 rounded-2xl bg-black/20 border border-white/10 p-4 text-xs text-white/50"><div className="flex items-center gap-2 text-gold mb-2"><Camera size={14} /> Notes</div><p>Cloudinary secrets stay on the server. Firebase config is public client config, while admin access is checked server-side.</p></div></div></div></section>}
      {cropTarget ? <ImageCropModal open={Boolean(cropTarget)} sourceUrl={cropTarget.sourceUrl} title={cropTarget.title} aspectRatio={cropTarget.aspectRatio} onCancel={() => setCropTarget(null)} onConfirm={uploadCroppedImage} /> : null}
    </div></div>
}

