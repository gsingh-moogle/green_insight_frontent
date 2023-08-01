import React, { useEffect, useRef, useState } from "react";
import "../regional/regional.scss";
import "../vendor/vendor.scss";
import Back from "../../assets/images/back.svg";
import Search from "../../assets/images/searchcarrier.svg"
import Pagination from '../lanes/pagination/Pagination';
import { yearList, pageSizeList, sortIcon, getQuarters, getQuarterName, getRegionName } from "../../constant/index"
import { Range, getTrackBackground } from "react-range"
import { vendorGraphData, vendorTableData } from "../../component/store/vendor/vendorDetailsSlice"
import {
    FormGroup,
    Row,
    Col,
    Input,
} from 'reactstrap';

import { useDispatch, useSelector } from "react-redux";
import BubbleHighChart from "../../component/BubbleHighChart";
import { regionShow } from "../../component/store/auth/graph/graphDetailsSlice";
import DateTimeShow from "../../component/main/DateTimeShow";
import { setHeaderName } from "../../component/store/auth/authDataSlice";
import { useAuth } from "../../routes/ProtectedRoute";
import { useNavigate, Link } from "react-router-dom";

const Vendor = () => {
    let id = JSON.parse(localStorage.getItem("regionalLevel"));
    let currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    var quarter = Math.floor((new Date().getMonth() + 3) / 3);

    const [regionalLevel, setRegionsLevel] = useState(id ? id : "");
    const [yearlyData, setYearlyData] = useState(currentYear);

    const [quarterDetails, setQuarterDetails] = useState(1);

    const { isLoading, vendorTableDetails, vendorGraphDetails } = useSelector((state) => state.vendor)
    const { regions } = useSelector((state) => state.graphDetails)
    const [currentPage, setCurrentPage] = useState(1);
    const [relaodData, setRelaodData] = useState(true);
    const [searchCarrier, setSearchCarrier] = useState("");
    const [order, setOrder] = useState("desc");
    const [col_name, setCol_name] = useState("intensity");
    const [pageSize, setPageSize] = useState(20);
    const [regionName, setRegionName] = useState("")
    const [values, setValues] = React.useState([60, 390]);
    const STEP = 1;
    const MIN = 60;
    const MAX = 390;
    const rtl = false;

    useEffect(() => {
        if (regionalLevel) {
            regions?.data?.length !== 0 && regions?.data?.regions.map((x) => {
                x.id === Number.parseInt(regionalLevel) && setRegionName(x.name)
                return true
            }
            )
        }
    }, [regionalLevel, regions])



    const fetchTableData = (search = "") => {
        if (searchCarrier.length >= 3 || searchCarrier.length === 0) {

            dispatch(vendorTableData({
                region_id: regionalLevel, year: yearlyData, quarter: quarterDetails, page: currentPage,
                page_size: pageSize, order_by: order, col_name: col_name, search_name: searchCarrier?.length >= 3 ? searchCarrier : '', min_range: values[0], max_range: values[1]
            }))
        }
    }

    const fetchGraphData = (search = "") => {
        if (searchCarrier.length >= 3 || searchCarrier.length === 0) {

            dispatch(vendorGraphData({
                region_id: regionalLevel, year: yearlyData, quarter: quarterDetails, page: currentPage,
                page_size: pageSize, order_by: order, col_name: col_name, search_name: searchCarrier?.length >= 3 ? searchCarrier : '', min_range: values[0], max_range: values[1]
            }))
        }
    }


    const handleSearchCarrier = async (e) => {
        await setSearchCarrier(e.target.value)
        if (e.target.value.length >= 3 || e.target.value.length === 0) {
            setCurrentPage(1)

        }
    };



    const handleChangeOrder = (choose_Col_name) => {
        setOrder(order === "desc" ? "asc" : "desc")
        setCol_name(choose_Col_name)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(regionShow(regionalLevel))
    }, [dispatch, regionalLevel])

    useEffect(() => {
        fetchTableData()
        fetchGraphData()

    }, [dispatch, searchCarrier, yearlyData, quarterDetails, regionalLevel, currentPage, order, col_name, pageSize])


    const setRegoinDetail = (id) => {
        setRegionsLevel(id)

        setRegionName(regions?.data?.regions.filter((e) => { return e.id === Number.parseInt(id) })[0]?.name)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(setHeaderName("Segmentation By Carrier"))
    }, [dispatch])

    return (
        <>
            <section className="insight_top_wrapper">
                <div className="regional-wrapper vendor-wrapper">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper">
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
                                        <div className="heading py-3">
                                            <h2 className="mb-2 fs-3">Carriers CO2 Emissions Comparison</h2>
                                        </div>
                                        <div className="d-lg-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <FormGroup className="select-box d-sm-flex">
                                                    {useAuth().userdata?.role === 0 && (

                                                        <Input
                                                            id="exampleSelect"
                                                            name="select"
                                                            type="select"
                                                            className="ms-2 mt-2"
                                                            value={regionalLevel}
                                                            onChange={(e) => {
                                                                setCurrentPage(1)
                                                                setRegoinDetail(e.target.value)
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

                                                            {regions?.data?.length !== 0 && regions?.data?.regions.map((x, index) =>
                                                                <option value={x.id} key={x.id}>{x.name} </option>
                                                            )}

                                                        </Input>
                                                    )}

                                                    <Input
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                        className="ms-2 mt-2"
                                                        value={yearlyData}
                                                        onChange={(e) => {
                                                            setQuarterDetails(1)
                                                            setYearlyData(e.target.value)
                                                        }
                                                        }
                                                    >


                                                        {yearList.map((x, index) => <option key={index} value={x}>{x}</option>)}

                                                    </Input>
                                                    <Input
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                        className="mx-2 mt-2 quater-dropdown"
                                                        value={quarterDetails}
                                                        onChange={(e) => setQuarterDetails(e.target.value)}
                                                    >


                                                        {getQuarters(yearlyData).map(i => (
                                                            <option value={i?.value}>{i?.name}</option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>

                                            </div>
                                            <div className="">
                                                <div className="d-flex align-items-center me-4 mt-2">
                                                    <h6 className="mb-0 ms-0 ms-lg-4 ps-3 color-primary fs-14 fw-semibold me-4">Emissions Intensity Range Selector</h6>
                                                    <Range
                                                        values={values}
                                                        step={STEP}
                                                        min={MIN}
                                                        max={MAX}
                                                        rtl={rtl}
                                                        onChange={(values) => setValues(values)}
                                                        onFinalChange={() => {
                                                            fetchTableData()
                                                            fetchGraphData()
                                                        }}
                                                        renderTrack={({ props, children }) => (
                                                            <div
                                                                onMouseDown={props.onMouseDown}
                                                                onTouchStart={props.onTouchStart}
                                                                style={{
                                                                    ...props.style,
                                                                    height: '36px',
                                                                    display: 'flex',
                                                                    width: '350px',
                                                                    maxWidth: '350px',
                                                                }}
                                                            >
                                                                <div
                                                                    ref={props.ref}
                                                                    style={{
                                                                        height: '8px',
                                                                        width: '100%',
                                                                        borderRadius: '4px',
                                                                        background: getTrackBackground({
                                                                            values,
                                                                            colors: ['#ccc', '#d8856b', '#ccc'],
                                                                            min: MIN,
                                                                            max: MAX,
                                                                            rtl
                                                                        }),
                                                                        alignSelf: 'center'
                                                                    }}
                                                                >
                                                                    {children}
                                                                </div>
                                                            </div>
                                                        )}
                                                        renderThumb={({ index, props, isDragged }) => (
                                                            <div
                                                                {...props}
                                                                style={{
                                                                    ...props.style,
                                                                    height: '35px',
                                                                    width: '35px',
                                                                    borderRadius: '50px',
                                                                    backgroundColor: '#215154',
                                                                    border: 'transparent',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '0px',
                                                                        color: '#fff',
                                                                        fontWeight: 'bold',
                                                                        fontSize: '12px',
                                                                        fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                                                        padding: '4px',
                                                                        height: '40px',
                                                                        width: '40px',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        borderRadius: '50px',
                                                                        backgroundColor: '#215154',

                                                                    }}
                                                                >
                                                                    {values[index].toFixed(1)}
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        height: '8px',
                                                                        width: '5px',
                                                                        backgroundColor: isDragged ? '#215154' : '#CCC'
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="12" md="12">
                                    <div className=" vendor-emission-graph mt-3 p-3 h-100 x-axis-hide1">
                                        <h6 className="datafrom-txt mb-2">
                                            Emissions of {getRegionName(regionName, regionalLevel, true)} Carrier for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                                        </h6>
                                        <div className="emi-inten d-flex justify-content-between pb-4">
                                            <div>

                                                <div className="d-flex vendor-emsn">
                                                    <h4 className="fw-bold">Carrier Emissions</h4>


                                                </div>
                                                <div className="avg-img">

                                                </div>
                                            </div>



                                            <div className="ps-4">
                                                <div className="d-flex align-items-center mb-1 detractor">
                                                    <div className="red-div">
                                                    </div>
                                                    <h6 className="ps-2 mb-0">Highest priority</h6>
                                                </div>
                                                <div className="d-flex align-items-center detractor mb-1">
                                                    <div className="white-div">
                                                    </div>
                                                    <h6 className="ps-2 mb-0">Medium priority</h6>
                                                </div>
                                                <div className="d-flex align-items-center detractor mb-1">
                                                    <div className="darkgreen-div">
                                                    </div>
                                                    <h6 className="ps-2 mb-0">Low priority</h6>
                                                </div>
                                                <div className="d-flex align-items-center detractor mb-1">
                                                    <div className="grey-div">
                                                    </div>
                                                    <h6 className="ps-2 mb-0">Shipment volume</h6>
                                                </div>
                                            </div>

                                        </div>
                                        <BubbleHighChart relaodData={relaodData} chart={"vendor"} options={vendorGraphDetails?.data ? vendorGraphDetails?.data?.responseData : []} />
                                    </div>


                                </Col>
                            </Row>
                            <div className="data-sources  pt-2 pb-4 mt-4">
                                <a target="_blank" rel="noreferrer" href="https://smartfreightcentre.org/en/about-sfc/about-us/" className="d-flex align-items-center"><span className="glec-txt me-1">GLEC</span>See data sources and methodologies</a>
                            </div>
                            <Row>
                                <Col lg="12" md="12">
                                    <div className="px-3 table-region mt-3  py-3">
                                        <h6 className="datafrom-txt mb-2">
                                            Carrier of {getRegionName(regionName, regionalLevel, true)} for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
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
                                                        Average Emissions Intensity ({vendorTableDetails?.data?.average} g)
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
                                                        <option value={400}>
                                                            All
                                                        </option>
                                                    </Input>
                                                    <div className="position-relative d-flex justify-content-end">
                                                        <span><img src={Search} alt="ico" /></span>
                                                        <input type="text" placeholder="Search Carrier Name" value={searchCarrier} onChange={handleSearchCarrier} />
                                                    </div>
                                                </div>


                                            </div>



                                            <div className="static-table static-vendor-table mt-4">
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
                                                                    <div class="spinner-border  spinner-ui" role="status">
                                                                        <span class="visually-hidden"></span>
                                                                    </div>
                                                                    : vendorTableDetails?.data?.responseData.length > 0 ?
                                                                        vendorTableDetails?.data.responseData
                                                                            ?.map((xx, index) =>
                                                                                <tr onClick={() => navigate(`/carrier-overview/${xx?.["carrier"]}`)} className="m-cursor">
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
                                                                        :
                                                                        <tr>
                                                                            <td className="border-0"></td><td className="d-flex align-items-center justify-content-start border-0">No Data Found</td><td className="border-0"></td></tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-0 lane-pagination d-flex justify-content-end">
                                                <nav aria-label="Page navigation example">
                                                    <ul class="pagination mb-0">
                                                        <Pagination
                                                            className="pagination-bar"
                                                            currentPage={currentPage}
                                                            totalCount={vendorTableDetails?.data?.pagination?.total_count ? vendorTableDetails?.data?.pagination?.total_count : 1}
                                                            pageSize={pageSize}
                                                            onPageChange={page => { setCurrentPage(page); setRelaodData(false); }}
                                                        />

                                                    </ul>
                                                </nav>
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
export default Vendor