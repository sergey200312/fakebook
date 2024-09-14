import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import VerificationEmailPage from './pages/VerificationEmailPage';
import PrivateRoute from './components/PrivateRoute.jsx';
import FriendsPage from './pages/FriendsPage.jsx';
import FriendsList from './components/FriendsList.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verify' element={<VerificationEmailPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/friends' element={<FriendsPage/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

