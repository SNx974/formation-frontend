import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

export default function AdminUsers() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = () => {
    setLoading(true)
    api.get('/admin/users').then(r => setUsers(r.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const toggleRole = async (u) => {
    if (u.id === me.id) return alert('Impossible de modifier son propre rôle')
    await api.put(`/admin/users/${u.id}/role`, { role: u.role === 'admin' ? 'user' : 'admin' })
    fetch()
  }

  const deleteUser = async (id) => {
    if (id === me.id) return alert('Impossible de se supprimer soi-même')
    if (!window.confirm('Supprimer cet utilisateur ?')) return
    await api.delete(`/admin/users/${id}`)
    fetch()
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gestion des utilisateurs</h2>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Utilisateur', 'Email', 'Rôle', 'Inscriptions', 'Date', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {u.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900 dark:text-white">{u.name}</div>
                          {u.id === me.id && <span className="text-xs text-primary-500">(vous)</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className={`badge text-xs ${u.role === 'admin' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                        {u.role === 'admin' ? '👑 Admin' : '👤 Utilisateur'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{u.enrollment_count}</td>
                    <td className="px-5 py-3 text-xs text-gray-400">
                      {new Date(u.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleRole(u)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          {u.role === 'admin' ? 'Rétrograder' : 'Promouvoir admin'}
                        </button>
                        {u.id !== me.id && (
                          <button onClick={() => deleteUser(u.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
