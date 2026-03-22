import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [formations, setFormations] = useState([])
  const [certs, setCerts] = useState([])
  const [stats, setStats] = useState(null)
  const [activeTab, setActiveTab] = useState('formations')

  useEffect(() => {
    api.get('/users/my-formations').then(r => setFormations(r.data)).catch(() => {})
    api.get('/users/certificates').then(r => setCerts(r.data)).catch(() => {})
    api.get('/users/stats').then(r => setStats(r.data)).catch(() => {})
  }, [])

  const updateProgress = async (formationId, progress) => {
    try {
      await api.put(`/formations/${formationId}/progress`, { progress })
      const r = await api.get('/users/my-formations')
      setFormations(r.data)
      const s = await api.get('/users/stats')
      setStats(s.data)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-gray-900 rounded-3xl p-6 text-white mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold">Bonjour, {user?.name} 👋</h1>
              <p className="text-primary-200 text-sm">Continuez votre progression</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Formations suivies', value: stats.total, icon: '📚', color: 'from-primary-500 to-primary-600' },
              { label: 'Terminées', value: stats.completed, icon: '✅', color: 'from-green-500 to-green-600' },
              { label: 'Certificats', value: stats.certificates, icon: '🏆', color: 'from-orange-500 to-orange-600' },
              { label: 'Progression moy.', value: `${stats.avgProgress}%`, icon: '📈', color: 'from-purple-500 to-purple-600' },
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'formations', label: 'Mes formations' },
            { id: 'certs', label: `Certificats (${certs.length})` },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeTab === t.id ? 'bg-primary-500 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Formations tab */}
        {activeTab === 'formations' && (
          <div>
            {formations.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Aucune formation</h3>
                <p className="text-gray-400 mb-6">Commencez votre parcours en vous inscrivant à une formation.</p>
                <Link to="/formations" className="btn-primary">Voir les formations</Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {formations.map(f => (
                  <div key={f.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-36 bg-gradient-to-br from-primary-100 to-orange-100 dark:from-primary-900 dark:to-orange-900 relative overflow-hidden">
                      {f.image_url ? (
                        <img src={f.image_url} alt={f.title} className="w-full h-full object-cover"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">📘</span>
                        </div>
                      )}
                      {f.completed ? (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">Terminé ✓</div>
                      ) : null}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{f.title}</h3>
                      <p className="text-xs text-gray-400 mb-3">{f.instructor}</p>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Progression</span><span className="font-semibold">{f.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-gradient-to-r from-primary-500 to-orange-400 rounded-full transition-all duration-500" style={{ width: `${f.progress}%` }}/>
                        </div>
                      </div>

                      {/* Quick progress buttons */}
                      {!f.completed && (
                        <div className="flex gap-1 mb-3">
                          {[25, 50, 75, 100].map(p => (
                            <button key={p} onClick={() => updateProgress(f.id, p)}
                              className={`flex-1 text-xs py-1 rounded-lg transition-all ${
                                f.progress >= p
                                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200'}`}>
                              {p}%
                            </button>
                          ))}
                        </div>
                      )}

                      <Link to={`/formations/${f.id}`} className="btn-primary w-full text-center text-sm py-2 block">
                        {f.completed ? 'Revoir la formation' : 'Continuer →'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certificates tab */}
        {activeTab === 'certs' && (
          <div>
            {certs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Aucun certificat</h3>
                <p className="text-gray-400">Terminez une formation pour obtenir votre certificat.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certs.map(c => (
                  <div key={c.id} className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-3xl mb-3">🏆</div>
                    <h3 className="font-bold text-lg mb-1">{c.formation_title}</h3>
                    <p className="text-primary-200 text-sm mb-3">Formateur : {c.instructor}</p>
                    <p className="text-xs text-primary-300 mb-3">
                      Délivré le {new Date(c.issued_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-xs font-mono text-primary-200">{c.certificate_code}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
