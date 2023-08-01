import React, { useEffect, useState } from "react";
import "../regional/regional.scss";
import "../decarb/decarb.scss";
import LatestUpdate from "../../assets/images/latest-update.svg";
import Back from "../../assets/images/back.svg";
import ExportButton from "../../component/export-button";
import DateTimeShow from "../../component/main/DateTimeShow";
import {
    Row,
    Col,
    Progress,
    Input
} from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decarbLineData } from "../../component/store/decarb/decarbSlice";
import { decarbLine, getQuarters, yearList } from "../../constant"

import { useAuth } from "../../routes/ProtectedRoute";
import { regionShow } from "../../component/store/auth/graph/graphDetailsSlice";
import { setHeaderName } from "../../component/store/auth/authDataSlice";

const Decarb = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dataCheck = useAuth();
    const currentYear = new Date().getFullYear();

    let regionalLevelId = localStorage.getItem("regionalLevel")
    const [regionsLevel, setRegionsLevel] = useState("")
    const [regionName, setRegionName] = useState("")
    const [quarterDetails, setQuarterDetails] = useState(1);
    const [relaodData, setRelaodData] = useState(true);

    const [yearlyData, setYearlyData] = useState(currentYear);
    const { regions } = useSelector((state) => state.graphDetails)
    const { decarbLaneList, decarbLaneListLoading } = useSelector((state) => state.decarb)

    useEffect(() => {
        dispatch(setHeaderName("Decarb Levers"))
    }, [dispatch])

    useEffect(() => {
        if (dataCheck?.userdata?.role === 0) {
            setRegionsLevel("")
            localStorage.removeItem("regionalLevel")
        }
        dispatch(regionShow())
    }, [dispatch])

    useEffect(() => {
        if (dataCheck?.userdata?.role === 0) {
            if (regionsLevel) {
                regions?.data?.length !== 0 && regions?.data?.regions.map((x, _) => {
                    x.id == regionsLevel && setRegionName(x.name)
                }
                )
            }

        } else {
            setRegionsLevel(regionalLevelId)
            regions?.data?.length !== 0 && regions?.data?.regions.map((x, _) => {
                x.id == Number.parseInt(regionalLevelId) && setRegionName(x.name)
            }
            )
        }
    }, [regionsLevel, regions, dataCheck])



    const handleDecarb = (id) => { navigate(`/decarb-recommended/${id}`) }
    useEffect(() => {
        if (yearlyData) {
            dispatch(decarbLineData({ year: yearlyData, quarter: quarterDetails, region_id: dataCheck?.userdata?.role === 0 ? regionsLevel : regionalLevelId }))
        }
    }, [dispatch, regionsLevel, yearlyData, quarterDetails])

    return (
        <>

            <section className="insight_top_wrapper">
                <div className="regional-wrapper decarb-wrapper regional-level vendor-wrapper">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper ">
                            <Row>
                                <Col lg="12">
                                    <div className="regional-heading pb-3">
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <div>
                                                <div onClick={() => navigate(-1)} className="small-font">
                                                    <h6 className="d-flex align-items-center"><span className="pe-2"> <img src={Back} alt="icon" /></span>Back</h6>
                                                </div>

                                            </div>
                                            <div className="lates-update">
                                                <DateTimeShow />

                                            </div>
                                        </div>
                                        <div className="heading pt-1">
                                            <h2 className="mb-3 fs-3">Recommended Levers To Decarbonize {regionsLevel !== "" ? `${regionName} Region` : "All Regions"} Transport </h2>
                                        </div>
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <div className="d-flex">

                                                {
                                                    // dataCheck?.userdata?.role === 0 &&
                                                    // <>
                                                    //     <Input
                                                    //         id="exampleSelect"
                                                    //         name="select"
                                                    //         type="select"
                                                    //         value={regionsLevel}
                                                    //         className="mx-1 "
                                                    //         onChange={(e) => {
                                                    //             setRegionsLevel(e.target.value)
                                                    //             if (e.target.value === "") {
                                                    //                 localStorage.removeItem("regionalLevel")
                                                    //             }
                                                    //             else {
                                                    //                 localStorage.setItem("regionalLevel", e.target.value)
                                                    //             }
                                                    //         }
                                                    //         }
                                                    //     >
                                                    //         <option value="">
                                                    //             All Regions
                                                    //         </option>

                                                    //         {regions?.data?.length != 0 && regions?.data?.regions.map((x) =>
                                                    //             <option value={x.id} key={x.id}>{x.name}</option>
                                                    //         )}

                                                    //     </Input>
                                                    //     </>
                                                }
                                                        <Input
                                                            id="exampleSelect"
                                                            name="select"
                                                            type="select"
                                                            className="ms-1 my-2 my-md-0"
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
                                                    
                                                
                                            </div>
                                            <ExportButton />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="mt-4 mb-4">
                               
                                <Row>
                                    {console.log("decarbLaneList", decarbLaneList)}
                                    {decarbLaneListLoading ? <div className="graph-loader  d-flex justify-content-center align-items-center">

                                        <div class="spinner-border  spinner-ui d-flex justify-content-center align-items-center" role="status">
                                            <span class="visually-hidden"></span>
                                        </div>
                                    </div> : decarbLaneList?.data?.map(i => (
                                        <Col lg="4" md="6" className="mb-4">
                                            <div className="inner-data-region h-100" onClick={() => handleDecarb(i?.region_id)}>
                                                <div className="priority-btn-wrap">
                                                    <div className="priority-btn">
                                                        <label className="px-4 py-1 highest-priority" style ={{backgroundColor:i?.type=="HIGHEST PRIORITY"? "#215154" :i?.type=="MEDIUM PRIORITY"?"#5f9a80":"#d8856b"}}>
                                                           {i?.type}
                                                        </label>
                                                    </div>

                                                    <div className="id-data p-3">
                                                        <div className="pb-3 pt-3">
                                                            <div className="d-md-flex">
                                                                <h5 className="mb-3 fw-semibold">
                                                                    <span className="">{i?.region_name} </span>  Region
                                                                </h5>

                                                            </div>
                                                            <div className="d-md-flex">
                                                                <h5 className="mb-0">
                                                                    Emissions Intensity
                                                                </h5>
                                                                <h4 className="fw-bold fs-6 ps-4">{i?.intensity || 0} <span className="fw-normal">gCO2e/t-mile of freight</span></h4>
                                                            </div>
                                                            <Progress 
                                                                value={Number.parseInt(i?.intensity) || 0}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="quartely-wrapper p-3">
                                                        <Row>
                                                            <Col lg="6">
                                                                <div>
                                                                    <div className="quartely ">
                                                                        <h4 className="mb-3">
                                                                            Number of lanes
                                                                        </h4>
                                                                        <div className="d-flex justify-content-center">
                                                                            <h3 className="d-flex align-items-center fw-semibold">{i?.lane || 0}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col lg="6">
                                                                <div>
                                                                    <div className="quartely">
                                                                        <h4 className="mb-3">
                                                                            Number of carriers
                                                                        </h4>
                                                                        <div className="d-flex justify-content-center">
                                                                            <h3 className="d-flex align-items-center fw-semibold">{i?.vendor || 0}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                    }
                                    {
                                        !decarbLaneListLoading && decarbLaneList?.data?.length === 0 && (
                                            <Col lg="12">
                                                <div className="inner-data-region c-p">
                                                    <div className="priority-btn-wrap">
                                                        <div className="id-data p-3">
                                                            <div className="pb-3 pt-3">
                                                                <h3 className="mb-3 fs-4 fw-bold">There were no recommended levers found.</h3>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    }

                                    {decarbLine?.high_emission_intensity.map((i, index) => (
                                        <Col lg="5" key={i.emission_intensity} className='opacity-1'>
                                            <div className="inner-data-region" onClick={() => handleDecarb(i?.region_id)}>
                                                <div className="priority-btn-wrap">
                                                    {index === 0 && <div className="priority-btn">
                                                        <label className="px-4 py-1 highest-priority">
                                                            HIGHEST PRIORITY
                                                        </label>
                                                    </div>}
                                                    <div className="id-data p-3">
                                                        <div className="pb-3 pt-3">

                                                            <div className="d-md-flex">
                                                                <h5 className="mb-0">
                                                                    Emissions Intensity
                                                                </h5>
                                                                <h4 className="fw-bold fs-6 ps-4">{i?.emission_intensity || 0} <span className="fw-normal">gCO2e/t-mile of freight</span></h4>
                                                            </div>
                                                            <Progress
                                                                value={i?.emission_intensity || 0}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="quartely-wrapper p-3">
                                                        <Row>
                                                            <Col lg="6">
                                                                <div>
                                                                    <div className="quartely">
                                                                        <h4 className="mb-3">
                                                                            Number of lanes
                                                                        </h4>
                                                                        <div>
                                                                            <h3 className="d-flex align-items-center fw-semibold">{i?.number_of_lanes || 0}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col lg="6">
                                                                <div>
                                                                    <div className="quartely">
                                                                        <h4 className="mb-3">
                                                                            Number of Carriers
                                                                        </h4>
                                                                        <div>
                                                                            <h3 className="d-flex align-items-center fw-semibold">{i?.number_of_vendors || 0}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>

                                    ))}
                                </Row>
                            </div>


                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default Decarb