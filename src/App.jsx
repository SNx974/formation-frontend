import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Formations from './pages/Formations'
import FormationDetail from './pages/FormationDetail'
import About from './pages/About'
import Support from './pages/Support'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminFormations from './pages/admin/AdminFormations'
import AdminFormationEdit from './pages/admin/AdminFormationEdit'
import AdminUsers from './pages/admin/AdminUsers'
import AdminEnrollments from './pages/admin/AdminEnrollments'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

function Spinner() {
  return (
    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
  )
}

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes with header/footer */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/formations" element={<MainLayout><Formations /></MainLayout>} />
            <Route path="/formations/:id" element={<MainLayout><FormationDetail /></MainLayout>} />
            <Route path="/a-propos" element={<MainLayout><About /></MainLayout>} />
            <Route path="/support" element={<MainLayout><Support /></MainLayout>} />
            <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
            <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

            {/* Protected user route */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout><Dashboard /></MainLayout>
              </ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="formations" element={<AdminFormations />} />
              <Route path="formations/new" element={<AdminFormationEdit />} />
              <Route path="formations/:id/edit" element={<AdminFormationEdit />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="enrollments" element={<AdminEnrollments />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
