import React, { useEffect, useState } from "react";
import "../facility/facility.scss"
import "../regional/regional.scss"
import Back from "../../assets/images/back.svg";
import ExportButton from "../../component/export-button";
import { useNavigate, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import {
    FormGroup,
    Row,
    Col,
    Input,
    Table,
} from 'reactstrap';
import { setHeaderName } from "../../component/store/auth/authDataSlice";
import ChartsHigh from "../../component/ChartsHigh";
import { facilityTableData, facilityGraphData } from "../../component/store/facilty/facilityDetailsSlice";
import { regionShow } from "../../component/store/auth/graph/graphDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import DateTimeShow from "../../component/main/DateTimeShow";
import { useAuth } from "../../routes/ProtectedRoute";
import { yearList, sortIcon, getQuarters, getGraphDataHorizontal, getQuarterName } from "../../constant/index"

const Facility = () => {
    let id = localStorage.getItem("regionalLevel")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(true);
    const currentYear = new Date().getFullYear();
    const [relaodData, setRelaodData] = useState(true);

    const [yearlyData, setYearlyData] = useState(currentYear);
    const [regionalLevel, setRegionalLevel] = useState(id ? id : "");
    const [quarterDetails, setQuarterDetails] = useState(1);
    const facilityLevel = ""

    const { facilityTableDetails, facilityGraphDetails, facilityGraphDetailLoading, facilityTableDetailLoading } = useSelector((state) => state.facility)

    const { regions } = useSelector((state) => state.graphDetails)
    const [order, setOrder] = useState("desc");
    const [col_name, setCol_name] = useState("emission");

    const handleChangeOrder = (choose_Col_name) => {
        setOrder(order === "desc" ? "asc" : "desc")
        setCol_name(choose_Col_name)
    }

    useEffect(() => {
        dispatch(regionShow(facilityLevel))
        dispatch(setHeaderName("Segmentation By Facility"))
    }, [dispatch])
    

    useEffect(() => {
        if (yearlyData) {
            dispatch(facilityTableData({
                region_id: regionalLevel, ffacility_id: facilityLevel, year: yearlyData, quarter: quarterDetails, order_by: order,
                col_name: col_name
            }))
        }
    }, [facilityLevel, dispatch, yearlyData, quarterDetails, regionalLevel, order, col_name])

    useEffect(() => {
        if (yearlyData) {
            dispatch(facilityGraphData({
                region_id: regionalLevel, ffacility_id: facilityLevel, year: yearlyData, quarter: quarterDetails,
                toggel_data: checked ? 1 : 0,

            }))
        }
    }, [facilityLevel, dispatch, yearlyData, quarterDetails, regionalLevel, checked])

    let regionPageArr = getGraphDataHorizontal(facilityGraphDetails)
    return (
        <>
            <section className="insight_top_wrapper">
                <div className="regional-wrapper">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper">

                            <Row>
                                <Col lg="12">
                                    <div className="regional-heading pb-3">
                                        <div className="d-sm-flex justify-content-between align-items-center">
                                            <div className="small-font">
                                                <Link to="/" className="d-flex align-items-center color-primary"><span className="pe-2"> <img src={Back} alt="icon" /></span>Back</Link>
                                            </div>
                                            <div>
                                                <div className="lates-update">
                                                    <DateTimeShow />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="heading py-3">
                                            <h2 className="mb-0 fs-3">Facilities CO2 Emissions Comparison</h2>
                                        </div>
                                        <Row className="align-items-center">

                                            <Col lg="9" md="6">
                                                <div className="dropdown-comp d-flex justify-content-between align-items-center">
                                                    <FormGroup className="select-box d-sm-flex">
                                                        {useAuth().userdata?.role === 0 && (
                                                            <Input
                                                                id="exampleSelect"
                                                                name="select"
                                                                type="select"
                                                                value={regionalLevel}
                                                                onChange={(e) => {
                                                                    setRegionalLevel(e.target.value);
                                                                    setRelaodData(false);
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

                                                                {regions?.data?.length !== 0 &&
                                                                    regions?.data?.regions.map((x) => (
                                                                        <option value={x.id} key={x.id}>
                                                                            {x.name}
                                                                        </option>
                                                                    ))}

                                                            </Input>
                                                        )}
                                                        <Input
                                                            id="exampleSelect"
                                                            name="select"
                                                            type="select"
                                                            className="ms-2 my-2 my-md-0"
                                                            value={yearlyData}
                                                            onChange={(e) => {
                                                                setYearlyData(e.target.value);
                                                                setQuarterDetails(1)
                                                                setRelaodData(false);
                                                            }}
                                                        >


                                                            {yearList.map((x, index) => (
                                                                <option key={index} value={x}>
                                                                    {x}
                                                                </option>
                                                            ))}
                                                        </Input>
                                                        <Input
                                                            id="exampleSelect"
                                                            name="select"
                                                            type="select"
                                                            className="ms-2 quater-dropdown"
                                                            value={quarterDetails}
                                                            onChange={(e) => {
                                                                setQuarterDetails(e.target.value);
                                                                setRelaodData(false);
                                                            }}
                                                        >
                                                            {getQuarters(yearlyData).map(i => (
                                                                <option value={i?.value}>{i?.name}</option>
                                                            ))}

                                                        </Input>
                                                    </FormGroup>
                                                </div>
                                            </Col>

                                            <Col lg="3" md="6">
                                                <div className="dropdown-comp d-flex justify-content-end align-items-center">
                                                    <ExportButton />
                                                </div>

                                            </Col>

                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row>

                                <Col lg="5" md="12" className="mt-3">
                                    <div className="inner-data-region region-graph-outer  h-100 px-2 py-3">
                                        <h6 className="datafrom-txt mb-3">
                                            Facility-Wise <span>{checked ? "Total Emissions" : "Emissions Intensity"}</span> of {regionalLevel !== "" ? `${regions?.data?.regions.filter((e) => { return e.id === Number.parseInt(regionalLevel) })[0]?.name} Region` || "" : "All Regions"}   for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                                        </h6>
                                        <div className="emi-inten d-flex pb-5 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <h6 className="fw-semibold mb-0 fs-14">
                                                    Emissions Intensity
                                                </h6>
                                                <div className="toggle-switch">

                                                    <Form>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            label="Total Emissions"
                                                            className="mb-0"
                                                            defaultChecked={checked}
                                                            onChange={() => {
                                                                setChecked(!checked)
                                                                setRelaodData(false);

                                                            }}
                                                        />
                                                    </Form>
                                                </div>
                                            </div>

                                            <div className="ps-4">
                                                <div className="d-flex align-items-center mb-1 detractor">
                                                    <div className="red-div">
                                                    </div>
                                                    <h6 className="ps-2 mb-0">Detractor</h6>
                                                </div>
                                                <div className="d-flex align-items-center detractor">
                                                    <div className="darkgreen-div">
                                                    </div>
                                                    <h6 className="ps-2 mb-0">Contributor</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="avg-region text-center x-axis-hide">
                                            <h6>Average of all facilities
                                                (
                                                {facilityGraphDetails?.data?.average?.toLocaleString(
                                                    "en-US",
                                                    { minimumFractionDigits: 1 }
                                                )}{" "}
                                                {facilityGraphDetails?.data?.unit})

                                            </h6>
                                            {/* <div className="region-namevalues facility-names">
                                                {regionPageArr?.map(i => (
                                                    <h6 className="region-name">
                                                        {i?.name}
                                                    </h6>
                                                ))}
                                            </div> */}
                                            <div className="avg-img">

                                                {facilityGraphDetailLoading ? <div className="graph-loader">

                                                    <div class="spinner-border  spinner-ui" role="status">
                                                        <span class="visually-hidden"></span>
                                                    </div>
                                                </div> :
                                                    <ChartsHigh
                                                        chart={"region"}
                                                        isLoading={true}
                                                        regionPageArr={regionPageArr}
                                                        regionPagecontributor={[]}
                                                        regionPagedetractor={[]}
                                                        reloadData={relaodData}
                                                        unitDto={facilityGraphDetails?.data?.unit}
                                                    />

                                                }
                                            </div>
                                        </div>

                                    </div>
                                    <div className="data-sources  pt-2 pb-4">
                                        <a target="_blank" rel="noreferrer" href="https://smartfreightcentre.org/en/about-sfc/about-us/" className="d-flex align-items-center"><span className="glec-txt me-1">GLEC</span>See data sources and methodologies</a>
                                    </div>
                                </Col>

                                <Col lg="7" md="12" className="mt-3 px-2">

                                    <div className="table-region py-3 px-2 facility-table h-100">
                                        <h6 className="datafrom-txt mb-2">
                                            {checked ? 'Total Emissions' : 'Emissions Intensity'} of {regionalLevel === "" ? "All Regions" : `${regions?.data?.regions.filter((e) => { return e.id === Number.parseInt(regionalLevel) })[0]?.name} Region` || ""} Facility for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                                        </h6>
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
                                        </div>

                                        {/* <Table responsive className="mt-3 vendor-table facility-table">
                                            <thead>
                                                <tr>

                                                    <th>
                                                        <div className="d-flex align-items-center"
                                                        >
                                                            Facility
                                                        </div>

                                                    </th>

                                                    <th className="pointer">
                                                        <div className="d-flex align-items-center" onClick={() => handleChangeOrder("intensity")}>
                                                            Emissions Intensity
                                                            <span ><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>
                                                        </div>
                                                        <h6>
                                                            gCO2e/Ton-Mile<br /> of freight
                                                        </h6>
                                                    </th>
                                                    <th className="pointer">
                                                        <div className="d-flex align-items-center" onClick={() => handleChangeOrder("shipments")}>
                                                            Total Shipments
                                                            <span ><img className="pointer" src={sortIcon("shipments", col_name, order)} alt="ico" /></span>
                                                        </div>

                                                    </th>
                                                    <th className="pointer">
                                                        <div className="d-flex align-items-center" onClick={() => handleChangeOrder("emission")}>
                                                            Total Emissions
                                                            <span ><img className="pointer" src={sortIcon("emission", col_name, order)} alt="ico" /></span>
                                                        </div>
                                                        <h6>
                                                            tCo2e
                                                        </h6>
                                                    </th>
                                                   
                                                    <th>

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {facilityTableDetailLoading ? <div class="spinner-border  spinner-ui" role="status">
                                                    <span class="visually-hidden"></span>
                                                </div>
                                                    : facilityTableDetails?.data?.map((xx) =>

                                                        <tr>
                                                            <td>{xx?.['Facility.name']}</td>

                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <div style={{ backgroundColor: `${xx?.intensity?.color}` }} className="red-div me-2"></div>{xx?.intensity?.value?.toLocaleString("en-US", {
                                                                        minimumFractionDigits: 1,
                                                                    })}</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="red-div me-2">
                                                                    </div>
                                                                    {xx.shipments?.toLocaleString("en-US")}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <div style={{ backgroundColor: `${xx?.emission?.color}` }} className="red-div me-2">
                                                                    </div>{xx?.emission?.value.round(2)?.toLocaleString("en-US", {
                                                                        minimumFractionDigits: 2,
                                                                    })}</div>
                                                            </td>
                                                            <td>
                                                                <Link to={`/facility-overview/${xx?.['Facility.id']}`}>More</Link>
                                                            </td>
                                                        </tr>)
                                                }
                                            </tbody>
                                        </Table> */}
                                        <div className="static-table  mt-4">
                                            <div class="tWrap">
                                                <div class="tWrap__head">
                                                    <table>
                                                        <thead>
                                                            <tr>

                                                                <th>
                                                                    <div className="d-flex align-items-center"
                                                                    >
                                                                        Facility
                                                                    </div>

                                                                </th>

                                                                <th className="pointer">
                                                                    <div className="d-flex align-items-center" onClick={() => handleChangeOrder("intensity")}>
                                                                        Emissions Intensity
                                                                        <span ><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>
                                                                    </div>
                                                                    <h6 className="fs-10">
                                                                        gCO2e/Ton-Mile<br /> of freight
                                                                    </h6>
                                                                </th>
                                                                <th className="pointer">
                                                                    <div className="d-flex align-items-center" onClick={() => handleChangeOrder("shipments")}>
                                                                        Total Shipments
                                                                        <span ><img className="pointer" src={sortIcon("shipments", col_name, order)} alt="ico" /></span>
                                                                    </div>

                                                                </th>
                                                                <th className="pointer">
                                                                    <div className="d-flex align-items-center" onClick={() => handleChangeOrder("emission")}>
                                                                        Total Emissions
                                                                        <span ><img className="pointer" src={sortIcon("emission", col_name, order)} alt="ico" /></span>
                                                                    </div>
                                                                    <h6 className="fs-10">
                                                                        tCo2e
                                                                    </h6>
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
                                                        {facilityTableDetailLoading ? <div class="spinner-border  spinner-ui" role="status">
                                                            <span class="visually-hidden"></span>
                                                        </div>
                                                            : facilityTableDetails?.data?.map((xx) =>

                                                                <tr  onClick={()=>navigate(`/facility-overview/${xx?.["Facility.id"]}`)} className="m-cursor">
                                                                    <td>{xx?.['Facility.name']}</td>

                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <div style={{ backgroundColor: `${xx?.intensity?.color}` }} className="red-div me-2"></div>{xx?.intensity?.value?.toLocaleString("en-US", {
                                                                                minimumFractionDigits: 1,
                                                                            })}</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="red-div me-2">
                                                                            </div>
                                                                            {xx.shipments?.toLocaleString("en-US")}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <div style={{ backgroundColor: `${xx?.emission?.color}` }} className="red-div me-2">
                                                                            </div>{xx?.emission?.value.round(2)?.toLocaleString("en-US", {
                                                                                minimumFractionDigits: 2,
                                                                            })}</div>
                                                                    </td>
                                                                    <td>
                                                                        <Link to={`/facility-overview/${xx?.['Facility.id']}`}>More</Link>
                                                                    </td>
                                                                </tr>)
                                                        }
                                                        </tbody>
                                                    </table>
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


export default Facility