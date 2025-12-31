import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quartos from './pages/Quartos'
import Galeria from './pages/Galeria'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import SuiteImperial from './pages/suites/SuiteImperial'
import SuiteLuxo from './pages/suites/SuiteLuxo'
import SuitePremium from './pages/suites/SuitePremium'
import SuiteExclusiva from './pages/suites/SuiteExclusiva'
import Quarto1 from './pages/suites/Quarto1'
import Quarto2 from './pages/suites/Quarto2'
import Quarto3 from './pages/suites/Quarto3'
import Quarto4 from './pages/suites/Quarto4'
import Quarto5 from './pages/suites/Quarto5'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Financeiro from './pages/admin/Financeiro'
import Reservas from './pages/admin/Reservas'
import QuartosAdmin from './pages/admin/Quartos'
import Historico from './pages/admin/Historico'
import Gerenciamento from './pages/admin/Gerenciamento'
import Despesas from './pages/admin/Despesas'
import Planilha from './pages/admin/Planilha'
import DatabaseViewer from './pages/admin/DatabaseViewer'
import BackupManager from './pages/admin/BackupManager'
import Booking from './pages/Booking'
import Airbnb from './pages/Airbnb'
import QuartosDisponiveis from './pages/QuartosDisponiveis'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
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
        <Route path="/booking" element={<Booking />} />
        <Route path="/airbnb" element={<Airbnb />} />
        <Route path="/quartos-disponiveis" element={<QuartosDisponiveis />} />
      </Routes>
    </Router>
  )
}

export default App

