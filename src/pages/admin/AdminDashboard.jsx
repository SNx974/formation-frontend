import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [enrollments, setEnrollments] = useState([])

  useEffect(() => {
    api.get('/admin/stats').then(r => setStats(r.data)).catch(() => {})
    api.get('/admin/enrollments').then(r => setEnrollments(r.data.slice(0, 5))).catch(() => {})
  }, [])

  const statCards = stats ? [
    { label: 'Utilisateurs', value: stats.users, icon: '👥', color: 'from-blue-500 to-blue-600', link: '/admin/users' },
    { label: 'Formations', value: stats.formations, icon: '📚', color: 'from-primary-500 to-primary-600', link: '/admin/formations' },
    { label: 'Accès plateforme', value: stats.enrollments, icon: '📋', color: 'from-purple-500 to-purple-600', link: '/admin/enrollments' },
    { label: 'Nouvelles demandes', value: stats.new_inscriptions, icon: '📨', color: 'from-orange-500 to-orange-600', link: '/admin/inscriptions' },
  ] : []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vue d'ensemble</h2>
        <Link to="/admin/formations/new" className="btn-primary text-sm py-2 px-5">
          + Nouvelle formation
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white ${s.link ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all' : ''}`}
            onClick={() => s.link && (window.location.href = s.link)}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-black">{s.value}</div>
            <div className="text-sm opacity-80 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent enrollments */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 dark:text-white">Inscriptions récentes</h3>
          <Link to="/admin/enrollments" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Voir tout</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {['Utilisateur', 'Formation', 'Progression', 'Date'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {enrollments.map(e => (
                <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{e.user_name}</div>
                    <div className="text-xs text-gray-400">{e.user_email}</div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-[200px] truncate">{e.formation_title}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full min-w-[60px]">
                        <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: `${e.progress}%` }}/>
                      </div>
                      <span className="text-xs text-gray-500">{e.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">
                    {new Date(e.enrolled_at).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400 text-sm">Aucune inscription</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
