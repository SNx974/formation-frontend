import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import StarRating from '../components/StarRating'

const levelColors = {
  'débutant': 'bg-green-100 text-green-700',
  'intermédiaire': 'bg-orange-100 text-orange-700',
  'avancé': 'bg-red-100 text-red-700',
}

export default function FormationDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [formation, setFormation] = useState(null)
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [openModule, setOpenModule] = useState(0)
  const [myRating, setMyRating] = useState(0)
  const [myComment, setMyComment] = useState('')
  const [ratingSubmitting, setRatingSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/formations/${id}`).then(r => setFormation(r.data)).catch(() => navigate('/formations')).finally(() => setLoading(false))
    if (user) {
      api.get(`/users/enrolled/${id}`).then(r => setEnrollment(r.data)).catch(() => {})
    }
  }, [id, user])

  const handleEnroll = async () => {
    if (!user) return navigate('/login')
    setEnrolling(true)
    setError('')
    try {
      await api.post(`/formations/${id}/enroll`)
      const r = await api.get(`/users/enrolled/${id}`)
      setEnrollment(r.data)
      toast.success('🎉 Inscription réussie ! Bonne formation !')
    } catch (e) {
      const msg = e.response?.data?.message || 'Erreur lors de l\'inscription'
      setError(msg)
      toast.error(msg)
    } finally {
      setEnrolling(false)
    }
  }

  const handleRating = async () => {
    if (!myRating) return
    setRatingSubmitting(true)
    try {
      await api.post(`/formations/${id}/rate`, { rating: myRating, comment: myComment })
      const r = await api.get(`/formations/${id}`)
      setFormation(r.data)
      toast.success('Merci pour votre avis !')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Erreur')
    } finally {
      setRatingSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"/>
    </div>
  )

  if (!formation) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 dark:from-gray-900 dark:to-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/formations" className="inline-flex items-center gap-2 text-primary-200 hover:text-white text-sm mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            Retour aux formations
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {formation.category && <span className="badge bg-white/20 text-white">{formation.category}</span>}
                <span className={`badge ${levelColors[formation.level] || 'bg-gray-100 text-gray-700'}`}>{formation.level}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black mb-4">{formation.title}</h1>
              <p className="text-primary-200 text-lg mb-6">{formation.short_description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-primary-200">
                {formation.avg_rating && (
                  <span className="flex items-center gap-2">
                    <StarRating value={Math.round(formation.avg_rating)} readonly size="sm"/>
                    <span className="text-white font-semibold">{formation.avg_rating}</span>
                    <span>({formation.rating_count} avis)</span>
                  </span>
                )}
                {formation.enrollment_count > 0 && <span>👥 {formation.enrollment_count} inscrits</span>}
                {formation.duration && <span>⏱ {formation.duration}</span>}
                {formation.instructor && <span>👨‍🏫 {formation.instructor}</span>}
              </div>
            </div>

            {/* Enrollment card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 text-gray-900 dark:text-white">
                {formation.image_url && (
                  <img src={formation.image_url} alt={formation.title} className="w-full h-40 object-cover rounded-xl mb-4"/>
                )}
                <div className="text-3xl font-black text-primary-600 dark:text-primary-400 mb-4">
                  {formation.price === 0 ? 'Gratuit' : `${formation.price} €`}
                </div>

                {enrollment ? (
                  <div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4">
                      <p className="text-green-700 dark:text-green-400 font-semibold text-sm">✅ Vous êtes inscrit</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progression</span><span>{enrollment.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-gradient-to-r from-primary-500 to-orange-400 rounded-full transition-all" style={{ width: `${enrollment.progress}%` }}/>
                        </div>
                      </div>
                    </div>
                    <Link to="/dashboard" className="btn-primary w-full text-center block">Accéder au cours →</Link>
                  </div>
                ) : (
                  <div>
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                    <button onClick={handleEnroll} disabled={enrolling} className="btn-primary w-full mb-3 disabled:opacity-50">
                      {enrolling ? 'Inscription...' : user ? 'S\'inscrire maintenant' : 'Se connecter pour s\'inscrire'}
                    </button>
                    <p className="text-xs text-gray-400 text-center">Accès immédiat à toutes les ressources</p>
                  </div>
                )}

                <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Accès à vie</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Certificat de complétion</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Support formateur</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{formation.description}</p>
            </div>

            {/* Instructor */}
            {formation.instructor && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Formateur</h2>
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-orange-400 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {formation.instructor.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{formation.instructor}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{formation.instructor_bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Modules */}
            {formation.modules?.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Programme — {formation.modules.length} modules
                </h2>
                <div className="space-y-3">
                  {formation.modules.map((mod, i) => (
                    <div key={mod.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                      <button onClick={() => setOpenModule(openModule === i ? -1 : i)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{mod.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{mod.videos?.length || 0} vidéos</span>
                          <svg className={`w-4 h-4 transition-transform ${openModule === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </button>
                      {openModule === i && mod.videos?.length > 0 && (
                        <div className="border-t border-gray-100 dark:border-gray-700">
                          {mod.videos.map(v => (
                            <div key={v.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                                </svg>
                              </div>
                              <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{v.title}</span>
                              {v.duration && <span className="text-xs text-gray-400">{v.duration}</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Avis des apprenants</h2>

              {user && enrollment && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Donnez votre avis</p>
                  <StarRating value={myRating} onChange={setMyRating} size="lg"/>
                  <textarea value={myComment} onChange={e => setMyComment(e.target.value)}
                    placeholder="Partagez votre expérience..." rows={3}
                    className="input mt-3 resize-none text-sm"/>
                  <button onClick={handleRating} disabled={!myRating || ratingSubmitting}
                    className="btn-primary mt-3 text-sm disabled:opacity-50">
                    {ratingSubmitting ? 'Envoi...' : 'Envoyer mon avis'}
                  </button>
                </div>
              )}

              {formation.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {formation.reviews.map(r => (
                    <div key={r.id} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {r.user_name?.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-gray-900 dark:text-white">{r.user_name}</span>
                          <StarRating value={r.rating} readonly size="sm"/>
                        </div>
                        {r.comment && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{r.comment}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Aucun avis pour l'instant. Soyez le premier !</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
