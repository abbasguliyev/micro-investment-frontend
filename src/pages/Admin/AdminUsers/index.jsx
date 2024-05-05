import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteUserAsync, getAllUsersAsync, putUserProfileAsync, resetAuthSlice } from "../../../redux/AuthSlice/AuthSlice";
import { MdDelete } from "react-icons/md";
import { Modal, Pagination } from "antd";
import ResponseMessage from "../../../components/ResponseMessage";
import AuthInput from "../../../components/InputComponents/AuthInput";
import style from "./style.module.css"
import { useFormik } from "formik";
import RadioInput from "../../../components/InputComponents/RadioInput";


function AdminUsers() {
    let [currentPage, setCurrentPage] = useState(1);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();

    const showModal = (id) => {
        setIsUserModalOpen(true);
        setUserId(id)
    };

    const handleOk = () => {
        setIsUserModalOpen(false);
        dispatch(deleteUserAsync({"id": userId}))
        .then(() => {
            dispatch(getAllUsersAsync(filterFormik.values))
        })
    };

    const handleCancel = () => {
        setIsUserModalOpen(false);
    };
    
    let users = useSelector((state) => state.auth.users)
    const errorMsg = useSelector((state) => state.auth.error);
    const successMsg = useSelector((state) => state.auth.successMsg);
    let totalPage = useSelector((state) => state.auth.totalPage)
    let pageLimit = useSelector((state) => state.auth.pageLimit)

    const filterFormik = useFormik({
        initialValues: {
            offset: "",
            fullname: "",
            is_active: "",
            birthdate: "",
            marital_status: "",
            employment_status: "",
            housing_status: "",
            phone_number: "",
            monthly_income: "",
            monthly_income__gte: "",
            monthly_income__lte: ""

        },
        onSubmit: (values) => {
            dispatch(getAllUsersAsync(values));
        },
    })


    useEffect(() => {
        dispatch(getAllUsersAsync({"offset": 0, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": "", "is_active": ""}))
    }, [dispatch])


    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        filterFormik.values.offset = offset;
        let filteredValues = { ...filterFormik.values };
        dispatch(getAllUsersAsync(filteredValues));
    };

    const changeUserActivity = (user) => {
        dispatch(putUserProfileAsync({"id": user.id, "is_active": !user.user.is_active}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            filterFormik.values.offset = offset;
            let filteredValues = { ...filterFormik.values };
            dispatch(getAllUsersAsync(filteredValues))
        })
    }

    const changeUserIsSuperuserStatus = (user) => {
        dispatch(putUserProfileAsync({"id": user.id, "is_superuser": !user.user.is_superuser}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            filterFormik.values.offset = offset;
            let filteredValues = { ...filterFormik.values };
            dispatch(getAllUsersAsync(filteredValues))
        })
    }


    return (
        <>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col mt-4">
                <NavLink
                    to="/admin/users/user-create"
                    className={`rounded btn-main-bg text-center w-40 h-10 p-2 m-8`}
                >
                    Yeni əlavə et
                </NavLink>
                <div className="w-full flex flex-row flex-wrap">
                    {errorMsg && (
                        <ResponseMessage
                            message={errorMsg}
                            type="error"
                            slice={resetAuthSlice()}
                        />
                    )}
                    {successMsg && (
                        <ResponseMessage
                            message={successMsg}
                            type="success"
                            slice={resetAuthSlice()}
                        />
                    )}
                    <div className="w-full sm:w-full md:w-full lg:w-1/5 pr-3">
                        <b>Filter</b>
                        <form className='rounded h-2/4 mb-5 mt-2 flex flex-col' onSubmit={filterFormik.handleSubmit}>
                            <AuthInput
                                label="Adı"
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={filterFormik.values.fullname}
                                onChange={filterFormik.handleChange}
                                onBlur={filterFormik.handleBlur}
                                touched={filterFormik.touched.fullname}
                                error={filterFormik.errors.fullname}
                                style={"mb-2"}
                            />
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Aktiv/Deaktiv
                                </label>
                                <div className="mt-2">
                                    <RadioInput
                                        label="Aktiv"
                                        id="active"
                                        name="is_active"
                                        type="radio"
                                        value={true}
                                        onChange={filterFormik.handleChange}
                                        onBlur={filterFormik.handleBlur}
                                        style={style}
                                    />
                                    <RadioInput
                                        label="Deaktiv"
                                        id="deactive"
                                        name="is_active"
                                        type="radio"
                                        value={false}
                                        onChange={filterFormik.handleChange}
                                        onBlur={filterFormik.handleBlur}
                                        style={style}
                                    />
                                    <RadioInput
                                        label="Hər İkisi"
                                        id="both_active"
                                        name="is_active"
                                        type="radio"
                                        value={""}
                                        onChange={filterFormik.handleChange}
                                        onBlur={filterFormik.handleBlur}
                                        style={style}
                                    />
                                    {
                                        filterFormik.touched.is_active && filterFormik.errors.is_active && (<div className='error'>{filterFormik.errors.is_active}</div>)
                                    }
                                </div>
                            </div>
                            <button type='submit' className={`${style.search_btn} btn-main-bg rounded mt-4`}>Axtar</button>
                        </form>
                    </div>
                    <div className="w-full sm:w-full md:w-full lg:w-4/5 grid gap-4 grid-cols-1 text-sm overflow-y-hidden overflow-x-auto">
                        <table className="table-auto w-full h-fit">
                            <thead>
                                <tr>
                                    <th className="border border-slate-600 w-2 text-center text-xs">#</th>
                                    <th className="border border-slate-600 w-24 text-xs">Adı Soyadı</th>
                                    <th className="border border-slate-600 w-14 text-xs">email</th>
                                    <th className="border border-slate-600 w-10 text-xs">Aktiv</th>
                                    <th className="border border-slate-600 w-10 text-xs">Admin Status</th>
                                    <th className="border border-slate-600 w-10 text-xs"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={user.id}>
                                        <td className="border border-slate-700 text-xs text-center">
                                            {i+1}
                                        </td>
                                        <td className="border border-slate-700 text-xs">
                                            <NavLink
                                                to={`/profile/${user.id}`}
                                                state={{id: user.id}}
                                                className="text-blue-700"
                                            >
                                                {user.user.first_name} {user.user.last_name}
                                            </NavLink>
                                        </td>
                                        <td className="border border-slate-700 text-xs">
                                            {user.user.email}
                                        </td>
                                        <td className="border border-slate-700 text-xs cursor-pointer text-sky-700 w-fit">
                                            {
                                                user.user.is_active ? (
                                                    <div onClick={() => changeUserActivity(user)} className="mr-auto ml-auto pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-indigo-600 ring-black/20">
                                                        <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"></div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => changeUserActivity(user)} className="mr-auto ml-auto pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5">
                                                        <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out"></div>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td className="border border-slate-700 text-xs cursor-pointer text-sky-700 w-fit">
                                            {
                                                user.user.is_superuser ? (
                                                    <div onClick={() => changeUserIsSuperuserStatus(user)} className="mr-auto ml-auto pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-indigo-600 ring-black/20">
                                                        <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out translate-x-4"></div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => changeUserIsSuperuserStatus(user)} className="mr-auto ml-auto pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5">
                                                        <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out"></div>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td className="border border-slate-700 text-xs text-center">
                                            <NavLink
                                                className={`p-2`}
                                                onClick={() => showModal(user.id)}
                                            >
                                                <MdDelete
                                                    className="inline"
                                                    style={{
                                                        color: "#CF4B44",
                                                        fontSize: "20px",
                                                    }}
                                                />
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* ***************** Pagination ********************* */}
                        <div>
                            <div className="flex justify-center mt-10">

                            <Pagination
                                onChange={(e) => {
                                    changePage(e);
                                }}
                                className="pagination"
                                current={currentPage}
                                total={totalPage}
                                defaultPageSize={pageLimit}
                                showSizeChanger={false}
                            />
                            </div>
                        
                        </div>
                    </div>
                    <Modal
                        title={`Silmək istədiyinizə əminsinizmi?`}
                        okType="default"
                        open={isUserModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    ></Modal>
                    
                </div>
            </div>
        </>
    );
}

export default AdminUsers;
