import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { ContactContext } from "../../context/contactContext.js";


const Contact = ({ Contact, deleteContactForm }) => {

    const { themes } = useContext(ContactContext)


    return (
        <>
            <div
                className="card my-3"
                style={{
                    width: "20rem",
                    textOverflow: "inherit",
                    fontVariant: "all-small-caps",
                    fontSize: "larger",
                    color: themes.Purple1
                }}>
                <img
                    src={Contact.photo}
                    alt=""
                    style={{
                        border: `1px solid ${themes.Pink}`,
                        backgroundColor: themes.Pink,
                        borderRadius: "50%",
                        height: "10%",
                        width: "60%",
                    }}
                    className="m-auto mt-4"
                />
                <div className="card-body m-auto">
                    <h3 className="card-title my-4">{Contact.name}</h3>

                    <Link to={`/contacts/${Contact.id}`} >
                        <button
                            className="btn m-1 hover-link"
                            style={{
                                border: `2px solid ${themes.Purple1}`,
                                color: themes.Purple1,
                                borderRadius: "50%",

                            }}>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </Link>

                    <Link to={`/contacts/EditContact/${Contact.id}`}>
                        <button
                            className="btn m-1 hover-link"
                            style={{
                                border: `2px solid ${themes.Purple1}`,
                                color: themes.Purple1,
                                borderRadius: "50%",
                            }}
                        >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                        </button>
                    </Link>
                    <button
                        className="btn m-1 hover-link"
                        style={{
                            border: `2px solid ${themes.Purple1}`,
                            color: themes.Purple1,
                            borderRadius: "50%",
                        }}
                        onClick={() => {
                            deleteContactForm(Contact.id);
                        }}
                    >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Contact;