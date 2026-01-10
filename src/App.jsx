import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute'

// Importação direta apenas da Home (página principal - carregamento imediato)
import Home from './pages/Home'

// Lazy loading para todas as outras páginas (code splitting)
const Quartos = lazy(() => import('./pages/Quartos'))
const Galeria = lazy(() => import('./pages/Galeria'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Contato = lazy(() => import('./pages/Contato'))
const SuiteImperial = lazy(() => import('./pages/suites/SuiteImperial'))
const SuiteLuxo = lazy(() => import('./pages/suites/SuiteLuxo'))
const SuitePremium = lazy(() => import('./pages/suites/SuitePremium'))
const SuiteExclusiva = lazy(() => import('./pages/suites/SuiteExclusiva'))
const Quarto1 = lazy(() => import('./pages/suites/Quarto1'))
const Quarto2 = lazy(() => import('./pages/suites/Quarto2'))
const Quarto3 = lazy(() => import('./pages/suites/Quarto3'))
const Quarto4 = lazy(() => import('./pages/suites/Quarto4'))
const Quarto5 = lazy(() => import('./pages/suites/Quarto5'))
const Carrinho = lazy(() => import('./pages/Carrinho'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Financeiro = lazy(() => import('./pages/admin/Financeiro'))
const Reservas = lazy(() => import('./pages/admin/Reservas'))
const QuartosAdmin = lazy(() => import('./pages/admin/Quartos'))
const Historico = lazy(() => import('./pages/admin/Historico'))
const Gerenciamento = lazy(() => import('./pages/admin/Gerenciamento'))
const Despesas = lazy(() => import('./pages/admin/Despesas'))
const Planilha = lazy(() => import('./pages/admin/Planilha'))
const DatabaseViewer = lazy(() => import('./pages/admin/DatabaseViewer'))
const BackupManager = lazy(() => import('./pages/admin/BackupManager'))
const QuartosDisponiveis = lazy(() => import('./pages/QuartosDisponiveis'))
const Hostel = lazy(() => import('./pages/Hostel'))
const CasaDeCima = lazy(() => import('./pages/CasaDeCima'))

// Componente de loading durante carregamento lazy (otimizado)
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    fontSize: '18px',
    color: '#666',
    backgroundColor: '#fff'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <span>Carregando...</span>
  </div>
)

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quartos" element={<Quartos />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/quarto-duplo-banheiro-privado" element={<SuiteImperial />} />
          <Route path="/quarto-deluxe" element={<SuiteLuxo />} />
          <Route path="/quarto-duplo-amplo" element={<SuitePremium />} />
          <Route path="/quarto-duplo-standard" element={<SuiteExclusiva />} />
          <Route path="/casa10inn" element={<Quarto1 />} />
          <Route path="/quarto-1" element={<Quarto2 />} />
          <Route path="/quarto-2" element={<Quarto3 />} />
          <Route path="/quarto-3" element={<Quarto4 />} />
          <Route path="/quarto-4" element={<Quarto5 />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/financeiro" element={<ProtectedRoute><Financeiro /></ProtectedRoute>} />
          <Route path="/admin/reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} />
          <Route path="/admin/quartos" element={<ProtectedRoute><QuartosAdmin /></ProtectedRoute>} />
          <Route path="/admin/historico" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
          <Route path="/admin/gerenciamento" element={<ProtectedRoute><Gerenciamento /></ProtectedRoute>} />
          <Route path="/admin/despesas" element={<ProtectedRoute><Despesas /></ProtectedRoute>} />
          <Route path="/admin/planilha" element={<ProtectedRoute><Planilha /></ProtectedRoute>} />
          <Route path="/admin/database" element={<ProtectedRoute><DatabaseViewer /></ProtectedRoute>} />
          <Route path="/admin/backup" element={<ProtectedRoute><BackupManager /></ProtectedRoute>} />
          <Route path="/quartos-disponiveis" element={<QuartosDisponiveis />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/casa-de-cima" element={<CasaDeCima />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

