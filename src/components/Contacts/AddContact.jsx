import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Link } from "react-router-dom";
import { COMMENT,GREEN,PURPLE } from "../../helpers/Colors";
import {Spinner} from "../"
import { Formik, useFormik } from 'formik'; 
import { contactSchema } from "../../validators/contactValidator";



const AddContact = ()=>{
    
    const {loading, contact, onContactChange, groups, createContact, /*errors */} = useContext(ContactContext);
    const formik = useFormik({
        initialValues:{
            fullname: "",
            photo: "",
            mobile: "",
            Email: "",
            job: "",
            group: ""
        },
        validationSchema: contactSchema,
        onSubmit: (values)=>{
            console.log(values)
            createContact(values)
        }
    })


    return(
        <>
        {loading ? (<Spinner/>) : (
            <>
            <section className="p-3">
            <img
            src={require("../../assets/pexels-cottonbro-studio-4887011 (1).jpg")}
            height= "400px"
            style={{
                position: "absolute ",
                zIndex: "-1",
                top : "130px",
                right : "350px",
                opacity : "50%"
            }}
            alt="Add Contact's img"
            />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h4 fw-bold text-center"
                        style={{color: GREEN}}
                        >
                        Create New Contact
                        </p>
                    </div>
                </div>
                <hr style={{backgroundColor:GREEN}}/>
                <div className="row mt-5">
                    <div className="col-md-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-2">
                                <input 
                                id= "fullname"
                                type="text"
                                className="form-control"
                                placeholder="Name and Surname"
                                {...formik.getFieldProps("fullname")}                        // it will give the value, onchange and onblur automatically
                                />
                            </div>
                            {formik.touched.fullname && formik.errors.fullname ? (<div className="text-danger">{formik.errors.fullname}</div>) : null}

                            <div className="mb-2">
                                <input 
                                id= "photo"
                                type="text" 
                                className="form-control"
                                placeholder="Image Address"
                                {...formik.getFieldProps("photo")}
                                />
                            </div>
                            {formik.touched.photo && formik.errors.photo ? (<div className="text-danger">{formik.errors.photo}</div>) : null}

                            <div className="mb-2">
                                <input 
                                id= "mobile"
                                type="number" 
                                className="form-control"
                                placeholder="Phone Number"
                                {...formik.getFieldProps("mobile")}
                                />
                            </div>
                            {formik.touched.mobile && formik.errors.mobile ? (<div className="text-danger">{formik.errors.mobile}</div>) : null}

                            <div className="mb-2">
                                <input 
                                id="Email"
                                type="email" 
                                className="form-control"
                                placeholder="Email Address"
                                {...formik.getFieldProps("Email")}
                                />
                            </div>
                            {formik.touched.Email && formik.errors.Email ? (<div className="text-danger">{formik.errors.Email}</div>) : null}

                            <div className="mb-2">
                                <input 
                                id="job"
                                type="text" 
                                className="form-control"
                                placeholder="Job"
                                {...formik.getFieldProps("job")}
                                />
                            </div>
                            {formik.touched.job && formik.errors.job ? (<div className="text-danger">{formik.errors.job}</div>) : null}

                            <div className="mb-2">
                                <select
                                id="group"
                                className="form-control"
                                {...formik.getFieldProps("group")}
                                >
                                <option value="">Select Group</option>
                                {groups.length > 0 && groups.map((group=>(
                                    <option key = {group.id} value={group.id}> {group.name}</option>
                                )))}
                                </select>
                            {formik.touched.group && formik.errors.group ? (<div className="text-danger">{formik.errors.group}</div>) : null}

                            </div>
                            <div className="mx-2">
                                <input 
                                type="submit" 
                                name="submit"
                                className="btn" 
                                value="Create Contact"
                                style={{backgroundColor:PURPLE}}
                                />
                                <Link 
                                to={"/contacts"}
                                className="btn mx-2"
                                style={{backgroundColor:COMMENT}}
                                >
                                 Cancel
                                </Link>
                            </div>
                        </form>            
                    </div>
                </div>
            </div>
            </section>
            </>
        )}
    </>
    );
};

export default AddContact;


























