
import { useEffect, useState, useContext} from "react";
import { ContactContext } from "../../context/contactContext";

import { Link,useNavigate, useParams } from "react-router-dom";
import {Spinner} from "../";
import { GetContact, UpdateContact} from "../../services/contactService";
import { PURPLE, GREEN, COMMENT} from "../../helpers/Colors";


const EditContact = ()=>{

    // our states 
    const {contactId} = useParams();
    const{
        group,
        groups,
        setGroups, 
        loading,
        setLoading, 
        onContactChange, 
        contact, 
        setContact, 
        contacts,
        setContacts, 
        filtereContact,
        setFilterContact
    } = useContext(ContactContext)
    const navigate = useNavigate();

    // useeffect
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setLoading(true)
                const { data : contactData } = await GetContact(contactId);
                setLoading(false);
                setContact(contactData);
            }catch(err){
                console.log(err.message);
                setLoading(false)
            }
        }
        fetchData();
    }, []);

    // setContactInfor method


    const submitForm = async (even)=>{
        even.preventDefault();
        try{
            setLoading(true);
            const { status, data } = await UpdateContact(contact, contactId);
       
            if(status === 200){
                setLoading(false)
                const allContacs=[...contacts];
                const contactIndex = allContacs[(c=>c.id === parseInt(contactId))];
                allContacs[contactIndex] = {...data};
                setFilterContact(allContacs);
                navigate("/contacts")
            }
        }catch(err){
            console.log(err.message);
            setLoading(true)
        }
    }


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
                        Edit Contact
                        </p>
                    </div>
                </div>
                <hr style={{backgroundColor:GREEN}}/>
                <div className="row mt-5">
                    <div className="col-md-4">
                        <form onSubmit={submitForm}>
                            <div className="mb-2">
                                <input 
                                type="text"
                                name="fullname" 
                                className="form-control"
                                placeholder="Name and Surname"
                                required={true}
                                value={contact.fullname}
                                onChange={onContactChange}
                                />
                            </div>
                            <div className="mb-2">
                                <input 
                                type="text" 
                                name="photo" 
                                className="form-control"
                                required={true}
                                placeholder="Image Address"
                                value={contact.photo}
                                onChange={onContactChange}
                                />
                            </div>
                            <div className="mb-2">
                                <input 
                                type="number" 
                                name="mobile" 
                                required = {true}
                                className="form-control"
                                placeholder="Phone Number"
                                value={contact.mobile}
                                onChange={onContactChange}
                                />
                            </div>
                            <div className="mb-2">
                                <input 
                                type="email" 
                                name="Email" 
                                required = {true}
                                className="form-control"
                                placeholder="Email Address"
                                onChange={onContactChange}
                                value={contact.Email}
                                />
                            </div>
                            <div className="mb-2">
                                <input 
                                type="text" 
                                name="job" 
                                required = {true}
                                className="form-control"
                                placeholder="Job"
                                onChange={onContactChange}
                                value={contact.job}
                                />
                            </div>
                            <div className="mb-2">
                                <select
                                name="group"
                                value={contact.group}
                                onChange={onContactChange}  
                                required={true}
                                className="form-control"
                                >
                                <option value="" defaultValue={group.name}>Select Group</option>
                                {groups.length > 0 && groups.map((group=>(
                                    <option key = {group.id} value={group.id}> {group.name}</option>
                                )))}
                                </select>
                            </div>
                            <div className="mx-2">
                                <input 
                                type="submit" 
                                name="submit"
                                className="btn" 
                                value="Edit Contact"
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
    )
}
export default EditContact;