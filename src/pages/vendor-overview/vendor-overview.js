import React, { useEffect } from "react";
import "../lanes-overview/lanes-overview.scss";
import "../region-overview/region-overview.scss";
import "../vendor-overview/vendor-overview.scss";

import Back from "../../assets/images/back.svg";
import Garrow from "../../assets/images/g-arrow.svg";

import Down from "../../assets/images/down.svg";
import Up from "../../assets/images/up.svg";

import DateTimeShow from "../../component/main/DateTimeShow";

import Form from 'react-bootstrap/Form';
import moment from "moment";

import UpArrow from "../../assets/images/up-arrow.svg";
import {

    Row,
    Col,
    Progress,
    Table,
} from 'reactstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from "react-redux";
import ChartsHigh from "../../component/ChartsHigh";
import { getCarrierOverviewData, getLaneBreakdown } from "../../component/store/vendor/vendorDetailsSlice"
import { useParams, Link, useNavigate } from 'react-router-dom';
import { setHeaderName } from "../../component/store/auth/authDataSlice";
import axios from "axios";

const VendorOverview = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const source = axios.CancelToken.source();

    const params = useParams();
    const { carrierOverviewDetail, laneBreakdownDetail, laneBreakdownDetailLoading} = useSelector((state) => state.vendor)
    const { emissionDates } = useSelector((state) => state.auth)

    useEffect(() => {
        if (params?.id) {
            dispatch(getCarrierOverviewData(params?.id))
            dispatch(getLaneBreakdown({id: params?.id ,source}))
            return ()=>{
                source.cancel()
            }
        }
    }, [params, dispatch])

    useEffect(() => {
        dispatch(setHeaderName("Carrier Overview"))
      }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const getQuarterYear = (date) => {
        const quarter = Math.ceil(Number(moment.utc(date).format("MM")) / 3)
        const year = Number(moment.utc(date).format("YYYY"))

        return `Q${quarter} ${year}`
    }
    console.log("navigate", )
    return (
        <>
            <section className="insight_top_wrapper">
                <div className="regional-wrapper regional-overview-wrapper vendor-wrapper lane-wrapper lanes-wrapper regional-level vendor-overview">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper">
                            <Row>
                                <Col lg="12">
                                    <div className="regional-heading pb-3 mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="small-font">
                                                <Link to={params?.laneId ? `/lanes-overview/${params?.laneId}` : "/carrier"} className="d-flex align-items-center color-primary">
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

                                            <div className="">
                                                <div className="heading pt-3">
                                                    <h2 className="mb-0 fs-3 fw-semibold text-capitalize">{carrierOverviewDetail?.data?.responseData?.carrier_name} Carrier Overview</h2>
                                                </div>
                                                {emissionDates && <div class="lates-update "><p class="d-flex align-items-center mb-0 justify-content-start">Data available from {moment.utc(emissionDates?.data?.emission_dates?.start_date).format("DD MMMM YYYY")} to {moment.utc(emissionDates?.data?.emission_dates?.end_date).format("DD MMMM YYYY")}</p></div>}

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12">
                                    <div className="lane-data p-4 mb-3">
                                        <div>
                                            <h6 className="datafrom-txt mb-2">
                                                Summary of Carrier from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}

                                            </h6>
                                        </div>
                                        <Row>
                                            <Col lg="4" md="6">
                                                <div className="emission">
                                                    <h4 className="emi-txt fs-5">
                                                        Contact
                                                    </h4>

                                                    <div className="d-flex manager align-items-center">

                                                        <div className="">
                                                            <h5 className="mb-0 fs-5 text-capitalize">

                                                                {carrierOverviewDetail?.data?.responseData?.carrier_name}
                                                            </h5>


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
                                                        <h6>
                                                            gCO2e/Ton-Mile of freight
                                                        </h6>
                                                        <div className="d-flex align-items-center pt-3">
                                                            <div className="red-div">
                                                            </div>
                                                            <h3 className="fw-bold mb-0 ps-2">

                                                                {carrierOverviewDetail?.data?.responseData?.intensity?.toLocaleString("en-US", { minimumFractionDigits: 1 })}

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
                                                                {Number.parseFloat(carrierOverviewDetail?.data?.responseData?.vendorEmissionData?.emissions)?.toFixed(2)?.toLocaleString("en-US", { minimumFractionDigits: 2 })}

                                                            </h3>
                                                        </div>

                                                    </div>
                                                    <div className="emission ps-lg-5">
                                                        <h4 className="emi-txt mb-0 fs-5">
                                                            Total Shipments
                                                        </h4>
                                                        <h6 className="invisible">
                                                            tCO2e
                                                        </h6>
                                                        <div className="d-flex align-items-center pt-3">
                                                            <div className="grey-div round-2">
                                                            </div>
                                                            <h3 className="fw-bold mb-0 ps-2">
                                                                {carrierOverviewDetail?.data?.responseData?.vendorEmissionData?.shipment_count?.toLocaleString("en-US")}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col lg="6" className="mb-3 mb-lg-0">
                                    <div className="h-100 inner-data-region">
                                        <div className=" p-3">
                                            <div className="emi-inten">


                                                <h6 className="datafrom-txt mb-2">
                                                    Emissions Intensity of <span className="text-capitalize"> {carrierOverviewDetail?.data?.responseData?.carrier_name}</span> from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                                </h6>
                                                <div className="d-flex align-items-end">
                                                    <h4 className="fw-semibold mb-0">Emissions Intensity Overview</h4>
                                                    <span className="fs-12 color-primary">(gCO2e/Ton-Mile)</span>
                                                </div>
                                            </div>
                                            <div>

                                                <ChartsHigh
                                                    carrier_name={carrierOverviewDetail?.data?.responseData?.carrier_name}
                                                    baseLine={carrierOverviewDetail?.data?.responseData?.baseLine}
                                                    industrialAverage={carrierOverviewDetail?.data?.responseData?.industrialAverage}
                                                    options={carrierOverviewDetail?.data?.responseData?.data || []}
                                                    chart={"carrierOverview"}
                                                />
                                                {/* } */}
                                            </div>

                                            {(((carrierOverviewDetail?.data?.responseData?.intensity - carrierOverviewDetail?.data?.responseData?.max) / carrierOverviewDetail?.data?.responseData?.intensity) * 100) > 0 ?

                                                (<div className={`model-overview-down px-3 py-2 $bottom-card`}>
                                                    <div>
                                                        <h6 className="mb-0 ">
                                                            <span className="text-capitalize"><img src={Down} alt="ico" className="me-2" />{carrierOverviewDetail?.data?.responseData?.carrier_name}</span> emissions intensity is {Math.abs(Math.round((( Number.parseFloat(carrierOverviewDetail?.data?.responseData?.intensity) - Number.parseFloat(carrierOverviewDetail?.data?.responseData?.max)) / Number.parseFloat(carrierOverviewDetail?.data?.responseData?.intensity)) * 100))}% higher than average of all carriers' emissions intensity.


                                                        </h6>
                                                    </div>
                                                </div>)
                                                :
                                                (<div className="model-overview-down green px-3 py-2 ">
                                                    <div>
                                                        <h6 className="mb-0 ">
                                                            <span className="text-capitalize"><img src={Up} alt="ico" className="me-2" />{carrierOverviewDetail?.data?.responseData?.carrier_name}</span> emissions intensity is {Math.abs(Math.round(((carrierOverviewDetail?.data?.responseData?.intensity - carrierOverviewDetail?.data?.responseData?.max) / carrierOverviewDetail?.data?.responseData?.intensity) * 100))}% lower than average of all carriers' emissions intensity.


                                                        </h6>
                                                    </div>
                                                </div>)}


                                        </div>
                                    </div>

                                </Col>
                                <Col lg="6">
                                    <div className="inner-data-region lane-oveview-table h-100">
                                        <div className="lanes-data-vendor  position-relative py-3">
                                            <div className="lane-breakdown position-relative px-3">
                                                <div className="emi-inten">

                                                    <h6 className="datafrom-txt mb-2 class">
                                                        Lane Breakdown of <span className="text-capitalize"> {carrierOverviewDetail?.data?.responseData?.carrier_name}</span> from {getQuarterYear(emissionDates?.data?.emission_dates?.start_date)} to {getQuarterYear(emissionDates?.data?.emission_dates?.end_date)}
                                                    </h6>
                                                    <div className="">
                                                        <h4 className="fw-semibold mb-4">Lane Breakdown by Emissions Intensity and Volume</h4>

                                                    </div>
                                                </div>
                                                <Tabs
                                                    defaultActiveKey="home"
                                                    transition={false}
                                                    id="noanim-tab-example"
                                                    className="mb-3"
                                                >
                                                    <Tab eventKey="home" title="High Emissions Intensity Lanes">
                                                        <Table responsive className="mt-0 mb-0 vendor-table facility-table">
                                                            <thead>
                                                                <tr>

                                                                    <th>
                                                                        <div className="d-flex align-items-center ">

                                                                            Lanes

                                                                        </div>

                                                                    </th>


                                                                    <th>
                                                                        <div className="d-flex align-items-center">
                                                                            Emissions Intensity

                                                                        </div>
                                                                        <h6>
                                                                            gCO2e/Ton-Mile of freight
                                                                        </h6>
                                                                    </th>
                                                                    <th>
                                                                        <div className="d-flex align-items-center">
                                                                            Total Emissions

                                                                        </div>
                                                                        <h6>
                                                                            tCO2e
                                                                        </h6>
                                                                    </th>
                                                                    <th>
                                                                        <div className="d-flex align-items-center">
                                                                            Share of Tonnage
                                                                            <br />
                                                                            Shipped on this Lane

                                                                        </div>
                                                                    </th>

                                                                    <th>

                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {

                                                                    laneBreakdownDetailLoading ?
                                                                        <div class="spinner-border spinner-ui  spinner-ui-2 spinner-size margin-top" role="status">
                                                                            <span class="visually-hidden"></span>
                                                                        </div>
                                                                        :

                                                                        laneBreakdownDetail?.data?.responseData?.detractor?.filter(i => i?.total_intensity !== null)?.map(item => (
                                                                            <tr>
                                                                                <td>
                                                                                    <div className="d-flex align-items-center text-decoration-none">

                                                                                        {item?.name}
                                                                                    </div>
                                                                                </td>

                                                                                <td>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="red-div me-2">
                                                                                        </div>
                                                                                        {item?.total_intensity}
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="red-div me-2">
                                                                                        </div>
                                                                                        {Number.parseFloat(item?.total_emission)?.toFixed(2)?.toLocaleString("en-US", { minimumFractionDigits: 2 })}

                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="d-flex align-items-center">

                                                                                        {(item?.shipment_count / carrierOverviewDetail?.data?.responseData?.vendorEmissionData?.shipment_count * 100).toFixed(1)}%
                                                                                    </div>
                                                                                </td>

                                                                                <td>
                                                                                    <a href={() => false} className="text-decoration-underline opacity-1">See levers</a>
                                                                                </td>
                                                                            </tr>
                                                                        ))}


                                                                {laneBreakdownDetailLoading && laneBreakdownDetail?.data?.responseData?.detractor.length === 0 && <tr>

                                                                    <td>
                                                                        No Emissions found
                                                                    </td>
                                                                </tr>}



                                                            </tbody>
                                                        </Table>

                                                    </Tab>
                                                    <Tab eventKey="profile" title="Low Emissions Intensity Lanes">
                                                        <Table responsive className="mt-0 mb-0 vendor-table facility-table">
                                                            <thead>
                                                                <tr>

                                                                    <th>
                                                                        <div className="d-flex align-items-center ">

                                                                            Lanes

                                                                        </div>

                                                                    </th>


                                                                    <th>
                                                                        <div className="d-flex align-items-center">
                                                                            Emissions Intensity

                                                                        </div>
                                                                        <h6>
                                                                            gCO2e/Ton-Mile of freight
                                                                        </h6>
                                                                    </th>

                                                                    <th>
                                                                        <div className="d-flex align-items-center">
                                                                            Total Emissions

                                                                        </div>
                                                                        <h6>
                                                                            tCO2e
                                                                        </h6>
                                                                    </th>
                                                                    <th>
                                                                        <div className="d-flex align-items-center">
                                                                            Share of Tonnage
                                                                            <br />
                                                                            Shipped on this Lane
                                                                        </div>
                                                                    </th>

                                                                    <th>

                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {


                                                                    laneBreakdownDetailLoading ?
                                                                        <div class="spinner-border spinner-ui  spinner-ui-2 spinner-size" role="status">
                                                                            <span class="visually-hidden"></span>
                                                                        </div>
                                                                        :
                                                                        laneBreakdownDetail?.data?.responseData?.contributor?.filter(i => i?.total_intensity !== null)?.map(item => (
                                                                            <tr>
                                                                                <td>
                                                                                    <div className="d-flex align-items-center text-decoration-none">

                                                                                        {item?.name}
                                                                                    </div>
                                                                                </td>

                                                                                <td>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="red-div green-color-div me-2">
                                                                                        </div>
                                                                                        {item?.total_intensity?.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="red-div green-color-div me-2">
                                                                                        </div>
                                                                                        {Number.parseFloat(item?.total_emission)?.toFixed(2)?.toLocaleString("en-US", { minimumFractionDigits: 2 })}

                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="d-flex align-items-center">

                                                                                        {(item?.shipment_count / carrierOverviewDetail?.data?.responseData?.vendorEmissionData?.shipment_count * 100).toFixed(1)}%
                                                                                    </div>
                                                                                </td>

                                                                                <td>
                                                                                    <a href={() => false} className="text-decoration-underline opacity-1">See levers</a>
                                                                                </td>
                                                                            </tr>
                                                                        ))}

                                                                {
                                                                    laneBreakdownDetailLoading && laneBreakdownDetail?.data?.responseData?.contributor?.length === 0 && (<tr>

                                                                        <td>
                                                                            No Emissions found
                                                                        </td>
                                                                    </tr>) 
                                                                }


                                                            </tbody>
                                                        </Table>


                                                    </Tab>
                                                </Tabs>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg="6" className="mb-3 opacity-1">
                                    <div className="inner-data-region p-3 mt-3 h-100">
                                        <div className="emi-inten">
                                            <h6 className="mb-2">DART TRANSIT CO.</h6>

                                            <div className="emi-inten d-flex justify-content-between  pb-3">
                                                <div className="d-flex align-items-center">
                                                    <h5 className="mb-0 me-2 fw-bold">
                                                        Biodiesel mix
                                                    </h5>
                                                    <Form>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            label="Share of alternative fuel vehicles"
                                                            className="d-flex align-items-center"
                                                            disabled
                                                        />
                                                    </Form>

                                                </div>


                                            </div>
                                        </div>
                                        <div className=" model-overview-down px-3 py-2">
                                            <div>
                                                <h6 className="mb-0 d-flex">
                                                    <span className="pe-2"><img src={Down} alt="ico" /></span>Dart Transit Co. biodiesel mix is 12% lower than best-in-class.
                                                </h6>
                                            </div>

                                        </div>

                                    </div>


                                </Col>
                                <Col lg="6" className=" mb-3 opacity-1">
                                    <div className=" inner-data-region p-3 mt-3 h-100">
                                        <div className="emi-inten">
                                            <h6 className="mb-0">DART TRANSIT CO.</h6>
                                            <div className="d-md-flex justify-content-between">
                                                <h4 className="fw-semibold">Projects overview</h4>
                                                <a href={() => false}>Show All</a>

                                            </div>
                                        </div>
                                        <div className="inner-data-region delay-project vendor-border">
                                            <div className="id-data p-3">
                                                <div className="pb-3">
                                                    <h6 className="mb-0">
                                                        ID: #NWAA26723LL
                                                    </h6>
                                                    <h4 className="mb-3">Alternative fuel usage on 5 lanes</h4>
                                                    <h5>
                                                        4 weeks delayed
                                                    </h5>
                                                    <Progress
                                                        value={20}
                                                    />
                                                </div>

                                            </div>
                                            <div className="quartely-wrapper p-3">
                                                <Row>
                                                    <Col lg="6">
                                                        <div>
                                                            <div className="quartely">
                                                                <h4 className="mb-3">
                                                                    Estimated cost <br />impact by 2023
                                                                </h4>
                                                                <div>
                                                                    <h3 className="d-flex align-items-center"><span><img src={UpArrow} alt="ico" /></span>8%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg="6">
                                                        <div>
                                                            <div className="quartely">
                                                                <h4 className="mb-3">
                                                                    Projected emissions<br />reduction
                                                                </h4>
                                                                <div>
                                                                    <h3 className="d-flex align-items-center"><span><img src={Garrow} alt="ico" /></span>6%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="inner-data-region delay-project mt-3 vendor-border">
                                            <div className="id-data green-data-progress p-3">
                                                <div className="pb-3">
                                                    <h6 className="mb-0">
                                                        ID: #NWAA26723LL
                                                    </h6>
                                                    <h4 className="mb-3">Alternative fuel usage on 3 lanes</h4>
                                                    <h5>
                                                        On track
                                                    </h5>
                                                    <Progress
                                                        value={70}
                                                    />
                                                </div>

                                            </div>
                                            <div className="quartely-wrapper p-3">
                                                <Row>
                                                    <Col lg="6">
                                                        <div>
                                                            <div className="quartely">
                                                                <h4 className="mb-3">
                                                                    Estimated cost <br />impact by 2023
                                                                </h4>
                                                                <div>
                                                                    <h3 className="d-flex align-items-center"><span><img src={UpArrow} alt="ico" /></span>8%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg="6">
                                                        <div>
                                                            <div className="quartely">
                                                                <h4 className="mb-3">
                                                                    Projected emissions<br />reduction
                                                                </h4>
                                                                <div>
                                                                    <h3 className="d-flex align-items-center"><span><img src={Garrow} alt="ico" /></span>6%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="data-sources  pt-2 pb-4">
                                <a target="_blank" rel="noreferrer" href="https://smartfreightcentre.org/en/about-sfc/about-us/" className="d-flex align-items-center"><span className="glec-txt me-1"><h6 className="mb-0">GLEC</h6></span>See data sources and methodologies</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VendorOverview