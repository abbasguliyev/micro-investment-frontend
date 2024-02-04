import {useEffect, useState} from 'react'
import {NavLink, useLocation, useNavigate, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import EntreprenuerTable from '../../components/Profile/EntreprenuerTable'
import Education from '../../components/Profile/Education'
import Experience from '../../components/Profile/Experience'
import {changePasswordAsync, getMeAsync, getUserDetailAsync, resetAuthSlice} from '../../redux/AuthSlice/AuthSlice'
import Investments from '../../components/Profile/Investments'
import ResponseMessage from '../../components/ResponseMessage'
import {resetEducationSlice} from '../../redux/EducationSlice/EducationSlice'
import {resetExperienceSlice} from '../../redux/ExperienceSlice/ExperienceSlice'
import {useFormik} from 'formik'
import {Modal} from 'antd'
import AuthInput from '../../components/InputComponents/AuthInput'
import style from "./style.module.css"
import PaymentTable from '../../components/Profile/PaymentTable'
import {CgSpinner} from 'react-icons/cg'
import DebtFund from "../../components/Profile/DebtFund/index.jsx";

function Profile() {
    let {id} = useParams();
    const [showTab, setShowTab] = useState(<Investments />);
    const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false);
    const [title, setTitle] = useState("Yatırımlarım");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let me = useSelector((state) => state.auth.me)
    let user = useSelector((state) => state.auth.user)
    let isLoading = useSelector((state) => state.auth.isLoading)
    let successMsg = useSelector((state) => state.auth.successMsg)
    let errorMsg = useSelector((state) => state.auth.error)
    let educationSuccessMsg = useSelector((state) => state.education.successMsg)
    let educationErrorMsg = useSelector((state) => state.education.error)
    let experienceSuccessMsg = useSelector((state) => state.experience.successMsg)
    let experienceErrorMsg = useSelector((state) => state.experience.error)
    let investmentSuccessMsg = useSelector((state) => state.investment.successMsg)
    let investmentErrorMsg = useSelector((state) => state.investment.error)


    useEffect(() => {
        dispatch(getMeAsync())
            .then((res) => {
                if (res.payload) {
                    if (res.payload.user.is_staff === true) {
                        dispatch(getUserDetailAsync({"id": id ? id : ""}))
                    } else if (parseInt(id) === parseInt(res.payload.id)) {
                        dispatch(getUserDetailAsync({"id": id ? id : ""}))
                    } else {
                        navigate("/")
                    }
                } else {
                    navigate("/")
                }
            })

    }, [dispatch])

    // ENTREPRENEUR DELETE SHOW MODAL
    const showPasswordChangeModal = () => {
        setIsPasswordChangeModalOpen(true);
    };

    const handlePasswordChangeModalOk = () => {
        setIsPasswordChangeModalOpen(false);
        dispatch(changePasswordAsync({"investor": user && user.id, "new_password": formik.values.new_password}))
    };

    const handlePasswordChangeModalCancel = () => {
        setIsPasswordChangeModalOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            new_password: "",
        },
        onSubmit: (values) => {
            values.investor = user && user.id
            dispatch(changePasswordAsync(values))
        }
    })

    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 w-full">
            {errorMsg && (<ResponseMessage message={errorMsg} type="error" slice={resetAuthSlice()}/>)}
            {successMsg && (<ResponseMessage message={successMsg} type="success" slice={resetAuthSlice()}/>)}
            {educationErrorMsg && (<ResponseMessage message={educationErrorMsg} type="error" slice={resetEducationSlice()}/>)}
            {educationSuccessMsg && (<ResponseMessage message={educationSuccessMsg} type="success" slice={resetEducationSlice()}/>)}
            {experienceErrorMsg && (<ResponseMessage message={experienceErrorMsg} type="error" slice={resetExperienceSlice()}/>)}
            {experienceSuccessMsg && (<ResponseMessage message={experienceSuccessMsg} type="success" slice={resetExperienceSlice()}/>)}
            {investmentErrorMsg && (<ResponseMessage message={investmentErrorMsg} type="error" slice={resetEducationSlice()}/>)}
            {investmentSuccessMsg && (<ResponseMessage message={investmentSuccessMsg} type="success" slice={resetEducationSlice()}/>)}

            <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row'>
                {
                    isLoading ? (
                        <div className='w-full flex justify-center h-96'>
                            <CgSpinner className='animate-spin text-lg self-center'/>
                        </div>
                    ) : (
                        <>
                            <div className='w-full sm:w-full md:w-2/5 lg:w-2/5 xl:md:w-2/5 h-96 border mr-2 mb-2 rounded drop-shadow'>
                                <div className='flex flex-col'>
                                    {
                                        user && user.profile_picture ?
                                            (
                                                <img src={user.profile_picture} alt="default1" className='w-32 h-32 mt-2 self-center object-cover rounded-full'/>
                                            )
                                            : (
                                                <img src="/images/default_avatar.png" alt="default" className='w-32 h-32 mt-2 self-center object-cover rounded-full'/>
                                            )
                                    }
                                    <hr className='my-4'/>
                                    <div className='px-5 h-52 flex flex-col overflow-auto'>
                                        <h4 className='text-lg font-bold self-center mb-4'>Statistika</h4>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Öz sərmayə:</p>
                                            <span>
                            {
                                user ? <>{user && user.own_investment} AZN</> : "-"
                            }
                          </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Ümumi yatırım:</p>
                                            <span>
                            {
                                user ? <>{user && user.investment_count} AZN</> : "-"
                            }
                          </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Qazandığı mənfəət:</p>
                                            <span>
                            {
                                user ? <>{user && user.profit_earned} AZN</> : "-"
                            }
                          </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Fonda verilən borc:</p>
                                            <span>
                            {
                                user ? <>{user && user.money_given_to_a_debt_fund_count} AZN</> : "-"
                            }
                          </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Fonda verilən sədəqə:</p>
                                            <span>
                            {
                                user ? <>{user && user.money_given_to_a_charity_fund_count} AZN</> : "-"
                            }
                          </span>
                                        </div>
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full sm:w-full md:w-3/5 lg:w-3/5 xl:md:w-3/5 h-96 mb-2 border rounded drop-shadow-md'>
                                <div className='w-full h-20 mb-20 md:mb-20 lg:mb-20 xl:mb-4 flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                    <div>
                                        <p className='md:text-4xl lg:text-4xl xl:text-5xl m-4'>
                                            {
                                                user ? <>
                                                    {
                                                        user.user ? <>
                                                            {user.user.first_name} {user.user.last_name}
                                                        </> : ""
                                                    }
                                                </> : ""
                                            }
                                        </p>
                                        <div className='flex m-4'>
                                            <NavLink onClick={() => showPasswordChangeModal(true)} className={`rounded btn-main-bg text-xs w-30 h-8 p-2 mr-2`}>Şifrə
                                                Yenilə</NavLink>
                                            <p className='text-2xl'>Balans: {user && user.user ? user.user.balance : 0} AZN</p>
                                        </div>
                                    </div>
                                    {
                                        me && me.id == id && <NavLink to="profile-update" className={`rounded btn-main-bg w-50 h-10 p-2 m-4`}>Məlumatları Dəyiş</NavLink>
                                    }
                                </div>
                                <div className={`w-full h-72 flex flex-col justify-between p-4 rounded overflow-auto`}>
                                    <div className='mb-20 md:mb-20 lg:mb-20 xl:mb-4 overflow-auto'>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Email:</p>
                                            <span>
                          {
                              user ? <>
                                  {
                                      user.user ? <>
                                          {user.user.email}
                                      </> : ""
                                  }
                              </> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Telefon nömrəsi:</p>
                                            <span>
                          {
                              user ? <>{user.phone_number}</> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Doğum tarixi:</p>
                                            <span>
                          {
                              user ? <>{user.birthdate}</> : "-"
                          } 
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Ünvan:</p>
                                            <span>
                          {
                              user ? <>{user.address}</> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Evlilik statusu:</p>
                                            <span>
                          {
                              user ? <>
                                  {
                                      user.marital_status === "single" ? "Subay" : "Evli"
                                  }
                              </> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>İşləmə statusu:</p>
                                            <span>
                          {
                              user ? <>
                                  {
                                      user.employment_status === "working" ? "İşləyir" : "İşləmir"
                                  }
                              </> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Ev statusu:</p>
                                            <span>
                          {
                              user ? <>
                                  {
                                      user.housing_status === "own home" ? "Şəxsi ev" : "Kirayə"
                                  }
                              </> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                                            <p className='text-slate-400'>Kredit kartı nömrəsi:</p>
                                            <span>
                          {
                              user ? <>{user.credit_cart_number}</> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-col'>
                                            <p className='text-slate-400'>Haqqında:</p>
                                            <span className='place-items-end'>
                          {
                              user ? <>{
                                  user.about ? <>{user.about}</> : "-"
                              }</> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-col'>
                                            <p className='text-slate-400'>Biznes fəaliyytələri:</p>
                                            <span className='place-items-end'>
                          {
                              user ? <>{
                                  user.business_activities ? <>{user.business_activities}</> : "-"
                              }</> : "-"
                          }
                        </span>
                                        </div>
                                        <hr/>
                                        <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-col'>
                                            <p className='text-slate-400'>Referanslar:</p>
                                            {
                                                user && user.references ? (
                                                    user.references.map((ref, i) => (
                                                        <span key={`referance-${i + 1}`} className='place-items-end'>
                                    <p>{i + 1}. {ref.first_name} {ref.last_name} | {ref.email}</p>
                                  </span>
                                                    ))
                                                ) : "-"
                                            }
                                        </div>
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            <div className='w-full h-96 border pt-4 mt-5 mr-2 pb-7 rounded drop-shadow-md overflow-auto'>
                <div>
                    <button onClick={() => {
                        setShowTab(<Investments />)
                        setTitle("Yatırımlarım")
                    }} className={`p-2 ml-2 mt-2 rounded btn-main-bg`}>Yatırımlar
                    </button>
                    <button onClick={() => {
                        setShowTab(<EntreprenuerTable />)
                        setTitle("Lahiyələrim")
                    }} className={`p-2 ml-2 mt-2 rounded btn-main-bg`}>Lahiyələr
                    </button>
                    <button onClick={() => {
                        setShowTab(<PaymentTable />)
                        setTitle("Ödənişlərim")
                    }} className={`p-2 ml-2 mt-2 rounded btn-main-bg`}>Ödənişlər
                    </button>
                    <button onClick={() => {
                        setShowTab(<Education />)
                        setTitle("Təhsilim")
                    }} className={`p-2 ml-2 mt-2 rounded btn-main-bg`}>Təhsil
                    </button>
                    <button onClick={() => {
                        setShowTab(<Experience />)
                        setTitle("Təcrübələrim")
                    }} className={`p-2 ml-2 mt-2 rounded btn-main-bg`}>Təcrübə
                    </button>
                    <button onClick={() => {
                        setShowTab(<DebtFund />)
                        setTitle("Borc Fondu")
                    }} className={`p-2 ml-2 mt-2 rounded btn-main-bg`}>Borc Fondu
                    </button>
                </div>
                <div>
                    <h4 className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col text-lg text-xl font-bold'>{title}</h4>

                    {
                        showTab
                    }
                </div>
            </div>
            <Modal
                title={`Şifrəni daxil edin:`}
                okType="default"
                open={isPasswordChangeModalOpen}
                onOk={handlePasswordChangeModalOk}
                onCancel={handlePasswordChangeModalCancel}
            >
                {
                    <AuthInput
                        label="Yeni şifrə"
                        id="new_password"
                        name="new_password"
                        type="password"
                        value={formik.values.new_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.new_password}
                        error={formik.errors.new_password}
                        style={style}
                    />
                }
            </Modal>
        </div>
    )
}

export default Profile