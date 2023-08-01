import React, { useEffect, useState } from "react";
import "../regional/regional.scss";
import Back from "../../assets/images/back.svg";
import ExportButton from "../../component/export-button";
import Form from 'react-bootstrap/Form';
import { yearList, sortIcon, getQuarters, getGraphDataHorizontal, getQuarterName } from "../../constant/index"
import { FormGroup, Row, Col, Input, Table } from "reactstrap";
import ChartsHigh from "../../component/ChartsHigh";
import { useDispatch, useSelector } from "react-redux";
import {
  regionGraphData,
  regionTableData,
} from "../../component/store/region/regionDetailsSlice";

import DateTimeShow from "../../component/main/DateTimeShow";
import { useNavigate, Link } from "react-router-dom";
import { setHeaderName } from "../../component/store/auth/authDataSlice";

const Regional = () => {
  const navigate = useNavigate();


  const currentYear = new Date().getFullYear();
  const [relaodData, setRelaodData] = useState(true);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const [yearlyData, setYearlyData] = useState(currentYear);
  const [quarterDetails, setQuarterDetails] = useState(1);
  const [order, setOrder] = useState("desc");
  const [col_name, setCol_name] = useState("emission");

  const { regionTableDetails, regionGraphDetails, regionGraphDetailsLoading } = useSelector(
    (state) => state.region
  );

  useEffect(() => {
    dispatch(setHeaderName("Segmentation By Region"))
  }, [dispatch])


  useEffect(() => {

    dispatch(
      regionGraphData({
        region_id: "",
        year: yearlyData,
        quarter: quarterDetails,
        toggel_data: checked ? 1 : 0,

      })
    );
  }, [dispatch, yearlyData, quarterDetails, checked]);

  useEffect(() => {

    dispatch(
      regionTableData({
        region_id: "",
        year: yearlyData,
        quarter: quarterDetails,
        toggel_data: checked ? 1 : 0,
        order_by: order,
        col_name: col_name
      })
    );

  }, [dispatch, yearlyData, quarterDetails, checked, order, col_name]);


  const handleChangeOrder = (choose_Col_name) => {
    setOrder(order === "desc" ? "asc" : "desc")
    setCol_name(choose_Col_name)
  }

  let regionPageArr = getGraphDataHorizontal(regionGraphDetails, "OTHER")

  return (
    <>
        <div className=" substain-screen regional-wrapper">
          <div className="container-fluid">
            <div className="regional-h-wrapper">
              <Row>
                {/* Region Dashboard */}
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
                        <div className="lates-update">
                          <DateTimeShow />

                        </div>
                    </div>
                    <div className="heading py-3 pt-1">
                      <h2 className="mb-0 fs-3">Regional Emissions Comparison</h2>
                    </div>
                    <Row className="align-items-center">
                      <Col lg="9" md="6">
                        <div>
                          <FormGroup className="select-box d-flex">

                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
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
                        <div className="dropdown-comp d-flex justify-content-between align-items-center">
                          <FormGroup className="select-box d-flex">

                          </FormGroup>
                          <ExportButton />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                {/* Regional Emission Graph */}
                <Col lg="4" md="12">
                  <div className="inner-data-region region-graph-outer mt-3 h-100">
                    <div className=" p-3 px-2">
                      <h6 className="datafrom-txt mb-3">
                        Region-Wise <span>{checked ? "Total Emissions" : "Emissions Intensity"}</span> for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                      </h6>
                      <div className="emi-inten d-flex justify-content-between pb-5">

                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 fw-semibold text-capitalize fs-14">
                            Emissions intensity
                          </h6>
                          <div className="toggle-switch">

                            <Form>
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Total Emissions"
                                className="ps-xxl-2 ps-2 ps-lg-0 mb-0"
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
                          Average of all regions (
                          {regionGraphDetails?.data?.average?.toLocaleString(
                            "en-US",
                            { minimumFractionDigits: 1 }
                          )}{" "}

                          {regionGraphDetails?.data?.unit})
                        </h6>
                        {/* <div className="region-namevalues">
                          {regionPageArr?.map(i => (
                            <h6 className="region-name">
                              {i?.name}
                            </h6>
                          ))}
                        </div> */}
                        <div className="avg-img region-avg-img">
                          {
                            regionGraphDetailsLoading ? <div className="graph-loader">

                              <div class="spinner-border  spinner-ui" role="status">
                                <span class="visually-hidden"></span>
                              </div>
                            </div>
                              : regionPageArr?.length > 0 && (
                                <ChartsHigh
                                  chart={"region"}
                                  isLoading={true}
                                  regionPageArr={regionPageArr}
                                  regionPagecontributor={[]}
                                  regionPagedetractor={[]}
                                  reloadData={relaodData}
                                  unitDto={regionGraphDetails?.data?.unit}

                                />
                              )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                {/* Regional Emission Table */}
                <Col lg="8" md="12">
                  <div className="table-region h-100 mt-lg-3 mt-5">
                    <div className=" py-3 px-3 pb-0">
                      <h6 className="datafrom-txt mb-3">
                        Region-Wise <span>{checked ? "Total Emissions" : "Emissions Intensity"}</span> for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                      </h6>
                      <div className="d-md-flex">
                        <div className="d-flex align-items-center ">
                          <div className="green-div"></div>
                          <h6 className="mb-0 ps-2">High Performance</h6>
                        </div>
                        <div className="d-flex align-items-center ps-0 ps-md-4">
                          <div className="white-div"></div>
                          <h6 className="mb-0 ps-2">Medium Performance</h6>
                        </div>
                        <div className="d-flex align-items-center ps-0 ps-md-4">
                          <div className="red-div"></div>
                          <h6 className="mb-0 ps-2">Low Performance</h6>
                        </div>
                      </div>
                      {/* <Table responsive className="mt-3 mb-0 vendor-table facility-table">
                        <thead>
                          <tr>
                            <th>
                              <div className="d-flex align-items-center">
                                Regions

                              </div>
                            </th>

                            <th>
                              <div className="d-flex align-items-center text-capitalize pointer" onClick={() => handleChangeOrder("intensity")}>
                                Emissions intensity
                                <span ><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>


                              </div>
                              <h6>
                                gCO2e/Ton-Mile
                                <br /> of freight
                              </h6>
                            </th>
                            <th className="pointer" onClick={() => handleChangeOrder("shipments")}>
                              Total Shipments
                              <span ><img className="pointer" src={sortIcon("shipments", col_name, order)} alt="ico" /></span>
                            </th>
                            <th className="pointer" onClick={() => handleChangeOrder("emission")}>
                              Total Emissions
                              <span ><img className="pointer" src={sortIcon("emission", col_name, order)} alt="ico" /></span>

                              <h6>tCo2e</h6>
                            </th>

                           
                            <th></th>
                          </tr>
                        </thead>
                        <tbody className=" text-left ">
                          {regionTableDetails?.data?.map((x) => (
                            <tr key={x?.["Region.name"]}>
                              <td>{x?.["Region.name"]}</td>

                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="red-div me-2"
                                    style={{
                                      backgroundColor: x?.intensity?.color,
                                    }}
                                  ></div>
                                  {Number.parseFloat(
                                    x?.intensity?.value
                                  )?.toLocaleString("en-US", {
                                    minimumFractionDigits: 1,
                                  })}
                                </div>
                              </td>
                              <td>
                              {x?.shipments?.toLocaleString("en-US")}
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="red-div me-2"
                                    style={{
                                      backgroundColor: x?.cost?.color,
                                    }}
                                  ></div>
                                  {Number.parseFloat(
                                    x?.cost?.value
                                  )?.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                  })}
                                </div>
                              </td>
                             
                              <td>
                                <Link to={`/region-overview/${x?.["Region.name"]}`}>More</Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table> */}
                      <div className="static-table mt-4">
                        <div class="tWrap">
                          <div class="tWrap__head">
                            <table>
                              <thead>
                              <tr>
                                <th>
                                  <div className="d-flex align-items-center">
                                    Regions

                                  </div>
                                </th>

                                <th>
                                  <div className="d-flex align-items-center text-capitalize pointer" onClick={() => handleChangeOrder("intensity")}>
                                    Emissions intensity
                                    <span ><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>


                                  </div>
                                  <h6 className="fs-10">
                                    gCO2e/Ton-Mile
                                    <br /> of freight
                                  </h6>
                                </th>
                                <th className="pointer" onClick={() => handleChangeOrder("shipments")}>
                                  Total Shipments
                                  <span ><img className="pointer" src={sortIcon("shipments", col_name, order)} alt="ico" /></span>
                                </th>
                                <th className="pointer" onClick={() => handleChangeOrder("emission")}>
                                  Total Emissions
                                  <span ><img className="pointer" src={sortIcon("emission", col_name, order)} alt="ico" /></span>

                                  <h6 className="fs-10">tCo2e</h6>
                                </th>

                              
                                <th></th>
                              </tr>
                              </thead>
                            </table>
                          </div>
                          <div class="tWrap__body">
                            <table>
                              <tbody className=" text-left ">
                                {regionTableDetails?.data?.map((x) => (
                                  <tr onClick={()=>navigate(`/region-overview/${x?.["Region.name"]}`)} key={x?.["Region.name"]} className="m-cursor">
                                    <td>{x?.["Region.name"]}</td>

                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div
                                          className="red-div me-2"
                                          style={{
                                            backgroundColor: x?.intensity?.color,
                                          }}
                                        ></div>
                                        {Number.parseFloat(
                                          x?.intensity?.value
                                        )?.toLocaleString("en-US", {
                                          minimumFractionDigits: 1,
                                        })}
                                      </div>
                                    </td>
                                    <td>
                                    {x?.shipments?.toLocaleString("en-US")}
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div
                                          className="red-div me-2"
                                          style={{
                                            backgroundColor: x?.cost?.color,
                                          }}
                                        ></div>
                                        {Number.parseFloat(
                                          x?.cost?.value
                                        )?.toLocaleString("en-US", {
                                          minimumFractionDigits: 2,
                                        })}
                                      </div>
                                    </td>
                                  
                                    <td>
                                      <Link to={`/region-overview/${x?.["Region.name"]}`}>More</Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div> 
                        </div>
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

    </>
  );
}
export default Regional
