import React from "react";
import "./header.scss";
import Profileimg from "../../assets/images/profile-img-auto.png";
import Menu from "../../assets/images/Menu.png";
import { useDispatch, useSelector } from "react-redux";
import { sideBarToggleStatus } from "../../component/store/auth/authDataSlice";
import Collapse from "../../assets/images/icon-9.svg";

const Header = () => {
  const dispatch = useDispatch();
  const { sideBarStatus, headerName } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.graphDetails);
  const ToggleSidebar = () => {
    dispatch(sideBarToggleStatus(!sideBarStatus))
  }
  return (
    <>
      <header className="dashboard-navbar">
        <div className="container-fluids">
          <div className="header-wrapper p-3 ps-0 py-1 d-sm-flex justify-content-between align-items-center position-relative">
            <div className="header-logo-wrapper d-flex align-items-center">
              <div className="d-flex align-items-center iconsSpace">
                <p  onClick={ToggleSidebar} className="pe-2 mb-1 collapseIcon" data-toggle="tooltip" data-placement="right" title="Collapse Side Bar"><img src={Collapse} alt="ico" /></p>
                <p  onClick={ToggleSidebar} className="pe-2 ps-3 mb-1 buggerIcon" data-toggle="tooltip" data-placement="right" title="Expand Side Bar"><img src={Menu} alt="logo" /></p>
              
                <h3 className="fw-semibold mb-0">{headerName}</h3>
              
              </div>

              <div
                className="ps-4 d-none"
                onClick={() => dispatch(sideBarToggleStatus(!sideBarStatus))}
              >
                <img src={Menu} alt="logo" />
              </div>
            </div>

            <div className="admin d-flex align-items-center mt-3 mt-md-0 pe-0 ">
              <div className="pe-4 lower-logo">
                {JSON.parse(localStorage.getItem("loginDetails"))?.Company
                  ?.logo && (
                    <img
                      src={
                        process.env.REACT_APP_BASE_URLFULL +
                        JSON.parse(localStorage.getItem("loginDetails"))?.Company
                          ?.logo
                      }
                      alt="logo"
                    />
                  )}
              </div>
              <div className="admin-img me-3 position-relative">
                {/* <span><img src={Batch}/></span> */}

                <img
                  src={
                    userProfile?.data?.Profile
                      ?.image
                      ? process.env.REACT_APP_BASE_URLFULL +
                      userProfile?.data?.Profile?.image
                      : Profileimg
                  }
                  alt="logo"
                />
              </div>
              <div className="admin-data">
                <span className="region-text">
                  {JSON.parse(localStorage.getItem("loginDetails"))?.role ===
                    1 &&
                    JSON.parse(localStorage.getItem("loginDetails"))?.Region
                      ?.name + " region"}
                </span>
                <h4 className="fs-6 mb-0">
                  {userProfile?.data?.Profile?.first_name} {userProfile?.data?.Profile?.last_name}
                </h4>
                <p className="mb-0">
                  {JSON.parse(localStorage.getItem("loginDetails"))?.role === 1
                    ? "Manager, transport"
                    : "Head of sustainability"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header