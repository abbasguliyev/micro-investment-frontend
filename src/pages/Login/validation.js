import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

export default validations;