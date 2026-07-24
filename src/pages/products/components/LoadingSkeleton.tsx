export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
          {/* Image Placeholder */}
          <div className="aspect-[4/5] bg-gray-200 w-full"></div>
          
          {/* Content Placeholder */}
          <div className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-3 w-10 bg-gray-200 rounded"></div>
            </div>
            
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
            
            <div className="space-y-2 mt-2">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
            </div>
            
            <div className="h-6 w-20 bg-gray-200 rounded mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
