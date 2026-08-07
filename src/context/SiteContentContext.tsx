import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import {
  Course,
  GalleryItem,
  SiteContent,
  SiteSettings,
  createEmptyCourse,
  createEmptyGalleryItem,
  defaultSiteContent,
  loadSiteContent,
  normalizeSiteContent,
  saveSiteContent,
} from '../data/siteContent'
import { firestore, isFirebaseConfigured } from '../lib/firebase'

interface SiteContentContextValue {
  content: SiteContent
  settings: SiteSettings
  courses: Course[]
  gallery: GalleryItem[]
  lastSavedAt?: string
  syncError?: string
  setContent: Dispatch<SetStateAction<SiteContent>>
  updateSettings: (patch: Partial<SiteSettings>) => void
  updateCourse: (courseId: string, patch: Partial<Course>) => void
  addCourse: () => Course
  removeCourse: (courseId: string) => void
  updateGalleryItem: (itemId: string, patch: Partial<GalleryItem>) => void
  addGalleryItem: () => GalleryItem
  removeGalleryItem: (itemId: string) => void
  resetContent: () => void
}

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined)

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [lastSavedAt, setLastSavedAt] = useState<string | undefined>()
  const [syncError, setSyncError] = useState<string | undefined>()
  const [ready, setReady] = useState(false)
  const remoteSnapshotRef = useRef('')

  useEffect(() => {
    let unsubscribe = () => {}
    let cancelled = false

    if (isFirebaseConfigured && firestore) {
      const contentRef = doc(firestore, 'siteContent', 'main')
      unsubscribe = onSnapshot(
        contentRef,
        (snapshot) => {
          if (cancelled) return

          const remoteData = snapshot.exists() ? (snapshot.data() as Partial<SiteContent>) : null
          const normalized = normalizeSiteContent(remoteData)
          const savedAt = remoteData?.lastSavedAt ?? normalized.lastSavedAt
          const nextContent = { ...normalized, lastSavedAt: savedAt }

          remoteSnapshotRef.current = JSON.stringify(normalized)
          setContent(nextContent)
          setLastSavedAt(savedAt)
          setSyncError(undefined)
          setReady(true)
        },
        (err) => {
          console.error('Firestore snapshot error:', err)
          setSyncError(err.message || 'Firestore connection error.')
          const localContent = loadSiteContent()
          remoteSnapshotRef.current = JSON.stringify(localContent)
          setContent(localContent)
          setLastSavedAt(localContent.lastSavedAt)
          setReady(true)
        },
      )
    } else {
      const localContent = loadSiteContent()
      remoteSnapshotRef.current = JSON.stringify(localContent)
      setContent(localContent)
      setLastSavedAt(localContent.lastSavedAt)
      setReady(true)
    }

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!ready) return

    const savedAt = new Date().toISOString()
    const payload: SiteContent = { ...content, lastSavedAt: savedAt }
    saveSiteContent(payload)
    setLastSavedAt(savedAt)

    if (!isFirebaseConfigured || !firestore) {
      return
    }

    const currentJson = JSON.stringify(content)
    if (currentJson === remoteSnapshotRef.current) {
      return
    }

    const contentRef = doc(firestore, 'siteContent', 'main')
    setDoc(contentRef, payload, { merge: true })
      .then(() => {
        remoteSnapshotRef.current = currentJson
        setSyncError(undefined)
      })
      .catch((err) => {
        console.error('Firestore write error:', err)
        setSyncError(err.message || 'Firestore write error.')
      })
  }, [content, ready])

  const updateSettings = (patch: Partial<SiteSettings>) => {
    setContent((current) => ({
      ...current,
      settings: {
        ...current.settings,
        ...patch,
      },
    }))
  }

  const updateCourse = (courseId: string, patch: Partial<Course>) => {
    setContent((current) => ({
      ...current,
      courses: current.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              ...patch,
              features:
                Array.isArray(patch.features) && patch.features.length > 0
                  ? patch.features
                  : course.features,
            }
          : course,
      ),
    }))
  }

  const addCourse = () => {
    const course = createEmptyCourse()
    setContent((current) => ({
      ...current,
      courses: [...current.courses, course],
    }))
    return course
  }

  const removeCourse = (courseId: string) => {
    setContent((current) => ({
      ...current,
      courses: current.courses.filter((course) => course.id !== courseId),
    }))
  }

  const updateGalleryItem = (itemId: string, patch: Partial<GalleryItem>) => {
    setContent((current) => ({
      ...current,
      gallery: current.gallery.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
    }))
  }

  const addGalleryItem = () => {
    const item = createEmptyGalleryItem()
    setContent((current) => ({
      ...current,
      gallery: [...current.gallery, item],
    }))
    return item
  }

  const removeGalleryItem = (itemId: string) => {
    setContent((current) => ({
      ...current,
      gallery: current.gallery.filter((item) => item.id !== itemId),
    }))
  }

  const resetContent = () => setContent(defaultSiteContent)

  const value: SiteContentContextValue = {
    content,
    settings: content.settings,
    courses: content.courses,
    gallery: content.gallery,
    lastSavedAt,
    syncError,
    setContent,
    updateSettings,
    updateCourse,
    addCourse,
    removeCourse,
    updateGalleryItem,
    addGalleryItem,
    removeGalleryItem,
    resetContent,
  }

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider')
  }
  return context
}
