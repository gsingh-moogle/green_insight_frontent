import React, { useEffect, useState } from "react";
import "../lanes-overview/lanes-overview.scss";
import "../region-overview/region-overview.scss";
import DateTimeShow from "../../component/main/DateTimeShow";
import Back from "../../assets/images/back.svg";
import Garrow from "../../assets/images/g-arrow.svg";
import Profileimg from "../../assets/images/profile-img-auto.png";
import moment from "moment";
import RegionLevelHighChart from "../regional-level/RegionLevelHighChart";
import { useDispatch, useSelector } from "react-redux";
import ChartsHigh from "../../component/ChartsHigh";
import { yearList, getQuarterYear, getGraphData, getGraphDataHorizontal } from "../../constant"
import Form from 'react-bootstrap/Form';

import {
    Button,
    Row,
    Col,
    Input,
} from 'reactstrap';
import { useParams, Link } from "react-router-dom";

import {
    laneGraphData,
    regionCarrierComparison,
    getRegionOverviewDetail
} from "../../component/store/lane/laneDetailsSlice";
import { setHeaderName } from "../../component/store/auth/authDataSlice";
import {
    regionLevelGlidePath,
    regionShow
} from "../../component/store/auth/graph/graphDetailsSlice";
import Up from "../../assets/images/up.svg";

import { regionFacilityEmissions } from "../../component/store/region/regionOverviewSlice"

