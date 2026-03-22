const team = [
  { name: 'Marie Leclerc', role: 'Directrice pédagogique', bio: 'Experte en ingénierie pédagogique, 15 ans d\'expérience dans la formation professionnelle.', initial: 'M' },
  { name: 'Ahmed Benali', role: 'Responsable technique', bio: 'Docteur en informatique, spécialiste en intelligence artificielle et data science.', initial: 'A' },
  { name: 'Sophie Martin', role: 'Responsable UX/Design', bio: 'Designer produit senior, ancienne lead designer chez plusieurs startups reconnues.', initial: 'S' },
  { name: 'Thomas Bernard', role: 'Expert cybersécurité', bio: 'Certifié CISSP, consultant en sécurité informatique pour des grands comptes.', initial: 'T' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-gray-900 dark:to-primary-900 py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-black mb-4">À propos de nous</h1>
          <p className="text-primary-200 text-lg">
            La SYNERGIE de nos compétences au service de votre formation
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Notre mission</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2 mb-6">
              Rendre la formation accessible à tous
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              SE FORMER, ÉVOLUER est née de la conviction que chacun mérite d'avoir accès à une formation de qualité, peu importe son parcours ou sa situation géographique.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Notre équipe de formateurs experts conçoit des contenus pédagogiques rigoureux, pratiques et directement applicables dans le monde professionnel.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Nous croyons en la synergie : le mélange de compétences diverses crée une valeur supérieure à la somme des parties. C'est cette philosophie qui anime chacune de nos formations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Mission', desc: 'Former et élever les compétences de chacun vers l\'excellence professionnelle.' },
              { icon: '🔭', title: 'Vision', desc: 'Devenir la référence francophone en formation professionnelle digitale.' },
              { icon: '💡', title: 'Innovation', desc: 'Contenus constamment mis à jour pour refléter les dernières tendances.' },
              { icon: '🤝', title: 'Engagement', desc: 'Un accompagnement humain et personnalisé tout au long de votre parcours.' },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-primary-50 to-orange-50 dark:from-primary-900/20 dark:to-orange-900/10 rounded-2xl p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Nos valeurs</span>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">Ce qui nous guide</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { icon: '⭐', title: 'Excellence', desc: 'Nous exigeons le meilleur de nous-mêmes pour vous offrir des formations d\'une qualité irréprochable.' },
            { icon: '🌱', title: 'Croissance', desc: 'Nous accompagnons votre évolution professionnelle avec des contenus qui grandissent avec vous.' },
            { icon: '🔗', title: 'Synergie', desc: 'Nos formateurs collaborent pour créer des parcours cohérents et enrichis par la diversité des expertises.' },
          ].map((v, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">{v.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Notre équipe</span>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">Des experts à votre service</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-orange-400 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                {m.initial}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{m.name}</h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-2">{m.role}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
