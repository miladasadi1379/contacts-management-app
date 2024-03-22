import React from "react";
import { useContext } from "react";

import { ContactContext } from "../context/contactContext.js";


const Search = () => {

    const { contactSearch, themes } = useContext(ContactContext);

    return (
        <div
            className=" col navbar-brand my-1 m-0 p-0 search-jsx"
            style={{ width: 'revert-layer' }}>
            <div className="input-group m-1 w-100">
                <span
                    className="input-group-text"
                    id="basic-addon1"
                    style={{ backgroundColor: themes.Pink, border: themes.Purple5 }}
                >
                    <i className="fa fa-search" aria-hidden="true" style={{ color: themes.Background }}></i>
                </span>
                <input
                    type="search"
                    style={{ backgroundColor: themes.Gray, borderColor: themes.Pink }}
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={(event) => contactSearch(event.target.value)}
                    id="Search"

                />

            </div>
        </div>
    )
}

export default Search;