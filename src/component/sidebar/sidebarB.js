import React from "react";
import "./sidebar.scss";
import Login from "../../assets/images/iconWhite-7.svg";
import Collapse from "../../assets/images/iconWhite-8.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';
import { reset } from "../store/auth/authDataSlice";
import { clearData } from "../store/dashboard/dashSlice"
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../routes/ProtectedRoute";
import { sideBarToggleStatus } from "../../component/store/auth/authDataSlice";


const Sidebar = (props) => {
    const dataCheck = useAuth();
    
    const { sideBarStatus } = useSelector(
        (state) => state.auth
    );


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ToggleSidebar = () => {
        dispatch(sideBarToggleStatus(!sideBarStatus))
    }
    const handleLogOut = () => {
        props.setShowFileUpload(false)
    }
    return (
        <>
            <div className={`sidebar ${sideBarStatus ? '' : 'close-sidebar'}`}>
                <div className="position-reative h-100">
                    <Nav>
                    <NavItem>
                            <button className="d-flex align-items-center fs-6 px-3 py-xxl-2 pt-xxl-3 py-1" onClick={handleLogOut}>
                                <p className="pe-2 mb-0"  data-toggle="tooltip" data-placement="right" title="Log out"><img src={Login} alt="ico" /></p>
                                <h3 className="mb-0 collapse-txt fs-6">Log out</h3>
                            </button>
                        </NavItem>
                       
                    </Nav>

                   
                </div>
            </div>
        </>
    )
}


export default Sidebar