import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetailAsync, postDebtFundExpense} from "../../../redux/AuthSlice/AuthSlice.js";
import AuthInput from "../../InputComponents/AuthInput.jsx";
import {useFormik} from "formik";
import validations from "../../../pages/Admin/AdminInvestments/validation.js";
import style from './style.module.css'
import {useParams} from "react-router-dom";


function DebtFund() {
    let {id} = useParams();
    const dispatch = useDispatch()

    let user = useSelector(state => state.auth.user)

    const formik = useFormik({
        initialValues: {
            amount: 0
        },
        onSubmit: (values, {resetForm}) => {
            values.user = user.user.id;
            dispatch(postDebtFundExpense(values))
                .then(() => {
                    dispatch(getUserDetailAsync({id: user.id}))
                    resetForm()
                });
        },
        validationSchema: validations
    });


    useEffect(() => {
        dispatch(getUserDetailAsync({"id": id}))
    }, [dispatch])

    return (
        <>
            <div className='mt-4 mx-4 flex flex-col'>
                <p className='text-md font-bold mb-6'>Hal-hazırda fonda verilən borc: {user && user.user ? user.user.money_in_debt_fund : 0} AZN</p>
                <form action="" onSubmit={formik.handleSubmit}>
                    <AuthInput
                        label="Fonddan geri götürmək istədiyiniz məbləğ:"
                        id="amount"
                        name="amount"
                        type="number"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.amount}
                        error={formik.errors.amount}
                        style={`sm:w-60 md:w-60 lg:w-60`}/>
                    <button type={"submit"} className={`${style.submitBtn}`}>Təsdiqlə</button>
                </form>
            </div>
        </>
    )
}

export default DebtFund;