import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../api/axios'

const empty = { title: '', short_description: '', description: '', category: '', level: 'débutant', price: 0, image_url: '', instructor: '', instructor_bio: '', duration: '', is_published: 1 }

export default function AdminFormationEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id
  const [form, setForm] = useState(empty)
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [newMod, setNewMod] = useState('')
  const [newVideo, setNewVideo] = useState({})

  useEffect(() => {
    if (!isNew) {
      api.get(`/admin/formations/${id}/modules`).then(r => setModules(r.data)).catch(() => {})
      api.get(`/admin/formations`).then(r => {
        const f = r.data.find(f => f.id == id)
        if (f) setForm({ title: f.title || '', short_description: f.short_description || '', description: f.description || '', category: f.category || '', level: f.level || 'débutant', price: f.price || 0, image_url: f.image_url || '', instructor: f.instructor || '', instructor_bio: f.instructor_bio || '', duration: f.duration || '', is_published: f.is_published ?? 1 })
      }).finally(() => setLoading(false))
    }
  }, [id])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (isNew) {
        const r = await api.post('/admin/formations', form)
        navigate(`/admin/formations/${r.data.id}/edit`)
      } else {
        await api.put(`/admin/formations/${id}`, form)
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Erreur')
    } finally {
      setSaving(false)
    }
  }

  const addModule = async () => {
    if (!newMod.trim()) return
    await api.post(`/admin/formations/${id}/modules`, { title: newMod, order_num: modules.length + 1 })
    const r = await api.get(`/admin/formations/${id}/modules`)
    setModules(r.data)
    setNewMod('')
  }

  const deleteModule = async (mid) => {
    if (!window.confirm('Supprimer ce module ?')) return
    await api.delete(`/admin/modules/${mid}`)
    setModules(modules.filter(m => m.id !== mid))
  }

  const addVideo = async (moduleId) => {
    const v = newVideo[moduleId] || {}
    if (!v.title) return
    await api.post(`/admin/modules/${moduleId}/videos`, { title: v.title, duration: v.duration, url: v.url, order_num: 99 })
    const r = await api.get(`/admin/formations/${id}/modules`)
    setModules(r.data)
    setNewVideo({ ...newVideo, [moduleId]: {} })
  }

  const deleteVideo = async (vid, moduleId) => {
    await api.delete(`/admin/videos/${vid}`)
    const r = await api.get(`/admin/formations/${id}/modules`)
    setModules(r.data)
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (loading) return <div className="text-center py-12 text-gray-400">Chargement...</div>

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/formations" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {isNew ? 'Nouvelle formation' : 'Modifier la formation'}
        </h2>
      </div>

      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">{error}</div>}

      <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre *</label>
            <input required value={form.title} onChange={e => set('title', e.target.value)} className="input" placeholder="Titre de la formation"/>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description courte *</label>
            <input required value={form.short_description} onChange={e => set('short_description', e.target.value)} className="input" placeholder="Résumé en une ligne"/>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description complète</label>
            <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)} className="input resize-none" placeholder="Description détaillée..."/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie</label>
            <input value={form.category} onChange={e => set('category', e.target.value)} className="input" placeholder="Ex: Développement, Design..."/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Niveau</label>
            <select value={form.level} onChange={e => set('level', e.target.value)} className="input">
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prix (€)</label>
            <input type="number" min="0" value={form.price} onChange={e => set('price', Number(e.target.value))} className="input"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durée</label>
            <input value={form.duration} onChange={e => set('duration', e.target.value)} className="input" placeholder="Ex: 40h"/>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de l'image</label>
            <input type="url" value={form.image_url} onChange={e => set('image_url', e.target.value)} className="input" placeholder="https://..."/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Formateur</label>
            <input value={form.instructor} onChange={e => set('instructor', e.target.value)} className="input" placeholder="Nom du formateur"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio formateur</label>
            <input value={form.instructor_bio} onChange={e => set('instructor_bio', e.target.value)} className="input" placeholder="Courte biographie"/>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="pub" checked={form.is_published === 1} onChange={e => set('is_published', e.target.checked ? 1 : 0)} className="w-4 h-4 accent-primary-500"/>
            <label htmlFor="pub" className="text-sm font-medium text-gray-700 dark:text-gray-300">Formation publiée</label>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <Link to="/admin/formations" className="btn-secondary text-sm py-2">Annuler</Link>
          <button type="submit" disabled={saving} className="btn-primary text-sm py-2 disabled:opacity-50">
            {saving ? 'Enregistrement...' : isNew ? 'Créer la formation' : 'Enregistrer'}
          </button>
        </div>
      </form>

      {/* Modules section (only for existing formations) */}
      {!isNew && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Modules & Vidéos</h3>

          {/* Add module */}
          <div className="flex gap-3 mb-6">
            <input value={newMod} onChange={e => setNewMod(e.target.value)} className="input flex-1" placeholder="Titre du nouveau module"/>
            <button onClick={addModule} className="btn-primary text-sm px-5">Ajouter</button>
          </div>

          {/* Modules list */}
          <div className="space-y-4">
            {modules.map((mod, i) => (
              <div key={mod.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    Module {i + 1} — {mod.title}
                  </span>
                  <button onClick={() => deleteModule(mod.id)} className="text-red-400 hover:text-red-600 transition-colors text-xs">Supprimer</button>
                </div>

                {/* Videos */}
                <div className="p-4 space-y-2">
                  {mod.videos?.map(v => (
                    <div key={v.id} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <svg className="w-3 h-3 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
                      </span>
                      <span className="flex-1">{v.title}</span>
                      {v.duration && <span className="text-gray-400 text-xs">{v.duration}</span>}
                      <button onClick={() => deleteVideo(v.id, mod.id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                  ))}

                  {/* Add video */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <input value={newVideo[mod.id]?.title || ''} onChange={e => setNewVideo({...newVideo, [mod.id]: {...newVideo[mod.id], title: e.target.value}})}
                      className="input flex-1 text-sm py-1.5" placeholder="Titre vidéo"/>
                    <input value={newVideo[mod.id]?.duration || ''} onChange={e => setNewVideo({...newVideo, [mod.id]: {...newVideo[mod.id], duration: e.target.value}})}
                      className="input w-24 text-sm py-1.5" placeholder="Durée"/>
                    <button onClick={() => addVideo(mod.id)} className="btn-primary text-xs px-3 py-1.5">+</button>
                  </div>
                </div>
              </div>
            ))}

            {modules.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-6">Aucun module. Ajoutez-en un ci-dessus.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
