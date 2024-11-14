import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Navbar from './components/Navbar'
import Workouts from './routes/Workouts'
import Login from './routes/Login'
import Register from './routes/Register'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  const [user, setUser] = useState(null)

  useEffect(() => { 
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) { 
      setUser(JSON.parse(storedUser)); 
    } 
  }, []);

  return (
    <>
      <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />} />
          <Route path='/workouts' element={ 
            <ProtectedRoute user={user}> 
              <Workouts /> 
            </ProtectedRoute> } />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
