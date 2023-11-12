import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEntrepreneurFormAsync } from '../../redux/EntrepreneurFormSlice/EntrepreneurFormSlice';

function EntrepreneurCreateForm() {
    const [isEntrepreneurFormModalOpen, setIsEntrepreneurFormModalOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [qs, setQs] = useState([]);
    const [formData, setFormData] = useState([]);

    const showModal = () => {
        setIsEntrepreneurFormModalOpen(true);
    };

    let activeEntrepreneurForms = useSelector((state) => state.entrepreneurForm.entrepreneurForms);

    const handleOk = () => {
        setIsEntrepreneurFormModalOpen(false);
        if (answers.length > 0) {
            if (isSelected == false) {
                qs.map((v, i) => {
                    formData.push({[qs[i]]:answers[i]})
                })
                setIsSelected(true)
                console.log(formData);
                localStorage.setItem("entrepreneurForm", JSON.stringify(formData))
            }
        }
    };

    const handleCancel = () => {
        setIsEntrepreneurFormModalOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEntrepreneurFormAsync({"title":"", "is_active": true}));
        activeEntrepreneurForms.map((qs) => setQs(qs.questions))
    }, [dispatch]);

    const handleAnswerInputChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    return (
        <>
            <input type="checkbox" checked={isSelected} disabled/> <span className='cursor-pointer text-blue-700' onClick={showModal}>Formu açmaq üçün toxunun</span>
            
            <Modal title="Formu doldurun" okType='default' open={isEntrepreneurFormModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {activeEntrepreneurForms.map((activeEntrepreneurForm, i) => (
                    <div key={`form-${i}`}>
                        {activeEntrepreneurForm.questions ? activeEntrepreneurForm.questions.map((qs, i) => (
                            <p key={`qs-${i}`}>
                                {qs}
                                <input
                                    name={qs}
                                    type="text"
                                    value={answers[i] || ""}
                                    onChange={(e) => {
                                        handleAnswerInputChange(i, e.target.value);
                                    }}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </p>
                        )) : ""}
                    </div>
                ))}
            </Modal>
        </>
    )
}

export default EntrepreneurCreateForm