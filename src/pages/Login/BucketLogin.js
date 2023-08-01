import React, { useState } from "react";
import "../Login/Login.scss";
import logo from "../../assets/images/logo.svg";
import message from "../../assets/images/Message.svg";
import passwordImg from "../../assets/images/password.svg";
import { useFormik } from "formik";
import HeaderLayout from "../../component/header/header";
import SidebarLayout from "../../component/sidebar/sidebarB";
import Upload from "../../assets/images/upload.svg";
import * as yup from "yup";
import authService from "../../component/store/auth/authService";

import { toast } from "react-toastify";

export default function BucketLogin() {
    const [userInfo, setUserInfo] = useState(null)
    const [showileUpload, setShowFileUpload] = useState(false);
    const [showileUploadProgress, setShowFileUploadProgress] = useState(false);

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

    const handleSubmit = async (event) => {
        const res = await authService.authLoginBucketPost({
            email: event.email,
            password: event.password,
        });

        if (res?.data?.role === 2) {
            setUserInfo(res?.data)
            setShowFileUpload(true)
        } else {
            toast.error("Please login detail ")
        }

    };

    const formik = useFormik({
        initialValues: _Fields,
        validationSchema: schema,
        onSubmit: handleSubmit,
    });

    const uploadRef = React.useRef();
    const statusRef = React.useRef();
    const loadTotalRef = React.useRef();
    const progressRef = React.useRef();

    const UploadFile = () => {
        setShowFileUploadProgress(true)
        const file = uploadRef.current.files[0];
        let formData = new FormData();
        formData.append("file", file);
        formData.append("container_name", userInfo?.containerName);


        let xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", ProgressHandler, false);
        xhr.addEventListener("load", SuccessHandler, false);
        xhr.addEventListener("error", ErrorHandler, false);
        xhr.addEventListener("abort", AbortHandler, false);

        xhr.open("POST", `${process.env.REACT_APP_BASE_URL}blob/bucket/upload`);
        xhr.setRequestHeader('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDksIm5hbWUiOiJCbG9iIEdlbmVyYWxtaWxscyIsImVtYWlsIjoiYmxvYkdlbmVyYWxNaWxsc0BnZW5lcmFsbWlsbHMuY29tIiwicGFzc3dvcmQiOiIkMmEkMTIkYTRobGNwb0htQW9YcFhmM3Q2Z2E2dUR3M0NNWlFYanBaUnd4NUVOaC9GN3I2SGtMclRyZWUiLCJsb2dpbl9jb3VudCI6NSwicm9sZSI6MiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0yMlQxMDoyODozNS4wMDBaIiwiQ29tcGFueSI6eyJuYW1lIjoiR2VuZXJhbCBtaWxscyIsImRiX25hbWUiOiJncmVlbl9zaWdodF9nZW5lcmFsX21pbGxzIiwibG9nbyI6Ii9pbWFnZXMvY29tcGFueV9sb2dvL21pbGxzX2xvZ28ucG5nIn0sInVwZGF0ZWRBdCI6IjIwMjMtMDUtMjVUMDc6MTE6MzkuNDU4WiJ9LCJpYXQiOjE2ODQ5OTg2OTl9.ISCpTdGupJbkn7q7-p7XPyI2zCzGqeHslXo5IaPcLpU`);

        try {

            xhr.send(formData);
        } catch (err) {
            toast.error('File upload fail ')
        }

    };

    const ProgressHandler = (e) => {
        loadTotalRef.current.innerHTML = `uploaded ${e.loaded} bytes of ${e.total}`;
        let percent = (e.loaded / e.total) * 100;
        progressRef.current.value = Math.round(percent);
        statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";
    };

    const SuccessHandler = (_) => {
        statusRef.current.innerHTML = '';
        progressRef.current.value = 0;
        setShowFileUploadProgress(false)
        setShowFileUpload(false)
        toast.success('File upload successfully ')

    };
    const ErrorHandler = () => {
        statusRef.current.innerHTML = "upload failed!!";
        setShowFileUploadProgress(false)
    };
    const AbortHandler = () => {
        statusRef.current.innerHTML = "upload aborted!!";
        setShowFileUploadProgress(false)

    };


    return (
        <>
            {!showileUpload ? (
                <section className="login bucket-login">
                    <div className="container-fluid px-0">
                        <div className="row gx-0 align-items-center ">
                            <div className="col-md-6">
                                <div className="left-side-wrapper p-4">
                                    <div className="left-logo">
                                        <img src={logo} alt="logo" />
                                    </div>
                                    <div className="login-map  text-center">

                                        <h4 className="login-heading mt-1 mt-md-0 fw-light">
                                            Bucket Login
                                        </h4>
                                    </div>
                                </div>
                            </div>
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
                                                        alt=""
                                                        className="position-absolute password-icon"
                                                    />

                                                    <input
                                                        type="text"
                                                        name="email"
                                                        className="form-control ps-5 py-3"
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                        }}
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter your username"
                                                    />
                                                </div>

                                                {formik.errors.email &&
                                                    <span className="error-code">
                                                        {formik.errors.email}
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="mail ">
                                                <div className="position-relative">
                                                    <img
                                                        src={passwordImg}
                                                        alt=""
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

                                                {formik.errors.password && (
                                                    <span className="error-code">
                                                        {formik.errors.password}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-green w-100 py-2">
                                            Sign In
                                        </button>
                                        <div className="valid-otp-wrap">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="insight_top_wrapper">
                    <HeaderLayout />
                    <div className="main-section position-relative">
                        <SidebarLayout setShowFileUpload={setShowFileUpload}/>
                        <section className="substain-screen regional-wrapper pb-5 login">
                            <div className="container-fluid px-0">
                                <div className="regional-h-wrapper bucketWrapper">
                                    <div className="row gx-0 align-items-center ">

                                        <div className="col-lg-9 mx-auto  align-items-center ">
                                            <div className="right-side-wrapper d-flex flex-column justify-content-center align-items-center mt-3 mt-md-0">
                                                <div className="general-mills">
                                                    <h4 className="login-heading fs-2 mt-0 fw-light">
                                                        Welcome to {userInfo?.Company?.name}  File Upload
                                                    </h4>
                                                    <p className="fw-normal mb-4 text-center">
                                                        Please upload file.
                                                    </p>
                                                    <button type="button" onClick={() => uploadRef.current?.click()} className="upload-btn px-5 py-2 d-flex justify-content-center align-items-center mx-auto">
                                                        <span className="me-2"> <img src={Upload} alt="icon" /></span>Upload
                                                    </button>
                                                    <input type="file" name="file" className="d-none" ref={uploadRef} onChange={UploadFile} />
                                                    {showileUploadProgress && (
                                                        <div>
                                                            <progress ref={progressRef} value="0" max="100" />
                                                        </div>

                                                    )}
                                                    <p ref={statusRef}></p>
                                                    <p ref={loadTotalRef}></p>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </section>
            )}


        </>
    );
}
