import {Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
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
import {useDispatch, useSelector} from 'react-redux'
import EntrepreneurCreate from './pages/EntrepreneurCreate'
import EntrepreneurImageCreate from './components/EntrepreneurImageCreate'
import ExperienceCreate from './pages/ExperienceCreate'
import EducationCreate from './pages/EducationCreate'
import EducationUpdate from './pages/EducationUpdate'
import ExperienceUpdate from './pages/ExperienceUpdate'
import AdminUserCreate from './pages/Admin/AdminUsers/AdminUserCreate'
import Admin from './pages/Admin'
import {useEffect, useState} from 'react'
import EntrepreneurUpdate from './pages/EntrepreneurUpdate'
import {getMeAsync, refreshTokenAsync} from './redux/AuthSlice/AuthSlice'
import {jwtDecode} from "jwt-decode";
import ForgotPassword from './pages/ForgotPassword'
import ForgotChangePassword from './pages/ForgotChangePassword'
import {getAllNotificationsAsync} from './redux/NotificationSlice/NotificationSlice'
import AdminUsers from "./pages/Admin/AdminUsers/index.jsx";
import AdminInvestments from "./pages/Admin/AdminInvestments/index.jsx";
import AdminEntrepreneurs from "./pages/Admin/AdminEntrepreneurs/index.jsx";
import AdminDebtFund from "./pages/Admin/AdminDebtFund/index.jsx";
import AdminInvestorPayments from "./pages/Admin/AdminInvestorPayments/index.jsx";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    let path = location.pathname;

    const access = localStorage.getItem("access");
    let me = useSelector(state => state.auth.me)

    useEffect(() => {
        dispatch(getAllNotificationsAsync({user: me && me.id, offset: 0}))
    })

    useEffect(() => {
        if (access) {
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
        if (access) {
            try {
                const decoded = jwtDecode(access);
                const expiryTime = (new Date(decoded.exp * 1000)).getTime();
                const currentTime = (new Date()).getTime();

                const timeout = expiryTime - currentTime;

                const onExpire = () => {
                    const refresh = localStorage.getItem("refresh");
                    if (refresh) {
                        localStorage.clear()
                        navigate("/");
                        window.location.reload();
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
                localStorage.clear()
                navigate("/login");
            }
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
                            <Route path='/' element={<Login/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/reset-password' element={<ForgotPassword/>}/>
                            <Route path='/reset-password-confirm/:token' element={<ForgotChangePassword/>}/>
                            <Route path='*' element={<NotFoundPage/>}/>
                        </Routes>
                    </>
                ) : (
                    path.includes("admin") ? (
                        <div className='flex flex-col h-screen justify-between'>
                            <div>
                                <Header/>
                                <Admin/>
                                <div>
                                    <Routes>
                                        {
                                            <Route path='/admin' element={<Outlet/>}>
                                                <Route path='' element={<AdminUsers/>}/>
                                                <Route path='users' element={<Outlet />}>
                                                    <Route path='' element={<AdminUsers/>}/>
                                                    <Route path='user-create' element={<AdminUserCreate/>}/>
                                                </Route>
                                                <Route path='investments' element={<AdminInvestments/>}/>
                                                <Route path='entrepreneurs' element={<AdminEntrepreneurs/>}/>
                                                <Route path='debt-fund' element={<AdminDebtFund/>}/>
                                                <Route path='investor-payments' element={<AdminInvestorPayments/>}/>
                                            </Route>
                                        }
                                    </Routes>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                        ) : (
                        <div className='flex flex-col h-screen justify-between'>
                            <div>
                                <Header/>
                                <div>
                                    <Routes>
                                        <Route path='/' element={<Home/>}/>
                                        <Route path='/about' element={<About/>}/>
                                        <Route path='/entrepreneur-detail/:id' element={<EntrepreneurDetail/>}/>
                                        <Route path='/entrepreneur-update/:id' element={<EntrepreneurUpdate/>}/>
                                        <Route path='/entrepreneur' element={<EntrepreneurCreate/>}/>
                                        <Route path='/entrepreneur-image-create' element={<EntrepreneurImageCreate/>}/>
                                        <Route path='/profile' element={<Outlet/>}>
                                            <Route path=':id' element={<Profile/>}/>
                                            <Route path=':id/profile-update' element={<ProfileUpdate/>}/>
                                        </Route>
                                        <Route path='/login' element={<Login/>}/>
                                        <Route path='/experience-create' element={<ExperienceCreate/>}/>
                                        <Route path='/education-create' element={<EducationCreate/>}/>
                                        <Route path='/education-update/:id' element={<EducationUpdate/>}/>
                                        <Route path='/experience-update/:id' element={<ExperienceUpdate/>}/>
                                        <Route path='/login' element={<Login/>}/>
                                        <Route path='/register' element={<Register/>}/>
                                        <Route path='/reset-password' element={<ForgotPassword/>}/>
                                        <Route path='/reset-password-confirm/:token' element={<ForgotChangePassword/>}/>
                                        <Route path='*' element={<NotFoundPage/>}/>
                                    </Routes>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    )
                )
            }
        </>
    )
}

export default App
