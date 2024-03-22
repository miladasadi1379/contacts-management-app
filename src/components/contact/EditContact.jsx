import React from "react";
import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { useImmer } from "use-immer";
import { getContact, updateContact, getAllContacts } from "../../services/contactService";
import { ContactContext } from '../../context/contactContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from '../../validations/contactValidetion'
import { toast } from 'react-hot-toast';
import Spinner from "../Spinner.jsx";




const EditContact = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const {
        loading,
        setLoading,
        contacts,
        setContacts,
        groups,
        themes
    } = useContext(ContactContext);

    const [contact, setContact] = useImmer({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(id);
                const allContacts = await getAllContacts();
                // get all contacts before update info
                setContacts(allContacts);

                // get contact info
                setContact(contactData);
                setLoading(false);

            } catch (err) {
                console.log(err.message);
                toast.error(`${err.message}`)
                setLoading(false)
            }
        }
        fetchData();
    }, []);


    const submitForm = async (values) => {
        try {
            setLoading(true);
            // req to json-server
            const { data, status } = await updateContact(values, id);
            if (status === 200) {
                setLoading(false);
                // set updated contact to old contacts
                setContacts(draft => {
                    const contactIndex = contacts.data.findIndex(
                        (c) => c.id === parseInt(id)
                    );
                    draft[contactIndex] = { ...data }
                })
                // render new contacts after update
                const newdata = await getAllContacts();
                setContacts(newdata.data);

                navigate("/contacts");

                toast('Successfully Updated!', {
                    duration: 3000,
                    position: 'top-left',

                    // Styling
                    style: {
                        color: themes.Background,
                        backgroundColor: themes.Pink
                    },

                    // Custom Icon
                    icon: '✌️',

                    // Aria
                    ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                    },
                });
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error(`${err.message}`, {
                style: {
                    color: themes.Background
                },
            })
        }
    };

    return (
        <>
            {
                loading ? <Spinner /> : (
                    <div class="container-fluid my-5 py-5 container-editcontact">
                        <div className="row">
                            <div className="col-8  m-auto rounded create-contact " style={{ backgroundColor: themes.Background, color: themes.Pink }}>
                                <h2 className="h2 text-text-center mt-5 mb-3">Edit Contact Information</h2>
                                <Formik
                                    initialValues={{
                                        name: contact.name,
                                        phone: contact.phone,
                                        email: contact.email,
                                        photo: contact.photo,
                                        group: contact.group,
                                    }}
                                    validationSchema={contactSchema}
                                    onSubmit={(values) => {
                                        submitForm(values);
                                    }}
                                >
                                    <Form id="editcontact">
                                        <div className="col-11 m-auto">

                                            <div className="input-group m-3">
                                                <span className="input-group-text" id="inputGroup-sizing-default">
                                                    <i className="fa fa-user-edit mx-1" aria-hidden="true"></i>
                                                    Name</span>
                                                <Field
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    aria-label="Sizing example input"
                                                    aria-describedby="inputGroup-sizing-default"
                                                />
                                                <div className="div-formik mx-3" >
                                                    <ErrorMessage name="name" />
                                                </div>
                                            </div>

                                            <div className="input-group m-3">
                                                <span className="input-group-text" id="inputGroup-sizing-default">
                                                    <i className="fa fa-phone mx-1" aria-hidden="true"></i>
                                                    Phone
                                                </span>
                                                <Field
                                                    name="phone"
                                                    type="number"
                                                    className="form-control"
                                                    aria-label="Sizing example input"
                                                    aria-describedby="inputGroup-sizing-default"
                                                />
                                                <div className="div-formik mx-3" >
                                                    <ErrorMessage name="phone" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-11 m-auto">
                                            <div className="input-group m-3">
                                                <span className="input-group-text" id="inputGroup-sizing-default">
                                                    <i className="fa fa-envelope mx-1" aria-hidden="true"></i>
                                                    Email
                                                </span>
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                />
                                                <div className="div-formik mx-3" >
                                                    <ErrorMessage name="email" />
                                                </div>

                                            </div>
                                            <div className="input-group m-3">
                                                <span className="input-group-text" id="inputGroup-sizing-default">
                                                    <i className="fa fa-user mx-1" aria-hidden="true"></i>
                                                    Group
                                                </span>

                                                <Field as="select" className="form-select" name="group">
                                                    <option value="DEFAULT" selected>Choose...</option>
                                                    {
                                                        groups.length > 0 && groups.map((n, gId) => (
                                                            <option key={gId} value={n.relationship}>{n.relationship}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <div className="div-formik mx-3" >
                                                    <ErrorMessage name="group" />
                                                </div>

                                            </div>
                                            <div className="input-group m-3">
                                                <span className="input-group-text" id="inputGroup-sizing-default">
                                                    <i className="fa fa-photo-video mx-1" aria-hidden="true"></i>
                                                    Photo
                                                </span>
                                                <Field
                                                    name="photo"
                                                    type="url"
                                                    className="form-control"
                                                />
                                                <div className="div-formik mx-3" >
                                                    <ErrorMessage name="photo" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11 d-block m-auto">
                                            <div className="col-5 w-100 editcontact ">
                                                <input
                                                    type="submit"
                                                    className="btn my-3 mb-3 p-3 w-100 editContact "
                                                    style={{ backgroundColor: themes.Plum }}
                                                    value="Save"
                                                    form="editcontact"
                                                />
                                            </div>

                                        </div>
                                    </Form>
                                </Formik>

                            </div>
                        </div>
                    </div >
                )
            }

        </>
    )




}

export default EditContact;

