import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Clock, Users, Target, BookOpen, Award, ChevronDown, CalendarDays } from 'lucide-react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import StarRating from '../components/StarRating'
import InscriptionForm from '../components/InscriptionForm'

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
  const [loading, setLoading] = useState(true)
  const [openModule, setOpenModule] = useState(0)
  const [myRating, setMyRating] = useState(0)
  const [myComment, setMyComment] = useState('')
  const [ratingSubmitting, setRatingSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    api.get(`/formations/${id}`).then(r => setFormation(r.data)).catch(() => navigate('/formations')).finally(() => setLoading(false))
  }, [id])

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
                {/* Qualiopi badge */}
                <span className="badge bg-orange-500 text-white flex items-center gap-1">
                  <Award className="w-3 h-3"/> Qualiopi
                </span>
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
                {formation.enrollment_count > 0 && (
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4"/> {formation.enrollment_count} inscrits</span>
                )}
                {formation.duration && (
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {formation.duration}</span>
                )}
                {formation.lieu && (
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {formation.lieu}</span>
                )}
                {formation.instructor && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
                    {formation.instructor}
                  </span>
                )}
              </div>
            </div>

            {/* Inscription card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 text-gray-900 dark:text-white">
                {formation.image_url && (
                  <img src={formation.image_url} alt={formation.title} className="w-full h-40 object-cover rounded-xl mb-4"/>
                )}

                {showForm ? (
                  <InscriptionForm formation={formation} onClose={() => setShowForm(false)}/>
                ) : (
                  <>
                    {formation.sessions && (
                      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 mb-4">
                        <div className="flex items-center gap-2 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-1">
                          <CalendarDays className="w-4 h-4"/> Prochaines sessions
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{formation.sessions}</p>
                      </div>
                    )}
                    <button onClick={() => setShowForm(true)} className="btn-primary w-full mb-3">
                      Demander une inscription
                    </button>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Formation en présentiel</li>
                      <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Certificat de complétion</li>
                      <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Organisme certifié Qualiopi</li>
                      {formation.lieu && <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-400"/> {formation.lieu}</li>}
                    </ul>
                  </>
                )}
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

            {/* Objectifs / Prérequis / Public visé */}
            {(formation.objectifs || formation.prerequis || formation.public_vise) && (
              <div className="grid sm:grid-cols-3 gap-4">
                {formation.objectifs && (
                  <div className="card p-5">
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold mb-3">
                      <Target className="w-5 h-5"/> Objectifs
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{formation.objectifs}</p>
                  </div>
                )}
                {formation.prerequis && (
                  <div className="card p-5">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold mb-3">
                      <BookOpen className="w-5 h-5"/> Prérequis
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{formation.prerequis}</p>
                  </div>
                )}
                {formation.public_vise && (
                  <div className="card p-5">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold mb-3">
                      <Users className="w-5 h-5"/> Public visé
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{formation.public_vise}</p>
                  </div>
                )}
              </div>
            )}

            {/* Modalités */}
            {formation.modalites && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Modalités pédagogiques</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{formation.modalites}</p>
              </div>
            )}

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

            {/* Modules / Programme */}
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
                          <span>{mod.videos?.length || 0} séquences</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openModule === i ? 'rotate-180' : ''}`}/>
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Avis des participants</h2>

              {user && (
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

          {/* Sidebar — inscription form on desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24 card p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">S'inscrire à cette formation</h3>
              <InscriptionForm formation={formation}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
