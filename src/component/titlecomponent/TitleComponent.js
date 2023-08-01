import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../../routes/ProtectedRoute";
const TitleComponent=({title}) => {
    let defaultTitle='GreenSight'
    const isAuth = useAuth();
    return (<Helmet><title>{!isAuth ? `GreenSight | ${title}`:defaultTitle}</title></Helmet>)
}
export {TitleComponent}