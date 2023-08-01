import React, { useEffect, useState } from "react";
import "../lanes-overview/lanes-overview.scss";
import "../region-overview/region-overview.scss";
import "../facility-overview/facility-overview.scss";
import RegionLevelHighChart from "../regional-level/RegionLevelHighChart";
import DateTimeShow from "../../component/main/DateTimeShow";

import Back from "../../assets/images/back.svg";
import Garrow from "../../assets/images/g-arrow.svg";
import Profileimg from "../../assets/images/profile-img-auto.png";
import Up from "../../assets/images/up.svg";
import { useParams, Link } from "react-router-dom";
import { facilityReductionGraph, facilityOverviewDetail, facilityComparisonGraph, facilityCarrierComparison, facilityGraphDetailsGraph, facilityOutBoundGraph, facilityInBoundGraph } from "../../component/store/facilty/facilityDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import ChartsHigh from "../../component/ChartsHigh";
import Down from "../../assets/images/down.svg";
import { yearList, getGraphData, getQuarterYear } from "../../constant/index"
import { setHeaderName } from "../../component/store/auth/authDataSlice";
import Form from 'react-bootstrap/Form';
import {
    Button,
    Row,
    Col,
    Input,
} from 'reactstrap';

const FacilityOverview = () => {
    const currentYear = new Date().getFullYear();
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true)
    const latestYear = new Date().getFullYear() - 1;
    const [yearlyData, setYearlyData] = useState(currentYear);
    const params = useParams();
    const dispatch = useDispatch()
    const [relaodData, setRelaodData] = useState(true)
    const [checked, setChecked] = useState(true);
    const [checkedEmissions, setCheckedEmissions] = useState(true);
    const [checkedInBound, setCheckedInBound] = useState(true);
    const [checkedOutBound, setCheckedOutBound] = useState(true);
    const [showBounds, setShowBounds] = useState(false);
    const [showEmission, setShowEmission] = useState(false);
    const [firstBounds, setFirstBound] = useState(false)
    const [firstEmission, setFirstEmission] = useState(false)
    const handleBoundsOpen = () => {
        setShowBounds(!showBounds);
        setFirstBound(true)
    };

    const handleEmissionOpen = () => {
        setShowEmission(!showEmission);
        setFirstEmission(true)
    };

    const { emissionDates } = useSelector((state) => state.auth)

    const { facilityReductionGraphLoading, facilityReductionGraphDto, facilityOverviewDetailDto,
        facilityComparisonGraphDto, facilityComparisonGraphLoading, facilityCarrierComparisonloading,
        facilityCarrierComparisonData, facilityGraphDetailsLoading, facilityGraphDetailsDto,
        facilityInBoundDto, facilityInBoundLoading, facilityOutBoundLoading, facilityOutBoundDto
    } = useSelector(
        (state) => state.facility
    );
    const [yearlyData1, setYearlyData1] = useState(latestYear)

    useEffect(() => {
        if (yearlyData1 && params) {
            dispatch(facilityReductionGraph({ facility_id: params?.facilityId, company_id: "", year: yearlyData1, toggel_data: checkedEmissionsReductionGlide ? 0 : 1 }))
        }
    }, [yearlyData1, dispatch, params, checkedEmissionsReductionGlide])

    useEffect(() => {
        if (yearlyData1 && params) {
            dispatch(facilityOverviewDetail({ facility_id: params?.facilityId, company_id: "" }))
        }
    }, [yearlyData1, dispatch, params])

    useEffect(() => {
        if (params) {
            dispatch(facilityComparisonGraph({ facility_id: params?.facilityId, company_id: "", }))
        }
    }, [dispatch, params])

    useEffect(() => {
        dispatch(setHeaderName("Facility Overview"))
    }, [dispatch])

    useEffect(() => {
        if (params && firstEmission) {
            dispatch(facilityCarrierComparison({
                facility_id: params?.facilityId, company_id: "", toggel_data: checkedEmissions ? 1 : 0,
            }))
        }
    }, [dispatch, params, checkedEmissions, firstEmission])

    useEffect(() => {
        if (params && firstEmission) {
            dispatch(facilityGraphDetailsGraph({ facility_id: params?.facilityId, company_id: "", toggel_data: checked ? 1 : 0 }))
        }
    }, [dispatch, params, checked, firstEmission])

    useEffect(() => {
        if (params && firstBounds) {
            dispatch(facilityInBoundGraph({ facility_id: params?.facilityId, company_id: "", toggel_data: checkedInBound ? 1 : 0 }))
        }
    }, [dispatch, params, checkedInBound, firstBounds])

    useEffect(() => {
        if (params && firstBounds) {
            dispatch(facilityOutBoundGraph({ facility_id: params?.facilityId, company_id: "", toggel_data: checkedOutBound ? 1 : 0 }))
        }
    }, [dispatch, params, checkedOutBound, firstBounds])

    let lanePageArr = getGraphData(facilityGraphDetailsDto);
    let laneCarrierArr = getGraphData(facilityCarrierComparisonData);

    let laneCarrierInBoundArr = getGraphData(facilityInBoundDto);

    let laneCarrierOutBoundArr = getGraphData(facilityOutBoundDto);

    return (
        <>
            <section className="insight_top_wrapper">
                <div className="regional-wrapper regional-overview-wrapper vendor-wrapper lane-wrapper">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper">

                            <Row>
                                <Col lg="12">
                                    <div className="regional-heading pb-3 mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="small-font">
                                                <Link to="/facility" className="d-flex align-items-center color-primary"><span className="pe-2"> <img src={Back} alt="icon" /></span>Back</Link>
                                            </div>
                                            <div>
                                                <div className="lates-update">
                                                    <DateTimeShow />


                                                </div>
                                            </div>

                                        </div>
                                        <div className="">

                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="heading pt-3">
                                                    <h2 className="mb-0 fs-3 fw-semibold">{facilityOverviewDetailDto?.data?.Facility?.name} Facility Overview</h2>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
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
                                                            <div className="manager-img-default">
                                                                <img src={Profileimg} alt="icon" />
                                                            </div>
                                                        </div>
                                                        <div className="ps-2">

                                                            <h6 className="mb-0">
                                                                {facilityOverviewDetailDto?.data?.Facility?.name} dispatch manager
                                                            </h6>
                                                        </div>
                                                    </div>

                                                </div>

                                            </Col>
                                            <Col lg="8" md="6">
                                                <div className="lane-data-wrapper d-lg-flex">
                                                    <div className="emission pe-lg-5">
                                                        <h4 className="emi-txt fs-5 mb-0">
                                                            Emissions Intensity
                                                        </h4>
                                                        <h6>
                                                            gCO2e/Ton-Mile of freight
                                                        </h6>
                                                        <div className="d-flex align-items-center pt-3">
                                                            <div className="red-div">
                                                            </div>
                                                            <h3 className="fw-bold mb-0 ps-2">
                                                                {facilityOverviewDetailDto?.data?.intensity?.round(1)?.toLocaleString("en-US", { minimumFractionDigits: 1 })}

                                                            </h3>
                                                        </div>

                                                    </div>
                                                    <div className="emission px-lg-5">
                                                        <h4 className="emi-txt mb-0 fs-5">
                                                            Total Emissions
                                                        </h4>
                                                        <h6>
                                                            tCO2e
                                                        </h6>
                                                        <div className="d-flex align-items-center pt-3">
                                                            <div className="red-div">
                                                            </div>
                                                            <h3 className="fw-bold mb-0 ps-2">
                                                                {facilityOverviewDetailDto?.data?.emission?.round(2)?.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                                            </h3>
                                                        </div>

                                                    </div>
                                                    <div className="emission ps-lg-5">
                                                        <h4 className="emi-txt fs-5 mb-0">
                                                            Total Shipments
                                                        </h4>
                                                        <h6 className="invisible">
                                                            Count
                                                        </h6>
                                                        <div className="d-flex align-items-center pt-3">
                                                            <div className="red-div">
                                                            </div>
                                                            <h3 className="fw-bold mb-0 ps-2">
                                                                {facilityOverviewDetailDto?.data?.shipment_count?.toLocaleString("en-US")}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col lg="6" className="mb-3">
                                    <div className="h-100 inner-data-region slider-icons position-relative px-3">

                                        <div className=" p-3 px-0">
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
                                                    Emissions of {facilityOverviewDetailDto?.data?.Facility?.name} for {facilityReductionGraphDto?.data?.year[0]} - {facilityReductionGraphDto?.data?.year[1]}
                                                </h6>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h4 className="fw-semibold mb-0">
                                                        Reduction Glide Path <span className="fs-12 color-primary fw-light ">({!checkedEmissionsReductionGlide ? 'gCO2e' : 'tCo2e'})</span>
                                                    </h4>
                                                    <Button
                                                        color="primary"
                                                        className="px-4 py-0 ms-4"
                                                    >
                                                        On track
                                                    </Button>
                                                </div>
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
                                                                className="fw-semibold"
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

                                        </div>
                                        {facilityReductionGraphLoading ? <div className="graph-loader">

                                            <div class="spinner-border position-absolute spinner-ui" role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        </div> : facilityReductionGraphDto?.data &&
                                        <RegionLevelHighChart
                                            key={1}
                                            chart={"emissionReductionFacility"}
                                            options={facilityReductionGraphDto?.data || {}}
                                            regionName={facilityOverviewDetailDto?.data?.Facility?.name}
                                            reloadData={false}
                                            maxRegionsValue={Math.max(...facilityReductionGraphDto?.data?.region_level || [1]) * 1.10}
                                            unitReduction={!checkedEmissionsReductionGlide}

                                        />
                                        }

                                        <div className="d-lg-flex quartely-wrapper  p-3">
                                            <div className="quartely px-2">
                                                <h4 className="mb-3 fs-14">
                                                    Quarterly emissions reduction goal
                                                </h4>
                                                <div>
                                                    <h3 className="d-flex align-items-center">
                                                        <span>
                                                            <img src={Garrow} alt="icon" />
                                                        </span>
                                                        4%
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="quartely px-2">
                                                <h4 className="mb-3 fs-14">
                                                    Achieved reduction for this quarter
                                                </h4>
                                                <div>
                                                    <h3 className="d-flex align-items-center">
                                                        <span>
                                                            <img src={Garrow} alt="icon" />
                                                        </span>
                                                        2%
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="quartely px-2">
                                                <h4 className="mb-3 fs-14">
                                                    Time left to reach this quarter's target
                                                </h4>
                                                <div>
                                                    <h3 className="d-flex align-items-end">
                                                        4<span>Weeks</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                {/* <Col lg="6" className="mb-3">
                                    <div className="inner-data-region p-3 h-100">
                                        <div className="emi-inten ">
                                            <div>
                                                <h6 className="datafrom-txt mb-2">
                                                    Facility Modal Overview of {facilityOverviewDetailDto?.data?.Facility?.name} form {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                                </h6>

                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                                <div>
                                                    <h4 className="fw-semibold">Modal Overview</h4>
                                                </div>
                                                <div className="d-flex">
                                                    <Input
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                        className="ms-2 my-2 my-md-0 w-auto"
                                                       
                                                    >
                                                        <option>Volume</option>
                                                        <option>tCo2e</option>
                                                        <option>gCO2e/Ton-Mile</option>
                                                    </Input>
                                                    <Input
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                        className="ms-2 yearDropdown"
                                                        value={yearlyData}
                                                        onChange={(e) => {
                                                            setRelaodData(false)
                                                            setYearlyData(e.target.value)
                                                        }}

                                                    >
                                                        {yearList.map((x, index) => <option key={index} value={x}>{x}</option>)}
                                                    </Input>
                                                </div>
                                            </div>


                                        </div>
                                        <div>
                                            <div className="avg-img modalOverviewGraph">
                                                <div className="d-flex justify-content-end ">
                                                    <div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <div className="truckloadBox me-2">
                                                            </div>
                                                            <p className="mb-0 fs-12">Truckload (% Tonnage)</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <div className="intermodalBox me-2">
                                                            </div>
                                                            <p className="mb-0 fs-12">Intermodal (% Tonnage)</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    facilityReductionGraphLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                        <div class="spinner-border  spinner-ui" role="status">
                                                            <span class="visually-hidden"></span>
                                                        </div>
                                                    </div> :
                                                        (
                                                            <ChartsHigh
                                                                chart={"stackedGraph"}
                                                                isLoading={true}
                                                                options={[{
                                                                    name: 'Intermodal',
                                                                    data: [15, 30]
                                                                }, {
                                                                    name: 'Truck',
                                                                    data: [85, 70]
                                                                }]}
                                                                revenueType={1}

                                                            />
                                                        )}
                                            </div>
                                        </div>
                                        <div className="model-overview px-3 py-2">
                                            <div>
                                                <h6 className="mb-0 d-flex">
                                                    <span className="pe-2"><img src={Up} alt="icon" /></span>Your emissions intensity decreased by 1.9% with your growth in intermodal between Q1-Q4 2022.
                                                </h6>
                                            </div>

                                        </div>
                                    </div>

                                </Col> */}

                                <Col lg="6" className=" mb-3">
                                    <div className=" inner-data-region p-3  h-100 position-relative">
                                        <div className="emi-inten">
                                            {console.log("emissionDates?.data?.emission_dates", emissionDates?.data)}
                                            <h6 className="datafrom-txt mb-2">
                                                Facility Emissions Intensity of {facilityOverviewDetailDto?.data?.Facility?.name} form {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                            </h6>
                                            <div className="d-flex align-items-end margin-b">
                                                <h4 className="fw-semibold mb-0">Facility Emissions Intensity</h4>
                                                <span className="fs-12 color-primary">(gCO2e/Ton-Mile)</span>
                                            </div>


                                            {
                                                facilityComparisonGraphLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                    <div class="spinner-border position-absolute spinner-ui" role="status">
                                                        <span class="visually-hidden"></span>
                                                    </div>
                                                </div>
                                                    :
                                                    <ChartsHigh isLoading={facilityComparisonGraphLoading}
                                                        reloadData={relaodData}
                                                        chart="facilityComparison"
                                                        options={facilityComparisonGraphDto?.data?.responseData}
                                                        revenueType={1}
                                                        facilityName={facilityOverviewDetailDto?.data?.Facility?.name}
                                                    />

                                            }



                                            {!facilityComparisonGraphLoading ? (((facilityComparisonGraphDto?.data?.responseData?.intensity - facilityComparisonGraphDto?.data?.responseData?.industrialAverage) / facilityComparisonGraphDto?.data?.responseData?.intensity) * 100) > 0 ?
                                                <div className={`model-overview-down bottom-card px-3 py-2 ${facilityComparisonGraphLoading ? 'bottom-card' : ''}`}>
                                                    <h6 className="mb-0 d-flex fs-6">
                                                        <span className="text-capitalize"><img src={Down} alt="ico" className="me-2" />{facilityComparisonGraphDto?.data?.responseData?.carrier_name}</span> Your emissions intensity per Ton-Mile is {Math.abs(Math.round(((facilityComparisonGraphDto?.data?.responseData?.intensity - facilityComparisonGraphDto?.data?.responseData?.industrialAverage) / facilityComparisonGraphDto?.data?.responseData?.intensity) * 100))}% higher than industry average.


                                                    </h6>
                                                </div> : <div className="model-overview px-3 py-2 bottom-card">
                                                    <div>
                                                        <h6 className="mb-0 d-flex fs-6">
                                                            <span className="text-capitalize"><img src={Up} alt="ico" className="me-2" />{facilityComparisonGraphDto?.data?.responseData?.carrier_name}</span> Your emissions intensity per Ton-Mile is {Math.abs(Math.round(((facilityComparisonGraphDto?.data?.responseData?.intensity - facilityComparisonGraphDto?.data?.responseData?.industrialAverage) / facilityComparisonGraphDto?.data?.responseData?.intensity) * 100))}% lower than industry average.


                                                        </h6>
                                                    </div>
                                                </div> : ''}
                                        </div>
                                    </div>

                                </Col>

                            </Row>

                            <div className="accordian custom-accordian">
                                <div className="accordian-header mb-2 d-flex justify-content-between" onClick={handleBoundsOpen}>
                                    <div>Show InBound and OutBound Graphs</div>
                                    <div className="sign">{showBounds ? '-' : '+'}</div>
                                </div>
                                {showBounds && (
                                    <Row>

                                        <Col lg="6" className="mb-3">
                                            <div className="inner-data-region p-3 h-100">
                                                <div className="emi-inten">
                                                    <h6 className="datafrom-txt mb-2">
                                                        {checkedInBound ? "InBound Freight Total Emissions" : "InBound Freight Emissions Intensity"} of {facilityOverviewDetailDto?.data?.Facility?.name} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                                    </h6>

                                                    <h4 className="fw-semibold">InBound Freight Emissions</h4>
                                                    <div className="emi-inten d-flex justify-content-between  pb-4">
                                                        <div className="d-flex align-items-center">
                                                            <h5 className="mb-0 fw-semibold fs-14">
                                                                Emissions Intensity
                                                            </h5>
                                                            <div className="toggle-switch fw-semibold">
                                                                <Form>
                                                                    <Form.Check
                                                                        type="switch"
                                                                        id="custom-switch"
                                                                        label="Total Emissions"
                                                                        className="mb-0"
                                                                        checked={checkedInBound}
                                                                        onChange={() => {
                                                                            setCheckedInBound(!checkedInBound)
                                                                        }}

                                                                    />
                                                                </Form>
                                                            </div>
                                                        </div>
                                                        <div className="ps-4">
                                                            <div className="d-flex align-items-center mb-1 contri-txt">
                                                                <div className="red-div">
                                                                </div>
                                                                <h6 className="ps-2 mb-0 fs-12">Detractor</h6>
                                                            </div>
                                                            <div className="d-flex align-items-center contri-txt">
                                                                <div className="darkgreen-div">
                                                                </div>
                                                                <h6 className="ps-2 mb-0 fs-12">Contributor</h6>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="avg-region text-center x-axis-hide">
                                                        <h6 className="fs-6">
                                                            Average of all facilities (
                                                            {facilityInBoundDto?.data?.average?.round(1)?.toLocaleString(
                                                                "en-US",
                                                                { minimumFractionDigits: 1 }
                                                            )}{" "}
                                                            {facilityInBoundDto?.data?.unit})
                                                        </h6>
                                                        <div className="avg-img">

                                                            {
                                                                facilityInBoundLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                                    <div class="spinner-border  spinner-ui" role="status">
                                                                        <span class="visually-hidden"></span>
                                                                    </div>
                                                                </div> :
                                                                    laneCarrierInBoundArr?.length > 0 && (
                                                                        <ChartsHigh
                                                                            chart={"lane"}
                                                                            isLoading={true}
                                                                            lanePageArr={laneCarrierInBoundArr}
                                                                            lanePagecontributor={[]}
                                                                            lanePagedetractor={[]}
                                                                            reloadData={relaodData}
                                                                            unitDto={facilityInBoundDto?.data?.unit}
                                                                        />
                                                                    )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Col>

                                        <Col lg="6" className="mb-3">
                                            <div className="inner-data-region p-3 h-100">
                                                <div className="emi-inten">
                                                    <h6 className="datafrom-txt mb-2">
                                                        {checkedOutBound ? "OutBound Freight Total Emissions" : "OutBound Freight Emissions Intensity"} of {facilityOverviewDetailDto?.data?.Facility?.name} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                                    </h6>
                                                    <h4 className="fw-semibold">OutBound Freight Emissions</h4>
                                                    <div className="emi-inten d-flex justify-content-between  pb-4">
                                                        <div className="d-flex align-items-center">
                                                            <h5 className="mb-0 fw-semibold fs-14">
                                                                Emissions Intensity
                                                            </h5>
                                                            <div className="toggle-switch fw-semibold">
                                                                <Form>
                                                                    <Form.Check
                                                                        type="switch"
                                                                        id="custom-switch"
                                                                        label="Total Emissions"
                                                                        className="mb-0"
                                                                        checked={checkedOutBound}
                                                                        onChange={() => { setCheckedOutBound(!checkedOutBound) }}

                                                                    />
                                                                </Form>
                                                            </div>
                                                        </div>
                                                        <div className="ps-4">
                                                            <div className="d-flex align-items-center mb-1 contri-txt">
                                                                <div className="red-div">
                                                                </div>
                                                                <h6 className="ps-2 mb-0 fs-12">Detractor</h6>
                                                            </div>
                                                            <div className="d-flex align-items-center contri-txt">
                                                                <div className="darkgreen-div">
                                                                </div>
                                                                <h6 className="ps-2 mb-0 fs-12">Contributor</h6>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="avg-region text-center x-axis-hide">
                                                        <h6 className="fs-6">
                                                            Average of all facilities (
                                                            {facilityOutBoundDto?.data?.average?.round(1)?.toLocaleString(
                                                                "en-US",
                                                                { minimumFractionDigits: 1 }
                                                            )}{" "}
                                                            {facilityOutBoundDto?.data?.unit})
                                                        </h6>
                                                        <div className="avg-img">
                                                            {
                                                                facilityOutBoundLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                                    <div class="spinner-border  spinner-ui" role="status">
                                                                        <span class="visually-hidden"></span>
                                                                    </div>
                                                                </div> :
                                                                    laneCarrierOutBoundArr?.length > 0 && (
                                                                        <ChartsHigh
                                                                            chart={"lane"}
                                                                            isLoading={true}
                                                                            lanePageArr={laneCarrierOutBoundArr}
                                                                            lanePagecontributor={[]}
                                                                            lanePagedetractor={[]}
                                                                            reloadData={relaodData}
                                                                            unitDto={facilityOutBoundDto?.data?.unit}
                                                                        />
                                                                    )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Col>
                                    </Row>
                                )}
                            </div>
                            <div className="accordian custom-accordian">
                                <div className="accordian-header mb-2 d-flex justify-content-between" onClick={handleEmissionOpen}>
                                    <div>Show Emissions Graphs</div>
                                    <div className="sign">{showEmission ? '-' : '+'}</div>
                                </div>
                                {showEmission && (
                                    <Row>

                                        <Col lg="6" className=" mb-3">
                                            <div className=" inner-data-region p-3 h-100">
                                                <div className="emi-inten">

                                                    <h6 className="datafrom-txt mb-2">
                                                        {checkedEmissions ? "Total Carrier Emissions" : "Carrier Emissions Intensity"} of {facilityOverviewDetailDto?.data?.Facility?.name} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                                    </h6>
                                                    <h4 className="fw-semibold">Carrier Emissions</h4>

                                                    <div className="emi-inten d-flex justify-content-between  pb-4">
                                                        <div className="d-flex align-items-center">
                                                            <h5 className="mb-0 fw-semibold fs-14">
                                                                Emissions Intensity
                                                            </h5>
                                                            <div className="toggle-switch fw-semibold">
                                                                <Form>
                                                                    <Form.Check
                                                                        type="switch"
                                                                        id="custom-switch"
                                                                        label="Total Emissions"
                                                                        className="mb-0"
                                                                        checked={checkedEmissions}
                                                                        onChange={() => setCheckedEmissions(!checkedEmissions)}

                                                                    />
                                                                </Form>
                                                            </div>
                                                        </div>
                                                        <div className="ps-4">
                                                            <div className="d-flex align-items-center mb-1 contri-txt">
                                                                <div className="red-div">
                                                                </div>
                                                                <h6 className="ps-2 mb-0 fs-12">Detractor</h6>
                                                            </div>
                                                            <div className="d-flex align-items-center contri-txt">
                                                                <div className="darkgreen-div">
                                                                </div>
                                                                <h6 className="ps-2 mb-0 fs-12">Contributor</h6>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="avg-region text-center x-axis-hide">
                                                        <h6 className="fs-6">
                                                            Average of all carriers (
                                                            {facilityCarrierComparisonData?.data?.average?.round(1)?.toLocaleString(
                                                                "en-US",
                                                                { minimumFractionDigits: 1 }
                                                            )}{" "}
                                                            {facilityCarrierComparisonData?.data?.unit})
                                                        </h6>
                                                        <div className="avg-img">

                                                            {
                                                                facilityCarrierComparisonloading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                                    <div class="spinner-border  spinner-ui" role="status">
                                                                        <span class="visually-hidden"></span>
                                                                    </div>
                                                                </div> :
                                                                    laneCarrierArr?.length > 0 && (
                                                                        <ChartsHigh
                                                                            chart={"lane"}
                                                                            isLoading={true}
                                                                            lanePageArr={laneCarrierArr}
                                                                            lanePagecontributor={[]}
                                                                            lanePagedetractor={[]}
                                                                            reloadData={relaodData}
                                                                            unitDto={facilityCarrierComparisonData?.data?.unit}
                                                                        />
                                                                    )}
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </Col>

                                        <Col lg="6" className="mb-3">
                                            <div className="inner-data-region region-graph-outer h-100">
                                                <div className=" p-3 px-3">
                                                    <div className="emi-inten">

                                                        <h6 className="datafrom-txt mb-2">
                                                            {checked ? "Total Lane Emissions" : "Lane Emissions Intensity"} of {facilityOverviewDetailDto?.data?.Facility?.name} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}

                                                        </h6>
                                                        <h4 className="fw-semibold">Lane Emissions</h4>

                                                    </div>

                                                    <div className="emi-inten d-flex justify-content-between pb-4">

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
                                                                        className="fw-semibold mb-0"
                                                                        checked={checked}

                                                                        onChange={() => setChecked(!checked)}
                                                                    />
                                                                </Form>
                                                            </div>
                                                        </div>
                                                        <div className="ps-4">
                                                            <div className="d-flex align-items-center mb-1 detractor">
                                                                <div className="red-div"></div>
                                                                <h6 className="ps-2 mb-0 fs-12">Detractor</h6>
                                                            </div>
                                                            <div className="d-flex align-items-center detractor">
                                                                <div className="darkgreen-div"></div>
                                                                <h6 className="ps-2 mb-0 fs-12">Contributor</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="avg-region text-center x-axis-hide">
                                                        <h6 className="fs-6">
                                                            Average of all lanes (
                                                            {facilityGraphDetailsDto?.data?.average?.round(1)?.toLocaleString(
                                                                "en-US",
                                                                { minimumFractionDigits: 1 }
                                                            )}{" "}
                                                            {facilityGraphDetailsDto?.data?.unit})
                                                        </h6>
                                                        <div className="avg-img">

                                                            {
                                                                facilityGraphDetailsLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                                    <div class="spinner-border  spinner-ui" role="status">
                                                                        <span class="visually-hidden"></span>
                                                                    </div>
                                                                </div> :
                                                                    lanePageArr?.length > 0 && (
                                                                        <ChartsHigh
                                                                            chart={"lane"}
                                                                            isLoading={true}
                                                                            lanePageArr={lanePageArr}
                                                                            lanePagecontributor={[]}
                                                                            lanePagedetractor={[]}
                                                                            reloadData={relaodData}
                                                                            unitDto={facilityGraphDetailsDto?.data?.unit}

                                                                        />
                                                                    )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                            </div>



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

export default FacilityOverview