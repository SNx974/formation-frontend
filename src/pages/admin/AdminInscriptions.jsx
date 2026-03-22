import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { useToast } from '../../context/ToastContext'

const STATUTS = [
  { value: 'nouveau', label: 'Nouveau', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { value: 'en_cours', label: 'En cours', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { value: 'accepte', label: 'Accepté', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { value: 'refuse', label: 'Refusé', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
]

export default function AdminInscriptions() {
  const toast = useToast()
  const [inscriptions, setInscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const load = () => {
    const params = filter ? `?statut=${filter}` : ''
    api.get(`/admin/inscriptions${params}`).then(r => setInscriptions(r.data)).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter])

  const updateStatut = async (id, statut) => {
    try {
      await api.put(`/admin/inscriptions/${id}/statut`, { statut })
      toast.success('Statut mis à jour')
      load()
      if (selected?.id === id) setSelected(s => ({ ...s, statut }))
    } catch {
      toast.error('Erreur')
    }
  }

  const deleteInscription = async (id) => {
    if (!window.confirm('Supprimer cette demande ?')) return
    try {
      await api.delete(`/admin/inscriptions/${id}`)
      toast.success('Demande supprimée')
      setInscriptions(inscriptions.filter(i => i.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch {
      toast.error('Erreur')
    }
  }

  const getStatut = (val) => STATUTS.find(s => s.value === val) || STATUTS[0]

  if (loading) return <div className="text-center py-12 text-gray-400">Chargement...</div>

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Demandes d'inscription</h2>
        <div className="flex gap-2 flex-wrap">
          {[{ value: '', label: 'Toutes' }, ...STATUTS].map(s => (
            <button key={s.value} onClick={() => setFilter(s.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === s.value ? 'bg-primary-500 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Liste */}
        <div className="lg:col-span-2 space-y-3">
          {inscriptions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">Aucune demande</div>
          ) : (
            inscriptions.map(insc => {
              const st = getStatut(insc.statut)
              return (
                <div key={insc.id}
                  onClick={() => setSelected(insc)}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-all border-2 ${selected?.id === insc.id ? 'border-primary-500' : 'border-transparent'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white">{insc.prenom} {insc.nom}</div>
                      <div className="text-sm text-gray-400 truncate">{insc.email}</div>
                      {insc.formation_title && (
                        <div className="text-xs text-primary-600 dark:text-primary-400 mt-1 truncate">📚 {insc.formation_title}</div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`badge text-xs ${st.color}`}>{st.label}</span>
                      <span className="text-xs text-gray-400">{new Date(insc.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Détail */}
        <div>
          {selected ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">{selected.prenom} {selected.nom}</h3>
              <div className="space-y-3 text-sm mb-5">
                <Row label="Email" value={selected.email}/>
                {selected.telephone && <Row label="Téléphone" value={selected.telephone}/>}
                {selected.formation_title && <Row label="Formation" value={selected.formation_title}/>}
                {selected.niveau_etude && <Row label="Niveau d'étude" value={selected.niveau_etude}/>}
                {selected.situation_pro && <Row label="Situation pro." value={selected.situation_pro}/>}
                {selected.message && (
                  <div>
                    <span className="text-gray-400">Message</span>
                    <p className="mt-1 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-xs leading-relaxed">{selected.message}</p>
                  </div>
                )}
                <Row label="Date" value={new Date(selected.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}/>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Changer le statut</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUTS.map(s => (
                    <button key={s.value} onClick={() => updateStatut(selected.id, s.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selected.statut === s.value ? s.color + ' ring-2 ring-offset-1 ring-current' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => deleteInscription(selected.id)}
                className="mt-4 w-full text-xs text-red-500 hover:text-red-700 transition-colors">
                Supprimer cette demande
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center text-gray-400 text-sm">
              Sélectionnez une demande pour voir les détails
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-400 shrink-0 w-28">{label}</span>
      <span className="text-gray-700 dark:text-gray-300 font-medium">{value}</span>
    </div>
  )
}
