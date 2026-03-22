import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

const levelColors = {
  'débutant': 'bg-green-100 text-green-700',
  'intermédiaire': 'bg-orange-100 text-orange-700',
  'avancé': 'bg-red-100 text-red-700',
}

export default function AdminFormations() {
  const [formations, setFormations] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)

  const fetch = () => {
    setLoading(true)
    api.get('/admin/formations').then(r => setFormations(r.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette formation ?')) return
    try {
      await api.delete(`/admin/formations/${id}`)
      fetch()
    } catch (e) {
      alert(e.response?.data?.message || 'Erreur')
    }
  }

  const togglePublish = async (f) => {
    try {
      await api.put(`/admin/formations/${f.id}`, { ...f, is_published: f.is_published ? 0 : 1 })
      fetch()
    } catch {}
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gestion des formations</h2>
        <Link to="/admin/formations/new" className="btn-primary text-sm py-2 px-5">+ Nouvelle formation</Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Formation', 'Catégorie', 'Niveau', 'Prix', 'Inscrits', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {formations.map(f => (
                  <tr key={f.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {f.image_url && <img src={f.image_url} alt="" className="w-10 h-10 rounded-lg object-cover"/>}
                        <div>
                          <div className="font-semibold text-sm text-gray-900 dark:text-white max-w-[200px] truncate">{f.title}</div>
                          <div className="text-xs text-gray-400">{f.instructor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">{f.category || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`badge text-xs ${levelColors[f.level] || 'bg-gray-100 text-gray-700'}`}>{f.level}</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-primary-600 dark:text-primary-400">
                      {f.price === 0 ? 'Gratuit' : `${f.price} €`}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">{f.enrollment_count}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => togglePublish(f)}
                        className={`badge cursor-pointer ${f.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {f.is_published ? '● Publié' : '○ Masqué'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/formations/${f.id}/edit`}
                          className="p-1.5 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                        </Link>
                        <button onClick={() => handleDelete(f.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {formations.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400">Aucune formation</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
