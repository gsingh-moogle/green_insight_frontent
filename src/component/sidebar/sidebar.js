import React from "react";
import "./sidebar.scss";
import Dashboard from "../../assets/images/iconWhite-1.svg";
import Segmentation from "../../assets/images/iconWhite-2.svg";
import Decardlevers from "../../assets/images/iconWhite-3.svg";
import Project from "../../assets/images/iconWhite-4.svg";
import Resources from "../../assets/images/iconWhite-5.svg";
import Setting from "../../assets/images/iconWhite-6.svg";
import Login from "../../assets/images/iconWhite-7.svg";
import Collapse from "../../assets/images/iconWhite-8.svg";
import Region from "../../assets/images/byregion.svg";
import Facility from "../../assets/images/facility.svg";
import Carrier from "../../assets/images/bycarrier.svg";
import Newlogo from "../../assets/images/newLogo.svg";
import Lane from "../../assets/images/bylane.svg";
import Methodologies from "../../assets/images/glecicon.svg";
import Accreditation from "../../assets/images/accreditation.svg";
import CarrierComparision from "../../assets/images/ByCarrierComparison.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';
import { reset } from "../store/auth/authDataSlice";
import { resetGraphDetail } from "../store/auth/graph/graphDetailsSlice";

import { clearData } from "../store/dashboard/dashSlice"
import { useDispatch, useSelector } from "react-redux";
import Accordion from 'react-bootstrap/Accordion';
import { useAuth } from "../../routes/ProtectedRoute";
import { sideBarToggleStatus } from "../../component/store/auth/authDataSlice";
import { useLocation } from 'react-router-dom';


