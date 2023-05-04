import { createContext } from "react";

export const ContactContext = createContext({
    loading : false,
    setLoading : ()=>{},
    contact :{},
    setContact: ()=>{},
    contacts : [],
    filtereContact : [],
    setFilterContact:()=>{},
    groups : [],
    setGroups:()=>{},
    group : [],
    setgroup:()=>{},
    onContactChange: ()=>{},
    deleteContact : ()=>{},
    updateContact : ()=>{},
    createContact : ()=>{},
    contactSearch : ()=>{}
});