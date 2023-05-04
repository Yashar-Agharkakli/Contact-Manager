
import { useEffect, useState, useContext } from "react";                // important    
import { ContactContext } from "../../context/contactContext";          // important
import { Link, useParams} from "react-router-dom";
import {Spinner} from "../";
import { GetContact, GetGroup } from "../../services/contactService";
import {PURPLE, CYAN,BACKGROUND} from "../../helpers/Colors.js"


// Our Component 
const ViewContact = ()=>{

    const {contactId} = useParams();

    const {loading, setLoading, contact,setContact} = useContext(ContactContext);

 // useEffect() hook 

 const[group, setGroup] = useState({})
 useEffect(()=>{
    const fetchData = async ()=>{
        try{
            setLoading(loading);
            const {data: contactData} = await GetContact(contactId);
            const {data: groupData} = await GetGroup(contactData.group);
            setLoading(false);
            setContact(contactData);
            setGroup(groupData.name);
        }catch(err){
            console.log(err.message)
            setLoading(false)
        }
    }
    fetchData();
 },[])



    // Our render 
    return(

        <>
        <section className="view-contact-intro p-3">
            <div className="container">
                <div className="row my-2 text-center">
                    <p className="h3 fw-bold" style={{color: CYAN}}>
                        Contact Information
                    </p>
                </div>
            </div>
        </section>
        <hr style={{backgroundColor:CYAN}}/>   
        {
            loading ? (<Spinner/>) : (
                <>
                {
                    Object.keys(contact).length >0 && 
                    <section className="view-contact mt-3">
                        <div className="container p-2" style={{borderRadius:"1em", backgroundColor:BACKGROUND}}>
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <img src={contact.photo} alt={contact.fullname} className="img-fluid rounded" style={{border:`1px solid ${PURPLE}`}}/>
                                </div>
                                <div className="col-md-9">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark">
                                            Name and Surname :{" "}
                                            <span className="fw-bold">{contact.fullname}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Phone Number :{" "}
                                            <span className="fw-bold">{contact.mobile}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Email :{" "}
                                            <span className="fw-bold">{contact.Email}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Job :{" "}
                                            <span className="fw-bold">{contact.job}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Group :{" "}
                                            <span className="fw-bold">{group}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row my-2">
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <Link to={"/contacts"} className="btn" style={{backgroundColor:PURPLE}}>
                                    Retur to Main Page
                                </Link>
                            </div>
                            </div>
                        </div>
                    </section>
                }
                </>
            )
        }
        </>
    )
}
export default ViewContact;