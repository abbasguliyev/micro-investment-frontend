import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllUsersAsync, resetAuthSlice } from "../../../redux/AuthSlice/AuthSlice";
import { MdDelete } from "react-icons/md";
import { Modal, Pagination } from "antd";
import ResponseMessage from "../../../components/ResponseMessage";

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

    return (
        <div className="mt-4 mx-4 flex flex-col">
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
                        <th className="border border-slate-600"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-slate-700">
                                {user.user.first_name} {user.user.last_name}
                            </td>
                            <td className="border border-slate-700">
                                {user.user.email}
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
