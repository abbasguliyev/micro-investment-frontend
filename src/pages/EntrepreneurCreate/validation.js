import * as yup from 'yup';

const validations = yup.object().shape({
    project_name: yup.string().required("Ad mütləq daxil edilməlidir"),
    start_date: yup.string().required("Başlanğıc tarixi mütləq daxil edilməlidir"),
    end_date: yup.string().required("Bitmə tarixi mütləq daxil edilməlidir"),
    description: yup.string().required("Açıqlama mütləq daxil edilməlidir")
})

export default validations;