import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">SE FORMER, ÉVOLUER</div>
                <div className="text-xs text-gray-400">La SYNERGIE de nos compétences</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Plateforme de formation en ligne dédiée à votre montée en compétences. Des formations de qualité, accessibles à tous.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/formations', label: 'Formations' },
                { to: '/a-propos', label: 'À propos' },
                { to: '/support', label: 'Support' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-orange-400 text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                contact@seformer.fr
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +33 1 23 45 67 89
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 SE FORMER, ÉVOLUER. Tous droits réservés.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-gray-300 transition-colors">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
