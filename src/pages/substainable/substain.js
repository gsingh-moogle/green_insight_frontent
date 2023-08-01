import React, { useEffect, useState } from "react";
import "../substainable/substainable.scss"
import ChartsHigh from "../../component/ChartsHigh"
import ArrowDown from "../../assets/images/arrow-down.svg";
import GArrow from "../../assets/images/g-arrow.svg";
import ExportButton from "../../component/export-button";
import Down from "../../assets/images/down.svg";
import Up from "../../assets/images/up.svg";
import { yearList } from "../../constant/index"
import {
    FormGroup,
    Button,
    Row,
    Col,
    Input,
} from 'reactstrap';

import { Form } from "react-bootstrap";


import { useDispatch, useSelector } from "react-redux";
import { emissionRegionDetails, graphEmissionIntensity, graphRegionEmission, regionShow, getProjectCount } from "../../component/store/auth/graph/graphDetailsSlice";
import DateTimeShow from "../../component/main/DateTimeShow";
import { useParams, useNavigate, Link } from "react-router-dom";
import { setHeaderName } from "../../component/store/auth/authDataSlice";


const Substain = () => {
    const { id } = useParams()
    let YearData = new Date().getFullYear() - 1;
    const companyLevel = ""
    const checked = true
    const yearlyDataEmission = ""
    const [regionsLevel, setRegionsLevel] = useState(id)
    const [regionsIntensity, setRegionsIntensity] = useState("");
    const [revenueType, setRevenueType] = useState(1)
    const [yearlyData, setYearlyData] = useState(YearData)
    const [yearlyData1, setYearlyData1] = useState(YearData)
    const [yearlyDataProject, setYearlyDataProject] = useState(2023)
    const [relaodData, setRelaodData] = useState(true)
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { graphRegionChart, regions, emissionIntensityDetails, regionEmission, projectCountData, isLoading, isLoadingGraphRegionEmission, regionEmissionIsloading, emissionIntensityDetailsIsLoading } = useSelector((state) => state.graphDetails)

    useEffect(() => {
        localStorage.removeItem("regionalLevel")
        dispatch(regionShow())
        dispatch(setHeaderName("Dashboard"))
    }, [dispatch])

    
    useEffect(() => {
        setRelaodData(true)
    }, [emissionIntensityDetails])


    useEffect(() => {
        dispatch(graphEmissionIntensity({ year: Number(yearlyData), toggel: revenueType }))
    }, [dispatch, yearlyData, revenueType])

    useEffect(() => {
        dispatch(graphRegionEmission({ region_id: regionsIntensity ? regionsIntensity : "", company_id: "", year: Number(yearlyDataEmission), toggel_data: checked ? 0 : 1 }))
    }, [dispatch, companyLevel, regionsLevel, yearlyDataEmission, checked, regionsIntensity])


    useEffect(() => {
        dispatch(emissionRegionDetails({ year: Number(yearlyData1), region_id: "", toggel_data: checkedEmissionsReductionGlide ? 0 : 1 }))
    }, [dispatch, yearlyData1, checkedEmissionsReductionGlide])

    useEffect(() => {
        dispatch(getProjectCount({ region_id: regionsLevel, year: yearlyDataProject }))
    }, [dispatch, regionsLevel, yearlyDataProject])



    useEffect(() => {
        if (regionsLevel) {
            localStorage.setItem("regionalLevel", regionsLevel)
            navigate(`/regional-level`)
        }
    }, [regionsLevel, navigate])

    return (
        <>
           
           <section className="substain-screen regional-wrapper pb-4 pt-0">
          <div className="container-fluid">
                    <div className="substain-screen-wraper">
                        <div className="substain-heading">
                            <Row>
                                <Col lg="12" md="12">
                                    <Row className="substain-h-wrapper pb-3 ">
                                        <Col lg="9" md="12">
                                            <h1 className="mb-0 text-capitalize fs-3">Transportation emissions dashboard</h1>
                                        </Col>
                                        <Col lg="3" md="12">
                                            <div className="lates-update">
                                                <DateTimeShow />

                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className=" p-3 pt-0 ps-0 align-items-center">
                                        <Col lg="9" md="12">
                                            <FormGroup className="select-box d-flex">

                                                <Input
                                                    id="exampleSelect"
                                                    name="select"
                                                    type="select"
                                                    className="ms-2"
                                                    onChange={(e) => {
                                                        setRelaodData(false)
                                                        setRegionsLevel(e.target.value)
                                                    }
                                                    }
                                                >
                                                    <option value="">
                                                        All Regions
                                                    </option>

                                                    {regions?.data?.length !== 0 && regions?.data?.regions.map((x) =>
                                                        <option value={x.id} key={x.id}>{x.name}</option>
                                                    )}

                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="3" md="12">
                                            <div className="d-flex justify-content-end">
                                            <ExportButton />
                                            </div>
                                           
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <Col lg="12" md="12">
                                    <div className="subs-inner-heading py-3 pb-4">
                                        <h2 className="fw-semibold mb-4">
                                            Sustainability Tracker
                                        </h2>
                                        {/* new-ui */}
                                        <Row>
                                            <Col lg="3">
                                                <div className="tracker-data p-4 h-100 tracker-card first-selected">
                                                    <div className="tracker-inner">
                                                        <div className="">
                                                          
                                                           
                                                            <div className="d-xl-flex justify-content-between position-relative">

                                                                <div className="mt-3">
                                                                    <div className="co-txt d-flex arrow-down align-items-center mb-3">
                                                                        <div className="green-div me-2">

                                                                        </div>
                                                                        <h4 className="mb-0">
                                                                            <span> <img src={ArrowDown} alt="ico" /></span>
                                                                            22.5%
                                                                        </h4>
                                                                    </div>
                                                                    <h6>LOWE'S GROUP</h6>
                                                                    <h3>Emissions Reduction Target</h3>
                                                                    <div className="by-date mt-2">
                                                                        <p className="mb-0">By {new Date().getFullYear()}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg="3" className=" mt-3 mt-lg-0">
                                                <div className="tracker-data p-4 h-100 tracker-card">
                                                    <div className="tracker-inner">
                                                        <div className="position-relative">
                                                          
                                                            
                                                            <div className=" mt-3">
                                                                <div className="co-txt d-flex arrow-down align-items-center mb-3 ">
                                                                    <div className="green-div me-2">
                                                                    </div>

                                                                    <h4 className="mb-0">
                                                                        <span> <img src={ArrowDown} alt="ico" /></span>

                                                                        4%
                                                                    </h4>
                                                                </div>
                                                                <h6>LOWE'S GROUP</h6>
                                                                <h3>Emissions Reduction Target</h3>
                                                                <div className="by-date mt-2">
                                                                    <p className="mb-0">By Q{Math.floor((new Date().getMonth() + 3) / 3)} {new Date().getFullYear()}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg="3" className=" mt-3 mt-lg-0">
                                                <div className="tracker-data p-4 h-100 tracker-card">
                                                    <div className="tracker-inner">
                                                        <div className="position-relative">
                                                            
                                                            
                                                            <div className=" mt-3">
                                                                <div className="co-txt d-flex align-items-center mb-3">
                                                                    <div className="green-div me-2">
                                                                    </div>
                                                                    <h4 className="mb-0">
                                                                        {Number.parseInt(projectCountData?.data?.Total || 0).toLocaleString("en-US")}
                                                                    </h4>
                                                                </div>
                                                                <h6>LOWE'S GROUP</h6>
                                                                <h3 className="min-height48">Projects in Progress</h3>
                                                                <div className="by-date mt-2">
                                                                    <p className="mb-0">In Q{Math.floor((new Date().getMonth() + 3) / 3)} {new Date().getFullYear()}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg="3" className=" mt-3 mt-lg-0">
                                                <div className="tracker-data p-4 h-100 tracker-card">
                                                    <div className="tracker-inner">
                                                        <div className="position-relative">
                                                        
                                                           
                                                            <div className=" mt-3">
                                                                <div className="co-txt d-flex align-items-center mb-3">
                                                                    <div className="red-div me-2">
                                                                    </div>
                                                                    <h4 className="mb-0">
                                                                        2%
                                                                    </h4>
                                                                </div>
                                                                <h6>LOWE'S GROUP</h6>
                                                                <h3>Gap to Target</h3>
                                                                <div className="by-date mt-2 company-commit">
                                                                    <p className="mb-0"> Reduction needed between now and Q{Math.floor((new Date().getMonth() + 3) / 3)} {new Date().getFullYear()}</p>
                                                                    <a target="_blank" rel="noreferrer" href="https://corporate.lowes.com/our-responsibilities/corporate-responsibility-reports-policies" className="text-decoration-underline text-white"> See company commitment</a>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* new-ui end */}

                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div class="">

                            <Row>
                                <Col lg="6">
                                    <div className="maps-subs company-level p-3 h-100 slider-icons position-relative">
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
                                        <h6 className="fw-bold">
                                            COMPANY LEVEL
                                        </h6>
                                        <div className="track-btn d-flex align-items-center mb-0 justify-content-between">
                                            <h3 className="fw-semibold mb-0"> Reduction Glide Path <span className="fs-12 color-primary fw-light ">({!checkedEmissionsReductionGlide ? 'gCO2e' : 'tCo2e'})</span></h3>
                                            <Button color="primary" className="px-4 py-0 ms-4">
                                                On track
                                            </Button>
                                        </div>
                                        <div className="emi-inten">
                                            <div className="d-flex align-items-center">
                                                <h6 className="mb-0 fw-semibold fs-14">
                                                    Emissions Intensity
                                                </h6>
                                                <div className="toggle-switch">
                                                    <Form>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            label="Total Emissions"
                                                            className="fw-semibold fs-14 mb-0"
                                                            checked={checkedEmissionsReductionGlide}
                                                            onChange={() =>
                                                                setCheckedEmissionsReductionGlide(
                                                                    !checkedEmissionsReductionGlide
                                                                )
                                                            }
                                                        />
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>

                                        {regionEmissionIsloading ? <div className="graph-loader">

                                            <div class="spinner-border position-absolute spinner-ui" role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        </div>
                                            : regionEmission?.data && (
                                                <ChartsHigh
                                                    isLoading={isLoading}
                                                    options={regionEmission?.data}
                                                    chart={1}
                                                    reloadData={relaodData}
                                                    unitReduction={!checkedEmissionsReductionGlide}

                                                />
                                            )}
                                        {/* first graph plot is here */}
                                    </div>
                                </Col>
                                <Col lg="6" className="mt-lg-0 mt-3">
                                    <div className="maps-subs company-level p-3 h-100  position-relative">
                                        <h6 className="fw-bold">
                                            COMPANY LEVEL
                                        </h6>
                                        <div className="d-md-block d-lg-flex justify-content-between mb-2">
                                            <div className="lh-1">
                                                <h3 className=" fw-semibold text-capitalize mb-0">Emissions intensity</h3>
                                                <span className="fs-12 color-primary">
                                                    (gCO2e/Ton-Mile of freight)
                                                </span>
                                            </div>


                                            <div>
                                                <FormGroup className="select-box d-flex ">
                                                    <Input
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                        value={revenueType}
                                                        onChange={(e) => {
                                                            setRelaodData(false)
                                                            setRevenueType(e.target.value)
                                                        }}

                                                    >
                                                        <option value={1}>
                                                            per Ton-Mile
                                                        </option>
                                                    </Input>

                                                    <Input
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                        className="ms-2"
                                                        value={yearlyData}
                                                        onChange={(e) => {
                                                            setRelaodData(false)
                                                            setYearlyData(e.target.value)
                                                        }}

                                                    >
                                                        {yearList.map((x, index) => <option key={index} value={x}>{x}</option>)}
                                                    </Input>
                                                </FormGroup>
                                            </div>

                                        </div>
                                        {
                                            emissionIntensityDetailsIsLoading ? <div className="graph-loader">

                                                <div class="spinner-border position-absolute spinner-ui" role="status">
                                                    <span class="visually-hidden"></span>
                                                </div>
                                            </div>
                                                : emissionIntensityDetails?.data?.length > 0 && <ChartsHigh isLoading={isLoading} reloadData={relaodData} chart={2} options={emissionIntensityDetails?.data} revenueType={revenueType} />

                                        }
                                        {/* Bar element graph plot is here */}
                                        {Math.round(((emissionIntensityDetails?.data?.[0]?.max - emissionIntensityDetails?.data?.[0]?.industrialAverage) / emissionIntensityDetails?.data?.[0]?.max) * 100).toFixed(2) ? <div className={`model-overview-down px-3 py-2 ${emissionIntensityDetailsIsLoading ? 'bottom-card' : ''}`}>
                                            <div>
                                                <h6 className="mb-0 d-flex fs-6">
                                                    <span className="pe-2"><img src={Down} alt="ico" /></span>Your emissions intensity per {revenueType === 0 ? "revenue dollar" : "Ton-Mile"} is {Math.round(((emissionIntensityDetails?.data?.[0]?.max - emissionIntensityDetails?.data?.[0]?.industrialAverage) / emissionIntensityDetails?.data?.[0]?.max) * 100) + "%"} higher than industry average
                                                </h6>
                                            </div>
                                        </div> : <div className="model-overview-down px-3 py-2 bottom-card">
                                            <div>
                                                <h6 className="mb-0 d-flex fs-6">
                                                    <span className="pe-2"><img src={Up} alt="ico" /></span>Your emissions intensity per {revenueType === 0 ? "revenue dollar" : "Ton-Mile"} is {Math.round(((emissionIntensityDetails?.data?.[0]?.max - emissionIntensityDetails?.data?.[0]?.industrialAverage) / emissionIntensityDetails?.data?.[0]?.max) * 100) + "%"} lower than industry average
                                                </h6>
                                            </div>
                                        </div>}
                                    </div>
                                </Col>
                            </Row>
                            <div className="data-sources  pt-2 pb-4">
                                <a target="_blank" rel="noreferrer" href="https://smartfreightcentre.org/en/about-sfc/about-us/" className="d-flex align-items-center"><span className="glec-txt me-1">GLEC</span>See data sources and methodologies</a>
                            </div>
                        </div>

                        <div className="emission-region maps-subs company-level">
                            <Row>
                                <Col lg="12">
                                    <div className="p-3 position-relative">
                                        <div className="d-md-block d-lg-flex justify-content-between align-items-center">
                                            <div className="d-flex">

                                                <div>
                                                    <h6 className="ps-2 fw-bold">
                                                        COMPANY LEVEL
                                                    </h6>
                                                    <div className="">

                                                        <h3 className="mb-0 ps-2 fw-semibold ">Emissions Intensity by Region <span className="fs-12">
                                                            (gCO2e/Ton-Mile of freight)
                                                        </span></h3>

                                                    </div>
                                                </div>

                                            </div>
                                            <div>
                                                <FormGroup className="select-box d-flex">

                                                    <Input
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                        className="ms-2"
                                                        value={regionsIntensity}
                                                        onChange={(e) => {
                                                            setRelaodData(false)
                                                            setRegionsIntensity(e.target.value)
                                                        }}
                                                    >
                                                        <option value="">
                                                            All Regions
                                                        </option>

                                                        {regions?.data?.length !== 0 && regions?.data?.regions.map((x) =>
                                                            <option value={x.id} key={x.id}>{x.name}</option>
                                                        )}

                                                    </Input>
                                                </FormGroup>


                                            </div>
                                        </div>
                                        {isLoadingGraphRegionEmission ? <div className="graph-loader">

                                            <div class="spinner-border position-absolute spinner-ui" role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        </div>
                                            :
                                            graphRegionChart?.data && <ChartsHigh isLoading={isLoadingGraphRegionEmission} reloadData={relaodData} options={graphRegionChart?.data?.filter(i => i.name !== "company_level" && i.name !== "target_level")} chart={4} />
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="data-sources  pt-2 pb-4">
                            <a target="_blank" rel="noreferrer" href="https://smartfreightcentre.org/en/about-sfc/about-us/" className="d-flex align-items-center"><span className="glec-txt me-1"><h6>GLEC</h6></span>See data sources and methodologies</a>
                        </div>
                        <div className="project-overview maps-subs company-level p-3 pt-0 ps-0 position-relative">
                            <Row>
                                <Col lg="12">
                                    <div className="p-3">

                                        <Row>
                                            <Col xl="3" lg="4">
                                                <div className="d-flex">

                                                    <div>
                                                        <h6 className="ps-2 fw-bold">
                                                            COMPANY LEVEL
                                                        </h6>
                                                        <h3 className="ps-2 fw-semibold text-capitalize mb-0">Projects overview</h3>
                                                    </div>


                                                </div>
                                            </Col>
                                            <Col xl="3" lg="4">
                                                <div>
                                                    <FormGroup className="select-box d-flex mt-2">
                                                        <Input
                                                            id="exampleSelect"
                                                            name="select"
                                                            type="select"
                                                            value={yearlyDataProject}
                                                            onChange={(e) => {
                                                                setRelaodData(false);
                                                                setYearlyDataProject(e?.target?.value)
                                                            }}

                                                        >
                                                            <option value="">Year to date</option>
                                                            {yearList.map((x, index) => <option key={index} value={x}>{x}</option>)}

                                                        </Input>
                                                    </FormGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row className="align-items-center">
                                        <Col xl="3" lg="6">
                                            <div>
                                                {projectCountData?.data &&
                                                    <Link to="/projects">
                                                        <ChartsHigh isLoading={isLoading} reloadData={relaodData} chart={3} pieChartCount={Number.parseInt(projectCountData?.data?.Total || 0).toLocaleString("en-US")} />
                                                    </Link>

                                                }
                                                {/* <PieChart /> */}
                                            </div>
                                        </Col>
                                        <Col xl="3" lg="6">
                                            <div className="overview-txt  ps-4 ps-lg-0">
                                                <div className="p-3">

                                                </div>
                                                <div className="co-txt d-flex align-items-center">
                                                    <div className="green-div me-3">
                                                    </div>
                                                    <h4 className="mb-0">Completed</h4>
                                                    <h5 className="mb-0 ms-4">0</h5>
                                                </div>
                                                <h4 className="pt-3">Emissions reduction achieved</h4>
                                                <div className="overview-num">
                                                    <h4 className="fw-bold d-flex align-items-center"><span> <img src={GArrow} alt="ico" /></span>0</h4>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xl="3" lg="6">
                                            <div className="overview-txt track-btn-lightgreen px-3 px-xl-0  ps-4 ps-lg-0">
                                                <Button color="primary" className="px-5 py-0 mb-3 w-213">
                                                    On track
                                                </Button>
                                                <div className="co-txt d-flex align-items-center">
                                                    <div className="secondarygreen-div me-3">
                                                    </div>
                                                    <h4 className="mb-0">In-progress</h4>
                                                    <h5 className="mb-0 ms-4">{Number.parseInt(projectCountData?.data?.Total || 0).toLocaleString("en-US")}</h5>
                                                </div>
                                                <h4 className="pt-3"> Estimated emissions reduction </h4>
                                                <div className="overview-num">
                                                    <h4 className="fw-bold d-flex align-items-center"><span> <img src={GArrow} alt="ico" /></span>5%</h4>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xl="3" lg="6">
                                            <div className="overview-txt track-btn-red  ps-4 ps-lg-0">
                                                <Button color="primary" className="px-5 py-0 mb-3 w-213">
                                                    Action needed
                                                </Button>
                                                <div className="co-txt d-flex align-items-center">
                                                    <div className="red-div me-3">
                                                    </div>
                                                    <h4 className="mb-0">In-progress</h4>
                                                    <h5 className="mb-0 ms-4">0</h5>
                                                </div>
                                                <h4 className="pt-3">Estimated emissions reduction</h4>
                                                <div className="overview-num">
                                                    <h4 className="fw-bold d-flex align-items-center"><span> <img src={GArrow} alt="ico" /></span>0</h4>
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>

                                </Col>
                            </Row>
                        </div>
                        <div>
                            <div className="data-sources  pt-2 pb-4">
                                <a target="_blank" rel="noreferrer" href="https://smartfreightcentre.org/en/about-sfc/about-us/" className="d-flex align-items-center"><span className="glec-txt me-1">GLEC</span>See data sources and methodologies</a>
                            </div>
                        </div>

                    </div>

                    </div>
        </section>

        </>
    )
}
export default Substain