import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import FeedbackForm from './FeedbackForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} /> {/* Redirect root to /register */}
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/feedbackform" element={<FeedbackForm />} />
    </Routes>
  )
}

export default App
