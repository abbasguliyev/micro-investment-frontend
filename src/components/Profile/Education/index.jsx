import { useEffect, useState } from "react";
import {NavLink, useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMeAsync, getUserDetailAsync } from "../../../redux/AuthSlice/AuthSlice";
import {
    deleteEducationAsync,
    getEducationsAsync,
    resetEducationSlice,
} from "../../../redux/EducationSlice/EducationSlice";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { Modal } from "antd";
import ResponseMessage from "../../ResponseMessage";
import { CgSpinner } from "react-icons/cg";

const Education = () => {
    let {id} = useParams();
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [educationId, setEducationId] = useState(null);
    const dispatch = useDispatch();

    const showModal = (id) => {
        setIsEducationModalOpen(true);
        setEducationId(id);
    };

    const handleOk = () => {
        setIsEducationModalOpen(false);
        dispatch(deleteEducationAsync({ id: educationId })).then(() => {
            dispatch(getEducationsAsync({ me: id }));
        });
    };

    const handleCancel = () => {
        setIsEducationModalOpen(false);
    };

    let me = useSelector((state) => state.auth.me)
    let educations = useSelector((state) => state.education.educations);
    let isLoading = useSelector((state) => state.education.isLoading);
    const errorMsg = useSelector((state) => state.education.error);
    const successMsg = useSelector((state) => state.education.successMsg);

    useEffect(() => {
        dispatch(getMeAsync())
        dispatch(getUserDetailAsync({"id": id}))
        dispatch(getEducationsAsync({ me: id }));
    }, []);

    return (
        <div className="mt-4 mx-4 flex flex-col">
            {errorMsg && (
                <ResponseMessage
                    message={errorMsg}
                    type="error"
                    slice={resetEducationSlice()}
                />
            )}
            {successMsg && (
                <ResponseMessage
                    message={successMsg}
                    type="success"
                    slice={resetEducationSlice()}
                />
            )}
            {
                me && me.id == id && (
                    <NavLink
                        to="/education-create"
                        className={`rounded btn-main-bg text-center w-40 h-10 p-2 mb-2`}
                    >
                        Yeni əlavə et
                    </NavLink>
                )
            }
            {
                isLoading ? (
                    <div className='w-full flex justify-center'>
                        <CgSpinner className='animate-spin text-lg self-center'/>
                    </div>
                ) : (
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="border border-slate-600">
                                    Təhsil aldığı yer
                                </th>
                                <th className="border border-slate-600">Sahə</th>
                                <th className="border border-slate-600">Şəhər</th>
                                <th className="border border-slate-600">
                                    Başlama tarixi
                                </th>
                                <th className="border border-slate-600">
                                    Bitmə tarixi
                                </th>
                                <th className="border border-slate-600">
                                    Davam edirmi
                                </th>
                                <th className="border border-slate-600"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {educations.map((education) => (
                                <tr key={education.id}>
                                    <td className="border border-slate-700">
                                        {education.education_place}
                                    </td>
                                    <td className="border border-slate-700">
                                        {education.education_branch}
                                    </td>
                                    <td className="border border-slate-700">
                                        {education.city}
                                    </td>
                                    <td className="border border-slate-700">
                                        {education.start_year}
                                    </td>
                                    <td className="border border-slate-700">
                                        {education.end_year}
                                    </td>
                                    <td className="border border-slate-700">
                                        {education.is_continue ? "Bəli" : "Xeyr"}
                                    </td>
                                    <td className="border border-slate-700 text-center">
                                        <NavLink
                                            to={`/education-update/${education.id}`}
                                            className={`p-2`}
                                        >
                                            <MdModeEditOutline
                                                className="inline"
                                                style={{
                                                    color: "#56AF55",
                                                    fontSize: "20px",
                                                }}
                                            />
                                        </NavLink>
                                        <NavLink
                                            className={`p-2`}
                                            onClick={() => showModal(education.id)}
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
                )
            }

            <Modal
                title={`Silmək istədiyinizə əminsinizmi?`}
                okType="default"
                open={isEducationModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            ></Modal>
        </div>
    );
};

export default Education;
