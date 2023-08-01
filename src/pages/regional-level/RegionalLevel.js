import React, { useEffect, useState } from "react";
import "../substainable/substainable.scss";
import "../regional-level/regional-level.scss";
import ArrowDown from "../../assets/images/arrow-down.svg";
import ExportButton from "../../component/export-button";
import Export from "../../assets/images/export.svg";
import Up from "../../assets/images/up.svg";
import Down from "../../assets/images/down.svg";
import Garrow from "../../assets/images/g-arrow.svg";
import Delete from "../../assets/images/delete.svg";
import Plus from "../../assets/images/plus.svg";
import AvgLanes from "../../assets/images/avg-lanes.png";
import AvgCarrier from "../../assets/images/avg-carriers.png";
import AvgFacility from "../../assets/images/avg-facilities.png";
import {
  FormGroup,
  Button,
  Row,
  Col,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import RegionLevelHighChart from "./RegionLevelHighChart";
import {
  regionLevelGlidePath,
  regionShow,
  getProjectCount
} from "../../component/store/auth/graph/graphDetailsSlice";
import {
  changeRegion,
  changeLane,
  changeFacility,
  changeCarrier,
} from "../../component/store/dashboard/dashSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  totalEmissionOverall,
  regionEmissionIntensityOverall,
  regionFacilityEmissions,
} from "../../component/store/region/regionOverviewSlice";
import { useAuth } from "../../routes/ProtectedRoute";

import DateTimeShow from "../../component/main/DateTimeShow";
import { Form } from "react-bootstrap";
import ChartsHigh from "../../component/ChartsHigh";
import { laneGraphData } from "../../component/store/lane/laneDetailsSlice";
import { vendorGraphData } from "../../component/store/vendor/vendorDetailsSlice";
import BubbleHighChart from "../../component/BubbleHighChart";
import { regionGraphData } from "../../component/store/region/regionDetailsSlice";
import { yearList, getQuarters, getGraphData, getQuarterName, getRegionName, getGraphDataHorizontal } from "../../constant/index"
import { setHeaderName } from "../../component/store/auth/authDataSlice";

