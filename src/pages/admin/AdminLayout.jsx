import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const nav = [
  { path: '/admin', label: 'Tableau de bord', icon: '📊', exact: true },
  { path: '/admin/formations', label: 'Formations', icon: '📚' },
  { path: '/admin/users', label: 'Utilisateurs', icon: '👥' },
  { path: '/admin/enrollments', label: 'Inscriptions', icon: '📋' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const isActive = (item) => item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} flex-shrink-0 bg-gray-900 dark:bg-gray-950 text-white flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black">S</span>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-white truncate">SE FORMER</div>
              <div className="text-xs text-orange-400 font-semibold">Administration</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${isActive(item)
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-800 space-y-2">
          <Link to="/" className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors`}>
            <span className="flex-shrink-0">🌐</span>
            {sidebarOpen && <span>Voir le site</span>}
          </Link>
          <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-900/20 transition-colors`}>
            <span className="flex-shrink-0">🚪</span>
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <h1 className="font-bold text-gray-900 dark:text-white text-lg">
              {nav.find(n => isActive(n))?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {dark ? '☀️' : '🌙'}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
