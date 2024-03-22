import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    phone: Yup.number().required('Phone is required!'),
    email: Yup.string().email('Email Not Found!').required('Email is required!'),
    photo: Yup.string().url('Not Valid!').required('Photo is required!'),
    group: Yup.string().required('Please Select Group!'),
})