const RegionOverview = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const currentPage = 1
    const pageSize = 10
    const { regions, isLoadingRegionLevelGlidePath, regionLevelGlideData } = useSelector(
        (state) => state.graphDetails
    );
    const { emissionDates } = useSelector((state) => state.auth)
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true)
    const currentYear = new Date().getFullYear();
    const [yearlyData, setYearlyData] = useState(currentYear);
    const [regionName, setRegionName] = useState(null)
    const [relaodData, setRelaodData] = useState(true)
    const [checked, setChecked] = useState(true);
    const [checkedEmissions, setCheckedEmissions] = useState(true);
    const [yearlyData1, setYearlyData1] = useState(2022)
    const [checkedFacilityEmissions, setCheckedFacilityEmissions] = useState(true);

    const { regionFacilityEmissionDto, regionFacilityEmissionIsLoading } = useSelector((state) => state.regionOverview)
    const { laneGraphDetails, laneGraphDetailsLoading, regionCarrierComparisonData, regionCarrierComparisonLoading, getRegionOverviewDetailData } = useSelector((state) => state.lane);

    useEffect(() => {
        dispatch(regionShow())
        dispatch(setHeaderName("Region Overview"))
    }, [dispatch])

   
    useEffect(() => {
        if (regions?.data) {
            setRegionName(regions?.data?.regions?.filter(i => i?.name === params?.regionId)[0]?.id || 1)
        }
    }, [regions, params])


    useEffect(() => {
        if (yearlyData1 && regionName) {
            dispatch(regionLevelGlidePath({ region_id: regionName, company_id: "", year: yearlyData1, toggel_data: checkedEmissionsReductionGlide ? 0 : 1   }))
        }
    }, [dispatch, yearlyData1, regionName, checkedEmissionsReductionGlide])

    useEffect(() => {
        if (regionName) {
            dispatch(
                laneGraphData({
                    page: currentPage,
                    page_size: pageSize,
                    region_id: regionName,
                    facility_id: "",
                    // year: yearlyData,
                    // quarter: quarterDetails,
                    toggel_data: checked ? 1 : 0,
                })
            );

        }
    }, [dispatch, regionName, checked])


    useEffect(() => {
        if (regionName) {
            dispatch(
                getRegionOverviewDetail({
                    region_id: regionName,
                    year: "",
                    quarter: ""
                })
            );

        }
    }, [dispatch, regionName])

    useEffect(() => {
        if (regionName) {

            dispatch(regionCarrierComparison({
                page: currentPage,
                page_size: pageSize,
                region_id: regionName,
                facility_id: "",
                // year: yearlyData,
                // quarter: quarterDetails,
                toggel_data: checkedEmissions ? 1 : 0,
            }))
        }
    }, [regionName, dispatch, checkedEmissions])

    useEffect(() => {
        if (regionName) {

            dispatch(regionFacilityEmissions({
                // page: currentPage,
                // page_size: pageSize,
                region_id: regionName,
                facility_id: "",
                // year: yearlyData,
                // quarter: quarterDetails,
                toggel_data: checkedFacilityEmissions ? 1 : 0,
            }))
        }
    }, [regionName, dispatch, checkedFacilityEmissions])

    let lanePageArr = getGraphData(laneGraphDetails);
    let laneCarrierArr = getGraphData(regionCarrierComparisonData);
    let laneFacilityEmessionArr = getGraphDataHorizontal(regionFacilityEmissionDto);
    return (
        <>
            <section className="insight_top_wrapper">
                <div className="regional-wrapper regional-overview-wrapper vendor-wrapper lane-wrapper">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper ">
                            <Row>
                                <Col lg="12">
                                    <div className="regional-heading pb-3 mb-3">
                                        <div className="d-sm-flex justify-content-between align-items-center">
                                            <div className="small-font">
                                                <Link to="/regional" className="d-flex align-items-center color-primary"><span className="pe-2"> <img src={Back} alt="icon" /></span>Back</Link>
                                            </div>
                                            <div>
                                                <div className="lates-update">
                                                    <DateTimeShow />


                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="heading pt-3">
                                                <h2 className="mb-0 fs-4 fw-semibold">{params?.regionId} Region Overview</h2>
                                            </div>
                                            {emissionDates && <div class="lates-update "><p class="d-flex align-items-center mb-0 justify-content-start">Data available from {moment.utc(emissionDates?.data?.emission_dates?.start_date).format("DD MMMM YYYY")} to {moment.utc(emissionDates?.data?.emission_dates?.end_date).format("DD MMMM YYYY")}</p></div>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>

                                <Col lg="12">
                                    <div className="lane-data p-4 mb-3">
                                        <div>
                                            <h6 className="datafrom-txt mb-2">
                                                Summary of {`${params?.regionId} Region`} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                            </h6>
                                        </div>
                                        <Row>
                                            <Col lg="4" md="6">
                                                <div className="emission mt-3">
                                                    <h4 className="emi-txt fs-5 mb-2">
                                                        Project Manager
                                                    </h4>

                                                    <div className="d-flex align-items-center manager">
                                                        <div className="manager-img-default">
                                                            <img src={Profileimg} alt="icon" />
                                                        </div>
                                                        <div className="ps-2">
                                                            <h5 className="mb-0">
                                                                {/* Sarah Dooley */}
                                                            </h5>
                                                            <h6 className="mb-0">
                                                                Manager of Substainability
                                                            </h6>
                                                        </div>
                                                    </div>

                                                </div>

                                            </Col>
                                            <Col lg="8" md="6">
                                                <div className="lane-data-wrapper d-lg-flex mt-3">
                                                    <div className="emission pe-lg-5 mb-3">
                                                        <h4 className="emi-txt mb-0 fs-5">
                                                            Emissions Intensity
                                                        </h4>
                                                        <h6>
                                                            gCO2e/Ton-Mile of freight
                                                        </h6>
                                                        <div className="d-flex align-items-center pt-lg-3">
                                                            <div className="red-div">
                                                            </div>
                                                            <h3 className="fw-bold mb-0 ps-2">
                                                                {getRegionOverviewDetailData?.data?.carrierDto[0]?.intensity?.toLocaleString("en-US", { minimumFractionDigits: 1 })}

                                                            </h3>
                                                        </div>

                                                    </div>
                                                    <div className="emission px-lg-5 mb-3">
                                                        <h4 className="emi-txt mb-0 fs-5">
                                                            Total Emissions

                                                        </h4>
                                                        <h6>
                                                            tCO2e
                                                        </h6>
                                                        <div className="d-flex align-items-center pt-lg-3">
                                                            <div className="green-div">
                                                            </div>
                                                            <h3 className="fw-bold mb-0 ps-2">
                                                                {getRegionOverviewDetailData?.data?.carrierDto[0]?.emissions?.round(2)?.toLocaleString("en-US", { minimumFractionDigits: 2 })}

                                                            </h3>
                                                        </div>

                                                    </div>
                                                    <div className="emission ps-lg-5 mb-3">
                                                        <h4 className="emi-txt mb-0 fs-5">
                                                            Total Shipments
                                                        </h4>
                                                        <h6 class="invisible">tCO2e</h6>
                                                        <div className="d-flex align-items-center pt-lg-3">
                                                            <div className="grey-div round-2">
                                                            </div>
                                                            <h3 className="fw-bold mb-0 ps-2">
                                                                {getRegionOverviewDetailData?.data?.carrierDto[0]?.shipment_count?.toLocaleString("en-US")}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                {/* Emissions Reduction Glide Path Graph */}
                                <Col lg="6" className="mt-2">
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
                                                    Emissions of {`${params?.regionId} Region`} for {regionLevelGlideData?.data?.year[0]} - {regionLevelGlideData?.data?.year[1]}
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
                                            {/* maps */}
                                        </div>
                                        {isLoadingRegionLevelGlidePath ? <div className="graph-loader">

                                            <div class="spinner-border position-absolute spinner-ui" role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        </div> :
                                            <RegionLevelHighChart
                                                key={1}
                                                chart={"emissionReduction"}
                                                options={regionLevelGlideData?.data}
                                                regionName={params?.regionId}
                                                reloadData={false}
                                                maxRegionsValue={Math.max(...regionLevelGlideData?.data?.region_level || [1]) * 1.10}
                                                unitReduction={!checkedEmissionsReductionGlide}

                                            />
                                        }


                                        <div className="d-lg-flex quartely-wrapper  p-3">
                                            <div className="quartely px-2">
                                                <h4 className="mb-3 fs-14 h-50px">
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
                                                <h4 className="mb-3 fs-14 h-50px">
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
                                                <h4 className="mb-3 fs-14 h-50px">
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
                                {/* <Col lg="6" className="mt-2">
                                    <div className="inner-data-region p-3 h-100">
                                        <div className="emi-inten ">
                                            <div>
                                                <h6 className="datafrom-txt mb-2">
                                                {"Modal Overview"} of {params?.regionId === "OTHER" ? "OTHER Region" : `${params?.regionId} Region`} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
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


                                <Col lg="6" className=" mt-3">
                                    <div className=" inner-data-region p-3 h-100">
                                        <div className="emi-inten">

                                            <h6 className="datafrom-txt mb-2">
                                                {checkedEmissions ? "Total Carrier Emissions" : "Carrier Emissions Intensity"} of {params?.regionId === "OTHER" ? "OTHER Region" : `${params?.regionId} Region`} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
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
                                                        <h6 className="ps-2 mb-0">Detractor</h6>
                                                    </div>
                                                    <div className="d-flex align-items-center contri-txt">
                                                        <div className="darkgreen-div">
                                                        </div>
                                                        <h6 className="ps-2 mb-0">Contributor</h6>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="avg-region text-center x-axis-hide">
                                                <h6 className="fs-6">
                                                    Average of all carriers (
                                                    {regionCarrierComparisonData?.data?.average?.toLocaleString(
                                                        "en-US",
                                                        { minimumFractionDigits: 1 }
                                                    )}{" "}
                                                    {regionCarrierComparisonData?.data?.unit})
                                                </h6>
                                                <div className="avg-img">

                                                    {
                                                        regionCarrierComparisonLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                            <div class="spinner-border  spinner-ui" role="status">
                                                                <span class="visually-hidden"></span>
                                                            </div>
                                                        </div> :
                                                            (
                                                                <ChartsHigh
                                                                    chart={"lane"}
                                                                    isLoading={true}
                                                                    lanePageArr={laneCarrierArr}
                                                                    lanePagecontributor={[]}
                                                                    lanePagedetractor={[]}
                                                                    reloadData={relaodData}
                                                                    unitDto={regionCarrierComparisonData?.data?.unit}

                                                                />
                                                            )}
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </Col>

                                {/* Lane Emissions of a region */}
                                <Col lg="6" className="mt-3">
                                    <div className="inner-data-region region-graph-outer h-100">
                                        <div className=" p-3 px-3">
                                            <div className="emi-inten">

                                                <h6 className="datafrom-txt mb-2">
                                                    {checked ? "Total Lane Emissions" : "Lane Emissions Intensity"} of {params?.regionId === "OTHER" ? "OTHER Region" : `${params?.regionId} Region`} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}

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
                                                        <h6 className="ps-2 mb-0">Detractor</h6>
                                                    </div>
                                                    <div className="d-flex align-items-center detractor">
                                                        <div className="darkgreen-div"></div>
                                                        <h6 className="ps-2 mb-0">Contributor</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="avg-region text-center x-axis-hide">
                                                <h6>
                                                    Average of all lanes (
                                                    {laneGraphDetails?.data?.average?.toLocaleString(
                                                        "en-US",
                                                        { minimumFractionDigits: 1 }
                                                    )}{" "}
                                                    {laneGraphDetails?.data?.unit})
                                                </h6>
                                                <div className="avg-img">

                                                    {
                                                        laneGraphDetailsLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                            <div class="spinner-border  spinner-ui" role="status">
                                                                <span class="visually-hidden"></span>
                                                            </div>
                                                        </div> :
                                                            (
                                                                <ChartsHigh
                                                                    chart={"lane"}
                                                                    isLoading={true}
                                                                    lanePageArr={lanePageArr}
                                                                    lanePagecontributor={[]}
                                                                    lanePagedetractor={[]}
                                                                    reloadData={relaodData}
                                                                    unitDto={laneGraphDetails?.data?.unit}

                                                                />
                                                            )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>


                                <Col lg="6" className="mt-3">
                                    <div className="inner-data-region region-graph-outer h-100">
                                        <div className=" p-3 px-3">
                                            <div className="emi-inten">

                                                <h6 className="datafrom-txt mb-2">
                                                    {checkedFacilityEmissions ? "Total Lane Emissions" : "Lane Emissions Intensity"} of {params?.regionId === "OTHER" ? "OTHER Region" : `${params?.regionId} Region`} from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}

                                                </h6>
                                                <h4 className="fw-semibold">Facility Emissions</h4>

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
                                                                checked={checkedFacilityEmissions}

                                                                onChange={() => setCheckedFacilityEmissions(!checkedFacilityEmissions)}
                                                            />
                                                        </Form>
                                                    </div>
                                                </div>
                                                <div className="ps-4">
                                                    <div className="d-flex align-items-center mb-1 detractor">
                                                        <div className="red-div"></div>
                                                        <h6 className="ps-2 mb-0">Detractor</h6>
                                                    </div>
                                                    <div className="d-flex align-items-center detractor">
                                                        <div className="darkgreen-div"></div>
                                                        <h6 className="ps-2 mb-0">Contributor</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="avg-region text-center x-axis-hide">
                                                <h6>
                                                    Average of all facilities (
                                                    {regionFacilityEmissionDto?.data?.average?.toLocaleString(
                                                        "en-US",
                                                        { minimumFractionDigits: 1 }
                                                    )}{" "}
                                                    {regionFacilityEmissionDto?.data?.unit})
                                                </h6>
                                                <div className="avg-img">

                                                    {
                                                        regionFacilityEmissionIsLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                            <div class="spinner-border  spinner-ui" role="status">
                                                                <span class="visually-hidden"></span>
                                                            </div>
                                                        </div> :
                                                            (
                                                                <ChartsHigh
                                                                    chart={"region"}
                                                                    isLoading={true}
                                                                    regionPageArr={laneFacilityEmessionArr}
                                                                    lanePagecontributor={[]}
                                                                    lanePagedetractor={[]}
                                                                    reloadData={relaodData}
                                                                    unitDto={regionFacilityEmissionDto?.data?.unit}

                                                                />
                                                            )}
                                                </div>
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
    )
}

export default RegionOverview