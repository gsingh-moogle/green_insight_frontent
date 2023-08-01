import React, { useState, useEffect } from "react";
import "../regional/regional.scss";
import "../lanes-overview/lanes-overview.scss";
import ChartsHigh from "../../component/ChartsHigh"
import moment from "moment";
import DateTimeShow from "../../component/main/DateTimeShow";
import Back from "../../assets/images/back.svg";
import Garrow from "../../assets/images/g-arrow.svg";
import { useParams, Link, useNavigate } from "react-router-dom";
import Pagination from '../lanes/pagination/Pagination';
import { pageSizeList, getQuarterYear, sortIcon, getGraphData } from "../../constant/index"
import { laneCarrierTableData } from "../../component/store/vendor/vendorDetailsSlice"
import { laneCarrierEmissionReductionGlide, laneReductionDetailGraph, getLaneOverDetailsEmission } from "../../component/store/lane/laneDetailsSlice"
import { useDispatch, useSelector } from "react-redux";
import Search from "../../assets/images/searchcarrier.svg"
import { setHeaderName } from "../../component/store/auth/authDataSlice";

import GoogleMapView from "../../component/google-map"
import Form from 'react-bootstrap/Form';
import {
    Button,
    Row,
    Col,
    Table,
    Input
} from 'reactstrap';

Number.prototype.round = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}

