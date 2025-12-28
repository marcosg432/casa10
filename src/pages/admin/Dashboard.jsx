import Financeiro from './Financeiro'

// Dashboard agora é protegido pelo ProtectedRoute no App.jsx
// Não precisa mais verificar autenticação aqui
const Dashboard = () => {
  return <Financeiro />
}

export default Dashboard



