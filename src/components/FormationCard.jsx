import { Link } from 'react-router-dom'

const levelColors = {
  'débutant':      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'intermédiaire': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'avancé':        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function FormationCard({ formation }) {
  const { id, title, short_description, category, level, price, image_url, instructor, avg_rating, rating_count, enrollment_count, duration } = formation

  return (
    <Link to={`/formations/${id}`} className="card group flex flex-col hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary-100 to-orange-100 dark:from-primary-900 dark:to-orange-900">
        {image_url ? (
          <img src={image_url} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-orange-400 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`badge ${levelColors[level] || 'bg-gray-100 text-gray-700'}`}>{level}</span>
        </div>
        {category && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300">{category}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3 flex-1">
          {short_description}
        </p>

        {instructor && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
            {instructor}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
          {duration && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/></svg>
              {duration}
            </span>
          )}
          {enrollment_count > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              {enrollment_count} inscrits
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1">
            {avg_rating ? (
              <>
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{avg_rating}</span>
                <span className="text-xs text-gray-400">({rating_count})</span>
              </>
            ) : (
              <span className="text-xs text-gray-400">Nouveau</span>
            )}
          </div>
          <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
            {price === 0 ? 'Gratuit' : `${price} €`}
          </span>
        </div>
      </div>
    </Link>
  )
}
