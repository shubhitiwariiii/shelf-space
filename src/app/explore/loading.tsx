export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-[#15130F] px-6 py-8">
      <div className="h-7 w-48 bg-[#1F1B16] rounded animate-pulse" />
      <div className="h-4 w-32 bg-[#1F1B16] rounded animate-pulse mt-2" />

      <div className="flex gap-6 border-b border-[#332D24] mt-6 pb-3">
        <div className="h-4 w-16 bg-[#1F1B16] rounded animate-pulse" />
        <div className="h-4 w-24 bg-[#1F1B16] rounded animate-pulse" />
        <div className="h-4 w-20 bg-[#1F1B16] rounded animate-pulse" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-5 h-28 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}