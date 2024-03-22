import React from "react";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from '../../validations/contactValidetion'
import { ContactContext } from '../../context/contactContext';

const AddContact = () => {
    const { groups, createContact, themes } = useContext(ContactContext);

    return (
        <>
            <div className="container-fluid my-5 py-5">

                <div className="row">

                    <div className="col-8  m-auto rounded create-contact " >
                        <h2 className="h2 text-text-center mt-5 mb-3" style={{ color: themes.HeaderText === "" ? "plum" : themes.Plum }}>Enter Contact Information</h2>
                        <Formik
                            initialValues={{
                                name: '',
                                phone: '',
                                email: '',
                                photo: '',
                                group: '',
                            }}
                            validationSchema={contactSchema}
                            onSubmit={(values) => {
                                createContact(values);
                            }}
                        >

                            <Form id="addcontact">
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

                                <div className="col-11 d-flex m-auto">
                                    <div className="col-5 m-auto">
                                        <button
                                            type="submit"
                                            form="addcontact"
                                            className="btn btn-submit my-3 p-3 w-100"
                                            style={{ backgroundColor: themes.Pink, color: themes.Text_light }}
                                        >

                                            <i className="fa fa-check mx-2" aria-hidden="true"></i>Save
                                        </button>
                                    </div>
                                    <div className="col-5 m-auto">
                                        <Link to="/contacts">
                                            <button className="btn my-3 mb-3 p-3 w-100 btn-edit-contact" style={{ backgroundColor: themes.Plum, color: themes.Text_light }}>
                                                <i className="fa fa-times mx-2" aria-hidden="true"></i>Cancel
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div >

        </>
    )
}

AddContact.propTypes = {
    setContactInfo: PropTypes.array,
    getContact: PropTypes.array,
    getgroups: PropTypes.array
}

export default AddContact;