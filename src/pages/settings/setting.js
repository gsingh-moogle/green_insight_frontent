import React, { useRef, useEffect } from "react";
import "../settings/setting.scss";
import "../regional/regional.scss";
import Profileimg from "../../assets/images/profile-img-auto.png";
import Uploadimg from "../../assets/images/upload-img.svg";
import { FormGroup, Form, Row, Col, Label, Input, Button } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsApi, changePasswordApi, updateProfileApi, uploadProfilePic } from "../../component/store/auth/graph/graphDetailsSlice";
import { useAuth } from "../../routes/ProtectedRoute";
import { toast } from "react-toastify";

import { setHeaderName } from "../../component/store/auth/authDataSlice";

const Setting = () => {
    const dispatch = useDispatch();
    const dataCheck = useAuth();

    const { userProfile } = useSelector((state) => state.graphDetails);
    useEffect(() => {       
        dispatch(userDetailsApi());
    }, [dispatch]);


    const schema = yup.object().shape({
        oldPassword: yup.string().required("Current password should not be empty"),
        password: yup.string().required("Password should not be empty").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        currentPassword: yup.string().required("Confirm Password should not be empty").oneOf([yup.ref('password'), null], 'Passwords must match'),
    });
    let _Fields = {
        oldPassword: "",
        password: "",
        currentPassword: "",
    };

    const handleSubmitForm = (event) => {
       
        const userPayload = {
            old_password: event.oldPassword,
            new_password: event.password,

        };
        dispatch(changePasswordApi(userPayload));
    };

    const formik = useFormik({
        initialValues: _Fields,
        validationSchema: schema,
        onSubmit: handleSubmitForm,
       
    });


    const schemaUser = yup.object().shape({
        first_name: yup.string().max(20, "First name should not more than 20 characters").required("First name should not be empty"),
        last_name: yup.string().max(20, "Last  name should not more than 20 characters").required("Last name should not be empty"),
        email: yup.string().email("Email must be a valid email").required("Email should not be empty"),
        phone: yup.string().min(10, 'Contact number should be 10 digits').max(10, 'Contact number should be 10 digits')
    });
    let _FieldsUser = {
        first_name: "",
        last_name: "",
        phone: "",
        email: ""
    };

    const numberOnly = (e) => {
        const key = e.keyCode ? e.keyCode : e.which;
        if (
            !(
                [8, 9, 13, 27, 46].indexOf(key) !== -1 ||
                (key === 65 && (e.ctrlKey || e.metaKey)) ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
                (key >= 96 && key <= 105)
            )
        )
            e.preventDefault();
    }

    const removeSpaceOnly = (e) => {
        const key = e.keyCode ? e.keyCode : e.which;
        if (
            (
                [32].indexOf(key) !== -1

            )
        )
            e.preventDefault();
    }



    const handleSubmitUserForm = (event) => {
       

        const userPayload = {
            first_name: event.first_name,
            last_name: event.last_name,
            phone_number: event.phone,
            email: event?.email
        };
        dispatch(updateProfileApi(userPayload));

    };

    const formikUser = useFormik({
        initialValues: _FieldsUser,
        validationSchema: schemaUser,
        onSubmit: handleSubmitUserForm,
       
    });
    useEffect(() => {
        dispatch(setHeaderName("User Management"))
      }, [dispatch])

    useEffect(() => {
        if (userProfile?.data) {
            formikUser.setFieldValue("first_name", userProfile?.data?.Profile?.first_name || '')
            formikUser.setFieldValue("last_name", userProfile?.data?.Profile?.last_name || '')
            formikUser.setFieldValue("phone", userProfile?.data?.Profile?.phone_number || '')
            formikUser.setFieldValue("email", userProfile?.data?.email || '')
        }     

    }, [userProfile]);


   
    const hiddenFileInput = useRef(null);

   
    const handleClick = () => {        
        hiddenFileInput.current.click();
    };
    
    const handleChange = event => {
        const imageFile = event.target.files[0]      
        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
           
            toast.error("Please select valid image.")
            return false;
        }    
        const bodyFormData = new FormData();
        bodyFormData.append('image', event.target.files[0])
       
        dispatch(uploadProfilePic(bodyFormData));

    };

    return (
        <>
            <section className="insight_top_wrapper">
                    <section className="regional-wrapper setting-screen-wrapper pb-4">
                        <div className="container-fluid">
                            <div className=" py-4">
                                <h4 className=" mb-2">
                                    Edit Profile
                                </h4>
                                <div>

                                  
                                    {dataCheck?.userdata?.response?.login_count === 1 && <h4 className="authentication">We recommend you to update your password. </h4>}
                                </div>


                            </div>
                            <Row className="justify-content-center">
                                <Col lg="4" className="mt-lg-0 mt-3">
                                    <div className=" main-wraper-setting h-100 position-relative">
                                        <div className=" w-100">
                                            <div className="edit-profile">
                                                <h4 className="fw-semibold border-bottom pt-4 px-4 pb-2 mb-0">
                                                    Login Security
                                                </h4>
                                                <div className=" p-4">

                                                    <div className="d-flex flex-column justify-content-center align-items-center profile-img-wrapper mt-2 mb-4">
                                                       
                                                        <div className="text-center position-relative profileimg-outer">
                                                            <img
                                                                src={
                                                                    userProfile?.data?.Profile
                                                                        ?.image
                                                                        ? process.env.REACT_APP_BASE_URLFULL +
                                                                        userProfile?.data?.Profile?.image
                                                                        : Profileimg
                                                                }
                                                                alt="logo"
                                                                className="rounded-circle mb-2 profileimgWrap"
                                                            />
                                                           
                                                                        <img title="Upload Image" src={Uploadimg} onClick={() => handleClick()} className="rounded-circle mb-2 uploadImg" alt="demo" />
                                                       
                                                            
                                                            <input
                                                                data-testid="profile_pic"
                                                                type="file"
                                                                ref={hiddenFileInput}
                                                                onChange={handleChange}
                                                                style={{ display: 'none' }}
                                                            />
                                                        </div>


                                                        <p>   {userProfile?.data?.Profile?.first_name} {userProfile?.data?.Profile?.last_name}
                                                        </p>
                                                    </div>
                                                    <Form data-testid="login_security"
                                                        onSubmit={formik.handleSubmit}>
                                                        <FormGroup className="mb-4">
                                                            <Label for="examplePhone">
                                                                Current Password<span className="astrick-sign text-danger">*</span>
                                                            </Label>
                                                            <Input
                                                                data-testid="current_password"
                                                                id="exampleEmail"
                                                                name="oldPassword"
                                                                placeholder="Current Password"
                                                                type="password"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.oldPassword}
                                                                onKeyDown={(e) => removeSpaceOnly(e)}

                                                            />
                                                            {formik.touched.oldPassword &&
                                                                formik.errors.oldPassword && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {formik.errors.oldPassword}
                                                                    </span>
                                                                )}
                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label for="examplePassword">
                                                                New Password<span className="astrick-sign text-danger">*</span>
                                                            </Label>
                                                            <Input
                                                                data-testid="new_password"
                                                                id="exampleEmail"
                                                                name="password"
                                                                placeholder="New Password"
                                                                type="password"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.password}
                                                                onKeyDown={(e) => removeSpaceOnly(e)}

                                                            />
                                                            {formik.touched.password &&
                                                                formik.errors.password && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {formik.errors.password}
                                                                    </span>
                                                                )}
                                                        </FormGroup>
                                                        <FormGroup className="mb-5">
                                                            <Label for="confirmPassword">
                                                                Confirm Password<span className="astrick-sign text-danger">*</span>
                                                            </Label>
                                                            <Input
                                                                data-testid="confirm_password"

                                                                id="exampleEmail"
                                                                name="currentPassword"
                                                                placeholder="Confirm Password"
                                                                type="password"
                                                                onChange={formik.handleChange}
                                                                value={formik.values.currentPassword}
                                                                onKeyDown={(e) => removeSpaceOnly(e)}

                                                            />
                                                            {formik.touched.currentPassword &&
                                                                formik.errors.currentPassword && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {formik.errors.currentPassword}
                                                                    </span>
                                                                )}
                                                        </FormGroup>
                                                        <div className="text-end ">
                                                            <Button
                                                                data-testid="update_password"
                                                                type="submit"
                                                                color="primary"
                                                                className="px-4 py-1 btn-1 rounded-1"
                                                            >
                                                                Update
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="8" className="mt-lg-0 mt-3">
                                    <div className=" main-wraper-setting h-100">
                                        <div className=" w-100 rounded-2">
                                            <div className="edit-profile">
                                                <div className="d-flex justify-content-between align-items-center border-bottom pt-4 px-4 pb-2 ">
                                                    <h4 className="fw-semibold  mb-0">
                                                        Edit Profile
                                                    </h4>

                                                </div>
                                                <div className=" p-4">

                                                    <Form data-testid="profile_detail" onSubmit={formikUser.handleSubmit}>
                                                        <FormGroup className="mb-4">
                                                            <Label for="examplePhone">
                                                                First Name<span className="astrick-sign text-danger">*</span>
                                                            </Label>
                                                            <Input
                                                                data-testid="first_name"
                                                                id="exampleEmail"
                                                                name="first_name"
                                                                placeholder="Firt Name"
                                                                type="text"
                                                                onChange={formikUser.handleChange}
                                                                value={formikUser.values.first_name}
                                                                onKeyDown={(e) => removeSpaceOnly(e)}


                                                            />
                                                            {formikUser.touched.first_name &&
                                                                formikUser.errors.first_name && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {formikUser.errors.first_name}
                                                                    </span>
                                                                )}

                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label for="examplePhone">
                                                                Last Name<span className="astrick-sign text-danger">*</span>
                                                            </Label>
                                                            <Input
                                                                data-testid="last_name"
                                                                id="exampleEmail"
                                                                name="last_name"
                                                                placeholder="Last Name"
                                                                type="text"
                                                                onChange={formikUser.handleChange}
                                                                value={formikUser.values.last_name}
                                                                onKeyDown={(e) => removeSpaceOnly(e)}


                                                            />
                                                            {formikUser.touched.last_name &&
                                                                formikUser.errors.last_name && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {formikUser.errors.last_name}
                                                                    </span>
                                                                )}

                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label for="confirmPassword">
                                                                Email Address<span className="astrick-sign text-danger">*</span>
                                                            </Label>
                                                            <Input
                                                                data-testid="email"

                                                                id="confirmPassword"
                                                                placeholder="Email address"
                                                                type="email"
                                                                name="email"
                                                                onChange={formikUser.handleChange}
                                                                value={formikUser.values.email}

                                                            />
                                                            {formikUser.touched.email &&
                                                                formikUser.errors.email && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {formikUser.errors.email}
                                                                    </span>
                                                                )}
                                                        </FormGroup>
                                                        <FormGroup className="mb-5">

                                                            <Label for="confirmPassword">
                                                                Contact Number
                                                            </Label>
                                                            {!userProfile?.data?.Profile?.phone_number && <h4 className="authentication " > Secure Your Account with Two-Factor Authentication. </h4>}
                                                            <div className="form-group form-group-wrapper d-flex align-items-center">
                                                                <span className="border-end country-code px-2">+1</span>
                                                                <Input
                                                                    data-testid="phone"

                                                                    id="exampleEmail"
                                                                    name="phone"
                                                                    placeholder="Phone"
                                                                    type="text"
                                                                    onChange={formikUser.handleChange}
                                                                    value={formikUser.values.phone}
                                                                    onKeyDown={(e) => numberOnly(e)}

                                                                />


                                                            </div>
                                                            <div>
                                                                {formikUser.touched.phone &&
                                                                    formikUser.errors.phone && (
                                                                        <span style={{ color: "red", fontSize: "14px" }}>
                                                                            {formikUser.errors.phone}
                                                                        </span>
                                                                    )}
                                                            </div>

                                                        </FormGroup>
                                                        <div className="text-end buttons-end">
                                                            <Button
                                                                data-testid="update_profile"
                                                                color="primary"
                                                                className="px-4 py-1 btn-1 rounded-1"
                                                            >
                                                                Update
                                                            </Button>

                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </section>
                
            </section>
        </>
    )
}


export default Setting