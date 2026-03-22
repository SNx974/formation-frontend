import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/admin/enrollments').then(r => setEnrollments(r.data)).finally(() => setLoading(false))
  }, [])

  const filtered = enrollments.filter(e =>
    e.user_name?.toLowerCase().includes(search.toLowerCase()) ||
    e.formation_title?.toLowerCase().includes(search.toLowerCase()) ||
    e.user_email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Inscriptions</h2>
        <span className="text-sm text-gray-400">{enrollments.length} inscription{enrollments.length > 1 ? 's' : ''}</span>
      </div>

      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input type="text" placeholder="Rechercher par utilisateur ou formation..." value={search} onChange={e => setSearch(e.target.value)}
          className="input pl-10"/>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Utilisateur', 'Formation', 'Progression', 'Terminé', 'Date inscription'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">{e.user_name}</div>
                      <div className="text-xs text-gray-400">{e.user_email}</div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-[200px] truncate">{e.formation_title}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                          <div className={`h-2 rounded-full transition-all ${e.progress === 100 ? 'bg-green-500' : 'bg-primary-500'}`} style={{ width: `${e.progress}%` }}/>
                        </div>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 w-8">{e.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`badge text-xs ${e.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {e.completed ? '✓ Oui' : 'Non'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400">
                      {new Date(e.enrolled_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400">Aucune inscription trouvée</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
