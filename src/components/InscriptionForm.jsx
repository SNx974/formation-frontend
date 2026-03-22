import { useState } from 'react'
import { Send, X } from 'lucide-react'
import api from '../api/axios'
import { useToast } from '../context/ToastContext'

const niveaux = ['Sans diplôme', 'CAP/BEP', 'Bac', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5 et plus']
const situations = ['Salarié(e)', 'Demandeur(se) d\'emploi', 'Indépendant(e)', 'Étudiant(e)', 'Autre']

export default function InscriptionForm({ formation, onClose }) {
  const toast = useToast()
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    niveau_etude: '', situation_pro: '', message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nom || !form.prenom || !form.email) return
    setSubmitting(true)
    try {
      await api.post('/inscriptions', {
        ...form,
        formation_id: formation?.id || null,
        formation_title: formation?.title || null
      })
      setSent(true)
      toast.success('Demande envoyée ! Nous vous contacterons rapidement.')
    } catch {
      toast.error('Erreur lors de l\'envoi. Réessayez.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Demande envoyée !</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Notre équipe vous contactera dans les plus brefs délais pour confirmer votre inscription.
      </p>
      {onClose && (
        <button onClick={onClose} className="btn-primary">Fermer</button>
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {onClose && (
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Demande d'inscription</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5 text-gray-400"/>
          </button>
        </div>
      )}

      {formation && (
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 text-sm text-primary-700 dark:text-primary-300 font-medium">
          Formation : {formation.title}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Nom *</label>
          <input required value={form.nom} onChange={e => set('nom', e.target.value)}
            className="input text-sm" placeholder="Dupont"/>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Prénom *</label>
          <input required value={form.prenom} onChange={e => set('prenom', e.target.value)}
            className="input text-sm" placeholder="Jean"/>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Email *</label>
        <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
          className="input text-sm" placeholder="jean.dupont@email.fr"/>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Téléphone</label>
        <input type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)}
          className="input text-sm" placeholder="0692 00 00 00"/>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Niveau d'étude</label>
          <select value={form.niveau_etude} onChange={e => set('niveau_etude', e.target.value)} className="input text-sm">
            <option value="">Sélectionner</option>
            {niveaux.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Situation pro.</label>
          <select value={form.situation_pro} onChange={e => set('situation_pro', e.target.value)} className="input text-sm">
            <option value="">Sélectionner</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Message (optionnel)</label>
        <textarea value={form.message} onChange={e => set('message', e.target.value)}
          rows={3} className="input text-sm resize-none"
          placeholder="Vos questions, motivations, disponibilités..."/>
      </div>

      <button type="submit" disabled={submitting || !form.nom || !form.prenom || !form.email}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
        <Send className="w-4 h-4"/>
        {submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Vos données sont utilisées uniquement pour traiter votre demande d'inscription.
      </p>
    </form>
  )
}
