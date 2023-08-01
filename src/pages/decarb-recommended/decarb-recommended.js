import React, { useState, useEffect } from "react";
import LatestUpdate from "../../assets/images/latest-update.svg";
import Back from "../../assets/images/back.svg";
import ExportButton from "../../component/export-button";
import Edit from "../../assets/images/edit.svg";
import Delete from "../../assets/images/delete.svg";
import Locationicon from "../../assets/images/location-icon.svg";
import Exclimation from "../../assets/images/exclamation.svg";
import Cross from "../../assets/images/cross.svg";
import Sch from "../../assets/images/schneider.png";
import Save from "../../assets/images/save.svg";
import Upimage from "../../assets/images/up-img.png";
import Csx from "../../assets/images/csxImg.png";
import Werner from "../../assets/images/werner.png";
import logo from "../../assets/images/JB_Hunt_Enterprise.png";
import Share from "../../assets/images/share.svg";
import ModalCross from "../../assets/images/modal-cross.svg";
import LetterIcon from "../../assets/images/letter-icon.svg";
import Addbtn from "../../assets/images/addbtn.svg";
import Dotted from "../../assets/images/dottedline.svg";
import Solid from "../../assets/images/solidline.svg";
import Minimize from "../../assets/images/minimizemap.svg";
import Maximize from "../../assets/images/maximizeicon.svg";
import RoadLane from "../../assets/images/RoadLane.svg"
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import ReactStars from "react-stars";
import { Range, getTrackBackground } from "react-range";
import "../regional/regional.scss";
import "../decarb/decarb.scss";
import "../decarb-recommended/decarb-recommended.scss";

import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Button,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { regionShow } from "../../component/store/auth/graph/graphDetailsSlice";
import DateTimeShow from "../../component/main/DateTimeShow";
import { useDispatch, useSelector } from "react-redux";
import {
  decarbLineDetailData,
  saveProjectDetailData,
  clearData,
  saveProjectRatingData,
} from "../../component/store/decarb/decarbSlice";
import validator from 'validator'
import { setHeaderName } from "../../component/store/auth/authDataSlice";
import { getTitleDecarb, getRegion, getPercentage, getModalShiftEmissions, getMarkerR } from "../../constant/index"
import MapLane from "../../component/google-map/mapLane"
import MapLaneTrain from "../../component/google-map/mapLaneTrain"
import MapRail from "../../component/google-map/mapRail"

