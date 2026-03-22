import { useState, useEffect } from 'react'
import api from '../api/axios'
import FormationCard from '../components/FormationCard'
import { SkeletonCard } from '../components/Skeleton'

const levels = ['Tous', 'débutant', 'intermédiaire', 'avancé']

export default function Formations() {
  const [formations, setFormations] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')

  const fetchFormations = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    if (level && level !== 'Tous') params.set('level', level)
    setLoading(true)
    api.get(`/formations?${params}`).then(r => setFormations(r.data)).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => {
    api.get('/formations/meta/categories').then(r => setCategories(r.data)).catch(() => {})
  }, [])

  useEffect(() => { fetchFormations() }, [search, category, level])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-gray-900 dark:to-primary-900 py-14 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"/>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black mb-3">Nos Formations</h1>
          <p className="text-primary-200 text-lg max-w-xl mx-auto">
            Explorez notre catalogue et trouvez la formation qui correspond à vos objectifs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" placeholder="Rechercher une formation..." value={search} onChange={e => setSearch(e.target.value)} className="input pl-10"/>
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="input sm:w-48">
            <option value="">Toutes catégories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex gap-2 flex-wrap">
            {levels.map(l => (
              <button key={l} onClick={() => setLevel(l === 'Tous' ? '' : l)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${(l === 'Tous' && !level) || level === l
                    ? 'bg-primary-500 text-white shadow-md scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'}`}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i}/>)}
          </div>
        ) : formations.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500 inline-block"/>
              {formations.length} formation{formations.length > 1 ? 's' : ''} trouvée{formations.length > 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((f, i) => <FormationCard key={f.id} formation={f} index={i}/>)}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Aucune formation trouvée</h3>
            <p className="text-gray-400">Essayez d'autres critères de recherche.</p>
            <button onClick={() => { setSearch(''); setCategory(''); setLevel('') }}
              className="btn-primary mt-4 text-sm">Réinitialiser les filtres</button>
          </div>
        )}
      </div>
    </div>
  )
}
