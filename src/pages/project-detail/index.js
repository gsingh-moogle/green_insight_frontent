import React, { useState, useEffect } from "react";
import "../regional/regional.scss";
import "../decarb/decarb.scss";
import "../project/project.scss";
import "../project-detail/project-detail.scss";
import Back from "../../assets/images/back.svg";
import Garrow from "../../assets/images/g-arrow.svg";
import ExportButton from "../../component/export-button";
import Percent from "../../assets/images/percent.svg";
import Thumup from "../../assets/images/thum-up.svg";
import Accordion from 'react-bootstrap/Accordion';
import logo from "../../assets/images/JB_Hunt_Enterprise.png";
import ChartsHigh from "../../component/ChartsHigh";
import { Link, useParams } from "react-router-dom";
import Csx from "../../assets/images/csxImg1.png"
import WernerBg from "../../assets/images/wernerBg1.png"
import DateTimeShow from "../../component/main/DateTimeShow";
import {
    Row,
    Col,
    Table,
    Button
} from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetails } from "../../component/store/project/projectSlice";
import { laneCarrierEmissionReductionGlide, } from "../../component/store/lane/laneDetailsSlice"
import { getQuarterYear, getModalShiftEmissions } from "../../constant"
import { setHeaderName } from "../../component/store/auth/authDataSlice";
import Sch from "../../assets/images/schneider.png";

