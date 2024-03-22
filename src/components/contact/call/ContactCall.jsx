import React from "react";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactContext } from "../../../context/contactContext";
import { Form, Field, Formik } from "formik";
import { useImmer } from 'use-immer';
import { getContact } from '../../../services/contactService';
import Spinner from "../../Spinner";



const ContactCall = () => {
    const { id } = useParams();
    const { themes } = useContext(ContactContext);

    const [state, setState] = useImmer({
        contact: {},
        loading: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: false });
                const { data: contactData } = await getContact(id);
                setState({
                    state,
                    loading: false,
                    contact: contactData
                })
            } catch (err) {
                console.log(err.message);
                setState({ ...state, loading: false });
            }
        }
        fetchData();
    }, [])

    const { loading, contact } = state;

    return (
        <>
            {
                loading ? <Spinner /> : (
                    <section className="container-fluid rounded my-3" style={{ overflow: 'hidden' }}>
                        <div
                            class="card my-3 m-auto card-call"
                            style={{
                                width: "60%",
                                textOverflow: "inherit",
                                fontSize: "large",
                                color: themes.Purple1,
                                overflow: 'hidden'
                            }}>
                            <div className="row">
                                <div className="col-6 d-flex" >
                                    <Link to={`/contacts/${contact.id}`}>
                                        <i
                                            class="fa fa-arrow-circle-left m-3 contact-icon-detail"
                                            aria-hidden="true"
                                            style={{ color: themes.HeaderText, backgroundColor: themes.Plum }}
                                        />
                                    </Link>
                                </div>
                                <div className="col mx-1" style={{ textAlign: 'end' }}>
                                    <Link to={`/contacts/${contact.id}`}>
                                        <i
                                            class="fa fa-volume-up m-3 contact-icon-detail"
                                            aria-hidden="true"
                                            style={{ color: themes.HeaderText, backgroundColor: themes.Plum }}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="row">
                                <img
                                    src={contact.photo}
                                    alt=""
                                    style={{
                                        border: `1px solid ${themes.Pink}`,
                                        height: "10%",
                                        width: "70%",
                                    }}
                                    className="m-auto my-4"
                                />
                            </div>

                            <div className="row my-3">
                                <div className="col">
                                    <Link to='/contacts'>
                                        <i
                                            class="fa fa-phone mx-1 contact-icon-detail"
                                            aria-hidden="true"
                                            style={{ backgroundColor: 'red', color: themes.HeaderText }}
                                        />
                                    </Link>

                                </div>
                                <div className="col">
                                    <Link to={`/contacts/contact/message/${contact.id}`}>
                                        <i
                                            class="fa fa-video mx-1 contact-icon-detail"
                                            aria-hidden="true"
                                            style={{ backgroundColor: themes.Plum, color: themes.HeaderText }}
                                        />
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to='/contacts'>
                                        <i
                                            class="fa fa-microphone mx-1 contact-icon-detail"
                                            aria-hidden="true"
                                            style={{ backgroundColor: themes.Plum, color: themes.HeaderText }}
                                        />
                                    </Link>

                                </div>
                                <div className="col">
                                    <a href='https://mail.google.com/mail/u/0/#inbox?compose=new' target="_blank">
                                        <i
                                            class="fa fa-stream mx-1 contact-icon-detail"
                                            aria-hidden="true"
                                            style={{ backgroundColor: themes.Plum, color: themes.HeaderText }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </section>
                )
            }
        </>
    )
}

export default ContactCall;