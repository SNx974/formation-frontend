import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Award } from 'lucide-react'

const SITES = [
  { name: 'Saint-Denis', address: 'Centre ville' },
  { name: 'Saint-Pierre', address: 'Centre commercial' },
  { name: 'Saint-Paul', address: 'Zone artisanale' },
  { name: 'Le Tampon', address: 'Quartier des Flamboyants' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="SYNERGIE OI" className="h-12 w-auto brightness-0 invert"/>
              <div>
                <div className="font-bold text-white text-sm">SYNERGIE OI</div>
                <div className="text-xs text-gray-400">Centre de formation</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Organisme de formation professionnelle certifié Qualiopi, implanté sur 4 sites à La Réunion.
            </p>
            <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-500/30">
              <Award className="w-3.5 h-3.5"/> Certifié Qualiopi
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/formations', label: 'Formations' },
                { to: '/a-propos', label: 'À propos' },
                { to: '/support', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-orange-400 text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sites */}
          <div>
            <h4 className="font-semibold text-white mb-4">Nos sites</h4>
            <ul className="space-y-2">
              {SITES.map(site => (
                <li key={site.name} className="flex items-start gap-1.5 text-sm text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5"/>
                  <span><span className="text-gray-300 font-medium">{site.name}</span></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0"/>
                contact@seformer.re
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0"/>
                0262 00 00 00
              </li>
              <li className="flex items-start gap-2 mt-4">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5"/>
                <span>La Réunion (974)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} SYNERGIE OI. Tous droits réservés.</p>
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