const ProjectDetail = () => {
    const [yearlyData1, setYearlyData1] = useState(2022)
    const dispatch = useDispatch();
    const [relaodData, setRelaodData] = useState(true);

    const { laneCarrierEmissionIsloading, laneCarrierEmission, } = useSelector((state) => state.lane)

    let { id } = useParams();
    const { projectDetails } = useSelector((state) => state.project)


    useEffect(() => {
        dispatch(getProjectDetails({ id: id }))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(setHeaderName("Project Detail"))
    }, [dispatch])
    useEffect(() => {
        if (projectDetails) {
            dispatch(laneCarrierEmissionReductionGlide({
                lane_name: projectDetails?.data?.lane_name,
                year: yearlyData1
            }))

        }
    }, [dispatch, projectDetails, yearlyData1])

    console.log("projectDetails", projectDetails, laneCarrierEmission)
    return (
        <>

            <section className="insight_top_wrapper">
                <div className="regional-wrapper decarb-wrapper regional-level lane-wrapper vendor-wrapper project-detail-wrap project-wrap">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper project-detail-inner">
                            {/* Project detail dashboard */}
                            <Row>
                                <Col lg="12">
                                    <div className="regional-heading">
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <div className="small-font">
                                                <Link to="/projects" className="d-flex align-items-center color-primary"><span className="pe-2"> <img src={Back} alt="ico" /></span>Back</Link>
                                            </div>

                                            <div>
                                                <div className="lates-update">
                                                    <DateTimeShow />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h6 className="fs-14">ID: {projectDetails?.data?.projectDetail?.project_unique_id}</h6>
                                        </div>
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <div className="d-flex pacific-overview align-items-center">
                                                <div className="heading pt-1 me-3">
                                                    <h2 className="mb-1 fs-3 fw-semibold">{projectDetails?.data?.projectDetail?.project_name}</h2>
                                                </div>

                                                <div className="track-btn-lightgreen ms-3">
                                                    <Button color="primary" className="px-3 py-0">
                                                        On track
                                                    </Button>
                                                </div>

                                            </div>

                                            <div className="">
                                                <ExportButton />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="mt-3">
                                <Row>
                                    <Col lg="12">
                                        <div className="lane-data p-4 mb-3">
                                            <Row>
                                                <Col lg="4" md="6">
                                                    <div className="emission">
                                                        <h4 className="emi-txt fs-5">
                                                            Project Manager
                                                        </h4>

                                                        <div className="d-flex align-items-center manager">
                                                            <div>
                                                            </div>
                                                            <div className="pt-4">
                                                                <h5 className="mb-0">
                                                                    {projectDetails?.data?.projectDetail?.ProjectManager?.name}
                                                                </h5>
                                                                <h6 className="mb-0">
                                                                    Transport Manager
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg="8" md="6">
                                                    <div className="lane-data-wrapper d-lg-flex">
                                                        <div className="emission pe-lg-5">
                                                            <h4 className="emi-txt mb-0 fs-5">
                                                                Emissions Intensity
                                                            </h4>
                                                            <h6 className="wrapperUnit">
                                                                gCO2e/ton-mile of freight
                                                            </h6>
                                                            <div className="d-flex align-items-center pt-3 mb-2">
                                                                <div className="red-div">
                                                                </div>
                                                                <div>
                                                                    <h3 className="fw-bold mb-0 ps-2">
                                                                        {projectDetails?.data?.projectDetail?.customize_emission ? Number.parseFloat(projectDetails?.data?.projectDetail?.customize_emission)?.round(1)?.toLocaleString("en-US", { minimumFractionDigits: 1 }) : 'N/A'}

                                                                    </h3>


                                                                </div>

                                                            </div>
                                                            <h5 className="fs-6 fw-bold">In {getQuarterYear(projectDetails?.data?.projectDetail?.end_date)}</h5>
                                                        </div>
                                                        <div className="emission px-lg-5">
                                                            <h4 className="emi-txt mb-0 fs-5">
                                                                Total Emissions
                                                            </h4>
                                                            <h6 className="wrapperUnit">
                                                                tCO2e
                                                            </h6>
                                                            <div className="d-flex align-items-center pt-3 mb-2">
                                                                <div className="green-div">
                                                                </div>
                                                                <h3 className="fw-bold mb-0 ps-2">
                                                                    {Number.parseFloat(projectDetails?.data?.projectDetail?.actual_emission || 0)?.round(1)?.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                                                                </h3>
                                                            </div>


                                                        </div>
                                                        <div className="emission ps-lg-5">
                                                            <h4 className="emi-txt mb-0 fs-5 text-capitalize">
                                                                Emissions reduction opportunity
                                                            </h4>
                                                            <h6 className="invisible wrapperUnit">
                                                                tCO2e
                                                            </h6>
                                                            <div className="d-flex align-items-center pt-3 mb-2">
                                                                <div className="grey-div">
                                                                </div>
                                                                <h3 className="fw-bold mb-0 ps-2">
                                                                    {projectDetails?.data?.projectDetail?.emission_percent}%
                                                                </h3>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                {/* Project Carrier Table */}
                                <div className="mt-4">
                                    <div className="pacific-overview d-flex align-items-center mb-3">
                                        <h4 className="mb-0">Project Description</h4>

                                    </div>
                                    <p className="fs-6">{projectDetails?.data?.projectDetail?.desc}</p>

                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item className="mb-3" eventKey="0">
                                            <Accordion.Header >
                                                <div className="d-md-flex align-items-center">
                                                    <h5 className=" text-decoration-underline mb-0">{projectDetails?.data?.lane_name}</h5>
                                                    <div className=" track-btn-lightgreen ms-md-5">
                                                        <Button color="primary" className="px-4 py-1">
                                                            On track
                                                        </Button>
                                                    </div>
                                                </div>

                                            </Accordion.Header>
                                            <Accordion.Body className="px-0 pt-0 pb-0">
                                                <Table responsive className="mt-0 mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <div>
                                                                    Selected Carriers
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div>
                                                                    Source
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div className="d-flex align-items-center">
                                                                    Destination

                                                                </div>

                                                            </th>
                                                            {
                                                                projectDetails?.data?.projectDetail?.DecarbRecommendations[0]?.type === "alternative_fuel" ?
                                                                    <th>
                                                                        <div className="d-flex align-items-center">
                                                                            Fuel
                                                                        </div>
                                                                    </th> : ''
                                                            }
                                                            <th>
                                                                <div className="d-flex align-items-center">
                                                                    Emissions
                                                                </div>
                                                                <h6>
                                                                    tCo2e
                                                                </h6>
                                                            </th>
                                                            <th>
                                                                <div className="d-flex align-items-center">
                                                                    Cost

                                                                </div>
                                                                <h6>
                                                                    $/ton-mile of freight
                                                                </h6>
                                                            </th>
                                                            <th>
                                                                <div className="d-flex align-items-center">
                                                                    Contract
                                                                </div>
                                                            </th>


                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {projectDetails?.data?.projectDetail?.type === "carrier_shift" ? projectDetails?.data?.list.map((obj, index) => (

                                                            <tr id={index} key={index}>
                                                                <td>
                                                                    <div className="d-flex align-items-center sch-img">
                                                                        <img
                                                                            src={
                                                                                obj?.carrier_logo
                                                                                && process.env.REACT_APP_BASE_URLFULL +
                                                                                obj?.carrier_logo
                                                                            }
                                                                            alt="icon"
                                                                            className="img-fluid"
                                                                        />
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        {obj?.origin}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        {obj?.destination}
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        {obj?.emissions ? Number.parseFloat(obj?.emissions)?.round(1)?.toLocaleString("en-US", { minimumFractionDigits: 1 }) : 'N/A'}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        N/A
                                                                    </div>

                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        N/A
                                                                    </div>

                                                                </td>



                                                            </tr>
                                                        )) : projectDetails?.data?.projectDetail?.DecarbRecommendations.map((obj, index) => (

                                                            <tr id={index} key={index}>
                                                                <td>
                                                                    <div className="d-flex align-items-center sch-img">
                                                                        <img
                                                                            src={
                                                                                obj?.type === "alternative_fuel" ? Sch : index === 0 ? WernerBg : obj?.LOB === "Rail"
                                                                                    ? Csx
                                                                                    : logo
                                                                            }
                                                                            alt="icon"
                                                                            className="img-fluid"
                                                                        />
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        {obj?.origin}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        {obj?.destination}
                                                                    </div>
                                                                </td>
                                                                {
                                                                    obj?.type === 'alternative_fuel' ?
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                RD80
                                                                            </div>

                                                                        </td> : ''
                                                                }
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        {projectDetails?.data?.projectDetail?.type === "modal_shift" ? getModalShiftEmissions(projectDetails?.data?.projectDetail?.actual_emission, projectDetails?.data?.projectDetail?.region_id, projectDetails?.data?.projectDetail?.type, index) :
                                                                            projectDetails?.data?.projectDetail?.type === "alternative_fuel" ? (projectDetails?.data?.projectDetail?.actual_emission * ((100 - Number.parseInt(projectDetails?.data?.projectDetail?.emission_percent)) / 100)).round(1).toLocaleString(
                                                                                "en-US",
                                                                                {
                                                                                    minimumFractionDigits: 1,
                                                                                }
                                                                            )
                                                                                :

                                                                                "N/A"}
                                                                        {/* {obj?.emissions ? Number.parseFloat(obj?.emissions)?.toLocaleString("en-US", { minimumFractionDigits: 1 }) : 'N/A'} */}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        N/A
                                                                    </div>

                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">

                                                                        N/A
                                                                    </div>

                                                                </td>



                                                            </tr>
                                                        ))}


                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>


                                    </Accordion>
                                </div>
                                <div className="mt-3">
                                    <Row>



                                        <Col lg="6">
                                            <div className="h-100 inner-data-region slider-icons position-relative px-3">
                                                <div className=" p-3  px-0">
                                                    <div className="left-arrow-slider">
                                                        {yearlyData1 > 2020 && <button onClick={() => {
                                                            setRelaodData(false)
                                                            setYearlyData1(prev => Number.parseInt(prev) - 1)
                                                        }}><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M-1.07292e-06 9.99996C-1.07015e-06 10.2325 0.0888614 10.4652 0.266361 10.6427L9.35726 19.7336C9.71248 20.0888 10.2877 20.0888 10.6427 19.7336C10.9977 19.3784 10.9979 18.8031 10.6427 18.4481L2.19454 9.99996L10.6427 1.55179C10.9979 1.19656 10.9979 0.621334 10.6427 0.266335C10.2875 -0.088665 9.71226 -0.088892 9.35726 0.266335L0.266361 9.35723C0.0888613 9.53473 -1.0757e-06 9.76746 -1.07292e-06 9.99996Z" fill="#5f9a80" />
                                                            </svg>
                                                        </button>}
                                                    </div>
                                                    <div className="right-arrow-slider">
                                                        {yearlyData1 < 2023 && <button onClick={() => {
                                                            setRelaodData(false)
                                                            setYearlyData1(prev => Number.parseInt(prev) + 1)
                                                        }}><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10.9091 9.99996C10.9091 10.2325 10.8203 10.4652 10.6428 10.6427L1.55187 19.7336C1.19665 20.0888 0.62142 20.0888 0.26642 19.7336C-0.0885794 19.3784 -0.0888067 18.8031 0.26642 18.4481L8.71459 9.99996L0.26642 1.55179C-0.0888064 1.19656 -0.0888064 0.621334 0.26642 0.266335C0.621647 -0.088665 1.19687 -0.088892 1.55187 0.266335L10.6428 9.35723C10.8203 9.53473 10.9091 9.76746 10.9091 9.99996Z" fill="#5f9a80" />
                                                            </svg>
                                                        </button>}
                                                    </div>
                                                    <div className="emi-inten">
                                                        <h6 className="datafrom-txt mb-2">
                                                            Emissions of {projectDetails?.data?.lane_name} Lane for {laneCarrierEmission?.data?.year[0]} - {laneCarrierEmission?.data?.year[1]}

                                                            {/* Graph Represents Regions for Q1 2022 */}
                                                        </h6>
                                                        <div className="d-flex align-items-center">

                                                            <h4 className="fw-semibold">Emissions Reduction Glide Path</h4>
                                                            <Button color="primary" className="px-4 py-0 ms-4">
                                                                On track
                                                            </Button>
                                                        </div>

                                                        {laneCarrierEmissionIsloading ? <div className="graph-loader d-flex align-items-center justify-content-center">

                                                            <div className="spinner-border position-absolute" role="status">
                                                                <span className="visually-hidden"></span>
                                                            </div>
                                                        </div>
                                                            : laneCarrierEmission?.data && (
                                                                <ChartsHigh isLoading={laneCarrierEmissionIsloading} options={laneCarrierEmission?.data} chart={1} reloadData={relaodData}
                                                                />
                                                            )}


                                                    </div>
                                                </div>
                                                <div className="d-lg-flex quartely-wrapper  p-3">
                                                    <div className="quartely">
                                                        <h4 className="mb-3">
                                                            Quarterly emissions reduction goal
                                                        </h4>
                                                        <div>
                                                            <h3 className="d-flex align-items-center"><span><img src={Garrow} alt="icon" /></span>4%</h3>
                                                        </div>
                                                    </div>
                                                    <div className="quartely">
                                                        <h4 className="mb-3">
                                                            Achieved reduction for this quarter
                                                        </h4>
                                                        <div>
                                                            <h3 className="d-flex align-items-center"><span><img src={Garrow} alt="icon" /></span>2%</h3>
                                                        </div>
                                                    </div>
                                                    <div className="quartely ps-3">
                                                        <h4 className="mb-3">
                                                            Time left to reach this quarter's target
                                                        </h4>
                                                        <div>
                                                            <h3 className="d-flex align-items-end">4<span>Weeks</span></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>

                                        {/* <Col lg="6">
                                            <div className="maps-subs inner-data-region  p-3 h-100 ">
                                                <div className="action-progress">
                                                    <h6 className="fw-semibold">PACIFIC REGION</h6>
                                                    <h3 className="">Action progress</h3>
                                                    <div>
                                                        <ChartsHigh
                                                            isLoading={false}
                                                            reloadData={false}
                                                            chart={"project"}

                                                            options={{ "Ongoing_Project": 40, "total_project": 50, "Done": 10 }}
                                                        />
                                                    </div>

                                                    <div className="model-overview-down p-3">
                                                        <h5>
                                                            <span className="me-2"><img src={Percent} alt="ico" /></span>
                                                            Riverside-Milwaukee needs action
                                                        </h5>
                                                    </div>
                                                    <div className="model-overview-up p-3">
                                                        <h5>
                                                            <span className="me-2"><img src={Thumup} alt="ico" /></span>
                                                            Your project is on track! 2 out of 5 lanes have been shifted from truckload to intermodal
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ProjectDetail