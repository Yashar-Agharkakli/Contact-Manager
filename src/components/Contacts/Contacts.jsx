
import { Link } from "react-router-dom";
import { ORANGE, PINK } from "../../helpers/Colors";
import { Contact, Spinner} from "../../components";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";


const Contacts = () =>{
    const {contacts, loading, deleteContact, filtereContact} = useContext(ContactContext);

    return (
        <>
            <section className="container my-1">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link to={"/contacts/add"} type="button" className="btn mx-2" style={{backgroundColor:PINK}}>
                                    Add Contact
                                    <i className="fa fa-plus-circle mx-2"></i>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
            <section className="container" >
                    <div className="row ">
                        {
                            filtereContact.length > 0 ? filtereContact.map((c)=>
                            <Contact key={c.id} contact={c} deleteContact={ ()=>{
                                deleteContact(c.id, c.fullname)
                            }}/> )
                            :
                            ( 
                            <div className="text-center py-5" style={{backgroundColor : PINK}}>
                            <p className="h3" style={{color:ORANGE}}>
                            The contact not found . . .
                            </p>
                            <img src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif" alt="not found" className="w-25"/>
                            </div>
                            )}
                    </div>
                </section>  
            }
        </>
    )
}

export default Contacts;




