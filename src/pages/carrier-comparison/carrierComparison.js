import React, { useEffect, useState, useRef } from "react";
import "../regional/regional.scss";
import "../substainable/substainable.scss"
import "../carrier-comparison/carrierComarison.scss"
import "../vendor/vendor.scss";
import Back from "../../assets/images/back.svg";
import Search from "../../assets/images/search-icon.svg";
import { yearList, getQuarters, getQuarterName, getRegionName } from "../../constant/index"
import ChartsHigh from "../../component/ChartsHigh"

import { vendorTableData, getLaneCarrierCompaire, getLaneCarrierList, resertStore } from "../../component/store/vendor/vendorDetailsSlice"
import {
    FormGroup,
    Row,
    Col,
    Input,
} from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { regionShow } from "../../component/store/auth/graph/graphDetailsSlice";
import DateTimeShow from "../../component/main/DateTimeShow";
import { useAuth } from "../../routes/ProtectedRoute";
import { Link } from "react-router-dom";
import Select from 'react-select'
import { setHeaderName } from "../../component/store/auth/authDataSlice";



const CarrierComparison = () => {
    const focusPoint = useRef(null);
    const focusPoint2 = useRef(null);
    let currentYear = new Date().getFullYear();
    let id = localStorage.getItem("regionalLevel")
    const [initLoading, setInitLoading] = useState(false)
    const [regionalLevel, setRegionsLevel] = useState(id);
    const [yearlyData, setYearlyData] = useState(currentYear);
    const [quarterDetails, setQuarterDetails] = useState(1);
    const revenueType = 1
    const [lane1, setLane1] = useState("")
    const [lane2, setLane2] = useState("")
    const [menuIsOpen1, setMenuIsOpen1] = useState(false)
    const [menuIsOpen2, setMenuIsOpen2] = useState(false)


    const { laneCarrierListName, getLaneCarrierCompaireDto, getLaneCarrierCompaireDtoLoading, vendorTableDetails } = useSelector((state) => state.vendor)
    const { regions } = useSelector((state) => state.graphDetails)
    const [relaodData, setRelaodData] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(regionShow(regionalLevel))
    }, [dispatch, regionalLevel])

    useEffect(() => {
        dispatch(resertStore())
        dispatch(setHeaderName("Carrier Comparison"))
        dispatch(getLaneCarrierList())
    }, [dispatch])




    useEffect(() => {
        dispatch(vendorTableData({
            region_id: regionalLevel, year: yearlyData, quarter: quarterDetails, page: 1,
            page_size: 2, order_by: "desc", col_name: "shipment_count", search_name: '', min_range: 60, max_range: 390
        }))
    }, [dispatch])

    const handleSearch = () => {
        if (lane1 !== "" && lane2 !== "") {
            dispatch(getLaneCarrierCompaire({
                region_id: regionalLevel, year: yearlyData, quarter: quarterDetails,
                carrier1: lane1?.value, carrier2: lane2?.value

            }))
        }

    }

    useEffect(() => {
        dispatch(vendorTableData({
            region_id: regionalLevel, year: yearlyData, quarter: quarterDetails, page: 1,
            page_size: 2, order_by: "desc", col_name: "shipment_count", search_name: '', min_range: 60, max_range: 390
        }))
        setInitLoading(true)
    }, [dispatch])

    useEffect(() => {
        console.log("vendorTableDetails", vendorTableDetails)
        if (initLoading && vendorTableDetails) {
            dispatch(getLaneCarrierCompaire({
                region_id: regionalLevel, year: yearlyData, quarter: quarterDetails,
                carrier1: vendorTableDetails?.data?.responseData[0]?.carrier, carrier2: vendorTableDetails?.data?.responseData[1]?.carrier

            }))
            setLane1({
                label: vendorTableDetails?.data?.responseData[0]?.carrier_name,
                value: vendorTableDetails?.data?.responseData[0]?.carrier
            })
            setLane2({
                label: vendorTableDetails?.data?.responseData[1]?.carrier_name,
                value: vendorTableDetails?.data?.responseData[1]?.carrier
            })

            setInitLoading(false)
        }

    }, [dispatch, regionalLevel, yearlyData, quarterDetails, vendorTableDetails])



    //   vendorTableDetails

    const handleReset = () => {
        setLane1("")
        setLane2("")
        setRegionsLevel("")

        setQuarterDetails(1)
        setYearlyData(currentYear)
        dispatch(resertStore())
    }

    const isDisable = () => {
        return lane1 === "" || lane2 === ""
    }

    return (
        <>
            <section className="insight_top_wrapper" onClick={() => {
                setMenuIsOpen1(false)
                setMenuIsOpen2(false)
            }}>
                <div className="regional-wrapper vendor-wrapper substain-screen pb-4">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper substain-screen-wraper">
                            <Row>
                                <Col lg="12">
                                    <div className="regional-heading pb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="small-font">
                                                <Link to="/" className="d-flex align-items-center color-primary"><span className="pe-2"> <img src={Back} alt="ico" /></span>Back</Link>
                                            </div>
                                            <div>
                                                <div className="lates-update">
                                                    <DateTimeShow />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="heading pt-3 pb-2 ">
                                            <h2 className="mb-2 fs-3">Carrier Comparison</h2>
                                        </div>
                                        <Row className="align-items-center">
                                            <Col lg="12" md="12">
                                                <div>
                                                    <FormGroup className="select-box d-lg-flex align-items-center ">
                                                        {useAuth().userdata?.role === 0 && (

                                                            <Input
                                                                id="exampleSelect"
                                                                name="select"
                                                                type="select"
                                                                className="ms-0 mt-2 mt-lg-0"
                                                                value={regionalLevel}
                                                                onChange={(e) => {
                                                                    setRelaodData(false)
                                                                    setRegionsLevel(e.target.value)
                                                                    if (e.target.value === "") {
                                                                        localStorage.removeItem("regionalLevel")
                                                                    }
                                                                    else {
                                                                        localStorage.setItem("regionalLevel", e.target.value)
                                                                    }
                                                                }}
                                                            >
                                                                <option value="">
                                                                    All Regions
                                                                </option>

                                                                {regions?.data?.regions.map((x) =>
                                                                    <option value={x.id} key={x.id}>{x.name} </option>
                                                                )}

                                                            </Input>
                                                        )}

                                                        <Input
                                                            id="exampleSelect"
                                                            name="select"
                                                            type="select"
                                                            className="ms-lg-2 ms-0 mt-2 mt-lg-0"
                                                            value={yearlyData}
                                                            onChange={(e) => {
                                                                setQuarterDetails(1)
                                                                setYearlyData(e.target.value)
                                                            }
                                                            }
                                                        >
                                                            <option value="">
                                                                Yearly
                                                            </option>

                                                            {yearList.map((x, index) => <option key={index} value={x}>{x}</option>)}

                                                        </Input>
                                                        <Input
                                                            id="exampleSelect"
                                                            name="select"
                                                            type="select"
                                                            className="ms-lg-2 ms-0 mt-2 mt-lg-0"
                                                            value={quarterDetails}
                                                            onChange={(e) => setQuarterDetails(e.target.value)}
                                                        >


                                                            {getQuarters(yearlyData).map(i => (
                                                                <option value={i?.value}>{i?.name}</option>
                                                            ))}
                                                        </Input>
                                                        <div className="d-flex">

                                                            <div onClick={(event) => {
                                                                event.stopPropagation();
                                                                focusPoint.current.focus()
                                                                setMenuIsOpen1(!menuIsOpen1)
                                                            }}
                                                                onKeyDown={(event) => {
                                                                    event.stopPropagation();
                                                                    focusPoint.current.focus()
                                                                    setMenuIsOpen1(true)
                                                                }}
                                                                className="search-icon-img">
                                                                <span ><img src={Search} alt="ico" /></span>
                                                                <Select
                                                                    ref={focusPoint}
                                                                    menuIsOpen={menuIsOpen1}
                                                                    className="ms-lg-2 ms-0 mt-2 mt-lg-0 text-capitalize carrire-search-dropdown "
                                                                    value={lane1}
                                                                    onChange={(e) => {
                                                                        setLane1(e)
                                                                    }}
                                                                    placeholder="Carrier 1"
                                                                    isSearchable={true}
                                                                    options={laneCarrierListName?.data?.carrierList?.filter(i => i?.carrier_code !== lane2?.value)?.map((x) => ({ value: x?.carrier_code, label: x?.carrier_name }))} />
                                                            </div>


                                                            <div
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    focusPoint2.current.focus()
                                                                    setMenuIsOpen2(!menuIsOpen2)
                                                                }}
                                                                onKeyDown={(event) => {
                                                                    event.stopPropagation();
                                                                    focusPoint2.current.focus()
                                                                    setMenuIsOpen2(true)
                                                                }}
                                                                className="search-icon-img">
                                                                <span><img src={Search} alt="ico" /></span>
                                                                <Select
                                                                    ref={focusPoint2}
                                                                    menuIsOpen={menuIsOpen2}
                                                                    className="ms-2 mt-2 mt-lg-0 text-capitalize carrire-search-dropdown" value={lane2} onChange={(e) => {
                                                                        setLane2(e)
                                                                    }}
                                                                    placeholder="Carrier 2"
                                                                    isSearchable={true} options={laneCarrierListName?.data?.carrierList?.filter(i => i?.carrier_code !== lane1?.value)?.map((x) => ({ value: x?.carrier_code, label: x?.carrier_name }))} />
                                                            </div>


                                                        </div>
                                                        <div className="ms-lg-2 ms-0 mt-2 mt-lg-0 compare-btn">
                                                            <button type="button" disabled={isDisable()} className={`${isDisable() ? "disabled-button" : ""}`} onClick={() => handleSearch()} >Compare</button>
                                                        </div>
                                                        <div className="ms-lg-2 ms-0 mt-2 mt-lg-0 compare-btn">
                                                            <button type="button" onClick={() => handleReset()} >Reset</button>
                                                        </div>

                                                    </FormGroup>
                                                </div>
                                            </Col>

                                        </Row>
                                    </div>
                                </Col>
                            </Row>

                            <div className="mt-2">
                                <Row>
                                    <Col lg="6" className="mt-3">
                                        <div className="maps-subs company-level p-3 h-100 position-relative">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h6 className="datafrom-txt mb-2">
                                                        Emissions Intensity Comparison of {getRegionName(regions, regionalLevel)} for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                                                    </h6>
                                                    <div className="d-md-block d-lg-flex d-flex align-items-end justify-content-between mb-2">
                                                        <h3 className="mb-0 fw-semibold ">Emissions Intensity
                                                            <span className="fs-12"> (gCO2e/Ton-Mile)</span>

                                                        </h3>
                                                    </div>
                                                </div>
                                                
                                            </div>


                                            {!getLaneCarrierCompaireDtoLoading ? (isDisable() || !getLaneCarrierCompaireDto) && (
                                                <div className="my-5 text-center">
                                                    <h5 className="fs-18">Please select carriers to compare Emissions Intensity</h5>
                                                </div>

                                            ) : ''}
                                            {
                                                getLaneCarrierCompaireDtoLoading ? <div className="graph-loader">

                                                    <div class="spinner-border position-absolute spinner-ui" role="status">
                                                        <span class="visually-hidden"></span>
                                                    </div>
                                                </div>
                                                    : getLaneCarrierCompaireDto?.data?.length > 0 && <ChartsHigh isLoading={getLaneCarrierCompaireDtoLoading} reloadData={relaodData} chart="optionCarrierComparison" options={getLaneCarrierCompaireDto?.data[0]} revenueType={revenueType} dataytpe="intensity"
                                                        unitValue=""
                                                    />

                                            }
                                             {<div className="d-flex justify-content-center">
                                                    <div className=" mt-0 border-0">
                                                        <div className="d-flex justify-content-between">
                                                            {getLaneCarrierCompaireDto?.data[0]?.dataset?.map((i, index) => (i?.carrier_logo ? <div className="logo-icon-name-wrapper carrier-comparisionImg w-auto d-flex align-items-center border-0 border-right-green me-0 pb-2 pe-4 pt-0">
                                                                <div className={`${index === 0 ? "bgSecond" : "bgPrimary"}`} />
                                                                <img
                                                                    src={
                                                                        i?.carrier_logo
                                                                        && process.env.REACT_APP_BASE_URLFULL +
                                                                        i?.carrier_logo

                                                                    }
                                                                    alt="logo"
                                                                    className=" profileimgWrap"
                                                                /></div> : (

                                                                <div className="logo-icon-name-wrapper border-0 border-right-green me-0 d-flex align-items-center p-2">
                                                                    <div className={`${index === 0 ? "bgSecond" : "bgPrimary"}`} />
                                                                    <span className="logo-icon-name m-0">{
                                                                        i?.carrier?.substring(0, 2)
                                                                    }</span>
                                                                </div>

                                                            )))}

                                                        </div>
                                                    </div>
                                                </div> }


                                        </div>
                                    </Col>
                                    <Col lg="6" className="mt-3">
                                        <div className="maps-subs company-level p-3 h-100 position-relative">
                                            <div className="d-flex justify-content-between">


                                                <div>
                                                    <h6 className="datafrom-txt mb-2">
                                                        Total Shipments Comparison of {getRegionName(regions, regionalLevel)} for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                                                    </h6>
                                                    <div className="d-md-block d-lg-flex justify-content-between mb-2">
                                                        <h3 className="mb-0 fw-semibold text-capitalize">Total Shipments</h3>

                                                    </div>
                                                </div>


                                                
                                            </div>
                                            {!getLaneCarrierCompaireDtoLoading ? (isDisable() || !getLaneCarrierCompaireDto) && (

                                                <div className="my-5 text-center">
                                                    <h5 className="fs-18">Please select carriers to compare Total Shipments</h5>
                                                </div>
                                            ) : ''}
                                            {
                                                getLaneCarrierCompaireDtoLoading ? <div className="graph-loader">

                                                    <div class="spinner-border position-absolute spinner-ui" role="status">
                                                        <span class="visually-hidden"></span>
                                                    </div>
                                                </div>
                                                    : getLaneCarrierCompaireDto?.data?.length > 0 && <ChartsHigh isLoading={getLaneCarrierCompaireDtoLoading} reloadData={relaodData} chart="optionCarrierComparison" options={getLaneCarrierCompaireDto?.data[0]} revenueType={revenueType} dataytpe="shipments"
                                                        unitValue="" />
                                            }
                                             {<div className="d-flex justify-content-center">
                                                    <div className=" mt-0 border-0">
                                                        <div className="d-flex justify-content-between">
                                                            {getLaneCarrierCompaireDto?.data[0]?.dataset?.map((i, index) => (i?.carrier_logo ? <div className="logo-icon-name-wrapper carrier-comparisionImg w-auto d-flex align-items-center border-0 border-right-green me-0 pb-2 pe-4 pt-0">
                                                                <div className={`${index === 0 ? "bgSecond" : "bgPrimary"}`} />
                                                                <img
                                                                    src={
                                                                        i?.carrier_logo
                                                                        && process.env.REACT_APP_BASE_URLFULL +
                                                                        i?.carrier_logo

                                                                    }
                                                                    alt="logo"
                                                                    className=" profileimgWrap"
                                                                /></div> : (

                                                                <div className="logo-icon-name-wrapper border-0 border-right-green me-0 d-flex align-items-center p-2">
                                                                    <div className={`${index === 0 ? "bgSecond" : "bgPrimary"}`} />
                                                                    <span className="logo-icon-name m-0">{
                                                                        i?.carrier?.substring(0, 2)
                                                                    }</span>
                                                                </div>

                                                            )))}

                                                        </div>
                                                    </div>
                                                </div> }
                                        </div>
                                    </Col>
                                    <Col lg="6" className="mt-3">
                                        <div className="maps-subs company-level p-3 h-100 position-relative">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h6 className="datafrom-txt mb-2">
                                                        Total Emissions Comparison of {getRegionName(regions, regionalLevel)} for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                                                    </h6>
                                                    <div className="d-md-block d-lg-flex d-flex align-items-end justify-content-between mb-2">
                                                        <h3 className="mb-0 fw-semibold">Total Emissions
                                                            <span className="fs-12"> (tCo2e)</span>
                                                        </h3>
                                                    </div>
                                                </div>

                                               
                                            </div>

                                            {!getLaneCarrierCompaireDtoLoading ? (isDisable() || !getLaneCarrierCompaireDto) && (

                                                <div className="my-5 text-center">
                                                    <h5 className="fs-18">Please select carriers to compare Total Emissions</h5>
                                                </div>
                                            ) : ''}
                                            {
                                                getLaneCarrierCompaireDtoLoading ? <div className="graph-loader">

                                                    <div class="spinner-border position-absolute spinner-ui" role="status">
                                                        <span class="visually-hidden"></span>
                                                    </div>
                                                </div>
                                                    : getLaneCarrierCompaireDto?.data?.length > 0 && <ChartsHigh isLoading={getLaneCarrierCompaireDtoLoading} reloadData={relaodData} chart="optionCarrierComparison" options={getLaneCarrierCompaireDto?.data[0]} revenueType={revenueType} dataytpe="emission"
                                                        unitValue="" />

                                            }
                                             {<div className="d-flex justify-content-center">
                                                    <div className=" mt-0 border-0">
                                                        <div className="d-flex justify-content-between">
                                                            {getLaneCarrierCompaireDto?.data[0]?.dataset?.map((i, index) => (i?.carrier_logo ? <div className="logo-icon-name-wrapper carrier-comparisionImg w-auto d-flex align-items-center border-0 border-right-green me-0 pb-2 pe-4 pt-0">
                                                                <div className={`${index === 0 ? "bgSecond" : "bgPrimary"}`} />
                                                                <img
                                                                    src={
                                                                        i?.carrier_logo
                                                                        && process.env.REACT_APP_BASE_URLFULL +
                                                                        i?.carrier_logo

                                                                    }
                                                                    alt="logo"
                                                                    className=" profileimgWrap"
                                                                /></div> : (

                                                                <div className="logo-icon-name-wrapper border-0 border-right-green me-0 d-flex align-items-center p-2">
                                                                    <div className={`${index === 0 ? "bgSecond" : "bgPrimary"}`} />
                                                                    <span className="logo-icon-name m-0">{
                                                                        i?.carrier?.substring(0, 2)
                                                                    }</span>
                                                                </div>

                                                            )))}

                                                        </div>
                                                    </div>
                                                </div> }

                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default CarrierComparison