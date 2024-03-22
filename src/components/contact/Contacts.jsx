import React from "react";
import { useContext } from "react";
import { Link } from 'react-router-dom'

import { ContactContext } from "../../context/contactContext.js";
import Spinnerr from "../Spinner.jsx";

import Contact from "./Contact.jsx";


const Contacts = () => {

    const { contacts, loading, deleteContact, themes } = useContext(ContactContext);


    return (
        <>
            {
                loading ?
                    <Spinnerr /> :
                    (
                        <section className="container  rounded">
                            <section className="container my-3">
                                <div className="grid">
                                    <div className="row">
                                        <div className="col">
                                            <p className="h3">
                                                <Link to="/contacts/AddContact">
                                                    <button className="btn my-3 p-3 w-100 shadow-sm" style={{ backgroundColor: themes.Pink, color: themes.HeaderText }}>
                                                        <i className="fa fa-plus-circle mx-2" aria-hidden="true"></i>
                                                        Add Contact
                                                    </button>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <div className="card my-2 shadow-lg" style={{ backgroundColor: themes.Background }}>
                                        <div className="card-body">
                                            <div className="row align-items-center d-flex justify-content-around form-select-lg shadow-sm">
                                                {
                                                    contacts.length > 0 ? contacts.map((b, indexfilter) => (
                                                        <Contact key={indexfilter} Contact={b} deleteContactForm={deleteContact} />
                                                    )
                                                    ) :
                                                        (
                                                            <div className="text-center py-2">
                                                                <p className="h3 my-5" style={{ color: themes.Purple1 }}>
                                                                    <span aria-label="icon" role="img">Not anything🙄</span>
                                                                </p>
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
            }
        </>
    )
}

export default Contacts;
