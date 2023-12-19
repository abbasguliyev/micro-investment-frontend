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
import { getMeAsync, refreshTokenAsync } from './redux/AuthSlice/AuthSlice'
import { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const access = localStorage.getItem("access");

  useEffect(() => {
    if(access) {
      dispatch(getMeAsync())
      .then((res) => {
        if (res.payload == undefined) {
          localStorage.clear()
          navigate("/");
          window.location.reload();
        }
      })
    }
  }, [dispatch])
  
  useEffect(() => {
    let timerRef = null;
    try {
        const decoded = jwtDecode(access);
        const expiryTime = (new Date(decoded.exp * 1000)).getTime();
        const currentTime = (new Date()).getTime();

        const timeout = expiryTime - currentTime;

        const onExpire = () => {
            const refresh = localStorage.getItem("refresh");
            if (refresh) {
                console.log("Burdayam1");
                localStorage.clear()
                navigate("/");
                window.location.reload();
                // dispatch(refreshTokenAsync({"refresh": refresh}))
            } else {
                console.log("Burdayam2");
                navigate("/login");
            }
        };

        if (timeout > 0) {
            // token not expired, set future timeout to log out and redirect
            timerRef = setTimeout(onExpire, timeout);
        } else {
            console.log("Burdayam3");
            // token expired, log out and redirect
            onExpire();
        }
    } catch (error) {
        localStorage.clear()
        navigate("/login");
    }
    
    return () => {
        clearTimeout(timerRef);
    };
  }, []);

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
                      {
                        <Route path='/admin' element={<Outlet/>}>
                          <Route path='' element={<Admin/>} />
                          <Route path='user-create' element={<AdminUserCreate/>} />
                        </Route>
                      }                    
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
