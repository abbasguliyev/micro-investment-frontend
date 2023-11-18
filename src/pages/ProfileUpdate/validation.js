import * as yup from 'yup';

const validations = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    email: yup.string().email(),
    birthdate: yup.date(),
    address: yup.string(),
    marital_status: yup.string(),
    employment_status: yup.string(),
    housing_status: yup.string(),
    phone_number: yup.string().min(13).max(13),
    credit_cart_number: yup.string(),
    debt_amount: yup.number(0),
    monthly_income: yup.number(0),
    about: yup.string(),
    business_activities: yup.string(),
})

export default validations;