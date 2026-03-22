export function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200 dark:bg-gray-700"/>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"/>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full"/>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"/>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3"/>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-16"/>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20"/>
        </div>
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div key={i} className={`h-3 bg-gray-200 dark:bg-gray-700 rounded-full ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}/>
      ))}
    </div>
  )
}

export default function Skeleton({ className = '' }) {
  return <div className={`bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse ${className}`}/>
}
