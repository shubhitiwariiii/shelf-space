export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#15130F] px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="h-10 w-3/4 bg-[#1F1B16] rounded animate-pulse" />
        <div className="h-10 w-1/2 bg-[#1F1B16] rounded animate-pulse mt-3" />
        <div className="h-4 w-2/3 bg-[#1F1B16] rounded animate-pulse mt-6" />
      </div>
    </div>
  )
}