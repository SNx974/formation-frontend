import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { useToast } from '../../context/ToastContext'

export default function AdminSettings() {
  const toast = useToast()
  const [settings, setSettings] = useState({
    hero_image: '',
    hero_title: '',
    hero_subtitle: '',
    about_image: '',
    qualiopi_active: 'true'
  })
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/settings').then(r => {
      setSettings(s => ({ ...s, ...r.data }))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/admin/settings', settings)
      toast.success('Paramètres sauvegardés !')
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }))

  if (loading) return <div className="text-center py-12 text-gray-400">Chargement...</div>

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Paramètres du site</h2>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700">Page d'accueil — Hero</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image hero (URL)</label>
            <input value={settings.hero_image} onChange={e => set('hero_image', e.target.value)}
              className="input" placeholder="https://images.unsplash.com/..."/>
            {settings.hero_image && (
              <img src={settings.hero_image} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl"/>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre principal</label>
            <input value={settings.hero_title} onChange={e => set('hero_title', e.target.value)}
              className="input" placeholder="SE FORMER, ÉVOLUER"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sous-titre</label>
            <input value={settings.hero_subtitle} onChange={e => set('hero_subtitle', e.target.value)}
              className="input" placeholder="La SYNERGIE de nos compétences..."/>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700">Page À propos</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image (URL)</label>
            <input value={settings.about_image} onChange={e => set('about_image', e.target.value)}
              className="input" placeholder="https://..."/>
            {settings.about_image && (
              <img src={settings.about_image} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl"/>
            )}
          </div>
        </div>

        {/* Qualiopi */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700 mb-4">Certification Qualiopi</h3>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="qualiopi" checked={settings.qualiopi_active === 'true'}
              onChange={e => set('qualiopi_active', e.target.checked ? 'true' : 'false')}
              className="w-4 h-4 accent-primary-500"/>
            <label htmlFor="qualiopi" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Afficher le badge Qualiopi sur le site
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
          </button>
        </div>
      </form>
    </div>
  )
}
