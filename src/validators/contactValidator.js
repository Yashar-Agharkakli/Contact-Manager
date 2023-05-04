import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    photo : Yup.string().url().required(),
    mobile: Yup.number().required("Phone number is required"),
    Email : Yup.string().email("Email Address in not valid").required("Email address is required"),
    job: Yup.string().nullable(),
    group : Yup.string().required("Groupd selection is requried !")
})




