import * as yup from 'yup';

const validations = yup.object().shape({
    education_place: yup.string().required(),
    education_branch: yup.string().required(),
    city: yup.string().required(),
    start_year: yup.number().integer().min(0).required(),
})

export default validations;