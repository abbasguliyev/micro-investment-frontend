import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllEntrepreneurImageAsync, postEntrepreneurImageCreateAsync, resetEntrepreneurSlice } from "../../redux/EntrepreneurSlice/EntrepreneurSlice";
import { useFormik } from "formik";
import ResponseMessage from "../ResponseMessage";

function EntrepreneurImageCreate() {
    const { state } = useLocation();
    const { id, project_name } = state;

    const dispatch = useDispatch();

    let images = useSelector((state) => state.entrepreneur.entrepreneur_images);
    let errorMsg = useSelector((state)=>state.entrepreneur.error)
    let successMsg = useSelector((state)=>state.entrepreneur.successMsg)

    const formik = useFormik({
        initialValues: {
            entrepreneur: id,
            image: ""
        },
        onSubmit: (values, { resetForm }) => {
            dispatch(postEntrepreneurImageCreateAsync(values))
            .then(() => {
                resetForm();
                dispatch(getAllEntrepreneurImageAsync({"entrepreneur": id}))
            })
        }
    })

    useEffect(() => {
        dispatch(getAllEntrepreneurImageAsync({"entrepreneur": id}))
    }, [dispatch])

    return (
        <>
            <header className="bg-white shadow place-items-start">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {project_name} Media
                    </h1>
                </div>
            </header>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col">
                {errorMsg && (<ResponseMessage message={errorMsg} type="error" slice={resetEntrepreneurSlice()} />)}
                {successMsg && (<ResponseMessage message={successMsg} type="success" slice={resetEntrepreneurSlice()} />)}
                <form className="flex items-center justify-center flex-col" onSubmit={formik.handleSubmit}>
                    <label
                        htmlFor="image"
                        className="cursor-pointer font-bold py-2 px-4 rounded-full"
                    >
                        Şəkil seç
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image" 
                        className="hidden ml-24 mb-5 file-input"
                        onChange={e=>{formik.setFieldValue("image",e.target.files[0])}}
                        onBlur={formik.handleBlur}
                    />
                    <small>{ formik.values.image ? formik.values.image.name : "" }</small>
                    <button type="submit"
                            className="flex w-90 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Əlavə et
                    </button>
                </form>
                <div className="flex flex-row flex-wrap m-4">
                    {
                        images.map((image) => (
                            <div key={image.id}>
                                <img src={image.image} alt={image.image.id}  className="h-40 w-40 m-2 object-contain" />
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </>
    );
}

export default EntrepreneurImageCreate;
