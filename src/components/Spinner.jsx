import React from "react";

import spinner2 from "../assets/spin.png"

const Spinner = () => {
    return (
        <>
            <img
                src={spinner2}
                className=" d-flex preloading"
                style={{ width: "20%", height: "20%" }}
                alt=""
            />
        </>
    )
}

export default Spinner;