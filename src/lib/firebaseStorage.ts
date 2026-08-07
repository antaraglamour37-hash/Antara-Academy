// Firebase Storage is no longer used.
// Images are uploaded to Cloudinary via the /api/cloudinary-upload serverless endpoint.
// The returned Cloudinary URL is then persisted in Firestore along with all other course/site data.
// See: src/lib/cloudinary.ts and api/cloudinary-upload.ts
export {}
