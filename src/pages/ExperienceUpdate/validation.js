import * as yup from 'yup';

const validations = yup.object().shape({
    experience_place: yup.string().required(),
    position: yup.string().required(),
    description: yup.string().required(),
    city: yup.string().required(),
    start_year: yup.number().integer().min(0).required()
})

export default validations;