import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import './App.css'
import AuditForm from './components/AuditForm';

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<AuditForm />}/>
    </Routes>
      
    </>
  )
}

export default App
