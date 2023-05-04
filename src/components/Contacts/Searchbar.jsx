
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const Searchbar = ()=> {
    const{contactSearch} = useContext(ContactContext);

    return(
        <div className="col">
            <div className="input-group mx-2 w-75 navbar-brand" >
                <span
                className="input-group-text"
                id="basic-addon1"
                style={{backgroundColor:"purple", border: "none"}}>
                    <i className="fa fa-search"></i>
                </span>
                <input
                    type="text" 
                    name="Contact"
                    style={{border:"none"}}
                    className="form-control"
                    placeholder="Search contact"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={event => contactSearch(event.target.value)}/>
            </div>
        </div>
    )
}



export default Searchbar;