const LanesOverview = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { laneName } = params
    let regionalLevel = localStorage.getItem("regionalLevel")
    const [checkedEmissions, setCheckedEmissions] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [relaodData, setRelaodData] = useState(true);
    const [searchCarrier, setSearchCarrier] = useState("");
    const [order, setOrder] = useState("desc");
    const [col_name, setCol_name] = useState("intensity");
    const [pageSize, setPageSize] = useState(20);
    const { isLoading, laneCarrierTableDto } = useSelector((state) => state.vendor)
    const { laneCarrierEmissionIsloading, laneReductionDetailGraphLoading, laneCarrierEmission, laneReductionDetailGraphData, getLaneOverDetailsEmissionData } = useSelector((state) => state.lane)
    const { emissionDates } = useSelector((state) => state.auth)
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true)

    const [yearlyData1, setYearlyData1] = useState(2022)

    const handleSearchCarrier = (e) => { setSearchCarrier(e.target.value) };


    const handleChangeOrder = (choose_Col_name) => {
        setOrder(order === "desc" ? "asc" : "desc")
        setCol_name(choose_Col_name)
    }

    const fetchTableData = () => {
        if (searchCarrier?.length === 0) {
            dispatch(laneCarrierTableData({
                region_id: regionalLevel,

                page: currentPage, lane_name: laneName,
                page_size: pageSize, order_by: order, col_name: col_name, search_name: searchCarrier
            }))

        } else {
            if (searchCarrier?.length >= 3) {
                dispatch(laneCarrierTableData({
                    region_id: regionalLevel,

                    page: currentPage, lane_name: laneName,
                    page_size: pageSize, order_by: order, col_name: col_name, search_name: searchCarrier
                }))

            }
        }
    }
    useEffect(() => {
        dispatch(setHeaderName("Lane Overview"))
      }, [dispatch])

    useEffect(() => {
        dispatch(laneCarrierEmissionReductionGlide({
            lane_name: laneName,
            year: yearlyData1, toggel_data: checkedEmissionsReductionGlide ? 0 : 1
        }))
    }, [dispatch, laneName, yearlyData1, checkedEmissionsReductionGlide])

    useEffect(() => {
        dispatch(getLaneOverDetailsEmission({
            lane_name: laneName,
        }))
    }, [dispatch, laneName])


    useEffect(() => {
        fetchTableData()
    }, [dispatch, regionalLevel, currentPage, order, col_name, pageSize, searchCarrier])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        dispatch(
            laneReductionDetailGraph({
                page: currentPage,
                page_size: pageSize,
                facility_id: "",

                toggel_data: checkedEmissions ? 1 : 0,
                lane_name: laneName,

            })
        );

    }, [dispatch, checkedEmissions])

    let laneCarrierArr = getGraphData(laneReductionDetailGraphData);

    return (
        <>
            <div className="regional-wrapper vendor-wrapper lane-wrapper">
                <div className="container-fluid">
                    <div className="regional-h-wrapper">

                        <Row>
                            <Col lg="12">
                                <div className="regional-heading pb-3 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="small-font">
                                            <Link to="/lanes" className="d-flex align-items-center color-primary">
                                                <span className="pe-2">
                                                    {" "}
                                                    <img src={Back} alt="icon" />
                                                </span>
                                                Back
                                            </Link>
                                        </div>
                                        <div>
                                            <div className="lates-update">
                                                <DateTimeShow />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="heading pt-3">
                                            <h2 className="mb-0 fs-4 fw-semibold">{laneName} Lane Overview</h2>
                                        </div>

                                        {emissionDates && <div className="lates-update "><p className="d-flex align-items-center mb-0 justify-content-start">Data available from {moment.utc(emissionDates?.data?.emission_dates?.start_date).format("DD MMMM YYYY")} to {moment.utc(emissionDates?.data?.emission_dates?.end_date).format("DD MMMM YYYY")}</p></div>}
                                    </div>

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <div className="lane-data p-4 mb-3">
                                    <div>
                                        <h6 className="datafrom-txt mb-2">
                                            Summary of {laneName} Lane from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                        </h6>
                                    </div>
                                    <div className="lane-data-wrapper d-lg-flex">
                                        <Col lg="12" md="12">
                                            <div className="lane-data-wrapper d-lg-flex mt-2">
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
                                                            {getLaneOverDetailsEmissionData?.data?.intensity?.round(2)?.toLocaleString("en-US", { minimumFractionDigits: 1 })}

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
                                                            {getLaneOverDetailsEmissionData?.data?.emission?.round(2)?.toLocaleString("en-US", { minimumFractionDigits: 2 })}

                                                        </h3>
                                                    </div>

                                                </div>
                                                <div className="emission ps-lg-5 mb-3">
                                                    <h4 className="emi-txt mb-0 fs-5">
                                                        Total Shipments
                                                    </h4>
                                                    <h6 className="invisible">
                                                        tCO2e
                                                    </h6>
                                                    <div className="d-flex align-items-center pt-lg-3">
                                                        <div className="grey-div round-2">
                                                        </div>
                                                        <h3 className="fw-bold mb-0 ps-2">
                                                            {getLaneOverDetailsEmissionData?.data?.shipment_count?.toLocaleString("en-US")}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>

                                    </div>

                                </div>
                            </Col>

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
                                                Emissions of {laneName} Lane for {laneCarrierEmission?.data?.year[0]} - {laneCarrierEmission?.data?.year[1]}


                                            </h6>
                                            <div className="d-flex align-items-center justify-content-between">

                                                <h4 className="fw-semibold"> Reduction Glide Path <span className="fs-12 color-primary fw-light ">({!checkedEmissionsReductionGlide ? 'gCO2e' : 'tCo2e'})</span></h4>
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
                                                                className="fw-semibold mb-0"
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

                                            {laneCarrierEmissionIsloading ? <div className="graph-loader d-flex align-items-center justify-content-center">

                                                <div className="spinner-border position-absolute" role="status">
                                                    <span className="visually-hidden"></span>
                                                </div>
                                            </div>
                                                : laneCarrierEmission?.data && (
                                                    <ChartsHigh isLoading={isLoading} options={laneCarrierEmission?.data} chart={1} reloadData={relaodData}
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
                                        <div className="quartely ps-lg-3">
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
                            {/* Carrier Emissions for a lane */}
                            <Col lg="6" className="mt-3 mt-lg-0">
                                <div className="h-100 inner-data-region p-3">
                                    <div className="emi-inten">
                                        <h6 className="datafrom-txt mb-2">
                                            {checkedEmissions ? "Total Emissions" : "Emissions Intensity"} of {laneName} Lane from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}

                                        </h6>
                                        <h4 className="fw-semibold">Carrier Emissions</h4>

                                        <div className="emi-inten d-flex justify-content-between  pb-4">
                                            <div className="d-flex align-items-center">
                                                <h6 className="mb-0 fw-bold fs-14">
                                                    Emissions Intensity
                                                </h6>
                                                <div className="toggle-switch">
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
                                            <h6 className="fs-14">
                                                Average of all carriers (
                                                {laneReductionDetailGraphData?.data?.average?.toLocaleString(
                                                    "en-US",
                                                    { minimumFractionDigits: 1 }
                                                )}{" "}
                                                {checkedEmissions ? 'tCo2e' : 'g'})
                                            </h6>
                                            <div className="avg-img">

                                                {
                                                    laneReductionDetailGraphLoading ? <div className="graph-loader d-flex justify-content-center align-items-center">

                                                        <div className="spinner-border  spinner-ui" role="status">
                                                            <span className="visually-hidden"></span>
                                                        </div>
                                                    </div> :
                                                        laneCarrierArr?.filter(i => Math.abs(i?.y) > 0).length > 0 ? laneCarrierArr?.length > 0 && (
                                                            <ChartsHigh
                                                                chart={"lane"}
                                                                isLoading={true}
                                                                lanePageArr={laneCarrierArr}
                                                                lanePagecontributor={[]}
                                                                lanePagedetractor={[]}
                                                                reloadData={relaodData}
                                                                unitDto={checkedEmissions ? 'tCo2e' : 'g'}

                                                            />
                                                        ) : (
                                                            <>
                                                                <div className="lanesoverview-avg-img-txt">
                                                                    <h5>No Carrier Emissions Found for</h5>
                                                                    <h5>{laneName}</h5>
                                                                </div>
                                                            </>
                                                        )}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </Col>
                            {/* Table for lane emission of a region */}
                            <Col lg="12" md="12">
                                <div className="px-3 table-region mt-3  py-3">
                                    <h6 className="datafrom-txt mb-2">
                                    
                                        Emissions of {laneName} Lane from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}

                                        {/* Graph Represents Regions for Q1 2022 */}
                                    </h6>
                                    <div className="">
                                        <div className="d-lg-flex">
                                            <div className="d-flex align-items-center ">
                                                <div className="green-div">
                                                </div>
                                                <h6 className="mb-0 ps-2">High Performance</h6>
                                            </div>
                                            <div className="d-flex align-items-center ps-lg-4">
                                                <div className="white-div"></div>
                                                <h6 className="mb-0 ps-2">
                                                    Medium Performance
                                                </h6>
                                            </div>
                                            <div className="d-flex align-items-center ps-lg-4">
                                                <div className="red-div"></div>
                                                <h6 className="mb-0 ps-2">
                                                    Low Performance
                                                </h6>
                                            </div>
                                            <div className="d-flex align-items-center ps-lg-4">
                                                <h6 className="mb-0 ps-2">
                                                    Average Emissions Intensity ({laneCarrierTableDto?.data?.average} g)
                                                </h6>
                                            </div>



                                        </div>
                                        <div className="text-end mt-3 search-carrier ">
                                            <div className="d-flex justify-content-end align-items-end">
                                                <Input
                                                    id="exampleSelect"
                                                    name="select"
                                                    type="select"
                                                    className="me-2 mt-2 my-md-0 w-auto pagination-search pb-1"
                                                    value={pageSize}
                                                    onChange={(e) => {
                                                        setPageSize(e.target.value);
                                                        setCurrentPage(1)
                                                        setRelaodData(false);
                                                    }}
                                                >


                                                    {pageSizeList.map((x, index) => (
                                                        <option key={index} value={x}>
                                                            {x}
                                                        </option>
                                                    ))}
                                                    <option value={laneCarrierTableDto?.data?.pagination?.total_count ? laneCarrierTableDto?.data?.pagination?.total_count : 10}>
                                                        All
                                                    </option>
                                                </Input>
                                                <div className="position-relative d-flex justify-content-end">
                                                    <span><img src={Search} alt="ico" /></span>
                                                    <input type="text" placeholder="Search Carrier Name" value={searchCarrier} onChange={handleSearchCarrier} />
                                                </div>
                                            </div>


                                        </div>



                                        {/* <Table responsive className="mt-4 vendor-table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div onClick={() => handleChangeOrder("carrier_name")} className="pointer d-flex align-items-center">
                                                            Carrier Name
                                                            <span ><img className="pointer" src={sortIcon("carrier_name", col_name, order)} alt="ico" /></span>
                                                        </div>

                                                    </th>


                                                    <th >
                                                        <div className="d-flex align-items-center pointer" onClick={() => handleChangeOrder("intensity")}>
                                                            Emissions Intensity

                                                            <span><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>
                                                        </div>
                                                        <h6>
                                                            gCO2e/Ton-Mile of freight
                                                        </h6>
                                                    </th>
                                                    <th className="pointer" onClick={() => handleChangeOrder("shipment_count")}>
                                                        Total Shipments
                                                        <span><img className="pointer" src={sortIcon("shipment_count", col_name, order)} alt="ico" /></span>
                                                    </th>
                                                    <th className="pointer" onClick={() => handleChangeOrder("emissions")}>
                                                        Total Emissions <span><img className="pointer" src={sortIcon("emissions", col_name, order)} alt="ico" /></span><br /><h6>tCo2e</h6>
                                                    </th>

                                                    <th>

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {isLoading ?
                                                    <div className="spinner-border  spinner-ui" role="status">
                                                        <span className="visually-hidden"></span>
                                                    </div>
                                                    : laneCarrierTableDto &&
                                                        laneCarrierTableDto?.data.responseData.length === 0 ?
                                                        <tr><td className="border-0"></td><td className="border-0"></td><td className="d-flex align-items-center justify-content-start border-0">No Data Found</td></tr>
                                                        :
                                                        laneCarrierTableDto?.data.responseData?.map((xx) =>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center text-capitalize">
                                                                        {xx?.carrier_logo ? <div className="logo-icon-name-wrapper"><img
                                                                            src={
                                                                                xx?.carrier_logo
                                                                                && process.env.REACT_APP_BASE_URLFULL +
                                                                                xx?.carrier_logo

                                                                            }
                                                                            alt="logo"
                                                                            className=" profileimgWrap"
                                                                        /></div> : (
                                                                            <div className="logo-icon-name-wrapper">
                                                                                <span className="logo-icon-name">{
                                                                                    xx?.carrier_name.substring(0, 2)
                                                                                }</span>
                                                                            </div>

                                                                        )}

                                                                        {xx?.carrier_name}





                                                                    </div>
                                                                </td>



                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="red-div me-2" style={{ backgroundColor: xx?.color }}>
                                                                        </div>
                                                                        {xx?.intensity?.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {xx?.shipment_count?.toLocaleString("en-US")}
                                                                </td>
                                                                <td>

                                                                    {(Math.round(xx?.emissions * 10) / 10)?.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                                                </td>

                                                                <td>
                                                                    <Link to={`/carrier-overview/${xx?.carrier}`}>More</Link>
                                                                </td>
                                                            </tr>)


                                                }
                                            </tbody>
                                        </Table> */}
                                        <div className="static-table static-vendor-table  mt-4">
                                            <div class="tWrap">
                                                <div class="tWrap__head">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <div onClick={() => handleChangeOrder("carrier_name")} className="pointer d-flex align-items-center">
                                                                        Carrier Name
                                                                        <span ><img className="pointer" src={sortIcon("carrier_name", col_name, order)} alt="ico" /></span>
                                                                    </div>

                                                                </th>


                                                                <th >
                                                                    <div className="d-flex align-items-center pointer" onClick={() => handleChangeOrder("intensity")}>
                                                                        Emissions Intensity

                                                                        <span><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>
                                                                    </div>
                                                                    <h6 className="fs-10">
                                                                        gCO2e/Ton-Mile of freight
                                                                    </h6>
                                                                </th>
                                                                <th className="pointer" onClick={() => handleChangeOrder("shipment_count")}>
                                                                    Total Shipments
                                                                    <span><img className="pointer" src={sortIcon("shipment_count", col_name, order)} alt="ico" /></span>
                                                                </th>
                                                                <th className="pointer" onClick={() => handleChangeOrder("emissions")}>
                                                                    Total Emissions <span><img className="pointer" src={sortIcon("emissions", col_name, order)} alt="ico" /></span><br /><h6 className="fs-10">tCo2e</h6>
                                                                </th>

                                                                <th>

                                                                </th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div> 
                                                <div class="tWrap__body">
                                                    <table>
                                                        <tbody>
                                                            {isLoading ?
                                                                <div className="spinner-border  spinner-ui" role="status">
                                                                    <span className="visually-hidden"></span>
                                                                </div>
                                                                : laneCarrierTableDto &&
                                                                    laneCarrierTableDto?.data.responseData.length === 0 ?
                                                                    <tr><td className="border-0"></td><td className="border-0"></td><td className="d-flex align-items-center justify-content-start border-0">No Data Found</td></tr>
                                                                    :
                                                                    laneCarrierTableDto?.data.responseData?.map((xx) =>
                                                                        <tr onClick={()=>navigate(`/carrier-overview/${xx?.["carrier"]}`)} className="m-cursor">
                                                                            <td>
                                                                                <div className="d-flex align-items-center text-capitalize">
                                                                                    {xx?.carrier_logo ? <div className="logo-icon-name-wrapper"><img
                                                                                        src={
                                                                                            xx?.carrier_logo
                                                                                            && process.env.REACT_APP_BASE_URLFULL +
                                                                                            xx?.carrier_logo

                                                                                        }
                                                                                        alt="logo"
                                                                                        className=" profileimgWrap"
                                                                                    /></div> : (
                                                                                        <div className="logo-icon-name-wrapper">
                                                                                            <span className="logo-icon-name">{
                                                                                                xx?.carrier_name.substring(0, 2)
                                                                                            }</span>
                                                                                        </div>

                                                                                    )}

                                                                                    {xx?.carrier_name}





                                                                                </div>
                                                                            </td>



                                                                            <td>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="red-div me-2" style={{ backgroundColor: xx?.color }}>
                                                                                    </div>
                                                                                    {xx?.intensity?.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                {xx?.shipment_count?.toLocaleString("en-US")}
                                                                            </td>
                                                                            <td>

                                                                                {(Math.round(xx?.emissions * 10) / 10)?.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                                                            </td>

                                                                            <td>
                                                                                <Link to={`/carrier-overview/${xx?.carrier}/${laneName}`}>More</Link>
                                                                            </td>
                                                                        </tr>)


                                                            }
                                                        </tbody>
                                                    </table>
                                                </div> 
                                            </div>
                                        </div>

                                        <div className="mt-0 lane-pagination d-flex justify-content-end">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination mb-0">
                                                    <Pagination
                                                        className="pagination-bar"
                                                        currentPage={currentPage}
                                                        totalCount={laneCarrierTableDto?.data?.pagination?.total_count ? laneCarrierTableDto?.data?.pagination?.total_count : 1}
                                                        pageSize={pageSize}
                                                        onPageChange={page => { setCurrentPage(page); setRelaodData(false); }}
                                                    />

                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                            {/* map */}
                            <Col sm="12">
                                <div className="mt-3 inner-data-region p-3">
                                    <div className="emi-inten">
                                        <h4 className="fw-semibold mb-4">
                                        {laneName}  Lane En-Route
                                        </h4>
                                        <div>
                                            {getLaneOverDetailsEmissionData?.data?.source &&
                                                <GoogleMapView reloadData={true} origin={getLaneOverDetailsEmissionData?.data?.source || ''} destination={getLaneOverDetailsEmissionData?.data?.destination || ''} />
                                            }
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LanesOverview