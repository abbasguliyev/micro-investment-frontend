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
import { useDispatch } from 'react-redux'
import EntrepreneurCreate from './pages/EntrepreneurCreate'
import EntrepreneurImageCreate from './components/EntrepreneurImageCreate'
import ExperienceCreate from './pages/ExperienceCreate'
import EducationCreate from './pages/EducationCreate'
import EducationUpdate from './pages/EducationUpdate'
import ExperienceUpdate from './pages/ExperienceUpdate'
import AdminUserCreate from './pages/Admin/AdminUsers/AdminUserCreate'
import Admin from './pages/Admin'
import { useEffect, useState } from 'react'
import EntrepreneurUpdate from './pages/EntrepreneurUpdate'
import { refreshTokenAsync } from './redux/AuthSlice/AuthSlice'
import { jwtDecode } from "jwt-decode";

function App() {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      const access = localStorage.getItem("access");
      setToken(access)

      let timerRef = null;
      try {
        const decoded = jwtDecode(access);
        const expiryTime = (new Date(decoded.exp * 1000)).getTime();
        const currentTime = (new Date()).getTime();

        const timeout = expiryTime - currentTime;
        const onExpire = () => {
            const refresh = localStorage.getItem("refresh");
            if (refresh) {
              dispatch(refreshTokenAsync({"refresh": refresh}))
            } else {
              navigate("/login");
            }
        };

        if (timeout > 0) {
          // token not expired, set future timeout to log out and redirect
          timerRef = setTimeout(onExpire, timeout);
        } else {
          // token expired, log out and redirect
          onExpire();
        }
      } catch (error) {
        navigate("/login");
      }
      
      return () => {
        clearTimeout(timerRef);
      };
  }, [token]);

  // useEffect(()=>{
  //   const REFRESH_INTERVAL = 1000 * 60 * 3 // 4 minutes
  //   let interval = setInterval(()=>{
  //       const refresh = localStorage.getItem("refresh");
  //       if (refresh) {
  //         dispatch(refreshTokenAsync({"refresh": refresh}))
  //       }
  //   }, REFRESH_INTERVAL)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <>
        {
          !token ? (
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
                      <Route path='/entrepreneur-update/:id' element={<EntrepreneurUpdate/>} />
                      <Route path='/entrepreneur' element={<EntrepreneurCreate/>} />
                      <Route path='/entrepreneur-image-create' element={<EntrepreneurImageCreate/>} />
                      <Route path='/profile' element={<Outlet/>}>
                        <Route path='' element={<Profile/>} />
                        <Route path='profile-update' element={<ProfileUpdate/>} />
                      </Route>
                      <Route path='/login' element={<Login/>} />
                      <Route path='/experience-create' element={<ExperienceCreate/>} />
                      <Route path='/education-create' element={<EducationCreate/>} />
                      <Route path='/education-update/:id' element={<EducationUpdate/>} />
                      <Route path='/experience-update/:id' element={<ExperienceUpdate/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/register' element={<Register/>} />
                      <Route path='*' element={<NotFoundPage/>} />
                      <Route path='/admin' element={<Outlet/>}>
                        <Route path='' element={<Admin/>} />
                        <Route path='user-create' element={<AdminUserCreate/>} />
                      </Route>
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
