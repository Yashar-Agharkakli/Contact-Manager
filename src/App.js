
import './App.css';
import { ContactContext } from './context/contactContext';
import _ from "lodash";
import { useState, useEffect } from "react";
import { Navbar ,Contacts,AddContact ,EditContact, Contact, ViewContact, Searchbar} from './components';
import { Routes,Route, Navigate, useNavigate } from 'react-router-dom';
import { GetAllContacts, GetAllGroups, CreatContact, deleteContact, UpdateContact} from './services/contactService';
import {confirmAlert} from "react-confirm-alert";
import { COMMENT, CYAN, YELLOW, PURPLE } from './helpers/Colors';



const App = ()=> {

  // our states to control the condition  

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState([]);
  const [filterContact, setFilterContact] = useState([])
  const [contact, setContact] = useState({});
  const navigate = useNavigate();



  // LIFE CYCLE 

  useEffect(()=>{
    const fetchData = async ()=>{

      try{
        setLoading(true);

        const {data : contactsData} = await GetAllContacts();
        const {data : groupsData} = await GetAllGroups();
        setContacts(contactsData);
        setFilterContact(contactsData);
        setGroups(groupsData);
        setLoading(false)
      } catch(err){
        console.log(err.message);
        setLoading(false)
      }
      
    };
    fetchData();
  },[])


  // ------------------ EVENT MANAGER  -----------------------

  // when we edit the information of the contact 
  const onContactChange =(even)=>{
    setContact({
      ...contact,
      [even.target.name] : even.target.value
    });
  };



  // submit contact form -----------------
  const createContactForm = async (values) => { 
    try{

      const {status, data} = await CreatContact (values );

      if (status===201){
        const allContacs = [...contacts, data ]
        setContacts(allContacs)
        setFilterContact(allContacs)
        navigate("/contacts")
      }
    }
    catch(err){
      console.log(err.message)
    }
  }

  // ------- confirm delete
const confirmDelete = (contactId, contactFullname) =>{
  confirmAlert({
    customUI:({onClose})=>{
      return(
        <div style={{backgroundColor:COMMENT, border:`1px solid ${PURPLE}`, borderRadius:"1em"}} className='container p-5' >
          <h1 style={{color:YELLOW}}>Removing Contact</h1>
          <p style={{color:CYAN}}>Are you sure to delete {contactFullname} ?</p>
          <button className='btn btn-danger mx-2' style={{backgroundColor:PURPLE}} onClick={()=>{removeContact(contactId); onClose();}}> DELETE </button>
          <button className='btn btn-secondary' style={{background:COMMENT}} onClick={onClose}>CANCEL</button>
        </div>
      )
    }
  });
}

// remove contact------------------
  const removeContact = async(contactId)=>{

    try{
      setLoading(true);
      // Taking a copy 
      const allContacts = [...contacts];
      const updatedContacts = allContacts.filter(c => c.id !== parseInt(contactId))
      setContacts(updatedContacts);
      setFilterContact(updatedContacts);
      const {status} = await deleteContact(contactId);
      // sending delete request to server
      if(status !== 200){

        setContacts(allContacts);
        setFilterContact(allContacts);
        setLoading(false);
        navigate("/contacts");
      }else{
        setLoading(false)
        navigate("/contacts")
      }
    }
    catch(err){
      console.log(err)
      const allContacts = [...contacts];   
      setLoading(false);
      setContacts(allContacts);
      setFilterContact(allContacts);
    }
  }


  // ---------------- serach contact ----------------
  let filterTimeout ;
  const contactSearch = _.debounce(query=>{        // here we used from _.debounce to avoid traditional settimout and cleartimeout for debouncing, it saves time !

    if(!query){setFilterContact([...contacts])}
      setFilterContact(
        contacts.filter((member)=>{
        return member.fullname.toLowerCase().includes(query.toLowerCase());
      })
      )
    // }, 1000);
  }, 1000)

  // -------------- Return ------------

  return(
    <ContactContext.Provider value={{
      loading : loading,
      setLoading : setLoading,
      contact : contact,
      setContact: setContact,
      contacts : contacts,
      filtereContact : filterContact,
      setFilterContact:setFilterContact,
      groups : groups,
      setGroups:setGroups,
      group : group,
      setgroup: setGroup,
      onContactChange : onContactChange,
      deleteContact : confirmDelete,
      createContact : createContactForm,
      contactSearch : contactSearch,
    }}>

    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts"/>}/>
        <Route path="/contacts" element={<Contacts />}/>
        <Route path="/contacts/add" element={<AddContact/>}/>
        <Route path="/contacts/:contactId" element={<ViewContact/>}/>
        <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
      </Routes>
    </div>
    </ContactContext.Provider>
  )
}

export default App;
