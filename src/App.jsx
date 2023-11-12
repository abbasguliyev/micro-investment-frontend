import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFoundPage from './pages/NotFoundPage'
import About from './pages/About'
import EntrepreneurDetail from './pages/EntrepreneurDetail'
import Footer from './components/Footer'
import ProfileUpdate from './pages/ProfileUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { getMeAsync } from './redux/AuthSlice/AuthSlice'
import { useEffect } from 'react'
import EntrepreneurCreate from './pages/EntrepreneurCreate'
import EntrepreneurImageCreate from './components/EntrepreneurImageCreate'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const access = localStorage.getItem("access");
  let me = useSelector((state) => state.auth.me)
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    dispatch(getMeAsync());
  }, [dispatch])

  return (
    <>
        {
          !access ? (
            <>
              <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='*' element={<NotFoundPage/>} />
              </Routes>
            </>
          ) : (
            <div className='flex flex-col h-screen justify-between'>
                <div>
                  <Header />
                  <div>
                    <Routes>
                      <Route path='/' element={<Home/>} />
                      <Route path='/about' element={<About/>} />
                      <Route path='/entrepreneur-detail/:id' element={<EntrepreneurDetail/>} />
                      <Route path='/entrepreneur' element={<EntrepreneurCreate/>} />
                      <Route path='/entrepreneur-image-create' element={<EntrepreneurImageCreate/>} />
                      <Route path='/profile' element={<Outlet/>}>
                        <Route path='' element={<Profile/>} />
                        <Route path='profile-update' element={<ProfileUpdate/>} />
                      </Route>
                      <Route path='/login' element={<Login/>} />
                      <Route path='/register' element={<Register/>} />
                      <Route path='*' element={<NotFoundPage/>} />
                    </Routes>
                  </div>
                </div>
                <Footer />
            </div>
          )
        }
    </>
  )
}

export default App
