import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Award, Users, BookOpen, CheckCircle } from 'lucide-react'
import api from '../api/axios'
import FormationCard from '../components/FormationCard'
import useCountUp from '../hooks/useCountUp'
import useScrollReveal from '../hooks/useScrollReveal'

const SITES = [
  { name: 'Saint-Denis', icon: '🏙️' },
  { name: 'Saint-Pierre', icon: '🌊' },
  { name: 'Saint-Paul', icon: '🌺' },
  { name: 'Le Tampon', icon: '🌿' },
]

const testimonials = [
  { name: 'Amina Kone', role: 'Chargée RH', text: 'Formation très professionnelle, formateurs à l\'écoute. J\'ai obtenu mon certificat en fin de session. Je recommande !', avatar: 'A', color: 'from-primary-400 to-primary-600' },
  { name: 'Pierre Morin', role: 'Chef d\'entreprise', text: 'Le contenu est adapté aux réalités du terrain. Les formations en présentiel permettent des échanges très enrichissants.', avatar: 'P', color: 'from-orange-400 to-orange-600' },
  { name: 'Sara Benmoussa', role: 'Technicienne', text: 'Organisme sérieux, certifié Qualiopi. J\'ai pu financer ma formation via mon employeur sans problème.', avatar: 'S', color: 'from-purple-400 to-purple-600' },
]

function StatCard({ value, suffix = '', label, start }) {
  const count = useCountUp(value, 2000, start)
  return (
    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-orange-50 dark:from-primary-900/20 dark:to-orange-900/10 hover:scale-105 transition-transform duration-300">
      <div className="text-3xl font-black text-primary-600 dark:text-primary-400">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
    </div>
  )
}

