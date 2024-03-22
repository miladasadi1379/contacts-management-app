import React from "react";
import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { getContact } from '../../services/contactService.js';
import { ContactContext } from "../../context/contactContext.js";
import { useImmer } from "use-immer";
import Spinner from "../Spinner.jsx";


const ShowInfo = () => {

    const { id } = useParams();
    const { themes } = useContext(ContactContext);

    const [state, setState] = useImmer({
        contact: {},
        loading: true,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: true });
                const { data: contactData } = await getContact(id);
                setState({
                    state,
                    loading: false,
                    contact: contactData,
                });
            } catch (err) {
                console.log(err.message);
                setState({ ...state, loading: false });
            }
        };
        fetchData();
    }, []);

    const { loading, contact } = state;

    return (
        <>
            {
                loading ?
                    <Spinner /> : (
                        <>
                            {Object.keys(contact).length > 0 && (
                                <section className="container-fluid rounded my-3" style={{ overflow: 'hidden' }}>
                                    <div
                                        class="card my-3 m-auto card-contact-info"
                                        style={{
                                            width: "60%",
                                            textOverflow: "inherit",
                                            fontSize: "large",
                                            color: themes.Purple1,
                                            overflow: 'hidden'
                                        }}>
                                        <img
                                            src={contact.photo}
                                            alt=""
                                            style={{
                                                border: `1px solid ${themes.Pink}`,
                                                backgroundColor: themes.Pink,
                                                borderRadius: "50%",
                                                height: "10%",
                                                width: "60%",
                                            }}
                                            className="m-auto my-4"
                                        />

                                        <div className="row my-3">
                                            <div className="col">
                                                <h2 class="mx-4">{contact.name}</h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <Link to={`/contacts/contact/call/${contact.id}`}>
                                                    <i
                                                        class="fa fa-phone mx-1 contact-icon-detail"
                                                        aria-hidden="true"
                                                        style={{ backgroundColor: themes.Plum, color: themes.HeaderText }}
                                                    />
                                                </Link>

                                            </div>
                                            <div className="col">
                                                <Link to={`/contacts/contact/message/${contact.id}`}>
                                                    <i
                                                        class="fa fa-comment-alt mx-1 contact-icon-detail"
                                                        aria-hidden="true"
                                                        style={{ backgroundColor: themes.Plum, color: themes.HeaderText }}
                                                    />
                                                </Link>

                                            </div>
                                            <div className="col">
                                                <Link to={`/contacts/contact/call/${contact.id}`}>
                                                    <i
                                                        class="fa fa-video mx-1 contact-icon-detail"
                                                        aria-hidden="true"
                                                        style={{ backgroundColor: themes.Plum, color: themes.HeaderText }}
                                                    />
                                                </Link>

                                            </div>
                                            <div className="col">
                                                <a href='https://mail.google.com/mail/u/0/#inbox?compose=new' target="_blank">
                                                    <i
                                                        class="fa fa-envelope-open mx-1 contact-icon-detail"
                                                        aria-hidden="true"
                                                        style={{ backgroundColor: themes.Plum, color: themes.HeaderText }}
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <p class="mx-3">Call</p>
                                            </div>
                                            <div className="col">
                                                <p class="mx-3">Text</p>
                                            </div>
                                            <div className="col">
                                                <p class="mx-3">Set</p>
                                            </div>
                                            <div className="col">
                                                <p class="mx-3">Email</p>
                                            </div>
                                        </div>
                                        <div className="row my-3" style={{ textAlign: 'left' }}>
                                            <div className="col-6 mx-4">
                                                <p class="mx-3"><i class="fa fa-phone mx-1" aria-hidden="true" />
                                                    {contact.phone}
                                                </p>

                                            </div>
                                            <div className="col mx-4">
                                                <p class="mx-3"><i class="fa fa-user mx-1" aria-hidden="true" />
                                                    {contact.group}
                                                </p>
                                            </div>
                                            <div className="col mx-4">
                                                <p class="mx-3"><i class="fa fa-envelope mx-1" aria-hidden="true" />
                                                    {contact.email}
                                                </p>
                                            </div>
                                        </div>

                                        <Link to="/contacts">
                                            <button className="btn my-3 p-3 w-75" style={{ backgroundColor: themes.Plum, color: themes.HeaderText }}>
                                                <i class="fa fa-arrow-circle-left mx-2" aria-hidden="true"></i>Back To Home
                                            </button>
                                        </Link>
                                    </div>

                                </section>
                            )}
                        </>

                    )
            }

        </>
    )
}

export default ShowInfo;




