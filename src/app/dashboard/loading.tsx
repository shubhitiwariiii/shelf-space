export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#15130F] px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="h-7 w-56 bg-[#1F1B16] rounded animate-pulse" />
        <div className="h-4 w-32 bg-[#1F1B16] rounded animate-pulse mt-2" />

        <div className="grid grid-cols-3 gap-3 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 h-20 animate-pulse" />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 h-16 animate-pulse" />
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-[#1F1B16] border border-[#332D24] rounded-lg p-4 h-16 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}