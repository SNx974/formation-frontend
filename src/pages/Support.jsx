import { useState } from 'react'

const faqs = [
  { q: 'Comment accéder à mes formations après inscription ?', a: 'Une fois inscrit, rendez-vous dans votre espace personnel (Dashboard) pour retrouver toutes vos formations et suivre votre progression.' },
  { q: 'Les certifications sont-elles reconnues ?', a: 'Nos certificats de complétion sont délivrés dès que vous atteignez 100% de progression dans une formation. Ils sont valorisables sur votre CV et profil LinkedIn.' },
  { q: 'Puis-je accéder aux cours depuis mon mobile ?', a: 'Absolument ! Notre plateforme est entièrement responsive et optimisée pour une expérience mobile fluide.' },
  { q: 'Quelle est la politique de remboursement ?', a: 'Nous offrons une garantie de satisfaction de 7 jours. Si vous n\'êtes pas satisfait, contactez notre support pour un remboursement intégral.' },
  { q: 'Y a-t-il des prérequis pour les formations ?', a: 'Chaque formation précise le niveau requis (débutant, intermédiaire, avancé). Les formations débutant ne nécessitent aucun prérequis.' },
  { q: 'Comment contacter un formateur ?', a: 'Vous pouvez contacter les formateurs via l\'espace questions/réponses présent dans chaque formation ou par le biais de notre support.' },
]

export default function Support() {
  const [open, setOpen] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-gray-900 dark:to-primary-900 py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-black mb-4">Centre d'aide</h1>
          <p className="text-primary-200 text-lg">Comment pouvons-nous vous aider ?</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Questions fréquentes</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">{faq.q}</span>
                    <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {open === i && (
                    <div className="px-5 pb-5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Nous contacter</h2>

            <div className="flex gap-4 mb-8">
              <div className="flex-1 bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">📧</div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Email</p>
                <p className="text-primary-600 dark:text-primary-400 text-xs">contact@seformer.fr</p>
              </div>
              <div className="flex-1 bg-orange-50 dark:bg-orange-900/10 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">⏰</div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Horaires</p>
                <p className="text-orange-600 dark:text-orange-400 text-xs">Lun–Ven 9h–18h</p>
              </div>
            </div>

            {sent ? (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message envoyé !</h3>
                <p className="text-gray-500 dark:text-gray-400">Notre équipe vous répondra sous 24h.</p>
                <button onClick={() => setSent(false)} className="btn-primary mt-4 text-sm">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input" placeholder="Votre nom"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input" placeholder="votre@email.com"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sujet</label>
                  <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="input" placeholder="Objet de votre message"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input resize-none" placeholder="Décrivez votre problème ou votre question..."/>
                </div>
                <button type="submit" className="btn-primary w-full">Envoyer le message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
