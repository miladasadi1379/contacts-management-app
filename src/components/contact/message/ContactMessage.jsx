import React from "react";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactContext } from "../../../context/contactContext";
import { Form, Field, Formik } from "formik";
import { useImmer } from 'use-immer';
import { getContact } from '../../../services/contactService';
import Spinner from "../../Spinner";



const ContactMessage = () => {
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
                    <section className="container-fluid rounded" style={{ marginBlock: '6vh' }}>
                        <div
                            class="card my-2 m-auto card-message"
                            style={{
                                width: "40%",
                                textOverflow: "inherit",
                                fontSize: "large",
                                color: themes.Purple1
                            }}>
                            <div className="row">
                                <div className="col-11 d-flex" >
                                    <Link to={`/contacts/${contact.id}`}>
                                        <i
                                            class="fa fa-arrow-circle-left m-3"
                                            aria-hidden="true"
                                            style={{ color: themes.Plum }}
                                        />

                                    </Link>
                                </div>

                                <div className="col-11 d-block m-auto">
                                    <p style={{ color: themes.Plum, textAlign: 'left' }}>slm {state.contact.name}</p>
                                    <p style={{ color: themes.Purple1, textAlign: 'right' }}>slm mmd</p>
                                    <p style={{ color: themes.Plum, textAlign: 'left' }}>chetori??</p>
                                    <p style={{ color: themes.Purple1, textAlign: 'right' }}>Fda U ok?</p>
                                    <p style={{ color: themes.Plum, textAlign: 'left' }}>Shokr</p>
                                    <p style={{ color: themes.Purple1, textAlign: 'right' }}>kojayi??</p>
                                </div>

                                <div className="row">
                                    <div className="col-11 m-auto">
                                        <hr />
                                        <Formik
                                            initialValues={{ Text: '' }}>
                                            <Form id="send-message" className="my-3" method="post" autocomplete="off" list="autocompleteOff" type='text'>
                                                <button className="btn" style={{ color: themes.Plum }}>
                                                    <span class="mu-3"><i class="fa fa-plus-circle " aria-hidden="true" style={{ color: themes.Plum }} /></span>
                                                </button>
                                                <button className="btn" style={{ color: themes.Plum }}>
                                                    <span class="mu-3"><i class="fa-solid fa-image " aria-hidden='true' style={{ color: themes.Plum }} /></span>
                                                </button>
                                                <button className="btn" style={{ color: themes.Plum }}>
                                                    <span class="mu-3"><i class="fa-solid fa-face-smile " aria-hidden='true' style={{ color: themes.Plum }} /></span>
                                                </button>
                                                <Field
                                                    name="text"
                                                    type="text"
                                                    className="form-control w-50 m-auto d-inline-block rounded"
                                                    aria-label="Sizing example input"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    autocomplete="false"
                                                />
                                                <button className="btn" style={{ color: themes.Plum }}>
                                                    <span class="mu-3"><i class="fa fa-paper-plane mx-1" aria-hidden="true" /></span>
                                                </button>
                                            </Form>
                                        </Formik>
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

export default ContactMessage;