import React from "react";
import HeaderLayout from "../header/header"
import SidebarLayout from "../sidebar/sidebar"
import Substainable from "../../pages/substainable/substain"

export default function Main() {
    return (
        <>
        <div className="main-wrapper">
            <HeaderLayout />
            <SidebarLayout />
            <Substainable />
        </div>
            
        </>
    )
}