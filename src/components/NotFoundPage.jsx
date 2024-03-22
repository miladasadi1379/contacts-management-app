import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { ContactContext } from "../context/contactContext";
import dark404 from '../assets/404darkt24.jpg'
import dark403 from '../assets/404darkt23.jpg'
import light404 from '../assets/404light.jpg'

const NotFoundPage = () => {

    const { themes } = useContext(ContactContext);
    const backgroundImageDark = `url(${process.env.PUBLIC_URL + `${dark404}`})`;

    return (
        <>
            {
                themes.Name === "DARK" ? (

                    <div className="App flex w-100 h-100" style={{
                        background: backgroundImageDark,
                        color: themes.Purple1,
                        justifyContent: "center",
                        display: "flex",

                    }}>
                        <section className="container  rounded">
                            <section className="container my-3">
                                <div className="grid">
                                    <div className="row">
                                        <div className="col-12 m-auto">
                                            <img
                                                src={dark403}
                                                className=" d-flex m-auto"
                                                style={{ width: "90%", height: "90%" }}
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-12">
                                            <p className="h3">
                                                <Link to={`/contacts`} >
                                                    <button
                                                        className="btn btn-warning w-50 m-1 hover-link"
                                                        style={{
                                                            color: themes.Purple1,

                                                        }}>
                                                        <i className="fa fa-arrow-left mx-2" aria-hidden="true"></i>
                                                        Go Home
                                                    </button>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </div>
                ) : (
                    <div className="App flex w-100 h-100" style={{
                        backgroundColor: "white",
                        color: themes.Purple1,
                        justifyContent: "center",
                        display: "flex",

                    }}>
                        <section className="container  rounded">
                            <section className="container my-3">
                                <div className="grid">
                                    <div className="row">
                                        <div className="col-12 m-auto">
                                            <img
                                                src={light404}
                                                className=" d-flex m-auto"
                                                style={{ width: "60%", height: "60%" }}
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-12">
                                            <p className="h3">
                                                <Link to={`/contacts`} >
                                                    <button
                                                        className="btn w-50 m-1 hover-link"
                                                        style={{
                                                            color: themes.Purple1,
                                                            backgroundColor: 'plum'
                                                        }}>
                                                        <i className="fa fa-arrow-left mx-2" aria-hidden="true"></i>
                                                        Go Home
                                                    </button>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </div>
                )
            }

        </>
    )
}

export default NotFoundPage;