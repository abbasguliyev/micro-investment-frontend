import { useEffect, useState } from "react";
import {NavLink, useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMeAsync, getUserDetailAsync } from "../../../redux/AuthSlice/AuthSlice";
import {
    deleteExperienceAsync,
    getExperiencesAsync,
} from "../../../redux/ExperienceSlice/ExperienceSlice";
import { Modal, Tooltip } from "antd";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";

const Experience = () => {
    let {id} = useParams();
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [experienceId, setExperienceId] = useState(null);
    const dispatch = useDispatch();

    const showModal = (id) => {
        setIsExperienceModalOpen(true);
        setExperienceId(id);
    };

    const handleOk = () => {
        setIsExperienceModalOpen(false);
        dispatch(deleteExperienceAsync({ id: experienceId })).then(() => {
            dispatch(getExperiencesAsync({ me: id }));
        });
    };

    const handleCancel = () => {
        setIsExperienceModalOpen(false);
    };

    let me = useSelector((state) => state.auth.me)
    let experiences = useSelector((state) => state.experience.experiences);
    let isLoading = useSelector((state) => state.experience.isLoading);

    useEffect(() => {
        dispatch(getMeAsync())
        dispatch(getUserDetailAsync({"id": id}))
        dispatch(getExperiencesAsync({ me: id }));
    }, []);

    return (
        <div className="mt-4 mx-4 flex flex-col">
            {
                me && me.id == id && (
                    <NavLink
                        to="/experience-create"
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
                                <th className="border border-slate-600">Müəsisə</th>
                                <th className="border border-slate-600">Vəzifə</th>
                                <th className="border border-slate-600">Açıqlama</th>
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
                            {experiences.map((experience) => (
                                <tr key={experience.id}>
                                    <td className="border border-slate-700">
                                        {experience.experience_place}
                                    </td>
                                    <td className="border border-slate-700">
                                        {experience.position}
                                    </td>
                                    <Tooltip title={experience.description}>
                                        <td className="border border-slate-700">
                                            {experience.description.length > 5
                                                ? `${experience.description.substring(
                                                    0,
                                                    5
                                                )}...`
                                                : experience.description}
                                        </td>
                                    </Tooltip>
                                    <td className="border border-slate-700">
                                        {experience.city}
                                    </td>
                                    <td className="border border-slate-700">
                                        {experience.start_year}
                                    </td>
                                    <td className="border border-slate-700">
                                        {experience.end_year}
                                    </td>
                                    <td className="border border-slate-700">
                                        {experience.is_continue ? "Bəli" : "Xeyr"}
                                    </td>
                                    <td className="border border-slate-700 text-center">
                                        <NavLink
                                            to={`/experience-update/${experience.id}`}
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
                                            onClick={() => showModal(experience.id)}
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
                open={isExperienceModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            ></Modal>
        </div>
    );
};

export default Experience;
