import React, { useState, useEffect } from "react";
import "../regional/regional.scss";
import "../lanes/lanes.scss";
import Back from "../../assets/images/back.svg";
import ExportButton from "../../component/export-button";
import Accordion from "react-bootstrap/Accordion";
import { FormGroup, Row, Col, Input, Table } from "reactstrap";
import Tab from "react-bootstrap/Tab";
import Form from 'react-bootstrap/Form';
import Tabs from "react-bootstrap/Tabs";
import ChartsHigh from "../../component/ChartsHigh";
import { yearList, pageSizeList, sortIcon, getQuarters, getGraphData, getQuarterName, getRegionName } from "../../constant/index"

import {
  laneGraphData,
} from "../../component/store/lane/laneDetailsSlice";
import { regionShow } from "../../component/store/auth/graph/graphDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import DateTimeShow from "../../component/main/DateTimeShow";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../routes/ProtectedRoute";
import { setHeaderName } from "../../component/store/auth/authDataSlice";

const Lane = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  let id = JSON.parse(localStorage.getItem("regionalLevel"));

  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const [yearlyData, setYearlyData] = useState(currentYear);
  const [pageSize, setPageSize] = useState(10);

  const [regionalLevel, setRegionalLevel] = useState(id);
  const [quarterDetails, setQuarterDetails] = useState(1);
  const [regionName, setRegionName] = useState("");
  const [relaodData, setRelaodData] = useState(true);

  const currentPage = 1
  const { laneGraphDetails, laneGraphDetailsLoading } = useSelector((state) => state.lane);
  const { regions } = useSelector((state) => state.graphDetails);
  const [order, setOrder] = useState("desc");
  const [col_name, setCol_name] = useState("intensity");

  const handleChangeOrder = (choose_Col_name) => {
    setOrder(order === "desc" ? "asc" : "desc")
    setCol_name(choose_Col_name)
  }

  useEffect(() => {
    dispatch(regionShow());
  }, [dispatch]);

  let lanePageArr = getGraphData(laneGraphDetails);

  useEffect(() => {
    dispatch(
      laneGraphData({
        page: currentPage,
        page_size: pageSize,
        region_id: regionalLevel,
        facility_id: "",
        year: yearlyData,
        quarter: quarterDetails,
        toggel_data: checked ? 1 : 0,

      })
    );
  }, [dispatch, yearlyData, quarterDetails, regionalLevel, checked, regions, currentPage, pageSize]);

  useEffect(() => {
    dispatch(setHeaderName("Segmentation By Lane"))
  }, [dispatch])

  useEffect(() => {
    setRegionName(regions?.data?.regions?.filter(i => Number.parseInt(i.id) === Number.parseInt(regionalLevel))[0]?.name || "")
  }, [dispatch, regionalLevel, regions]);

  let title = checked ? 'Total Emissions' : 'Emissions Intensity'


  return (
    <>
      <section className="insight_top_wrapper">
        <div className="regional-wrapper lanes-wrapper">
          <div className="container-fluid">
            <div className="regional-h-wrapper ">

              <Row>
                <Col lg="12">
                  <div className="regional-heading pb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                      
                        className="small-font"
                      >
                        <Link to="/sustainable" className="d-flex align-items-center color-primary">
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
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="heading pt-3">
                        <h2 className="mb-3 fs-3">
                          Region Lanes Emissions Comparison
                        </h2>
                      </div>

                    </div>
                    <Row>


                      <Col lg="12" md="">
                        <div className="dropdown-comp d-md-flex justify-content-between align-items-center">
                          <FormGroup className="select-box d-md-flex">
                            {useAuth().userdata?.role === 0 && (
                              <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                className="ms-1"
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
                                {
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

                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              className="ms-2 my-2 my-md-0"
                              value={pageSize}
                              onChange={(e) => {
                                setPageSize(e.target.value);
                                setRelaodData(false);
                              }}
                            >


                              {pageSizeList.map((x, index) => (
                                <option key={index} value={x}>
                                  {x} Lanes
                                </option>
                              ))}
                            </Input>
                          </FormGroup>

                          <ExportButton />

                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>

                <Col lg="5" md="12">
                  <div className="inner-data-region region-graph-outer mt-3 h-100">
                    <div className=" p-3 px-2">
                      <h6 className="datafrom-txt mb-3">

                        {title} of {getRegionName(regionName, regionalLevel, true)}  Lane for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                      </h6>
                      <div className="emi-inten d-flex justify-content-between pb-5">
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
                                className="fw-semibold ps-2 mb-0"
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
                        <div className="avg-img avg-imgLanes">

                          {
                            laneGraphDetailsLoading ? <div className="graph-loader">

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
                                  unitDto={laneGraphDetails?.data?.unit}

                                />
                              )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg="7" md="12">
                  <div className="lanes-data-wrap mt-lg-3 mt-5 h-100">
                    <div className="lanes-data  position-relative pt-3 px-3 ">
                      <h6 className="datafrom-txt mb-2">


                      </h6>
                      <div className="lane-breakdown position-relative">
                        <div className="emi-inten">

                          <div className="">
                            <h4 className="fw-semibold mb-3">
                              {getRegionName(regionName, regionalLevel, true)}{" "}
                              Lane Breakdown by Tonnage and Total Emissions
                            </h4>
                            <h5 className="mb-3">{getRegionName(regionName, regionalLevel, true)}  lane's percentile by tonnage and total emissions</h5>
                          </div>
                        </div>

                        <Tabs
                          defaultActiveKey="home"
                          transition={false}
                          id="noanim-tab-example"
                          className="mb-3"
                        >
                          <Tab
                            eventKey="home"
                            title={`High Emissions ${!checked ? 'Intensity' : ''} Lanes`}
                          >

                            <Accordion defaultActiveKey={0}>
                              {laneGraphDetails?.data?.contributor.length !== 0 && laneGraphDetails?.data?.contributor.map(
                                (x, index) => (
                                  <Accordion.Item
                                    key={index}
                                    eventKey={index}
                                    className="mb-3"
                                  >
                                    <Accordion.Header>
                                      <Table responsive className="mt-0 mb-0">
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div className="d-flex align-items-center text-decoration-underline">
                                                <span
                                                  className={"red-div me-2"}
                                                  style={{
                                                    backgroundColor: x?.color,
                                                  }}
                                                ></span>
                                                {x?.name}
                                              </div>
                                            </td>
                                            <td>
                                              {checked ? (
                                                <div className="d-flex align-items-center table-show fw-bold">
                                                  <div className="">
                                                    Lane Emissions:&nbsp;
                                                  </div>

                                                  <div>
                                                    {(laneGraphDetails?.data?.carrier?.filter(carr => carr?.lane_name === x?.name).reduce(function (acc, obj) { return acc + obj.emission; }, 0)).round(2)?.toLocaleString("en-US", { minimumFractionDigits: 2 })} tCo2e</div>
                                                </div>
                                              ) : (
                                                <div className="d-flex align-items-center table-show fw-bold">
                                                  <div className="">
                                                    Lane Emissions Intensity:&nbsp;
                                                  </div>

                                                  <div>{x?.total_intensity?.round(1)?.toLocaleString("en-US", { minimumFractionDigits: 1 })} g</div>
                                                </div>
                                              )}


                                            </td>
                                            <td>
                                              <Link to={`/lanes-overview/${x?.name}`} className="text-decoration-underline table-show">
                                                More
                                              </Link>
                                            </td>

                                          </tr>

                                        </tbody>
                                      </Table>
                                    </Accordion.Header>
                                    <Accordion.Body className="px-0 pt-0">

                                      <h6 className="datafrom-txt mb-2 ps-3">
                                        {title} of {getRegionName(regionName, regionalLevel, true)} for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}

                                      </h6>
                                      <Table responsive className="mt-0 mb-0 pb-0 lanes-table">
                                        <thead>
                                          <tr>

                                            <th>
                                              <div>Carrier</div>
                                            </th>
                                            <th onClick={() => handleChangeOrder("intensity")}>
                                              <div className="d-flex">
                                                <div>
                                                  <div className="d-flex align-items-center">
                                                    Emissions Intensity
                                                  </div>
                                                  <h6>
                                                    gCO2e/Ton-Mile of freight
                                                  </h6>
                                                </div>

                                                <span ><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>
                                              </div>


                                            </th>
                                            <th className="pointer " onClick={() => handleChangeOrder("shipment_count")}>
                                              <div className="d-flex">
                                                Total Shipments
                                                <span><img className="pointer" src={sortIcon("shipment_count", col_name, order)} alt="ico" /></span>
                                              </div>

                                            </th>
                                            <th onClick={() => handleChangeOrder("emission")} >
                                              <div className="d-flex">
                                                <div>
                                                  <div className="d-flex align-items-center">
                                                    Total Emissions
                                                  </div>
                                                  <h6>tCo2e</h6>
                                                </div>
                                                <span ><img className="pointer" src={sortIcon("emission", col_name, order)} alt="ico" /></span>
                                              </div>
                                            </th>
                                            <th className="d-flex" onClick={() => handleChangeOrder("shipment_counts")}>
                                              <div className="d-flex align-items-center" >
                                                Share of Tonnage
                                                <br />
                                                Shipped on this Lane
                                              </div>
                                              <span >
                                                <img className="pointer" src={sortIcon("shipment_counts", col_name, order)} alt="ico" />
                                              </span>
                                            </th>


                                          </tr>

                                        </thead>
                                        <tbody>
                                          {
                                            [...laneGraphDetails?.data?.carrier]?.sort((a, b) => order === 'asc' ? a?.[col_name === 'shipment_counts' ? 'shipment_count' : col_name] - b?.[col_name === 'shipment_counts' ? 'shipment_count' : col_name] : b?.[col_name === 'shipment_counts' ? 'shipment_count' : col_name] - a?.[col_name === 'shipment_counts' ? 'shipment_count' : col_name])?.filter(carr => carr?.lane_name === x?.name)?.map(res => (
                                              <tr onClick={()=>navigate(`/lanes-overview/${x?.["name"]}`)} className="m-cursor"> 

                                                <td>
                                                  <div className="d-flex align-items-center">
                                                    {res?.carrier_logo ? <div className="logo-icon-name-wrapper"><img
                                                      src={
                                                        res?.carrier_logo
                                                        && process.env.REACT_APP_BASE_URLFULL +
                                                        res?.carrier_logo

                                                      }
                                                      alt="logo"
                                                      className=" profileimgWrap"
                                                    /></div> : (
                                                      <div className="logo-icon-name-wrapper">
                                                        <span className="logo-icon-name">{
                                                          res?.carrier_name.substring(0, 2)
                                                        }</span>
                                                      </div>

                                                    )}

                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="d-flex align-items-center">
                                                    <div className="me-2"></div>
                                                    {Number.parseFloat(
                                                      res?.intensity
                                                    )?.toLocaleString("en-US", {
                                                      minimumFractionDigits: 1,
                                                    })}
                                                  </div>
                                                </td>
                                                <td>
                                                  {res.shipment_count}
                                                </td>
                                                <td>
                                                  <div className="d-flex align-items-center">

                                                    {Number.parseFloat(res?.emission).round(2)?.toLocaleString("en-US", {
                                                      minimumFractionDigits: 1,
                                                    })}
                                                  </div>
                                                </td>

                                                <td>
                                                  <div className="d-flex align-items-center">
                                                    <div className="me-2"></div>
                                                    {
                                                      Number.parseFloat(res.shipment_count) !== 0 ?
                                                        (
                                                          (res.shipment_count /
                                                            laneGraphDetails?.data?.carrier?.filter(carr => carr?.lane_name === x?.name).reduce(function (acc, obj) {
                                                              return acc + obj.shipment_count;
                                                            },
                                                              0)) * 100).toFixed(1) : 0}%
                                                  </div>
                                                </td>
                                              </tr>
                                            ))
                                          }


                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                )
                              )}
                            </Accordion>
                          </Tab>
                          <Tab
                            eventKey="profile"
                            title={`Low Emissions ${!checked ? 'Intensity' : ''} Lanes`}
                          >
                            <Accordion defaultActiveKey={0}>
                              {laneGraphDetails?.data?.detractor.length === 0 ? <></> : laneGraphDetails?.data?.detractor.length !== 0 && laneGraphDetails?.data?.detractor.map((x, index) => (
                                <Accordion.Item
                                  key={x?.name}
                                  eventKey={index}
                                  className="mb-3"
                                >
                                  <Accordion.Header>
                                    <Table responsive className="mt-0 mb-0 w-100">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div className="d-flex align-items-center text-decoration-underline">
                                              <span
                                                className="red-div me-2"
                                                style={{
                                                  backgroundColor: x?.color,
                                                }}
                                              ></span>
                                              {x?.name}
                                            </div>
                                          </td>
                                          <td>
                                            {checked ? (
                                              <div className="d-flex align-items-center table-show fw-bold">
                                                <div className="">
                                                  Lane Emissions:&nbsp;
                                                </div>

                                                <div>
                                                  {Number.parseFloat(laneGraphDetails?.data?.carrier?.filter(carr => carr?.lane_name === x?.name).reduce(function (acc, obj) { return acc + obj.emission; }, 0)).round(2)?.toLocaleString("en-US", { minimumFractionDigits: 2 })} tCo2e</div>
                                              </div>
                                            ) : (
                                              <div className="d-flex align-items-center table-show fw-bold">
                                                <div className="">
                                                  Lane Emissions Intensity:&nbsp;
                                                </div>

                                                <div>{x?.total_intensity?.toLocaleString("en-US", { minimumFractionDigits: 1 })} g</div>
                                              </div>
                                            )}


                                          </td>
                                          <td>
                                            <Link to={`/lanes-overview/${x?.name}`} className="text-decoration-underline table-show">More</Link>
                                          </td>


                                        </tr>
                                      </tbody>
                                    </Table>
                                  </Accordion.Header>
                                  <Accordion.Body className="px-0 pt-0">
                                    <h6 className="datafrom-txt mb-2 ps-3">
                                      {title} of {getRegionName(regionName, regionalLevel, true)} for {getQuarterName(quarterDetails, yearlyData)} {yearlyData} {yearlyData}

                                    </h6>
                                    <Table responsive className="mt-0 mb-0 lanes-table">
                                      <thead>
                                        <tr>

                                          <th>
                                            <div className="d-flex align-items-center">
                                              Carrier
                                            </div>
                                          </th>
                                          <th onClick={() => handleChangeOrder("intensity")}>
                                            <div className="d-flex">
                                              <div>
                                                <div className="d-flex align-items-center">
                                                  Emissions Intensity
                                                </div>
                                                <h6>
                                                  gCO2e/Ton-Mile of freight
                                                </h6>
                                              </div>

                                              <span ><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>
                                            </div>


                                          </th>

                                          <th onClick={() => handleChangeOrder("shipment_count")}>
                                            <div className="pointer d-flex">
                                              Total Shipments
                                              <span><img className="pointer" src={sortIcon("shipment_count", col_name, order)} alt="ico" /></span>
                                            </div>

                                          </th>
                                          <th onClick={() => handleChangeOrder("emission")} >
                                            <div className="d-flex">
                                              <div>
                                                <div className="d-flex align-items-center">
                                                  Total Emissions
                                                </div>
                                                <h6>tCo2e</h6>
                                              </div>
                                              <span ><img className="pointer" src={sortIcon("emission", col_name, order)} alt="ico" /></span>
                                            </div>



                                          </th>
                                          <th className="d-flex" onClick={() => handleChangeOrder("shipment_counts")}>
                                            <div className="d-flex align-items-center" >
                                              Share of Tonnage
                                              <br />
                                              Shipped on this Lane
                                            </div>
                                            <span ><img className="pointer" src={sortIcon("shipment_counts", col_name, order)} alt="ico" /></span>
                                          </th>


                                        </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          [...laneGraphDetails?.data?.carrier]?.sort((a, b) => order === 'asc' ? a?.[col_name === 'shipment_counts' ? 'shipment_count' : col_name] - b?.[col_name === 'shipment_counts' ? 'shipment_count' : col_name] : b?.[col_name === 'shipment_counts' ? 'shipment_count' : col_name] - a?.[col_name === 'shipment_counts' ? 'shipment_count' : col_name])?.filter(carr => carr?.lane_name === x?.name)?.map(res => (
                                            <tr onClick={()=>navigate(`/lanes-overview/${x?.["name"]}`)} className="m-cursor">

                                              <td>
                                                <div className="d-flex align-items-center">
                                                  {res?.carrier_logo ? <div className="logo-icon-name-wrapper"><img
                                                    src={
                                                      res?.carrier_logo
                                                      && process.env.REACT_APP_BASE_URLFULL +
                                                      res?.carrier_logo

                                                    }
                                                    alt="logo"
                                                    className=" profileimgWrap"
                                                  /></div> : (
                                                    <div className="logo-icon-name-wrapper">
                                                      <span className="logo-icon-name">{
                                                        res?.carrier_name.substring(0, 2)
                                                      }</span>
                                                    </div>

                                                  )}

                                                </div>
                                              </td>

                                              <td>
                                                <div className="d-flex align-items-center">
                                                  <div className="me-2"></div>
                                                  {Number.parseFloat(
                                                    res?.intensity
                                                  )?.toLocaleString("en-US", {
                                                    minimumFractionDigits: 1,
                                                  })}
                                                </div>
                                              </td>
                                              <td>
                                                {res.shipment_count}
                                              </td>
                                              <td>
                                                <div className="d-flex align-items-center">
                                                  {Number.parseFloat(res?.emission).round(2)?.toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                  })}
                                                </div>
                                              </td>
                                              <td>
                                                <div className="d-flex align-items-center">
                                                  <div className="me-2"></div>
                                                  {Number.parseFloat(res.shipment_count) !== 0 ? ((res.shipment_count / x.shipment_count) * 100).toFixed(1) : 0
                                                  }%
                                                </div>
                                              </td>
                                            </tr>
                                          ))
                                        }
                                      </tbody>
                                    </Table>
                                  </Accordion.Body>
                                </Accordion.Item>
                              ))}
                            </Accordion>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="data-sources mt-lg-4 mt-5 pt-3 pt-lg-0">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://smartfreightcentre.org/en/about-sfc/about-us/"
                  className="d-flex align-items-center"
                >
                  <span className="glec-txt me-1">GLEC</span>See data sources
                  and methodologies
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}

export default Lane