import * as yup from 'yup';

const validations = yup.object().shape({
    amount: yup.number().min(0).required()
})

export default validations;