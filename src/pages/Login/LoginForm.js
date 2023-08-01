import React, { useState, useEffect } from "react";
import "../Login/Login.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import message from "../../assets/images/Message.svg";
import passwordImg from "../../assets/images/password.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "reactstrap";

import { TitleComponent } from "../../component/titlecomponent/TitleComponent";
import { useDispatch, useSelector } from "react-redux";
import { loginPost, otpPost } from "../../component/store/auth/authDataSlice";
import { useAuth } from "../../routes/ProtectedRoute";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Lottie from "react-lottie-player";

import lottieJson from "./USA_Map.json";
const LoginForm = () => {
  const { loginDetails, isSuccess, otpSuccess, otpError } = useSelector(
    (state) => state.auth
  );

  const [show, setShow] = useState(false);
  const [otpNumber, setOtpNumber] = useState("");
  const [handleOtpBtn, setHandleOtpBtn] = useState(false);
  const [otpErrorShow, setotpErrorShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const dataCheck = useAuth();
  const [email1, setEmail1] = useState("");
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter the valid username")
      .required("Username should not be empty"),
    password: yup
      .string()
      .min(3, "Please enter the min 3 letter")
      .required("Password should not be empty"),
  });
  let _Fields = { email: "", password: "" };
  useEffect(() => {
    if (
      isSuccess &&
      loginDetails?.message ===
      "Verification code send to registered phone number."
    ) {
      setShow(true);
      setotpErrorShow(false);
    } else if (
      !isSuccess &&
      loginDetails?.message !==
      "Verification code send to registered phone number."
    ) {
      setShow(false);
      setotpErrorShow(false);
      localStorage.clear();
    } else if (isSuccess &&
      loginDetails?.message ===
      "User Logged In Successfully.") {
      setShow(false);
      setotpErrorShow(false);
      if (dataCheck?.loggedIn) {
        if (dataCheck?.userdata?.count === 1) {
          navigate("/settings");
        } else {
          if (dataCheck?.userdata?.role === 1) {
            if (dataCheck?.userdata?.Region?.id) {
              localStorage.setItem(
                "regionalLevel",
                dataCheck?.userdata?.Region?.id
              );
            }
            navigate("/regional-level");
          } else {
            navigate("/sustainable");
          }
        }
      }

    }
  }, [isSuccess]);
  useEffect(() => {
    if (otpSuccess && dataCheck?.loggedIn) {
      if (dataCheck?.userdata?.role === 1) {
        if (dataCheck?.userdata?.Region?.id) {
          localStorage.setItem(
            "regionalLevel",
            dataCheck?.userdata?.Region?.id
          );
        }
        navigate("/regional-level");
      } else {
        navigate("/sustainable");
      }
    }
  }, [otpSuccess]);
  useEffect(() => {
    if (handleOtpBtn) {
      dispatch(otpPost({ email: email1, otp: otpNumber }));
      setHandleOtpBtn(false);
    }
  }, [handleOtpBtn]);

  useEffect(() => {
    setotpErrorShow(true);
  }, [otpError]);

  const handleSubmit = (event) => {

    const userPayload = {
      email: event.email,
      password: event.password,
    };
    dispatch(loginPost(userPayload));

  };

  const formik = useFormik({
    initialValues: _Fields,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <TitleComponent title={"Login"} />
      <section className="login">
        <div className="container-fluid px-0">
          <div className="row gx-0 align-items-center ">
            {/* Side Image Loop */}
            <div className="col-md-6">
              <div className="left-side-wrapper p-4">
                <div className="left-logo">
                  <img src={logo} alt="logo" />
                </div>
                <div className="login-map text-center">
                  <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    style={{ background: "transparent" }}
                  />


                  <h4 className="login-heading mt-1 mt-md-5 fw-light">
                    GreenSight
                  </h4>

                </div>
              </div>
            </div>
            {/* Login Form */}
            <div className="col-md-6">
              <div className="right-side-wrapper w-75 mx-auto mt-3 mt-md-0">
                <h4 className="fs-3">Sign In</h4>
                <p className="fw-normal mb-4">
                  Enter your username and password to sign in.
                </p>

                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <div className="mail ">
                      <div className="position-relative">
                        <img
                          src={message}
                          alt="imgicon"
                          className="position-absolute password-icon"
                        />

                        <input
                          type="text"
                          name="email"
                          className="form-control ps-5 py-3"
                          onChange={(e) => {
                            formik.handleChange(e);
                            setEmail1(e.target.value);
                          }}
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter your username"
                        />
                      </div>

                      {formik.errors.email ? (
                        <span className="error-code">
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mail ">
                      <div className="position-relative">
                        <img
                          src={passwordImg}
                          alt="icon"
                          className="position-absolute password-icon"
                        />
                        <input
                          type="password"
                          name="password"
                          className="form-control ps-5 py-3"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          id="exampleInputPassword1"
                          placeholder="Enter your password"
                        />
                      </div>

                      {formik.errors.password ? (
                        <span className="error-code">
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-4 form-check d-flex justify-content-between">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-green w-100 py-2">
                    Sign In
                  </button>
                  <div className="valid-otp-wrap">


                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton className="border-modal-login">
                        <Modal.Title>
                          <h3 className="fs-5 mb-0">
                            Enter the authentication code
                          </h3>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="py-0">
                        {" "}
                        <Input
                          id="exampleEmail"
                          name="email"
                          className="form-control"
                          placeholder="Authentication Code"
                          type="text"
                          maxLength={"6"}
                          value={otpNumber}
                          onChange={(e) => {
                            setOtpNumber(e.target.value);
                            setotpErrorShow(false);
                          }}
                        />
                        {otpError && otpErrorShow ? (
                          <h6 className="error-code ps-0 pt-2">
                            Enter the authentication code correctly
                          </h6>
                        ) : (
                          ""
                        )}
                      </Modal.Body>
                      <Modal.Footer className="border-bottom-modal justify-content-center">
                        <div className="text-center">
                          <Button
                            type="submit"
                            onClick={() => setHandleOtpBtn(true)}
                            className="btn btn-green py-1 px-4"
                          >
                            Submit
                          </Button>
                        </div>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </form>
                <div className="create-accnt text-center mt-3">
                  <a href="#" className="text-decoration-none">
                    Don’t have an account?{" "}
                    <span className="fw-bold">Create account</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm