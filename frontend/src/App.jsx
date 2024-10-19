import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import VerificationEmailPage from './pages/VerificationEmailPage';
import PrivateRoute from './components/PrivateRoute.jsx';
import FriendsPage from './pages/FriendsPage.jsx';
import SentFriendsRequestPage from './pages/SentFriendsRequestPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ReceivedRequestPage from './pages/ReceivedRequestPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import UserFeed from './pages/UserFeed.jsx';
import Modal from 'react-modal';
import PostCreatePage from './pages/PostCreatePage.jsx';

Modal.setAppElement('#root')

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verify' element={<VerificationEmailPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/sent-requests" element={<SentFriendsRequestPage />} />
          <Route path="/received-requests" element={<ReceivedRequestPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path='/feed' element={ <UserFeed />} />
          <Route path='/new' element={ <PostCreatePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