const RegionalLevel = () => {


  const [modal, setModal] = useState(false);
  const [checkedRegion, setCheckedRegion] = useState(true)
  const [checked, setChecked] = useState(true);
  const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true)
  const [checkedFacilityEmissions, setCheckedFacilityEmissions] =
    useState(true);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const [quarterDetails, setQuarterDetails] = useState(1);

  const [yearlyData, setYearlyData] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  const { regions, isLoadingRegionLevelGlidePath, regionLevelGlideData, projectCountData } = useSelector(
    (state) => state.graphDetails
  );
  const { regionEmissionIntensityDetails, totalEmissionOverallDetails, regionEmissionIntensityDetailsIsLoading } =
    useSelector((state) => state.regionOverview);

  const { isRegion, isLane, isFacility, isCarrier } = useSelector(
    (state) => state.dash
  );
  const { regionGraphDetails, regionGraphDetailsLoading } = useSelector(
    (state) => state.region
  );
  const { vendorGraphDetails } = useSelector((state) => state.vendor)
  const { laneGraphDetails, laneGraphDetailsLoading } = useSelector(
    (state) => state.lane
  );
  const { regionFacilityEmissionDto, regionFacilityEmissionIsLoading } =
    useSelector((state) => state.regionOverview);
  const currentPage = 1;
  const pageSize = 10;
  let id = localStorage.getItem("regionalLevel")
  const [yearlyData1, setYearlyData1] = useState((new Date().getFullYear()) - 1);
  const [regionName, setRegionName] = useState("")
  const [regionsLevel, setRegionsLevel] = useState(id);
  const [quartelyData, setQuartelyData] = useState("1");
  const [relaodData, setRelaodData] = useState(true)
  const [pieChartCount, setpieChartCount] = useState(null)
  const [isRegionState, setIsRegionState] = useState(false)
  const [isLaneState, setIsLaneState] = useState(false)

  const [isCarrierState, setIsCarrierState] = useState(false)
  const [isFacilityState, setIsFacilityState] = useState(false)

  useEffect(() => {
    dispatch(regionShow())
    dispatch(setHeaderName("Dashboard"))
  }, [dispatch])

  useEffect(() => {
    if (regionsLevel) {
      regions?.data?.regions.map((x) => {
        x.id === Number.parseInt(regionsLevel) && setRegionName(x.name)
        return true
      }
      )
    }
  }, [regionsLevel, regions])

  useEffect(() => {
    console.log("projectCountData?.data", projectCountData?.data)
    if (projectCountData?.data) {
      setpieChartCount(projectCountData?.data?.Total || 0)
    }
  }, [projectCountData])

  useEffect(() => {
    if (regionsLevel === "") {
      navigate("/sustainable");
    }
  }, [regionsLevel, navigate]);

  useEffect(() => {
    if (regionsLevel) {
      dispatch(getProjectCount({ region_id: regionsLevel, year: yearlyData }))
    }
  }, [dispatch, regionsLevel, yearlyData]);

  useEffect(() => {
    if (id || regionsLevel || quartelyData) {
      dispatch(
        regionEmissionIntensityOverall({
          quarter: quartelyData,
          toggel: 1,
          year: yearlyData,
          region_id: regionsLevel,
        })
      );
      dispatch(
        totalEmissionOverall({
          year: yearlyData,
          toggel: 0,
          quarter: quartelyData,
          region_id: regionsLevel,
        })
      );
    }

  }, [dispatch, id, regionsLevel, yearlyData, quartelyData]);

  useEffect(() => {
    if (yearlyData1 || regionsLevel) {
      dispatch(regionLevelGlidePath({ region_id: regionsLevel, company_id: "", year: yearlyData1, toggel_data: checkedEmissionsReductionGlide ? 0 : 1 }))
    }
  }, [dispatch, yearlyData1, regionsLevel, checkedEmissionsReductionGlide])


  let regionPageArr = getGraphDataHorizontal(regionGraphDetails);
  let lanePageArr = getGraphData(laneGraphDetails);
  let laneFacilityEmessionArr = getGraphDataHorizontal(regionFacilityEmissionDto);

  useEffect(() => {
    if (isRegion) {
      dispatch(
        regionGraphData({
          region_id: "",
          quarter: quarterDetails,
          toggel_data: checkedRegion ? 1 : 0,
          year: yearlyData
        })
      );
    }
  }, [dispatch, isRegion, quarterDetails, checkedRegion, yearlyData])

  useEffect(() => {
    if (isFacility && regionsLevel) {
      dispatch(
        regionFacilityEmissions({

          region_id: regionsLevel,
          facility_id: "",
          quarter: quarterDetails,
          toggel_data: checkedFacilityEmissions ? 1 : 0,
          year: yearlyData
        })
      );
    }
  }, [regionsLevel, dispatch, isFacility, quarterDetails, checkedFacilityEmissions, yearlyData]);
  useEffect(() => {
    if (isLane && regionsLevel) {
      dispatch(
        laneGraphData({
          page: currentPage,
          page_size: pageSize,
          region_id: regionsLevel,
          facility_id: "",
          toggel_data: checked ? 1 : 0,
          quarter: quarterDetails,
          year: yearlyData
        })
      );
    }
  }, [regionsLevel, dispatch, isLane, quarterDetails, checked, yearlyData]);

  useEffect(() => {
    if (isCarrier && regionsLevel) {
      dispatch(vendorGraphData({
        region_id: regionsLevel, page: currentPage,
        page_size: 20,
        quarter: quarterDetails,
        year: yearlyData
      }))
    }
  }, [dispatch, isCarrier, quarterDetails, regionsLevel, yearlyData])
  return (
    <>
      <section className="insight_top_wrapper">
        <section className="substain-screen regional-level pb-4 vendor-wrapper regional-wrapper  regional-overview-wrapper lane-wrapper">
          <div className="container-fluid">
            <div className="substain-screen-wraper">
              <div className="substain-heading">
                <Row>
                  <Col lg="12" md="12">
                    <Row className="substain-h-wrapper pe-3 pb-0 ps-0">
                      <Col lg="9">
                        <div className="lates-update">
                          <h1 className="mb-0 fs-3">
                            Transportation Emissions Dashboard
                          </h1>
                        </div>
                      </Col>
                      <Col lg="3" md="12" className="p-0">
                        <div className="lates-update">

                          <DateTimeShow />


                        </div>
                        <div></div>
                      </Col>
                    </Row>
                    <Row className=" p-3 ps-0 substain-h-wrapper align-items-center">
                      <Col lg="9" md="12">



                        <FormGroup className="select-box d-flex">

                          {useAuth().userdata?.role === 0 && (
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              className="ms-2"
                              value={regionsLevel}
                              onChange={(e) => {
                                setRegionsLevel(e.target.value)
                                setRelaodData(false);

                                if (e.target.value === "") {
                                  localStorage.removeItem("regionalLevel")
                                }
                                else {
                                  localStorage.setItem("regionalLevel", e.target.value)
                                }
                              }}
                            >
                              <option value=""> All Regions</option>

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
                            className="ms-2 my-2 my-md-0 regional-dropdown"
                            value={yearlyData}
                            onChange={(e) => {
                              setYearlyData(e.target.value);
                              setYearlyData1(e.target.value)
                              setQuarterDetails(1)
                              setQuartelyData(1)
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
                              setQuartelyData(e.target.value)
                              setRelaodData(false);
                            }}
                          >
                            {getQuarters(yearlyData).map(i => (
                              <option value={i?.value}>{i?.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="3" md="12">
                        <ExportButton />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              {/* substainability tracker */}
              <div>
                <Row>
                  <Col lg="12" md="12">
                    <div className="subs-inner-heading py-3">
                      <h2 className="fw-semibold mb-4">Sustainability Tracker</h2>
                      <Row>

                        <Col lg="3">
                          <div className="tracker-data p-3 tracker-card h-100 ">
                            <div className="tracker-inner">
                              <div className="mt-3">
                                
                               
                                <div className="d-xl-flex justify-content-between">

                                  <div>
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
                                    <div className="by-date">
                                      <p className="mb-0">By {new Date().getFullYear()}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg="3" className=" mt-3 mt-lg-0">
                          <div className="tracker-data p-3 tracker-card h-100">
                            <div className="tracker-inner">
                              
                             
                              <div className="mt-3">
                                <div className="co-txt d-flex align-items-center mb-3">
                                  <div className="green-div me-2"></div>
                                  <div className="co-txt d-flex arrow-down align-items-center">
                                   
                                    <h4 className="mb-0"> <span> <img src={ArrowDown} alt="ico" /></span>4%</h4>
                                  </div>
                                </div>
                                <h6>{regionName} Region</h6>
                                <h3>Emissions Reduction Target</h3>
                                <div className="by-date">
                                  <p className="mb-0">By Q{Math.floor((new Date().getMonth() + 3) / 3)} {new Date().getFullYear()}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg="3" className=" mt-3 mt-lg-0">
                          <div className="tracker-data p-3 tracker-card h-100">
                            <div className="tracker-inner">
                              <div className="mt-3">
                               
                                
                                <div className="">
                                  <div className="co-txt d-flex align-items-center mb-3">
                                    <div className="green-div me-2"></div>

                                    <h4 className="mb-0">{Number.parseInt(projectCountData?.data?.Total || 0).toLocaleString("en-US")}</h4>
                                  </div>
                                  <h6>{regionName} Region</h6>
                                  <h3 className="min-height48">Projects in Progress</h3>
                                  <div className="by-date">
                                    <p className="mb-0">In Q{Math.floor((new Date().getMonth() + 3) / 3)} {new Date().getFullYear()}</p>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg="3" className=" mt-3 mt-lg-0">
                          <div className="tracker-data p-3 tracker-card h-100">
                            <div className="tracker-inner">
                              <div className="mt-3">
                               
                                <div className="">
                                  <div className="co-txt d-flex align-items-center mb-3">
                                    <div className="red-div me-2"></div>

                                    <h4 className="mb-0">2%</h4>
                                  </div>
                                  <h6>{regionName} Region</h6>
                                  <h3 className="">Gap to Target</h3>
                                  <div className="by-date company-commit">
                                    <p className="mb-0"> Reduction needed between now and Q{Math.floor((new Date().getMonth() + 3) / 3)} {new Date().getFullYear()}

                                    </p>
                                    <a target="_blank" rel="noreferrer" href="https://corporate.lowes.com/our-responsibilities/corporate-responsibility-reports-policies" className="text-decoration-underline text-white"> See company commitment</a>


                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>

                    </div>
                  </Col>
                </Row>
              </div>
              <div class="">

                <Row>
                  <Col lg="6" className="h-100">
                    <div className="h-100 inner-data-region slider-icons position-relative px-3">
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
                        {yearlyData1 < 2022 && <button onClick={() => {
                          setRelaodData(false)

                          setYearlyData1(prev => Number.parseInt(prev) + 1)
                        }}><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9091 9.99996C10.9091 10.2325 10.8203 10.4652 10.6428 10.6427L1.55187 19.7336C1.19665 20.0888 0.62142 20.0888 0.26642 19.7336C-0.0885794 19.3784 -0.0888067 18.8031 0.26642 18.4481L8.71459 9.99996L0.26642 1.55179C-0.0888064 1.19656 -0.0888064 0.621334 0.26642 0.266335C0.621647 -0.088665 1.19687 -0.088892 1.55187 0.266335L10.6428 9.35723C10.8203 9.53473 10.9091 9.76746 10.9091 9.99996Z" fill="#5f9a80" />
                          </svg>
                        </button>}
                      </div>
                      <div className=" p-3 px-0">
                        <div className="emi-inten">
                          <h6 className="mb-0 fw-bold">{regionName} Region for {regionLevelGlideData?.data?.year.join(" - ")}</h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <h4 className="fw-semibold mb-0">
                              Reduction Glide Path <span className="fs-12 color-primary fw-light ">({!checkedEmissionsReductionGlide ? 'gCO2e' : 'tCO2e'})</span>
                            </h4>
                            <Button
                              color="primary"
                              className="px-4 py-0"
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
                        {/* maps */}
                      </div>
                      {isLoadingRegionLevelGlidePath ? <div className="graph-loader">

                        <div class="spinner-border position-absolute spinner-ui" role="status">
                          <span class="visually-hidden"></span>
                        </div>
                      </div> : (
                        <RegionLevelHighChart
                          key={1}
                          chart={"emissionReduction"}
                          options={regionLevelGlideData?.data || {}}
                          regionName={regionName}
                          reloadData={false}
                          maxRegionsValue={Math.max(...regionLevelGlideData?.data?.region_level || [1]) * 1.10}
                          unitReduction={!checkedEmissionsReductionGlide}
                        />)
                      }


                      <div className="d-lg-flex quartely-wrapper  p-3">
                        <div className="quartely px-2">
                          <h4 className="mb-3 fs-14s">
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
                          <h4 className="mb-3 fs-14s">
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
                          <h4 className="mb-3 fs-14s">
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
                  <Col lg="6" className="mt-lg-0 mt-3">
                    <div className="maps-subs p-3 h-100">
                      <h6 className="fw-bold mb-0">Projects of {getRegionName(regionName, regionsLevel, true)} for {getQuarterName(quartelyData, yearlyData)} {yearlyData}</h6>
                      <h3 className="mb-0 fw-semibold">Projects Overview</h3>
                      <Row className="align-items-center">
                        <Col lg="12">
                          <div className="project-outer position-relative">

                            {pieChartCount !== null && <>
                              <Link to="/projects">
                                <RegionLevelHighChart reloadData={relaodData}
                                  chart={"piechart"} pieChartCount={Number.parseInt(pieChartCount).toLocaleString("en-US")} />
                              </Link>
                            </>
                            }

                          </div>
                        </Col>
                        <Col lg="12">

                          <div className="mb-4 mt-4">
                            <div className="overview-txt mb-4">
                              <div className="co-txt d-md-flex align-items-center justify-content-between">
                                <div className="d-flex">
                                  <div className="green-div me-3"></div>
                                  <h4 className="mb-0">Completed</h4>
                                </div>

                                <h5 className="mb-0">0</h5>
                              </div>
                            </div>
                            <div >
                              <Row>
                                <Col lg="4">
                                  <div className="overview-txt track-btn-lightgreen mb-4">
                                    <div className="co-txt">
                                      <div className="d-flex align-items-center">
                                        <div className="secondarygreen-div me-3"></div>
                                        <h4 className="mb-0">In-progress</h4>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col lg="4">
                                  <div className="overview-txt track-btn-lightgreen mb-4">
                                    <div className="co-txt d-flex justify-content-center">
                                      <Button color="primary" className=" py-0">
                                        On track
                                      </Button>
                                    </div>
                                  </div>

                                </Col>
                                <Col lg="4">
                                  <div className="overview-txt track-btn-lightgreen mb-4">
                                    <div className="co-txt d-flex justify-content-end">
                                      <h5 className="mb-0">{Number.parseInt(projectCountData?.data?.Total || 0).toLocaleString("en-US")}</h5>
                                    </div>
                                  </div>
                                </Col>
                                <Col lg="4">
                                  <div className="overview-txt track-btn-red mb-3">
                                    <div className="co-txt">
                                      <div className="d-flex align-items-center">
                                        <div className="red-div me-3"></div>
                                        <h4 className="mb-0">In-progress</h4>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col lg="4">
                                  <div className="overview-txt track-btn-red mb-3">
                                    <div className="co-txt d-flex justify-content-center">
                                      <Button color="primary" className=" py-0">
                                        Action needed
                                      </Button>
                                    </div>
                                  </div>

                                </Col>
                                <Col lg="4">
                                  <div className="overview-txt track-btn-red mb-3">
                                    <div className="co-txt d-flex justify-content-end">
                                      <h5 className="mb-0">0</h5>
                                    </div>
                                  </div>
                                </Col>



                              </Row>

                            </div>

                          </div>
                        </Col>
                      </Row>

                    </div>
                  </Col>
                </Row>
              </div>

              <div>
                <div className="data-sources py-2">

                  <a target="_blank" rel="noreferrer" href="https://smartfreightcentre.org/en/about-sfc/about-us/" className="d-flex align-items-center"><span className="glec-txt me-1">GLEC</span>See data sources and Methodologies</a>

                </div>
              </div>
              {/* pacific section */}
              <div className="pacific-overview mt-3">
                <h2 className="fw-semibold">{regionName} Region Overview</h2>
                <Row>
                  <Col lg="6">
                    <div className="h-100 inner-data-region p-3 x-axis-hide opacity-1">
                      <div className="emi-inten d-flex justify-content-between">
                        <div>

                          <div className="d-flex text-items-center">

                            <div>

                              <h6 className="mb-0 ps-1 fw-bold">Emissions of {getRegionName(regionName, regionsLevel, true)}  for {getQuarterName(quartelyData, yearlyData)} {yearlyData}</h6>
                              <div className="d-flex align-items-center">
                                <h4 className="fw-semibold ps-1">
                                  Total emissions
                                </h4>
                                <span className="fs-12 color-primary fw-semibold">(gCO2e/Ton-Mile)</span>
                              </div>

                            </div>

                          </div>
                        </div>
                        <FormGroup className="select-box d-flex ms-lg-5">
                          <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            disabled
                            className="ms-2"
                            value={quartelyData}
                            onChange={(e) => {
                              setRelaodData(false)

                              setQuartelyData(e.target.value)
                            }}
                          >
                            {getQuarters(yearlyData).map(i => (
                              <option value={i?.value}>{i?.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </div>
                      {totalEmissionOverallDetails?.data?.length > 0 && (

                        <RegionLevelHighChart
                          reloadData={relaodData}

                          chart={"totalEmission"}
                          options={totalEmissionOverallDetails?.data}
                        />
                      )}


                      <div>
                        {Math.round(
                          ((totalEmissionOverallDetails?.data?.[0]
                            ?.dataset?.[1]?.contributor -
                            totalEmissionOverallDetails?.data?.[0]
                              ?.dataset?.[0]?.contributor) /
                            totalEmissionOverallDetails?.data?.[0]
                              ?.dataset?.[0]?.contributor) *
                          100
                        ) < 0 ? (
                          <div className="model-overview px-3 py-2">
                            <h6 className="mb-0 d-flex">
                              <span className="pe-2">
                                <img src={Up} alt="icon" />
                              </span>
                              Your total emissions are{" "}
                              {Math.abs(
                                Math.round(
                                  ((totalEmissionOverallDetails?.data?.[0]
                                    ?.dataset?.[1]?.contributor -
                                    totalEmissionOverallDetails?.data?.[0]
                                      ?.dataset?.[0]?.contributor) /
                                    totalEmissionOverallDetails?.data?.[0]
                                      ?.dataset?.[0]?.contributor) *
                                  100
                                )
                              ) + " % "}
                              less than last quarter.
                            </h6>
                          </div>
                        ) : (
                          <div className="model-overview-down px-3 py-2">
                            <h6 className="mb-0 d-flex">
                              <span className="pe-2">
                                <img src={Down} alt="icon" />
                              </span>
                              Your total emissions are{" "}
                              {Math.abs(
                                Math.round(
                                  ((totalEmissionOverallDetails?.data?.[0]
                                    ?.dataset?.[1]?.contributor -
                                    totalEmissionOverallDetails?.data?.[0]
                                      ?.dataset?.[0]?.contributor) /
                                    totalEmissionOverallDetails?.data?.[0]
                                      ?.dataset?.[0]?.contributor) *
                                  100
                                )
                              ) + " % "}
                              more than last quarter.
                            </h6>
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="h-100 inner-data-region p-3 x-axis-hide position-relative">
                      <div className="emi-inten d-flex justify-content-between">
                        <div>

                          <div className="d-flex text-align-center">
                            <div className="popup-dots-wrap position-relative mt-2">

                              <div className="popup-data px-3 py-3">
                                <div className="d-flex align-items-center mb-4">
                                  <h5 className="mb-0">
                                    <span className="me-2 delete-icon">
                                      <img src={Delete} alt="icon" />
                                    </span>
                                    Delete
                                  </h5>
                                </div>
                                <div className="d-flex align-items-center">
                                  <h5 className="mb-0">
                                    <span className="me-2">
                                      <img src={Export} alt="icon" />
                                    </span>
                                    Export
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h6 className="mb-0 ps-1 fw-bold">Emissions Intensity of {getRegionName(regionName, regionsLevel, true)} for {getQuarterName(quartelyData, yearlyData)} {yearlyData}</h6>

                              <h4 className="fw-semibold ps-1">
                                Emissions Intensity   <span className="fs-12">
                                  (gCO2e/Ton-Mile of freight)
                                </span>
                              </h4>
                            </div>

                          </div>
                        </div>

                        <FormGroup className="select-box d-flex ms-lg-6">
                          <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            className="ms-2"
                            value={quartelyData}
                            onChange={(e) => {
                              setRelaodData(false)
                              setQuartelyData(e.target.value)
                            }}
                          >
                            {getQuarters(yearlyData).map(i => (
                              <option value={i?.value}>{i?.name}</option>
                            ))}

                          </Input>
                        </FormGroup>
                      </div>
                      {regionEmissionIntensityDetailsIsLoading ? <div className="graph-loader">

                        <div class="spinner-border position-absolute spinner-ui" role="status">
                          <span class="visually-hidden"></span>
                        </div>
                      </div> : regionEmissionIntensityDetails?.data?.length > 0 &&
                      <RegionLevelHighChart
                        chart={"emissionIntensity"}
                        options={regionEmissionIntensityDetails?.data}
                        reloadData={relaodData}

                      />}

                      <div>
                        {(
                          ((regionEmissionIntensityDetails?.data?.[0]?.max -
                            regionEmissionIntensityDetails?.data?.[0]?.industrialAverage) /
                            regionEmissionIntensityDetails?.data?.[0]?.max) *
                          100
                        ) < 0 ? (
                          <div className="model-overview px-3 py-2 bottom-card">
                            <h6 className="mb-0 d-flex">
                              <span className="pe-2">
                                <img src={Up} alt="icon" />
                              </span>
                              Your emissions intensity for the {regionName} region
                              is{" "}
                              {Math.abs(
                                Math.round(
                                  ((regionEmissionIntensityDetails?.data?.[0]?.max -
                                    regionEmissionIntensityDetails?.data?.[0]?.industrialAverage) /
                                    regionEmissionIntensityDetails?.data?.[0]?.max) *
                                  100
                                )
                              ) + "% "}
                              lower than industry average for this region
                            </h6>
                          </div>
                        ) : (
                          <div className="model-overview-down px-3 py-2 bottom-card">
                            <h6 className="mb-0 d-flex">
                              <span className="pe-2">
                                <img src={Down} alt="icon" />
                              </span>
                              Your emissions intensity for the {regionName} region is{" "}
                              {Math.abs(
                                Math.round(
                                  ((regionEmissionIntensityDetails?.data?.[0]?.max -
                                    regionEmissionIntensityDetails?.data?.[0]?.industrialAverage) /
                                    regionEmissionIntensityDetails?.data?.[0]?.max) * 100
                                )
                              ) + "% "}
                              higher than industry average for this region
                            </h6>
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  {/* Carrier Graph */}
                  {isCarrier && (
                    <Col lg="12" md="12">
                      <div className=" vendor-emission-graph mt-3 p-3 h-100 x-axis-hide1">
                        <h6 className="datafrom-txt mb-2">
                          Emissions of {getRegionName(regionName, regionsLevel, true)} Carrier for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
                        </h6>

                        <div className="emi-inten d-flex justify-content-between mb-2">
                          <div>
                            <div className="d-flex vendor-emsn">
                              <h4 className="fw-bold mb-0">Carrier Emissions</h4>
                            </div>

                            <div className="avg-img"></div>
                          </div>
                          <div>
                            <Link to={"/carrier"} className="text-dark fs-14">Show All</Link>
                          </div>


                        </div>
                        <div className="emi-inten d-flex justify-content-end pb-4">
                          <div className="ps-4">
                            <div className="d-flex align-items-center mb-1 detractor">
                              <div className="red-div"></div>
                              <h6 className="ps-2 mb-0">Highest priority</h6>
                            </div>
                            <div className="d-flex align-items-center detractor mb-1">
                              <div className="white-div"></div>
                              <h6 className="ps-2 mb-0">Medium priority</h6>
                            </div>
                            <div className="d-flex align-items-center detractor mb-1">
                              <div className="darkgreen-div"></div>
                              <h6 className="ps-2 mb-0">Low priority</h6>
                            </div>
                            <div className="d-flex align-items-center detractor mb-1">
                              <div className="grey-div"></div>
                              <h6 className="ps-2 mb-0">Shipment volume</h6>
                            </div>
                          </div>
                        </div>
                        <BubbleHighChart
                          chart={"vendor"}
                          options={
                            vendorGraphDetails?.data
                              ? vendorGraphDetails?.data?.responseData
                              : []
                          }
                        />
                      </div>
                    </Col>
                  )}
                  {/* Region Emissions Graph */}
                  {isRegion && (
                    <Col lg="6" className="mt-3">
                      <div className="inner-data-region region-graph-outer mt-3 h-100">
                        <div className=" p-3">
                          <h6 className="datafrom-txt mb-2">
                            Region-Wise <span>{checkedRegion ? "Total Emissions" : "Emissions Intensity"} for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}</span>
                          </h6>
                          <div className="d-flex justify-content-between">
                            <h3 className="color-primary fw-semibold fs-5">
                              Regional Emissions
                            </h3>
                            <Link to={"/regional"} className="text-dark fs-14">Show All</Link>
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
                                    className="fw-semibold"
                                    checked={checkedRegion}
                                    onChange={() =>
                                      setCheckedRegion(
                                        !checkedRegion
                                      )
                                    }
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
                              {regionGraphDetails?.data?.unit} )
                            </h6>
                            <div className="avg-img">
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
                  )}

                  {isLane && (
                    <Col lg="6" className="mt-3">
                      <div className="inner-data-region region-graph-outer mt-3 h-100">
                        <div className=" p-3">
                          <h6 className="datafrom-txt mb-2">{checked ? "Total Emissions" : "Emissions Intensity"} of {getRegionName(regionName, regionsLevel, true)} Lanes for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}</h6>
                          <div className="d-flex justify-content-between">
                            <h3 className="color-primary fw-semibold fs-5">
                              Lane Emissions
                            </h3>
                            <Link to={"/lanes"} className="text-dark fs-14">Show All</Link>
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
                                    className="fw-semibold"
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
                              {laneGraphDetailsLoading ? (
                                <div className="graph-loader d-flex justify-content-center align-items-center">
                                  <div
                                    class="spinner-border  spinner-ui"
                                    role="status"
                                  >
                                    <span class="visually-hidden"></span>
                                  </div>
                                </div>
                              ) : (
                                lanePageArr?.length > 0 && (
                                  <ChartsHigh
                                    chart={"lane"}
                                    isLoading={true}
                                    lanePageArr={lanePageArr}
                                    lanePagecontributor={[]}
                                    lanePagedetractor={[]}
                                    unitDto={regionGraphDetails?.data?.unit}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )}

                  {isFacility && (
                    <Col lg="6" className="mt-3">
                      <div className="inner-data-region region-graph-outer mt-3 h-100">
                        <div className=" p-3">
                          <h6 className="datafrom-txt mb-2">{checkedFacilityEmissions ? "Total Emissions" : "Emissions Intensity"} of {getRegionName(regionName, regionsLevel, true)} Facilities for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}</h6>
                          <div className="d-flex justify-content-between">
                            <h3 className="color-primary fw-semibold fs-5">
                              Facility Emissions
                            </h3>
                            <Link to={"/facility"} className="text-dark fs-14">Show All</Link>
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
                                    className="fw-semibold"
                                    checked={checkedFacilityEmissions}
                                    onChange={() =>
                                      setCheckedFacilityEmissions(
                                        !checkedFacilityEmissions
                                      )
                                    }
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
                              {regionFacilityEmissionIsLoading ? (
                                <div className="graph-loader d-flex justify-content-center align-items-center">
                                  <div
                                    class="spinner-border  spinner-ui"
                                    role="status"
                                  >
                                    <span class="visually-hidden"></span>
                                  </div>
                                </div>
                              ) : (
                                laneFacilityEmessionArr?.length > 0 && (
                                  <ChartsHigh
                                    chart={"region"}
                                    isLoading={true}
                                    regionPageArr={laneFacilityEmessionArr}
                                    lanePagecontributor={[]}
                                    lanePagedetractor={[]}
                                    reloadData={relaodData}
                                    unitDto={
                                      regionFacilityEmissionDto?.data?.unit
                                    }
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
                <div className="add-btn mt-4">
                  <Button
                    color="primary"
                    className="px-5 py-2 d-flex align-items-center justify-content-center"
                    onClick={() => {
                      setIsRegionState(isRegion)
                      setIsLaneState(isLane)
                      setIsCarrierState(isCarrier)
                      setIsFacilityState(isFacility)
                      toggle()
                    }}
                  >
                    Add a new tile
                    <span className="ps-2">
                      <img src={Plus} alt="icon" />
                    </span>
                  </Button>

                  <Modal
                    isOpen={modal}
                    toggle={toggle}
                    className="data-tile-screen"
                  >
                    <ModalHeader toggle={toggle} className="border-0 align-items-start">
                      <h2>
                        Select and add additional data tiles to your dashboard
                      </h2>
                      <h6 className="fs-5 mb-0">
                        These visuals created based on your{" "}
                        <span className="text-decoration-none">
                          profile settings
                        </span>
                        .
                      </h6>
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        <Row>
                          {useAuth().userdata?.role === 0 && (
                            <Col lg="3" md="6" className="mb-3 mb-lg-0">
                              <div className="card-border p-3 h-100">
                                <div className="card-wrapper-txt">
                                  <div className="d-sm-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0 fs-5">
                                      Regional Overview
                                    </h6>
                                    <FormGroup check>
                                      <Input
                                        type="checkbox"
                                        checked={isRegionState}
                                        onChange={() =>
                                          setIsRegionState(!isRegionState)

                                        }
                                        className="rounded-0"
                                      />
                                    </FormGroup>
                                  </div>
                                  <p className="fs-6">
                                    See transportation emissions data by region.
                                  </p>
                                </div>
                                <div className=" text-center">
                                  <h6 className="fw-bold fs-6 text-center">
                                    Average of all regions
                                  </h6>
                                  <img
                                    src={AvgLanes}
                                    alt="icon"
                                    className="text-center"
                                  />
                                </div>
                              </div>
                            </Col>)}
                          <Col lg={useAuth().userdata?.role === 0 ? '3' : '4'} md="6" className="mb-3 mb-lg-0">
                            <div className="card-border p-3 h-100">
                              <div className="card-wrapper-txt">
                                <div className="d-sm-flex justify-content-between align-items-center mb-2">
                                  <h6 className="mb-0 fs-5">By Lane</h6>
                                  <FormGroup check>
                                    <Input
                                      type="checkbox"
                                      checked={isLaneState}
                                      onChange={() =>
                                        setIsLaneState(!isLaneState)
                                      }
                                      className="rounded-0"
                                    />
                                  </FormGroup>
                                </div>
                                <p className="fs-6">
                                  Drill down to lane-level emissions for both
                                  inbound and outbound logistics.
                                </p>
                              </div>
                              <div className="text-center">
                                <h6 className="fw-bold fs-6 text-center">
                                  Average of all lanes
                                </h6>
                                <img
                                  src={AvgLanes}
                                  alt="icon"
                                  className="text-center"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col lg={useAuth().userdata?.role === 0 ? '3' : '4'} md="6" className="mb-3 mb-lg-0">
                            <div className="card-border p-3 h-100">
                              <div className="card-wrapper-txt">
                                <div className="d-sm-flex justify-content-between align-items-center mb-2">
                                  <h6 className="mb-0 fs-5">By Carrier</h6>
                                  <FormGroup check>
                                    <Input
                                      type="checkbox"
                                      checked={isCarrierState}
                                      onChange={() =>
                                        setIsCarrierState(!isCarrierState)
                                      }
                                      className="rounded-0"
                                    />
                                  </FormGroup>
                                </div>
                                <p className="fs-6">
                                  Identify the carriers with highest and lowest
                                  emissions intensity.
                                </p>
                              </div>
                              <div className="text-center">
                                <h6 className="fw-bold fs-6 text-center">
                                  Average of all carriers
                                </h6>
                                <img
                                  src={AvgCarrier}
                                  alt="icon"
                                  className="text-center"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col lg={useAuth().userdata?.role === 0 ? '3' : '4'} md="6" className="mb-3 mb-lg-0">
                            <div className="card-border p-3 h-100">
                              <div className="card-wrapper-txt">
                                <div className="d-sm-flex justify-content-between align-items-center mb-2">
                                  <h6 className="mb-0 fs-5">By Facility</h6>
                                  <FormGroup check>
                                    <Input
                                      type="checkbox"
                                      checked={isFacilityState}
                                      onChange={() =>
                                        setIsFacilityState(!isFacilityState)
                                      }
                                      className="rounded-0"
                                    />
                                  </FormGroup>
                                </div>
                                <p className="fs-6">
                                  Compare emissions by facility.
                                </p>
                              </div>
                              <div className="text-center">
                                <h6 className="fw-bold fs-6 text-center">
                                  Average of all facility
                                </h6>
                                <img
                                  src={AvgFacility}
                                  alt="icon"
                                  className="text-center"
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </ModalBody>
                    <ModalFooter className="d-flex justify-content-end">
                      <Button
                        onClick={() => {
                          toggle();
                          dispatch(changeRegion(isRegionState))
                          dispatch(changeLane(isLaneState))
                          dispatch(changeCarrier(isCarrierState))
                          dispatch(changeFacility(isFacilityState))
                        }}
                        className="px-5 rounded-0 py-2"
                      >
                        Apply
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div />
        </section>

      </section>
    </>
  );
}
export default RegionalLevel
