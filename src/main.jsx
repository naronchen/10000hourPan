import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'

import EntryPage from './pages/EntryPage.jsx';
import SetUpPage from './pages/setUpPage/SetUpPage.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import LogIn from './pages/register/LogIn.jsx';
import SignUp from './pages/register/SignUp.jsx';
import CountDownPage from './pages/countDown/CountDownPage.jsx';

import ProtectedRoute from './pages/userSession/ProtectedRoute.jsx';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/setUpPage" element={
          <ProtectedRoute>
            <SetUpPage />
          </ProtectedRoute>
        } />
        <Route path="/homePage" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/focus/:goalDescription" element={
          <ProtectedRoute>
            <CountDownPage />
          </ProtectedRoute>
        } />
    </Routes>
  </BrowserRouter>
)
