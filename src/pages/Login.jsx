import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (e) {
      setError(e.response?.data?.message || 'Erreur de connexion')
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
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mt-4">Connexion</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Accédez à votre espace apprenant</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-4 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="input" placeholder="votre@email.com"/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe</label>
                <a href="#" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">Mot de passe oublié ?</a>
              </div>
              <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                className="input" placeholder="••••••••"/>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-xs text-gray-500 dark:text-gray-400">
            <p className="font-semibold mb-1">Comptes de démonstration :</p>
            <p>Admin: admin@seformer.fr / admin123</p>
            <p>User: user@seformer.fr / user123</p>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