const Sidebar = () => {
    const dataCheck = useAuth();
    const location = useLocation();

    const { sideBarStatus } = useSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ToggleSidebar = () => {
        dispatch(sideBarToggleStatus(!sideBarStatus))
    }
    const handleLogOut = () => {
        dispatch(reset())
        dispatch(resetGraphDetail())
        dispatch(clearData())
        localStorage.removeItem("loginDetails");
        navigate("/");
    }
    return (
        <>
            <div className={`sidebar ${sideBarStatus ? '' : 'close-sidebar'}`}>
                <div className="position-relative h-100">
                    <div className="logo p-3 d-flex justify-content-between align-items-center">
                        <div className="logoNew">
                            <img src={Newlogo} />
                        </div>
                        <p onClick={ToggleSidebar} className="pe-2 mb-0 d-md-none" data-toggle="tooltip" data-placement="right" title="Expand Side Bar"><img src={Collapse} alt="ico" /></p>
                    </div>
                    <div className="accordion " id="accordionExample">

                        <Nav>
                            <NavItem className="">
                                {dataCheck?.userdata?.role === 0 ? (
                                    <NavLink to="/sustainable" className={(navData) => ((navData.isActive || location.pathname.includes("/regional-level")) ? 'current-screen sidebarName d-flex align-items-center fs-6' : ' d-flex align-items-center ')}>
                                        <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Dashboard">
                                            <img src={Dashboard} alt="ico" />
                                        </p>
                                        <h3 className="fs-6 mb-0 collapse-txt pt-1">Dashboard</h3>
                                    </NavLink>
                                ) : (
                                    <NavLink to="/regional-level" className={(navData) => ((navData.isActive || location.pathname.includes("/regional-level")) ? 'current-screen sidebarName  d-flex align-items-center fs-6' : ' d-flex  align-items-center')}>
                                        <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Dashboard">
                                            <img src={Dashboard} alt="ico" />
                                        </p>
                                        <h3 className="fs-6 mb-0 collapse-txt">Dashboard</h3>
                                    </NavLink>
                                )}
                            </NavItem>
                            <NavItem>

                                <div className="accordion-item ">
                                    <h2 className={`accordion-header ${location.pathname !== "/regional-level" ? (location.pathname.includes("/regional") || location.pathname.includes("/facility") || location.pathname.includes("/lanes") || location.pathname.includes("/carrier") || location.pathname.includes("/carrier-comparison") || location.pathname.includes("/facility-overview") || location.pathname.includes("/region-overview") || location.pathname.includes("/lanes-overview") || location.pathname.includes("/carrier-overview")) ? 'sidebarName mb-2' : '' : ''}`} id="headingOne">
                                        <button className=" accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <p className="pe-2 mb-0 " data-toggle="tooltip" data-placement="right" title="Segmentation " ><img src={Segmentation} alt="ico" /></p>
                                            <h3 className="mb-0 collapse-txt fs-6 pt-1">Segmentation</h3>

                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse mb-2" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body sublinks-1">
                                            <Nav className=" pb-0">
                                                {dataCheck?.userdata?.role === 0 && (
                                                    <NavItem className="mb-2">
                                                        <NavLink to="/regional" className={(navData) => (navData.isActive ? 'activeclass p-0' : 'd-flex align-items-center p-0')}>
                                                            <div className="d-flex align-items-center">
                                                                <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="By Region">
                                                                    <img src={Region} alt="ico" />
                                                                </p>
                                                                <h3 className="fs-14 mb-0 collapse-txt">By Region</h3>
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                )}
                                                <NavItem className="mb-2">
                                                    <NavLink to="/facility" className={(navData) => (navData.isActive ? 'activeclass p-0' : 'd-flex align-items-center fs-6 p-0')}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="By Facility">
                                                                <img src={Facility} alt="ico" />
                                                            </p>
                                                            <h3 className="fs-14 mb-0 collapse-txt"> By Facility</h3>
                                                        </div>

                                                    </NavLink>
                                                </NavItem>
                                                <div className="another-accordian">
                                                    <Accordion>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>
                                                                <NavItem className="mb-2">
                                                                    <NavLink to="/carrier" className={(navData) => (navData.isActive ? 'activeclass p-0' : 'd-flex align-items-center fs-6 p-0')}>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="By Carrier">
                                                                                <img src={Carrier} alt="ico" />
                                                                            </p>
                                                                            <h3 className="fs-14 mb-0 collapse-txt">By Carrier</h3>
                                                                        </div>
                                                                    </NavLink>
                                                                </NavItem>
                                                            </Accordion.Header>
                                                            <Accordion.Body className="p-0">
                                                                <NavItem className="mb-2 ps-3">
                                                                    <NavLink to="/carrier-comparison" className={(navData) => (navData.isActive ? 'activeclass p-0' : 'd-flex lh-1 align-items-center fs-14 p-0')}>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Carrier Comparison">
                                                                                <img src={CarrierComparision} alt="ico" />
                                                                            </p>
                                                                            <h3 className="fs-14 mb-0 collapse-txt">Carrier Comparison</h3>
                                                                        </div>
                                                                    </NavLink>
                                                                </NavItem>
                                                            </Accordion.Body>
                                                        </Accordion.Item>

                                                    </Accordion>
                                                </div>


                                                <NavItem className="mb-2" >
                                                    <NavLink to="/lanes" className={(navData) => (navData.isActive ? 'activeclass p-0' : 'd-flex align-items-center p-0')}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="By Lane">
                                                                <img src={Lane} alt="ico" />
                                                            </p>
                                                            <h3 className="fs-14 mb-0 collapse-txt"> By Lane</h3>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </div>
                                </div>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/decarb" className={(navData) => {
                                    return ((navData.isActive || location.pathname.includes("/decarb-recommended")) ? 'current-screen sidebarName d-flex align-items-center fs-6' : ' d-flex align-items-center fs-6 ')
                                }}>
                                    <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Decarb levers"><img src={Decardlevers} alt="ico" /></p>
                                    <h3 className="mb-0 collapse-txt fs-6 pt-1">Decarb levers</h3>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/projects" className={(navData) => ((navData.isActive || location.pathname.includes("/project-detail")) ? 'current-screen sidebarName d-flex align-items-center fs-6' : ' d-flex align-items-center fs-6 ')}>
                                    <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Projects"><img src={Project} alt="ico" /></p>
                                    <h3 className="mb-0 collapse-txt fs-6 pt-1">Projects</h3>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Resources"><img src={Resources} alt="ico" /></p>
                                            <h3 className="mb-0 collapse-txt fs-6 pt-1"> Resources</h3>

                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse mb-2 " aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="sublinks px-3">
                                            <Nav className="ps-4 pb-0">
                                                <NavItem className="mb-2">
                                                    <a href="https://smartfreightcentre.org/en/about-sfc/about-us/" target="_blank" className="p-0">
                                                        <div className="d-flex align-items-center">
                                                            <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Methodologies">
                                                                <img src={Methodologies} alt="ico" />
                                                            </p>
                                                            <h3 className="mb-0 collapse-txt fs-14 m-cursor">
                                                                <a target="_blank" href="https://smartfreightcentre.org/en/about-sfc/about-us/" className="p-0 fs-14">Methodologies</a>
                                                            </h3>
                                                        </div>
                                                    </a>

                                                </NavItem>
                                                <NavItem>
                                                    <NavLink to="/" className={(navData) => (navData.isActive ? 'current-screen fs-6' : 'd-flex align-items-center fs-6 p-0')}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Accreditation">
                                                                <img src={Accreditation} alt="ico" />
                                                            </p>
                                                            <h3 className="mb-0 collapse-txt fs-14"> Accreditation</h3>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </div>
                                </div>

                            </NavItem>
                            <NavItem>
                                <NavLink to="/settings" className={(navData) => (navData.isActive ? 'current-screen sidebarName d-flex align-items-center fs-6' : ' d-flex align-items-center fs-6 ')}>
                                    <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="User Managenment"><img src={Setting} alt="icon" /></p>
                                    <h3 className="mb-0 collapse-txt fs-6 pt-1">User Management</h3>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>

                    <Nav className="position-absolute support-items">
                        <NavItem>
                            <button className="d-flex align-items-center fs-6 " onClick={handleLogOut}>
                                <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Log out"><img src={Login} alt="ico" /></p>
                                <h3 className="mb-0 collapse-txt fs-6">Log out</h3>
                            </button>
                        </NavItem>
                        {/* <NavItem className="collapse-border">
                            <button type= "button" className="d-flex align-items-center fs-6 " onClick={ToggleSidebar}>
                                <p className="pe-2 mb-0" data-toggle="tooltip" data-placement="right" title="Expand Side Bar"><img src={Collapse} alt="ico" /></p>
                                <h3 className="mb-0 collapse-txt fs-6 text-start">Collapse Side Bar</h3>
                            </button>
                        </NavItem> */}
                    </Nav>
                </div>
            </div>
        </>
    )
}


export default Sidebar