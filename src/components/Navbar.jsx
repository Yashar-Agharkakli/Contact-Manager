
import Searchbar from "./Contacts/Searchbar";
import { PURPLE, BACKGROUND, COMMENT } from "../helpers/Colors";
import { useLocation } from "react-router-dom";



const Navbar = () =>{
    const location = useLocation();
    return(
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{backgroundColor:BACKGROUND}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col" dir="ltr">
                        <div className="navbar-brand">
                            <i className="fa-solid fa-address-book" style={{color : PURPLE}}/>
                            {"  "}
                            <span style={{fontFamily:"sans-serif", color:COMMENT}}>Contact Management</span>
                            <span style={{color:"purple", fontSize:"23px"}}> Application</span>
                        </div>
                    </div>
                    {location.pathname==="/contacts" ? (
                        <div className="col">
                    <Searchbar/>
                    </div>
                    ) : null }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;