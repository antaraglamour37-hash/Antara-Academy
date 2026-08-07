// Signature motif: a rose-gold embroidery "stitch" thread — nods to zari/bridal embroidery,
// stitching every section of the page together like a wedding lehenga's gold thread work.
export default function StitchDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="stitch-divider" aria-hidden="true">
      <svg
        viewBox="0 0 1200 28"
        preserveAspectRatio="none"
        className={`w-full h-full ${flip ? 'scale-y-[-1]' : ''}`}
      >
        <path
          d="M0 14 Q 50 2, 100 14 T 200 14 T 300 14 T 400 14 T 500 14 T 600 14 T 700 14 T 800 14 T 900 14 T 1000 14 T 1100 14 T 1200 14"
          fill="none"
          stroke="#D7263D"
          strokeWidth="1.2"
          strokeDasharray="6 7"
          opacity="0.55"
        />
      </svg>
    </div>
  )
}
