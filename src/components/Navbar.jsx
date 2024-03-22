import React from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { ContactContext } from "../context/contactContext.js";
import Search from "./Search";


const Navbar = () => {
    const location = useLocation();
    const { handleThemes, themes } = useContext(ContactContext)

    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{ backgroundColor: themes.Navbar }}>
            <div className="container-fluid">
                <div className="row w-100 m-auto">
                    <div
                        className="nav: col  text-light my-2 navbar-brand navbar-brand-name"
                        style={{ width: "auto" }}
                    >
                        <i className="fa fa-users" aria-hidden="true" style={{ color: themes.Gray }}></i>
                        <span className="m-2" style={{ color: themes.Pink }}>
                            Contacts{" "}
                            <span style={{ color: themes.Gray }}>Management</span>
                        </span>
                    </div>

                    {
                        location.pathname === '/contacts' ? (
                            <Search />
                        ) : null
                    }
                    <div className="col text-light col-xs-12  navbar-brand toggle-theme">
                        {
                            themes.Name === "DARK" ? (
                                <button
                                    className="btn my-1 hover-link theme-dark"
                                    style={{ backgroundColor: themes.background, color: themes.Pink }}
                                    onClick={() => handleThemes()}
                                >
                                    <i className="fa fa-sun" aria-hidden="true"></i>
                                </button>)
                                : (
                                    <>
                                        <button
                                            className="btn my-1 hover-link theme-light"
                                            style={{ backgroundColor: themes.background, color: themes.Pink }}
                                            onClick={() => handleThemes()}
                                        >
                                            <i className="fa fa-moon" aria-hidden="true"></i>
                                        </button>

                                    </>
                                )
                        }
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;