const DecarbRecommended = (args) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [reference, setReference] = useState("")
  const [modal, setModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showModalShiftMap, setShowModalShiftMap] = useState(false);
  const toggle = () => setModal(!modal);
  const show = false
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  let regionsLevel = params?.id;
  const { regions } = useSelector((state) => state.graphDetails);
  const [formPopUp, setFormPopUp] = useState(false);
  const [inviteEmail, setInviteEmail] = useState([]);
  const { decarbLaneDetail, decarbLaneDetailLoading, saveProject, saveProjectRating } = useSelector(
    (state) => state.decarb
  );
  const [inviteEmailText, setInviteEmailText] = useState("");
  const [inviteEmailTextId, setInviteEmailTextId] = useState(null);
  const [erroMessage, setErrorMessage] = useState(false);
  const [lineDteail, setLineDetail] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [fRating, setFeedBackRating] = useState(0);
  const [regionName, setRegionName] = useState("");

  const [
    emissionAlternativeFuelPercentage,
    setEmissionAlternativeFuelPercentage,
  ] = useState(null);

  useEffect(() => {
    dispatch(setHeaderName("Decarb Levers"))
  }, [dispatch])

  useEffect(() => {
    // dispatch(setHeaderName("Decarb levers"))
    decarbLaneDetail?.data && Object.entries(decarbLaneDetail?.data).map(([p_key, dto]) => {
      Object.entries(dto).map(([key, value]) => {
        setEmissionAlternativeFuelPercentage(prevState => ({
          ...prevState,
          [`${p_key}_${key}`]: getPercentage(regionsLevel, key) * 2,
        })

        );
      })

    })

  }, [decarbLaneDetail])

  // setEmissionAlternativeFuelPercentage

  useEffect(() => {
    dispatch(regionShow());
  }, [dispatch]);

  useEffect(() => {
    if (regionsLevel) {
      regions?.data?.regions.map((x) => {
        x.id === Number.parseInt(regionsLevel) && setRegionName(x.name);
      });
    }
  }, [regionsLevel, regions]);

  const addInviteEmail = () => {

    if (validator.isEmail(inviteEmailText)) {
      if (inviteEmailTextId) {
        setInviteEmail(
          inviteEmail.map((item) => {
            return item.id === inviteEmailTextId
              ? { ...item, email: inviteEmailText }
              : item;
          })
        );
      } else {
        setInviteEmail([
          ...inviteEmail,
          {
            id:
              inviteEmail.length > 0
                ? inviteEmail[inviteEmail.length - 1]?.id + 1
                : 1,
            email: inviteEmailText,
          },
        ]);
      }
      setInviteEmailTextId(null);
      setErrorMessage(false);
      setInviteEmailText("");
    } else {
      setErrorMessage(true);
    }
  };

  const handleChangeEnvite = (e, i) => {
    setInviteEmailTextId(null);

    if (e === "delete") {
      setInviteEmail(inviteEmail.filter((res) => res?.id !== i?.id));
    }
    if (e === "edit") {
      setInviteEmailText(i?.email);
      setInviteEmailTextId(i?.id);
    }
  };

  useEffect(() => {
    dispatch(decarbLineDetailData({ region_id: params?.id }));
  }, [dispatch, params]);

  useEffect(() => {
    if (saveProject) {
      setFormPopUp(true);
    }
  }, [saveProject]);

  useEffect(() => {
    if (saveProjectRating) {
      handleClose();
    }
  }, [saveProjectRating]);

  const handleSubmitFeedback = () => {
    dispatch(
      saveProjectRatingData({
        description: feedbackMessage,
        rating: fRating,
        project_id: saveProject?.data?.id,
      })
    );
  };
  const handleClose = () => {
    setFormPopUp(false);
    setModal(false);
    dispatch(clearData());
    handleReset();
    setInviteEmail([]);
  };
  const schema = yup.object().shape({
    projectManagerEmail: yup
      .string()
      .email("Please enter the valid email address")
      .required("Project manager email should not be empty"),
    projectManager: yup
      .string()
      .trim("Space are not allow")
      .min(3, "Please enter the min 3 letter")
      .required("Project manager should not be empty"),
    projectName: yup
      .string()
      .trim("Space are not allow")
      .min(3, "Please enter the min 3 letter")
      .required("Project name should not be empty"),
    projectDesc: yup
      .string()
      .trim("Space are not allow")
      .min(3, "Please enter the min 3 letter")
      .required("Project description should not be empty"),
    projectStart: yup.date().required("Project start should not be empty"),
    projectEnd: yup
      .date()
      .min(yup.ref("projectStart"), "Project end date cannot be in the past"),
  });
  let _Fields = {
    projectManager: "",
    projectName: "",
    projectManagerEmail: "",
    projectDesc: "",
    projectStart: "",
    projectEnd: "",
  };

  const handleReset = () => {
    formik.resetForm();
    setInviteEmailTextId(null);
    setErrorMessage(false);
    setInviteEmailText("");
    setLineDetail(null);
    setFeedbackMessage("");
    setFeedBackRating(0);
    setIsLoadingSave(false)

  };

  const handleClickScroll = () => {
    const element = document.getElementById(reference);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ratingChanged = (newRating) => {
    setFeedBackRating(newRating);
  };

  const handleSubmitForm = (event) => {
    console.log("lineDteail", lineDteail)
    setIsLoadingSave(true)
    const userPayload = {
      manager_email: event.projectManagerEmail,
      manager_name: event.projectManager,
      project_name: event.projectName,
      description: event.projectDesc,
      start_date: event.projectStart,
      end_date: event.projectEnd || "",
      region_id: Number.parseInt(regionsLevel) || 8,
      lane_name: lineDteail?.key || "",
      type: lineDteail?.type,
      decarb_id:
        lineDteail?.value?.[lineDteail?.type]?.decarb_id,
      actual_emission:
        lineDteail?.type === "carrier_shift" ? lineDteail?.value?.[lineDteail?.type]?.emission : lineDteail?.value?.[lineDteail?.type]?.laneEmission,
      customize_emission:
        lineDteail?.type === "carrier_shift" ? lineDteail?.value?.[lineDteail?.type]?.intensity : lineDteail?.value?.[lineDteail?.type]?.laneIntensity,
      emission_percent: lineDteail?.percentage,
    };
    dispatch(saveProjectDetailData(userPayload));
  };

  const formik = useFormik({
    initialValues: _Fields,
    validationSchema: schema,
    onSubmit: handleSubmitForm,
  });

  const handleOpenModal = (key, value, type, percentage) => {
    setModal(true);
    dispatch(clearData());
    handleReset();
    setLineDetail({
      key,
      value,
      type,
      percentage,
    });
  };


  return (
    <>
      <section className="insight_top_wrapper">
        <div className="regional-wrapper decarb-rcmd-wrapper decarb-wrapper regional-level vendor-wrapper lane-wrapper ">
          <div className="container-fluid">
            <div className="regional-h-wrapper ">
              <Row>
                <Col lg="12">
                  <div className="regional-heading pb-3">
                    <div className="d-md-flex justify-content-between align-items-center">
                      <div
                        onClick={() => navigate(-1)}
                        className="small-font"
                      >
                        <h6 className="d-flex align-items-center">
                          <span className="pe-2">
                            {" "}
                            <img src={Back} alt="icon" />
                          </span>
                          Back
                        </h6>
                      </div>

                      <div>
                        <div className="lates-update">
                          <DateTimeShow />

                        </div>
                      </div>
                    </div>
                    <div className="heading pt-1">
                      
                      <h2 className="mb-1 fs-3">
                        {regionsLevel
                          ? `${regionName} Region`
                          : "All Region"}{" "}
                        Lanes Recommended Levers
                      </h2>
                    </div>
                    <div className="d-md-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-0 fw-6 fs-6">
                          Key levers are recommended based on the potential
                          decarb impact, CO2e abatement cost, and ease of
                          implementation.
                        </h5>
                        <h5 className="mb-0 fw-6 fs-6">
                          You can customize any lever by lane and add to an
                          existing project or create a new project.
                        </h5>
                      </div>
                      <ExportButton />
                    </div>
                  </div>
                </Col>
              </Row>
              {console.log("decarbLaneDetail?.data", decarbLaneDetail?.data)}
              {decarbLaneDetailLoading ? <div className="graph-loader  d-flex justify-content-center align-items-center">

                <div class="spinner-border  spinner-ui d-flex justify-content-center align-items-center" role="status">
                  <span class="visually-hidden"></span>
                </div>
              </div> :
                decarbLaneDetail?.data && Object.entries(decarbLaneDetail?.data).map(([p_key, dto]) => (
                  <>
                    {
                      Object.entries(dto).map(([key, value]) => (
                        <Row key={key} id={reference == key ? key : ""}>
                          <Col lg="12">
                            <div className="lane-data my-3">
                              <div className="lane-data-wrapper pe-3 pb-5">
                                <Row>
                                  <Col xl="3">
                                    <div className="decarb-rcmd p-4 px-3 h-100">
                                      <div className="date-div">
                                        <div className="d-flex align-items-center">
                                          <h6 className="fw-semibold mb-0">
                                            {moment()
                                              .subtract(12, "months")
                                              .format("MMM YYYY")}{" "}
                                            - {moment().format("MMM YYYY")}{" "}
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="d-md-flex justify-content-between align-items-center">
                                        <h6 className="mb-0 fw-semibold fs-6">
                                          {regionName} REGION
                                        </h6>
                                        <div>
                                          <a href="#" className="fw-semibold">
                                            More
                                          </a>
                                        </div>
                                      </div>
                                      <div className="river-list">
                                        <ul className="list-unstyled">
                                          <li>
                                            <div className="location-line d-flex">
                                              <h4 className="fw-bold mb-4">
                                                <span className="pe-0">
                                                  <img
                                                    src={Locationicon}
                                                    alt="ico"
                                                  />
                                                </span>{" "}
                                                <span>
                                                  {value?.origin}
                                                </span>
                                              </h4>
                                            </div>
                                          </li>
                                          <li>
                                            <div>
                                              <h4 className="fw-bold">
                                                <span className="pe-1">
                                                  <img
                                                    src={Locationicon}
                                                    alt="ico"
                                                  />
                                                </span>
                                                {value?.destination}
                                              </h4>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="shipment-dtl">
                                        <div className="shipment-txt">
                                          <h5 className="fw-semibold">
                                            Shipments{" "}
                                            <span>
                                              {key === "carrier_shift" ? value?.shipments?.toLocaleString("en-US") : Number.parseInt(
                                                value?.lanedto?.shipments
                                              )?.toLocaleString("en-US")}
                                            </span>
                                          </h5>

                                        </div>
                                        <div className="shipment-txt">
                                          <h5 className="fw-semibold mb-0">
                                            Total Emissions
                                          </h5>
                                          <h4 className="fw-bold mb-2">
                                            {key === "carrier_shift" ? value?.emission?.round(1)?.toLocaleString("en-US", { minimumFractionDigits: 1 }) : (
                                              Number.parseFloat(
                                                value?.lanedto?.emission
                                              )
                                            ).round(1)
                                              ?.toLocaleString("en-US", {
                                                minimumFractionDigits: 1,
                                              })
                                            }
                                            <span className="fw-semibold text-dark fs-12">
                                              {" "}
                                              tCo2e
                                            </span>
                                          </h4>


                                        </div>
                                        <div className="shipment-txt">
                                          <h5 className="fw-semibold mb-0">
                                            Emissions Intensity
                                          </h5>
                                          <h4 className="fw-bold mb-0">
                                            {key === "carrier_shift" ? value?.intensity?.round(1)?.toLocaleString("en-US", { minimumFractionDigits: 1 }) : Number.parseFloat(
                                              value?.lanedto?.intensity
                                            )?.round(1)?.toLocaleString("en-US", {
                                              minimumFractionDigits: 1,
                                            })
                                            }
                                          </h4>
                                          <h6 className="fw-semibold text-dark">
                                            gCO2e/Ton-Mile of freight
                                          </h6>

                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xl="9">
                                    <>
                                      <Row>

                                        <Col lg="6">
                                          <div className="modal-shift mt-3 bg-white p-3 pt-4 h-100">
                                            <div className="priority-btn-wrap">
                                              <div className="priority-btn-decarb priority-btn">
                                                <Button
                                                  color="primary"
                                                  className="px-4 py-1"
                                                >
                                                  HIGHLY RECOMMENDED
                                                </Button>
                                              </div>
                                              <h3 className="fw-bold my-3">
                                                {getTitleDecarb(key)}
                                                <span>
                                                  {" "}
                                                  <img
                                                    src={Exclimation}
                                                    alt="ico"
                                                  />
                                                </span>
                                              </h3>

                                              {key === "alternative_fuel" && <div className="range-slider">
                                                <section id="price-calculator">
                                                  <div className="container px-0">
                                                    <Range
                                                      step={10}
                                                      min={0}
                                                      max={100}
                                                      values={[
                                                        emissionAlternativeFuelPercentage?.[`${p_key}_${key}`] || 10,
                                                      ]}
                                                      onChange={(values) => {
                                                        setEmissionAlternativeFuelPercentage(prevState => ({
                                                          ...prevState,
                                                          [`${p_key}_${key}`]: values[0],
                                                        })

                                                        );

                                                      }}
                                                      renderTrack={({
                                                        props,
                                                        children,
                                                      }) => (
                                                        <div
                                                          onMouseDown={
                                                            props.onMouseDown
                                                          }
                                                          onTouchStart={
                                                            props.onTouchStart
                                                          }
                                                          style={{
                                                            ...props.style,
                                                            height: "36px",
                                                            display: "flex",
                                                            width: "100%",
                                                          }}
                                                        >
                                                          <div
                                                            ref={props.ref}
                                                            style={{
                                                              height: "15px",
                                                              width: "100%",
                                                              borderRadius:
                                                                "10px",
                                                              background:
                                                                getTrackBackground(
                                                                  {
                                                                    values: [
                                                                      emissionAlternativeFuelPercentage?.[`${p_key}_${key}`] || 10,
                                                                    ],
                                                                    colors: [
                                                                      "#d8856b",
                                                                      "#ccc",
                                                                    ],
                                                                    min: 0,
                                                                    max: 100,
                                                                  }
                                                                ),
                                                              alignSelf: "center",
                                                            }}
                                                          >
                                                            {children}
                                                          </div>
                                                        </div>
                                                      )}
                                                      renderThumb={({
                                                        props,
                                                      }) => (
                                                        <div
                                                          {...props}
                                                          style={{
                                                            ...props.style,
                                                            height: "35px",
                                                            width: "35px",
                                                            fontSize: "11px",
                                                            display: "flex",
                                                            justifyContent:
                                                              "center",
                                                            alignItems: "center",
                                                            backgroundColor:
                                                              "#215154",
                                                            borderRadius: "50%",
                                                            color: "#fff",
                                                          }}
                                                        >
                                                          {
                                                            emissionAlternativeFuelPercentage?.[`${p_key}_${key}`] || 10
                                                          }
                                                          %
                                                        </div>
                                                      )}
                                                    />


                                                  </div>
                                                </section>
                                              </div>}

                                              <div className="grey-less p-3">
                                                <Row>
                                                  <Col lg="4">
                                                    <div className="line-end h-100">
                                                      <h5 className="line-h-100">
                                                        Emissions reduction
                                                        opportunity
                                                      </h5>
                                                      <h4 className="fw-bold">
                                                        {key === "alternative_fuel" ? getPercentage(regionsLevel, key) * (Number.parseInt(
                                                          emissionAlternativeFuelPercentage?.[`${p_key}_${key}`] || 10
                                                        ) / 10) : getPercentage(regionsLevel, key)}

                                                        {/* {key === "carrier_shift" ? '60' : key !== "alternative_fuel" ? Math.round(
                                                          ((Number.parseFloat(
                                                            value?.original_emission
                                                          ) -
                                                            Number.parseFloat(
                                                              value?.customize_emission
                                                            )) /
                                                            Number.parseFloat(
                                                              value?.original_emission
                                                            )) *
                                                          100
                                                        ) : Math.round(
                                                          ((Number.parseFloat(
                                                            value?.original_emission
                                                          ) -
                                                            Number.parseFloat(
                                                              value?.customize_emission
                                                            )) /
                                                            Number.parseFloat(
                                                              value?.original_emission
                                                            )) *
                                                          100 *
                                                          (Number.parseInt(
                                                            emissionAlternativeFuelPercentage?.[`${p_key}_${key}`] || 10
                                                          ) /
                                                            100)
                                                        )} */}
                                                        %
                                                      </h4>
                                                    </div>
                                                  </Col>
                                                  <Col lg="4">
                                                    <div className="line-end h-100 pe-2">
                                                      <h5 className="line-h-100">
                                                        Cost impact
                                                      </h5>
                                                      <h4 className="fw-bold">
                                                        N/A
                                                      </h4>
                                                    </div>
                                                  </Col>
                                                  <Col lg="4">
                                                    <div className="h-100">
                                                      <h5 className="line-h-100">
                                                        Delivery time
                                                      </h5>
                                                      <h4 className="fw-bold">
                                                        0 <span>Day</span>
                                                      </h4>
                                                    </div>
                                                  </Col>
                                                </Row>
                                              </div>
                                            </div>
                                            <div className="mt-4 customize">
                                              <Button
                                                onClick={() =>
                                                  handleOpenModal(
                                                    p_key,
                                                    dto,
                                                    key,
                                                    key === "alternative_fuel" ? getPercentage(regionsLevel, key) * (Number.parseInt(
                                                      emissionAlternativeFuelPercentage?.[`${p_key}_${key}`] || 10
                                                    ) / 10) : getPercentage(regionsLevel, key)
                                                    // Math.round(
                                                    //   ((Number.parseFloat(
                                                    //     value?.original_emission
                                                    //   ) -
                                                    //     Number.parseFloat(
                                                    //       value?.customize_emission
                                                    //     )) /
                                                    //     Number.parseFloat(
                                                    //       value?.original_emission
                                                    //     )) *
                                                    //   100
                                                    // )
                                                  )
                                                }
                                                color="primary"
                                                className="px-4 py-1 fw-bold"
                                              >
                                                Create project
                                              </Button>

                                            </div>
                                          </div>
                                        </Col>

                                        <Col lg="6">
                                          <div className="modal-shift mt-3 bg-white p-3 pt-4 h-100">
                                            {key === "carrier_shift" && <div className="d-flex justify-content-end more-emission">
                                              <div className="d-flex align-items-center mb-2">
                                                <div className="emission-box me-2"></div>
                                                <p className="fs-14 color-primary mb-0">Recommended Carrier</p>

                                              </div>
                                            </div>}

                                            <Table responsive className="mt-0 mb-0">
                                              <thead>
                                                <tr>
                                                  <th>
                                                    <div>Carrier</div>
                                                  </th>
                                                  <th>
                                                    <div className="d-flex align-items-center">
                                                      Source
                                                    </div>
                                                  </th>
                                                  <th>
                                                    <div className="d-flex align-items-center">
                                                      Destination
                                                    </div>
                                                  </th>
                                                  {key === "alternative_fuel" && (
                                                    <th>
                                                      <div className="d-flex align-items-center">
                                                        Fuel
                                                      </div>
                                                    </th>
                                                  )}
                                                  <th>
                                                    <div className="d-flex align-items-center">
                                                      Emissions
                                                    </div>
                                                    <h6>tCo2e</h6>
                                                  </th>
                                                </tr>
                                              </thead>

                                              <tbody>

                                                {[...value?.route]?.sort((a, b) => a?.emissions - b?.emissions)?.map(
                                                  (i, index) => (
                                                    <tr key={index} className={`${(key === "carrier_shift" && index === 0) ? 'table-active' : ''} `}>
                                                      <td>
                                                        <div className="d-flex align-items-center sch-img">

                                                          <img
                                                            src={
                                                              (key === "carrier_shift") ? i?.carrier_logo
                                                                && process.env.REACT_APP_BASE_URLFULL +
                                                                i?.carrier_logo :

                                                                ((value?.route.length - 1) === index && key === "modal_shift") ? logo :
                                                                  ((value?.route.length - 2) === index && key === "modal_shift") ? Csx

                                                                    : key === "alternative_fuel" ? Sch
                                                                      : key === "modal_shift" ? Werner

                                                                        : i?.type === "Rail"
                                                                          ? Upimage
                                                                          : logo
                                                            }
                                                            alt="icon"
                                                            className="img-fluid"
                                                          />

                                                          {/* <img
                                                            src={
                                                              ((value?.route.length - 1) === index && key === "carrier_shift") ? Knight :
                                                                ((value?.route.length - 2) === index && key === "carrier_shift") ? Conway :
                                                                   key === "alternative_fuel" ? Sch
                                                                        : key === "modal_shift" ? i?.carrier_logo
                                                                          && process.env.REACT_APP_BASE_URLFULL +
                                                                          i?.carrier_logo

                                                                          : i?.type === "Rail"
                                                                            ? Upimage
                                                                            : logo
                                                            }
                                                            alt="icon"
                                                            className="img-fluid"
                                                          /> */}
                                                        </div>
                                                      </td>

                                                      <td>
                                                        <div className="d-flex align-items-center">
                                                          <div className="me-2"></div>
                                                          <h6>{i?.origin}</h6>
                                                        </div>
                                                      </td>
                                                      <td>
                                                        <div className="d-flex align-items-center">
                                                          <h6>
                                                            {i?.destination}
                                                          </h6>
                                                        </div>
                                                      </td>
                                                      {key === "alternative_fuel" && (
                                                        <td>{i?.fuel_type}</td>
                                                      )}
                                                      <td>
                                                        <div className="d-flex align-items-center">
                                                          <div className="me-2"></div>
                                                          <h6>

                                                            {/* key === "alternative_fuel" ? getPercentage(regionsLevel, key) * (Number.parseInt(
                                                            emissionAlternativeFuelPercentage?.[`${p_key}_${key}`] || 10
                                                          ) / 10)
                                                           */}
                                                            {key === "modal_shift" ? getModalShiftEmissions(value?.lanedto?.emission, regionsLevel, key, index) :

                                                              key === "alternative_fuel" ? (value?.lanedto?.emission * (100 - getPercentage(regionsLevel, key) * (Number.parseInt(
                                                                emissionAlternativeFuelPercentage?.[`${p_key}_${key}`] || 10
                                                              ) / 10)) / 100).round(1).toLocaleString(
                                                                "en-US",
                                                                {
                                                                  minimumFractionDigits: 1,
                                                                }
                                                              ) :

                                                                i?.emissions
                                                                  ? Number.parseFloat(
                                                                    i?.emissions ||
                                                                    0
                                                                  )?.round(1).toLocaleString(
                                                                    "en-US",
                                                                    {
                                                                      minimumFractionDigits: 1,
                                                                    }
                                                                  )
                                                                  : "N/A"}
                                                          </h6>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  )
                                                )
                                                }


                                              </tbody>
                                            </Table>
                                            {key === "alternative_fuel" || key === "modal_shift" ?
                                              <div className="btn-enroutes my-3 ">
                                                <p onClick={() => {
                                                  setReference(key)
                                                  key === "alternative_fuel" ? setShowMap(!showMap) : setShowModalShiftMap(!showModalShiftMap)
                                                }
                                                } data-toggle="tooltip" data-placement="left" title="Display Routes" className="d-flex justify-content-center" >
                                                  {key === "alternative_fuel" ? <MapLane reloadData={true} origin={value?.origin} destination={value?.destination} wayPoint={getRegion(regionsLevel)} /> : key === "modal_shift" ? <MapRail
                                                    markerList={getMarkerR(regionsLevel)}
                                                    reloadData={true} data={
                                                      value?.route?.map(i => ({
                                                        ...i,
                                                        origin: i?.origin?.replace("CSX/", ""),
                                                        destination: i?.destination?.replace("CSX/", ""),
                                                      }))
                                                    } list={null} origin={value?.origin} destination={value?.destination} /> : ""}
                                                  <span className="expand-img"><img src={Maximize} /></span>
                                                </p>
                                              </div> : ""}
                                            {/* {key === "modal_shift" && <div className="btn-enroutes mb-3">
                                              <p onClick={() => {
                                                 setReference(key)
                                                setShowModalShiftMap(!showModalShiftMap)}
                                                } data-toggle="tooltip" data-placement="left" title="Display Routes" className="d-flex justify-content-center">
                                                <img src={Mapmodal} />
                                                <span className="expand-img"><img src={Maximize}/></span>
                                              </p>
                                            </div>} */}
                                          </div>
                                        </Col>
                                        {/* {key === "alternative_fuel" && <div className="btn-enroutes mb-3 d-flex justify-content-end">
                                          <Button onClick={() => setShowMap(!showMap)}>
                                            {showMap ? "Collapse Map" : "Display Routes"}
                                          </Button>
                                        </div>} */}
                                        {/* {key === "modal_shift" && <div className="btn-enroutes mb-3 d-flex justify-content-end">
                                          <Button onClick={() => setShowModalShiftMap(!showModalShiftMap)}>
                                            {showModalShiftMap ? "Collapse Map" : "Display Routes"}
                                          </Button>
                                        </div>} */}


                                      </Row>

                                    </>
                                  </Col>
                                </Row>
                                {(key === "alternative_fuel" && showMap) && <div className="px-3">
                                  <Row className="pe-0">
                                    <Col className="pe-0">
                                      {decarbLaneDetailLoading ?
                                        <div class="spinner-border  spinner-ui" role="status">
                                          <span class="visually-hidden"></span>
                                        </div>
                                        :
                                        <>
                                          <div className="map-ledgend mt-4">
                                            <div className="d-flex align-items-center">
                                              <div className="img">
                                                <img src={Dotted} />
                                              </div>
                                              <div className="text color-primary fs-14 ms-2">
                                                Original Lane
                                              </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                              <div className="img">
                                                <img src={Solid} />
                                              </div>
                                              <div className="text color-primary fs-14 ms-2">
                                                Recommended Lane
                                              </div>
                                            </div>
                                          </div>
                                          {/* <MapLane reloadData={true} origin={value?.origin} destination={value?.destination} /> */}

                                          <MapLane reloadData={true} origin={value?.origin} destination={value?.destination} wayPoint={getRegion(regionsLevel)} />
                                          <div className="btn-enroutes mb-3 d-flex justify-content-end">
                                            <h2 onClick={() => {
                                              handleClickScroll()
                                              setShowMap(!showMap)
                                            }} data-toggle="tooltip" data-placement="left" title="Collapse Map" className="m-cursor">
                                              <span><img src={Minimize} /></span>
                                            </h2>
                                          </div>
                                        </>
                                      }
                                    </Col>
                                  </Row>
                                </div>}

                                {(key === "modal_shift" && showModalShiftMap) && <div className="px-3">
                                  <Row className="pe-0">
                                    <Col className="pe-0">
                                      {decarbLaneDetailLoading ?
                                        <div class="spinner-border  spinner-ui" role="status">
                                          <span class="visually-hidden"></span>
                                        </div>
                                        :
                                        <>
                                          <div className="map-ledgend mt-4">
                                            <div className="d-flex align-items-center">
                                              <div className="img">
                                                <img src={Dotted} />
                                              </div>
                                              <div className="text color-primary fs-14 ms-2">
                                                Rail Lane
                                              </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                              <div className="img">
                                                <img src={RoadLane} />
                                              </div>
                                              <div className="text color-primary fs-14 ms-2">
                                                Road Lane
                                              </div>
                                            </div>
                                          </div>
                                          <MapLaneTrain reloadData={true}
                                            markerList={getMarkerR(regionsLevel)}
                                            data={
                                              value?.route?.map(i => ({
                                                ...i,
                                                origin: i?.origin?.replace("CSX/", ""),
                                                destination: i?.destination?.replace("CSX/", ""),
                                              }))

                                              //   [{
                                              //   origin: "Salt Lake City, Utah, USA",
                                              //   emissions: 0,
                                              //   fuel_type: "PD",
                                              //   destination: "Union Pacific Intermodal., 1045 S 5500 W, Salt Lake City, UT 84104, United States",
                                              //   type: "RD"
                                              // }, {
                                              //   origin: "Union Pacific Intermodal., 1045 S 5500 W, Salt Lake City, UT 84104, United States",
                                              //   emissions: 0,
                                              //   fuel_type: "PD",
                                              //   destination: "Union Pacific West Colton, 19100 Slover Ave, Bloomington, CA 92316, United States",
                                              //   type: "Rail"
                                              // }, {
                                              //   origin: "Union Pacific West Colton, 19100 Slover Ave, Bloomington, CA 92316, United States",
                                              //   emissions: 0,
                                              //   fuel_type: "PD",
                                              //   destination: "PERRIS, CA",
                                              //   type: "RD"
                                              // }
                                              // ]

                                            } list={null} origin={value?.origin} destination={value?.destination} />
                                          <div className="btn-enroutes mb-3 d-flex justify-content-end">

                                            <h2 onClick={() => {
                                              handleClickScroll()
                                              setShowModalShiftMap(!showModalShiftMap)
                                            }
                                            } data-toggle="tooltip" data-placement="left" title="Collapse Map" className="m-cursor">
                                              <span><img src={Minimize} /></span>
                                            </h2>
                                          </div>
                                        </>
                                      }
                                    </Col>
                                  </Row>
                                </div>}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ))}
                  </>))}



              <Row>
                <Col md="12">
                  <div className="">

                    {show && (
                      <div className="modal-lever">
                        <Row>
                          <Col lg="4" md="12">
                            <div className="selected-modal-lever-wrap">
                              <div className="selected-modal-outer">
                                <div className="selected-modal-heading">
                                  <h4 className="fw-semibold p-3 px-4">
                                    Modal shift lever
                                  </h4>
                                </div>
                                <div className="selected-modal-innerdata py-4 px-4">
                                  <h5 className="mb-3">
                                    Selected and customized lanes
                                  </h5>
                                  <div className="selected-item px-5 py-3">
                                    <a
                                      href="#"
                                      className="fs-6 fw-bold text-decoration-none"
                                    >
                                      Riverside-Fort Worth
                                      <span className="ps-1">
                                        <img src={Cross} alt="icon" />
                                      </span>
                                    </a>
                                  </div>
                                </div>
                                <div className="links pt-3 pb-4 pe-5 ps-4 d-flex justify-content-between">
                                  <div className="reset">
                                    <a href="#">
                                      <span className="pe-2">
                                        <img src={LatestUpdate} alt="ico" />
                                      </span>
                                      Reset
                                    </a>
                                  </div>
                                  <div className="reset">
                                    <a href="#">
                                      <span className="pe-2">
                                        <img src={Save} alt="ico" />
                                      </span>
                                      Save
                                    </a>
                                  </div>
                                  <div className="reset">
                                    <a href="#">
                                      <span className="pe-2">
                                        <img src={Share} alt="ico" />
                                      </span>
                                      Share
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )}
                    <div className="text-end">
                      <div className="">

                        <Modal
                          isOpen={modal}
                          toggle={toggle}
                          {...args}
                          className="create-project-modal h-auto"
                        >
                          {!formPopUp && (
                            <ModalHeader
                              toggle={toggle}
                              className="pb-0 px-4"
                            >
                              <div className="d-lg-flex justify-content-between align-items-center w-100">
                                <h2 className="mb-2 fw-semibold">
                                  Create a new project
                                </h2>
                                <a href="#" className="text-decoration-none">
                                  Created{" "}
                                  {moment().format("DD/MM/yyyy h:mma")}
                                </a>
                              </div>
                            </ModalHeader>
                          )}

                          {formPopUp ? (
                            <div className="save-create-modal p-4">
                              <div className="heading">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h3 className="fs-4">
                                    Your project has been saved and created!
                                  </h3>
                                  <img
                                    onClick={() => handleClose()}
                                    src={ModalCross}
                                    alt="icon"
                                  />
                                </div>

                                <p className="">
                                  <span className="fw-bold">
                                    {" "}
                                    {lineDteail?.value?.[lineDteail?.type].origin}{" "}
                                    high emissions lane on{" "}
                                    {lineDteail?.value?.[lineDteail?.type].destination}{" "}
                                    Region-ID:
                                    {saveProject?.data?.project_unique_id}
                                  </span>{" "}
                                  project has been saved to the projects
                                  folder and has been sent to project manager{" "}
                                  <span className="fw-bold">
                                    {formik.values?.projectManager}{" "}
                                  </span>
                                  {inviteEmail.length > 0 && (
                                    <>
                                      and{" "}
                                      <span className="fw-bold">
                                        {inviteEmail
                                          ?.map((i) => i?.email)
                                          .join(', ')}
                                      </span>{" "}
                                    </>
                                  )}{" "}
                                  via email
                                </p>
                              </div>
                              <div className="experience p-4 ">
                                <div className="heading d-xl-flex align-items-center justify-content-between mb-4">
                                  <h4 className="fs-5 text-white">
                                    How was your experience with GreenSight?
                                  </h4>
                                  <div>
                                    <ReactStars
                                      className="react-stars-03915892202261626"
                                      count={5}
                                      value={fRating}
                                      onChange={ratingChanged}
                                      size={24}
                                      color2="#5f9180"

                                    />

                                  </div>
                                </div>
                                <div>
                                  <FormGroup>
                                    <Input
                                      id="exampleText"
                                      name="text"
                                      type="textarea"
                                      placeholder="We'd love to get your feedback"
                                      value={feedbackMessage}
                                      onChange={(e) =>
                                        setFeedbackMessage(e?.target?.value)
                                      }
                                    />
                                  </FormGroup>
                                </div>
                              </div>
                              <div className="feedback-btn mt-5 d-flex align-items-center justify-content-end">
                                <Button
                                  onClick={() => handleSubmitFeedback()}
                                  className="px-4 py-2"
                                >
                                  Submit feedback
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <form onSubmit={formik.handleSubmit}>
                              <ModalBody className="pt-0 px-4">
                                <h5>
                                  Please enter the information for your
                                  project.
                                </h5>

                                <div className="create-project-body p-3">
                                  <div className="heading">
                                    <Row>
                                      <Col lg="12" md="12">
                                        <h6 className="fw-bold">
                                          ID: NAAW9807
                                        </h6>
                                        <h2 className="fw-semibold">

                                          {regionName} Region Lanes {getTitleDecarb(lineDteail?.type)} Project.
                                        </h2>

                                        <Label htmlFor="exampletext">
                                          Name the project*
                                        </Label>
                                        <Input

                                          placeholder="Project name"
                                          type="text"
                                          className="py-2"
                                          name="projectName"
                                          onChange={formik.handleChange}
                                          value={formik.values.projectName}
                                        />

                                        {formik.touched.projectName &&
                                          formik.errors.projectName && (
                                            <span style={{ color: "red", fontSize: "12px" }}>
                                              {formik.errors.projectName}
                                            </span>
                                          )}

                                        <div className="mt-3">
                                          <Row>
                                            <Col lg="6">
                                              <FormGroup>
                                                <Label htmlFor="exampletext">
                                                  Project manager*
                                                </Label>
                                                <Input
                                                  id="exampletext"
                                                  name="projectManager"
                                                  placeholder="Project manager"
                                                  type="text"
                                                  className="py-2"
                                                  onChange={
                                                    formik.handleChange
                                                  }
                                                  value={
                                                    formik.values
                                                      .projectManager
                                                  }
                                                />
                                                {formik.touched
                                                  .projectManager &&
                                                  formik.errors
                                                    .projectManager ? (
                                                  <span
                                                    style={{ color: "red", fontSize: "12px" }}
                                                  >
                                                    {
                                                      formik.errors
                                                        .projectManager
                                                    }
                                                  </span>
                                                ) : null}
                                              </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                              <FormGroup>
                                                <Label htmlFor="exampleemail">
                                                  Project manager email*
                                                </Label>
                                                <Input
                                                  id="exampleemail"
                                                  name="projectManagerEmail"
                                                  placeholder="Project manager email"
                                                  type="email"
                                                  className="py-2"
                                                  onChange={
                                                    formik.handleChange
                                                  }
                                                  value={
                                                    formik.values
                                                      .projectManagerEmail
                                                  }
                                                />
                                                {formik.touched
                                                  .projectManagerEmail &&
                                                  formik.errors
                                                    .projectManagerEmail ? (
                                                  <span
                                                    style={{ color: "red", fontSize: "12px" }}
                                                  >
                                                    {
                                                      formik.errors
                                                        .projectManagerEmail
                                                    }
                                                  </span>
                                                ) : null}
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="invite-people-wrapper p-4">
                                    <h5>Invite people:</h5>
                                    <Row className="align-items-center">
                                      <Col
                                        lg="10"
                                        sm="6"
                                        className="position-relative"
                                      >
                                        <FormGroup className="input-email">
                                          <Input
                                            id="exampleemail"
                                            name="email"
                                            placeholder="Enter email address"
                                            type="email"
                                            className="py-2 pe-4"
                                            value={inviteEmailText}
                                            onChange={(e) => {
                                              setErrorMessage(false);
                                              setInviteEmailText(
                                                e?.target.value
                                              );
                                            }}
                                          />
                                          {erroMessage ? (
                                            <span style={{ color: "red", fontSize: "12px" }}>
                                              Please enter valid email
                                            </span>
                                          ) : null}
                                        </FormGroup>

                                      </Col>
                                      <Col lg="2" sm="6">
                                        <div className="add-btn d-flex justify-content-end">
                                          <Button
                                            type="button"
                                            onClick={() => addInviteEmail()}
                                          >
                                            {inviteEmailTextId
                                              ? "Update"
                                              : "Add"}{" "}
                                            <span className="ps-2">
                                              {" "}
                                              <img src={Addbtn} alt="ico" />
                                            </span>
                                          </Button>
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      {inviteEmail?.map((i) => (
                                        <>
                                          <Col lg="10" sm="6" key={i?.id}>
                                            <div className="invite-people-name mt-4 d-lg-flex align-items-center justify-content-between">
                                              <div className="d-md-flex align-items-center letter-icon">
                                                <img
                                                  src={LetterIcon}
                                                  alt="ico"
                                                />
                                                <div className="ms-3">
                                                  <h3 className="fw-bold mb-0">
                                                    {i?.email}
                                                  </h3>
                                                </div>
                                              </div>


                                            </div>
                                          </Col>
                                          <Col lg="2" sm="6">
                                            <div className="edit-dlt-btn invite-people-name d-flex mt-4 justify-content-end">
                                              <div
                                                className="d-flex align-items-center mx-2 m-cursor"
                                                onClick={() =>
                                                  handleChangeEnvite(
                                                    "edit",
                                                    i
                                                  )
                                                }
                                              >
                                                <img src={Edit} alt="ico" />
                                                <a
                                                  href="#"
                                                  className="mb-0 text-decorartion-none ms-1"
                                                >
                                                  Edit
                                                </a>
                                              </div>
                                              <div
                                                className="d-flex align-items-center ms-2 m-cursor"
                                                onClick={() =>
                                                  handleChangeEnvite(
                                                    "delete",
                                                    i
                                                  )
                                                }
                                              >
                                                <img src={Delete} alt="ico" />
                                                <a
                                                  href="#"
                                                  className="mb-0 text-decorartion-none ms-1"
                                                >
                                                  Delete
                                                </a>
                                              </div>
                                            </div>
                                          </Col>
                                        </>
                                      ))}
                                    </Row>
                                  </div>
                                  <div className="intermodal-wrapper py-2 pb-0">

                                    <div className="project-desc py-2 pb-0">
                                      <Row>
                                        <Col lg="12">
                                          <Row>
                                            <Col lg="6">
                                              <FormGroup>
                                                <Label htmlFor="exampleDate">
                                                  Project starts*
                                                </Label>
                                                <Input
                                                  id="exampleDate"
                                                  name="projectStart"
                                                  placeholder="date placeholder"
                                                  className="text-uppercase"
                                                  type="date"
                                                  onChange={
                                                    formik.handleChange
                                                  }
                                                  value={
                                                    formik.values.projectStart
                                                  }
                                                />
                                                {formik.touched
                                                  .projectStart &&
                                                  formik.errors.projectStart ? (
                                                  <span
                                                    style={{ color: "red", fontSize: "12px" }}
                                                  >
                                                    {
                                                      formik.errors
                                                        .projectStart
                                                    }
                                                  </span>
                                                ) : null}
                                              </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                              <FormGroup>
                                                <Label htmlFor="exampleDate">
                                                  Estimated ending date
                                                </Label>
                                                <Input
                                                  id="exampleDate"
                                                  name="projectEnd"
                                                  placeholder="date placeholder"
                                                  className="text-uppercase"
                                                  type="date"

                                                  onChange={
                                                    formik.handleChange
                                                  }
                                                  value={
                                                    formik.values.projectEnd
                                                  }
                                                />
                                                {formik.touched.projectEnd &&
                                                  formik.errors.projectEnd ? (
                                                  <span
                                                    style={{ color: "red" }}
                                                  >
                                                    {formik.errors.projectEnd}
                                                  </span>
                                                ) : null}
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                      <FormGroup>
                                        <Label htmlFor="exampleText">
                                          Project description*
                                        </Label>
                                        <Input
                                          id="exampleText"
                                          name="projectDesc"
                                          type="textarea"
                                          placeholder="Project description"
                                          onChange={formik.handleChange}
                                          value={formik.values.projectDesc}
                                        />
                                        {formik.touched.projectDesc &&
                                          formik.errors.projectDesc ? (
                                          <span style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.projectDesc}
                                          </span>
                                        ) : null}
                                      </FormGroup>
                                    </div>
                                  </div>
                                </div>
                              </ModalBody>

                              <ModalFooter>
                                <Button disabled={isLoadingSave} type="submit" className="px-4 py-2">
                                  Save and create
                                </Button>{" "}
                              </ModalFooter>
                            </form>
                          )}
                        </Modal>
                      </div>

                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
export default DecarbRecommended
