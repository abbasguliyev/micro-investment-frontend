import * as yup from 'yup';

const validations = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    birthdate: yup.date().required(),
    address: yup.string().required(),
    marital_status: yup.string().required(),
    employment_status: yup.string().required(),
    housing_status: yup.string().required(),
    phone_number: yup.string().required(),
    credit_cart_number: yup.string().required(),
    debt_amount: yup.number().default(0),
    monthly_income: yup.number().default(0),
    about: yup.string(),
    password: yup.string().required()
})

export default validations;