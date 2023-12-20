import * as yup from 'yup';

const validations = yup.object().shape({
    new_password: yup.string().required('Şifrə daxil edin'),
    password2: yup.string()
       .oneOf([yup.ref('new_password'), null], 'Şifrələr eyni olmalıdır')
})

export default validations;