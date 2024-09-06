import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import VerifyEmail from './pages/VerifyEmail';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='/verify' element={<VerifyEmail/>} />
      </Routes>
    </Router>
  )
}

export default App

