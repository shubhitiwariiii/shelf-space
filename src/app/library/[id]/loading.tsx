export default function LibraryDetailLoading() {
  return (
    <div className="min-h-screen bg-[#15130F] px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="h-4 w-28 bg-[#1F1B16] rounded animate-pulse" />

        <div className="mt-4 bg-[#1F1B16] border border-[#332D24] rounded-lg p-6">
          <div className="h-7 w-2/3 bg-[#332D24] rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-[#332D24] rounded animate-pulse mt-3" />
          <div className="h-3 w-1/3 bg-[#332D24] rounded animate-pulse mt-2" />

          <div className="mt-6 border-t border-[#332D24] pt-6 space-y-4">
            <div className="h-3 w-16 bg-[#332D24] rounded animate-pulse" />
            <div className="h-3 w-16 bg-[#332D24] rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}