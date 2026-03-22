import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) return setError('Les mots de passe ne correspondent pas')
    if (form.password.length < 6) return setError('Le mot de passe doit faire au moins 6 caractères')
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/dashboard')
    } catch (e) {
      setError(e.response?.data?.message || 'Erreur d\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-black text-xl">S</span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mt-4">Créer un compte</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Rejoignez notre communauté d'apprenants</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-4 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom complet</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="input" placeholder="Jean Dupont"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="input" placeholder="votre@email.com"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
              <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                className="input" placeholder="••••••••"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmer le mot de passe</label>
              <input type="password" required value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})}
                className="input" placeholder="••••••••"/>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
              {loading ? 'Création du compte...' : 'Créer mon compte'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