export default function Home() {
  const [formations, setFormations] = useState([])
  const [settings, setSettings] = useState({})
  const [statsRef, statsVisible] = useScrollReveal()
  const [formationsRef, formationsVisible] = useScrollReveal()
  const [conceptRef, conceptVisible] = useScrollReveal()
  const [testiRef, testiVisible] = useScrollReveal()
  const [sitesRef, sitesVisible] = useScrollReveal()

  useEffect(() => {
    api.get('/formations').then(r => setFormations(r.data.slice(0, 3))).catch(() => {})
    api.get('/settings').then(r => setSettings(r.data)).catch(() => {})
  }, [])

  const heroImage = settings.hero_image
  const heroTitle = settings.hero_title || 'SE FORMER, ÉVOLUER'
  const heroSubtitle = settings.hero_subtitle || 'La SYNERGIE de nos compétences au service de la formation'

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center text-white">
        {/* Background image */}
        {heroImage ? (
          <div className="absolute inset-0">
            <img src={heroImage} alt="hero" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/70 to-primary-900/60"/>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 dark:from-gray-900 dark:via-primary-900 dark:to-gray-900">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow"/>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}/>
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              {/* Qualiopi badge */}
              <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg">
                <Award className="w-4 h-4"/> Organisme certifié Qualiopi
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/30 to-orange-400 border-2 border-white/40 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-black text-3xl">S</span>
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black leading-tight">
                    {heroTitle.includes(',') ? (
                      <>{heroTitle.split(',')[0]},<br/><span className="text-orange-300">{heroTitle.split(',')[1]?.trim()}</span></>
                    ) : heroTitle}
                  </h1>
                </div>
              </div>
              <p className="text-lg text-primary-100 mb-4 font-medium">{heroSubtitle}</p>
              <p className="text-primary-200 text-base mb-8 leading-relaxed max-w-lg">
                Des formations professionnelles en présentiel dispensées par des experts, sur 4 sites à La Réunion. Financement possible par votre employeur ou votre OPCO.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/formations" className="btn-orange text-base px-8 py-3 hover:scale-105 transition-transform">
                  Voir les formations
                </Link>
                <Link to="/a-propos" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 text-base hover:scale-105">
                  En savoir plus
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-72 h-72 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <div className="w-52 h-52 rounded-full bg-gradient-to-br from-orange-400/50 to-primary-500/50 flex items-center justify-center">
                    <BookOpen className="w-28 h-28 text-white/80" strokeWidth={1}/>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-4 py-2 text-sm font-semibold text-primary-600 dark:text-primary-300 animate-bounce-slow">
                  🎓 Formations certifiées
                </div>
                <div className="absolute -bottom-4 -left-4 bg-orange-500 rounded-2xl shadow-xl px-4 py-2 text-sm font-semibold text-white animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                  ✨ 4 sites à La Réunion
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full fill-white dark:fill-gray-950">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"/>
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white dark:bg-gray-950" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <StatCard value={4}    suffix=" sites" label="Sites en Réunion"        start={statsVisible}/>
            <StatCard value={500}  suffix="+"      label="Stagiaires formés"       start={statsVisible}/>
            <StatCard value={95}   suffix="%"      label="Taux de satisfaction"    start={statsVisible}/>
            <StatCard value={20}   suffix="+"      label="Formations disponibles"  start={statsVisible}/>
          </div>
        </div>
      </section>

      {/* SITES */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900" ref={sitesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transition-all duration-700 ${sitesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Nos implantations</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">4 sites à La Réunion</h2>
          </div>
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${sitesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {SITES.map((site, i) => (
              <div key={i} className="card p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl mb-3">{site.icon}</div>
                <div className="flex items-center justify-center gap-1.5 font-bold text-gray-900 dark:text-white">
                  <MapPin className="w-4 h-4 text-orange-500"/> {site.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATIONS POPULAIRES */}
      <section className="py-16 bg-white dark:bg-gray-950" ref={formationsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${formationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Catalogue</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">Nos formations phares</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Des formations professionnelles conçues pour répondre aux besoins des entreprises et des salariés réunionnais.
            </p>
          </div>

          {formations.length > 0 ? (
            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 transition-all duration-700 delay-200 ${formationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {formations.map((f, i) => <FormationCard key={f.id} formation={f} index={i}/>)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card h-80 animate-pulse bg-gray-200 dark:bg-gray-700"/>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/formations" className="btn-primary text-base px-10 py-3 hover:scale-105 transition-transform">
              Voir toutes les formations →
            </Link>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900" ref={conceptRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${conceptVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Pourquoi nous choisir</span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2 mb-6">
                Une formation de qualité, ancrée dans la réalité réunionnaise
              </h2>
              <div className="space-y-4">
                {[
                  { icon: <Award className="w-6 h-6 text-orange-500"/>, title: 'Certifié Qualiopi', desc: 'Notre organisme est certifié Qualiopi, gage de qualité reconnu par l\'État. Financement OPCO possible.' },
                  { icon: <MapPin className="w-6 h-6 text-primary-500"/>, title: '4 sites en Réunion', desc: 'Nos centres de formation sont implantés à Saint-Denis, Saint-Pierre, Saint-Paul et Le Tampon.' },
                  { icon: <Users className="w-6 h-6 text-green-500"/>, title: 'Petits groupes', desc: 'Des sessions en petit groupe pour un suivi personnalisé et des échanges enrichissants avec le formateur.' },
                  { icon: <CheckCircle className="w-6 h-6 text-purple-500"/>, title: 'Certificat reconnu', desc: 'À l\'issue de chaque formation, obtenez une attestation valorisable auprès de votre employeur.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                    <div className="shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-2xl shadow-primary-500/20">
                <h3 className="text-xl font-bold mb-6">Comment se déroule une inscription ?</h3>
                {[
                  { step: '01', title: 'Choisissez votre formation', desc: 'Parcourez notre catalogue et sélectionnez la formation adaptée à vos besoins.' },
                  { step: '02', title: 'Envoyez votre demande', desc: 'Remplissez le formulaire d\'inscription en ligne. Notre équipe vous recontacte rapidement.' },
                  { step: '03', title: 'Démarrez la formation', desc: 'Rejoignez le groupe sur l\'un de nos 4 sites et obtenez votre certificat à l\'issue.' },
                ].map((item, i) => (
                  <div key={i} className={`flex gap-4 ${i < 2 ? 'mb-6' : ''} group`}>
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-black text-sm shrink-0 group-hover:scale-110 transition-transform duration-200">{item.step}</div>
                    <div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-primary-200 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white dark:bg-gray-950" ref={testiRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${testiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Témoignages</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">Ce qu'ils disent de nous</h2>
          </div>
          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${testiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6 hover:-translate-y-1 transition-transform duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/80 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            <Award className="w-4 h-4"/> Certifié Qualiopi
          </div>
          <h2 className="text-3xl lg:text-4xl font-black mb-4">Prêt à évoluer ?</h2>
          <p className="text-primary-200 text-lg mb-8">
            Rejoignez les professionnels réunionnais qui font confiance à SE FORMER, ÉVOLUER.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/formations" className="btn-orange text-base px-10 py-4 hover:scale-105 transition-transform">Voir les formations</Link>
            <Link to="/support" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-4 px-10 rounded-full transition-all duration-200 text-base hover:scale-105">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
