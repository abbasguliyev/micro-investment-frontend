import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteUserAsync, getAllUsersAsync, putUserProfileAsync, resetAuthSlice } from "../../../redux/AuthSlice/AuthSlice";
import { MdDelete } from "react-icons/md";
import { Modal, Pagination } from "antd";
import ResponseMessage from "../../../components/ResponseMessage";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

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
            let offset = (currentPage - 1) * pageLimit;
            dispatch(getAllUsersAsync({"offset": offset, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": ""}))
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


    useEffect(() => {
        dispatch(getAllUsersAsync({"offset": 0, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": ""}))
    }, [dispatch])


    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        dispatch(getAllUsersAsync({"offset": offset, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": ""}));
    };

    const changeUserActivity = (user) => {
        dispatch(putUserProfileAsync({"id": user.id, "is_active": !user.user.is_active}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            dispatch(getAllUsersAsync({"offset": offset, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": ""}))
        })
    }

    const changeUserIsSuperuserStatus = (user) => {
        dispatch(putUserProfileAsync({"id": user.id, "is_superuser": !user.user.is_superuser}))
        .then(() => {
            let offset = (currentPage - 1) * pageLimit;
            dispatch(getAllUsersAsync({"offset": offset, "birthdate":"", "marital_status":"", "employment_status":"", "housing_status":"", "phone_number":"", "monthly_income":"", "monthly_income__gte": "", "monthly_income__lte": ""}))
        })
    }


    return (
        <div className="mt-4 mx-4 flex flex-col overflow-x-auto overflow-y-hidden">
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
            <NavLink
                to="user-create"
                className={`rounded btn-main-bg text-center w-40 h-10 p-2 mb-2`}
            >
                Yeni əlavə et
            </NavLink>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Adı Soyadı</th>
                        <th className="border border-slate-600">email</th>
                        <th className="border border-slate-600">Aktiv</th>
                        <th className="border border-slate-600">Admin Status</th>
                        <th className="border border-slate-600"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-slate-700">
                                <NavLink
                                    to="/profile"
                                    state={{id: user.id}}
                                    className="text-blue-700"
                                >
                                    {user.user.first_name} {user.user.last_name}
                                </NavLink>
                            </td>
                            <td className="border border-slate-700">
                                {user.user.email}
                            </td>
                            <td className="border border-slate-700 cursor-pointer text-sky-700 w-fit">
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
                            <td className="border border-slate-700 cursor-pointer text-sky-700 w-fit">
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
                            <td className="border border-slate-700 text-center">
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

            <Modal
                title={`Silmək istədiyinizə əminsinizmi?`}
                okType="default"
                open={isUserModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            ></Modal>
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
    );
}

export default AdminUsers;
