import React, { useEffect, useState, useRef } from "react";
import "../regional/regional.scss";
import "../decarb/decarb.scss";
import "../project/project.scss";
import LatestUpdate from "../../assets/images/latest-update.svg";
import Back from "../../assets/images/back.svg";
import Garrow from "../../assets/images/g-arrow.svg";
import Search from "../../assets/images/search-icon.svg";
import ExportButton from "../../component/export-button";
import {
    Row,
    Col,
    Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { projectData, searchProjectData, projectDelete } from "../../component/store/project/projectSlice";
import { yearList } from "../../constant"
import { useAuth } from "../../routes/ProtectedRoute";
import { regionShow } from "../../component/store/auth/graph/graphDetailsSlice";
import Select from 'react-select'
import DateTimeShow from "../../component/main/DateTimeShow";
import { setHeaderName } from "../../component/store/auth/authDataSlice";

const MyProject = () => {
    const focusPoint = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projectList, searchProjectList } = useSelector((state) => state.project)
    const [selectYear, setSelectYear] = useState(2023)
    const [selectProjectId, setSelectProjectId] = useState()
    const [selectByLever, setSelectByLever] = useState("")
    const [searchText, setSearchText] = useState()
    const [deleteProjectId, setDeleteProjectId] = useState("")
    let regionalLevelId = localStorage.getItem("regionalLevel")
    const [regionsLevel, setRegionsLevel] = useState("")
    const { regions } = useSelector((state) => state.graphDetails)
    const [showAllModalShift, setShowAllModalShift] = useState(false)
    const [showAllAlternative, setShowAllAlternative] = useState(false)
    const [showAllCarrierShift, setShowAllCarrierShift] = useState(false)


    useEffect(() => {
        dispatch(regionShow())
    }, [dispatch])


    const dataCheck = useAuth();


    useEffect(() => {
        dispatch(projectData({ year: selectYear, region_id: dataCheck?.userdata?.role === 0 ? regionsLevel : regionalLevelId, project_unique_id: selectProjectId, lever: selectByLever, search: searchText }))
    }, [dispatch, selectYear, selectProjectId, selectByLever, searchText, regionsLevel])

    useEffect(() => {
        dispatch(searchProjectData())
    }, [dispatch,])

    useEffect(() => {
        dispatch(setHeaderName("Projects"))
      }, [dispatch])

    const removeProject = (id) => {
        setDeleteProjectId(id)
    }
    const handleDetlete = () => {
        if (deleteProjectId) {
            dispatch(projectDelete({ id: deleteProjectId, data: { year: selectYear, project_unique_id: selectProjectId, lever: selectByLever, search: searchText } }))
            setDeleteProjectId("")

        }

    }
    const [menuIsOpen1, setMenuIsOpen1] = useState(false)
    return (
        <>
            <Modal isOpen={deleteProjectId !== ""} toggle={() => setDeleteProjectId("")} >
                <ModalHeader toggle={() => setDeleteProjectId("")}>Delete Project</ModalHeader>
                <ModalBody className="fs-6 text-center mb-4">
                    Are you sure you want to delete the project?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleDetlete()} className="delete-btn px-4 py-2 rounded-0 text-decoration-none">Delete</Button>{' '}
                    <Button color="secondary" className="cancel-btn px-4 py-2 rounded-0 text-decoration-none" onClick={() => setDeleteProjectId("")}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <section className="insight_top_wrapper">
                <div className="regional-wrapper decarb-wrapper regional-level vendor-wrapper project-wrap">
                    <div className="container-fluid">
                        <div className="regional-h-wrapper ">
                            {/* Project dashboard */}
                            <Row>
                                <Col lg="12">
                                    <div className="regional-heading pb-3">
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <div className="small-font">
                                                <Link to="/" className="d-flex align-items-center color-primary"><span className="pe-2"> <img src={Back} alt="ico" /></span>Back</Link>
                                            </div>

                                            <div>
                                                <div className="lates-update">
                                                    <DateTimeShow />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="heading pt-3">

                                            <h2 className="mb-3 fs-3">All Projects</h2>
                                        </div>
                                        <div className="d-xl-flex justify-content-between align-items-center">
                                            <form className="d-lg-flex">
                                                <div onClick={(event) => {
                                                    event.stopPropagation();
                                                    focusPoint.current.focus()
                                                    setMenuIsOpen1(!menuIsOpen1)
                                                    }} className="search-icon-img">
                                                    <span ><img src={Search} alt="ico" /></span>
                                                    <Select
                                                        ref={focusPoint}
                                                        menuIsOpen={menuIsOpen1}
                                                        className=" ms-0 mt-2 mt-lg-0 text-capitalize project-search-dropdown "
                                                        value={searchText}
                                                        onChange={(e) => {
                                                            console.log("ssssssssssssssssssss", e)
                                                            setSelectProjectId(e?.value)
                                                        }}
                                                        placeholder="All Projects"
                                                        isSearchable={true}
                                                        options={searchProjectList?.data?.map(i => ({ value: i?.project_unique_id, label: i?.project_name }))} />
                                                </div>
                                                {/* <Input type="select" onChange={(e) => setSelectProjectId(e?.target?.value)} name="select" id="exampleSelect" className="mx-1">
                                                    <option value="">All projects</option>
                                                    {searchProjectList?.data?.map(i => (
                                                        <option key={i} value={i?.project_unique_id}> {i?.project_name}</option>
                                                    ))}

                                                </Input> */}
                                                <Input type="select" name="select" value={selectYear} onChange={(e) => setSelectYear(e?.target?.value)} id="exampleSelect" className="mx-1">
                                                    <option value="">By year</option>
                                                    {yearList?.map(i => (
                                                        <option key={i} value={i}>{i}</option>
                                                    ))}
                                                </Input>
                                                <Input type="select" value={selectByLever} onChange={(e) => setSelectByLever(e?.target?.value)} name="select" id="exampleSelect" className="mx-1">
                                                    <option value="">By lever</option>
                                                    <option value="modal_shift"> Modal Shift</option>
                                                    <option value="alternative_fuel">Alternative Fuel</option>
                                                    <option value="carrier_shift">Carrier Shift</option>


                                                </Input>

                                                {
                                                    dataCheck?.userdata?.role === 0 && <Input
                                                        id="exampleSelect"
                                                        name="select"
                                                        type="select"
                                                        value={regionsLevel}
                                                        className="mx-1 "
                                                        onChange={(e) => {
                                                            setRegionsLevel(e.target.value)
                                                        }
                                                        }
                                                    >
                                                        <option value="">
                                                            All Regions
                                                        </option>

                                                        {regions?.data?.length != 0 && regions?.data?.regions.map((x) =>
                                                            <option value={x.id} key={x.id}>{x.name}</option>
                                                        )}

                                                    </Input>
                                                }
                                                
                                              


                                            </form>
                                            <ExportButton />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div>
                                {/* Modal Shift Projects */}
                                {(selectByLever === "" || selectByLever === "modal_shift") && <div className="mt-3 mb-4">
                                    <div className="pacific-overview">
                                        <div className="pacific-overview">
                                            <div className="d-flex align-items-center">
                                                <h2 className=" fw-semibold me-3">Modal Shift Projects</h2>
                                                <div className="total-projects-shown d-flex justify-content-center align-items-center me-3">
                                                    <span>{projectList?.data?.modal_shift?.length}</span>
                                                </div>

                                                <a href={void (0)} onClick={() => setShowAllModalShift(!showAllModalShift)} className="text-gray m-cursor">{!showAllModalShift ? 'Show All' : 'Hide'}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <Row>
                                        {projectList?.data?.modal_shift?.slice(0, showAllModalShift ? projectList?.data?.modal_shift?.length : 3)?.map(i => (

                                            <Col onClick={() => navigate(`/project-detail/${i?.id}`)} xl="4" lg="6" md="6" key={i?.id} className="mb-4">
                                                <div className="inner-data-region mt-3 h-100">
                                                    <div className="priority-btn-wrap">
                                                        <div className="priority-btn">
                                                            <label className="px-4 py-1 highest-priority">
                                                                On Track
                                                            </label>
                                                        </div>
                                                        <div className="id-data p-3">
                                                            <div className="">
                                                                <div className=" text-end">
                                                                    <a href={void (0)} onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeProject(i?.id)
                                                                    }} class="fs-14">Remove</a>
                                                                </div>

                                                                <h6 className="fs-14 fw-semibold">ID : #{i?.project_unique_id}</h6>
                                                                <h3 className="mb-3 fs-4 fw-bold">
                                                                    {i?.project_name}

                                                                </h3>
                                                                <div className=" d-xl-flex">
                                                                    <div className=" mb-2">
                                                                        <a href={void (0)} className="text-decoration-none a-btn px-xxl-3 px-1  py-1 me-1">{i?.DecarbRecommendations?.origin}</a>
                                                                    </div>
                                                                    <div className=" mb-2">
                                                                        <a href={void (0)} className="text-decoration-none a-btn px-xxl-3 px-1 py-1 me-1">{i?.DecarbRecommendations?.destination}</a>
                                                                    </div>


                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div className="quartely-wrapper p-3">
                                                            <Row>
                                                                <Col lg="6">
                                                                    <div>
                                                                        <div className="quartely">
                                                                            <h4 className="mb-3 h-emissions">
                                                                                Estimated cost impact
                                                                            </h4>
                                                                            <div>
                                                                                <h5 className="d-flex align-items-center fw-semibold fs-4">

                                                                                    N/A
                                                                                </h5>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col lg="6">
                                                                    <div>
                                                                        <div className="quartely">
                                                                            <h4 className="mb-3 h-emissions">
                                                                                Projected emissions reduction
                                                                            </h4>
                                                                            <div>
                                                                                <h5 className="d-flex align-items-center fw-semibold fs-4"><span> <img src={Garrow} alt="icon" /></span>{i?.emission_percent || 0}%</h5>
                                                                                <h6 className="fs-14 fw-semibold">By Q{i?.quarter} {i?.year}</h6>
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
                                </div>}
                                {/*Alternative Fuel Usage Projects*/}
                                {(selectByLever === "" || selectByLever === "alternative_fuel") &&
                                    <div className="pt-4 mb-4">
                                        <div className="pacific-overview">
                                            <div className="d-flex align-items-center">
                                                <h2 className=" fw-semibold me-3">Alternative Fuel Usage Projects</h2>
                                                <div className="total-projects-shown d-flex justify-content-center align-items-center me-3">
                                                    <span>{projectList?.data?.alternative_fuel?.length}</span>
                                                </div>
                                                <a href={void (0)} onClick={() => setShowAllAlternative(!showAllAlternative)} className="text-gray m-cursor">{!showAllAlternative ? 'Show All' : 'Hide'}</a>
                                            </div>

                                        </div>
                                        <Row>
                                            {projectList?.data?.alternative_fuel?.slice(0, showAllAlternative ? projectList?.data?.alternative_fuel?.length : 3)?.map(i => (
                                                <Col onClick={() => navigate(`/project-detail/${i?.id}`)} xl="4" lg="6" md="6" key={i?.id} className="mb-4">
                                                    <div className="inner-data-region mt-3 h-100">
                                                        <div className="priority-btn-wrap">
                                                            <div className="priority-btn">
                                                                <label className="px-4 py-1 highest-priority">
                                                                    On Track
                                                                </label>

                                                            </div>
                                                            <div className="id-data p-3">
                                                                <div className=" ">
                                                                    <div className=" text-end">
                                                                        <a href={void (0)} onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            removeProject(i?.id)
                                                                        }} class="fs-14">Remove</a>
                                                                    </div>


                                                                    <h6 className="fs-14 fw-semibold">ID : #{i?.project_unique_id}</h6>
                                                                    <h3 className="mb-3 fs-4 fw-bold">{i?.project_name}

                                                                    </h3>
                                                                    <div className=" d-md-flex">
                                                                        <div className=" mb-2">
                                                                            <a href={void (0)} className="text-decoration-none a-btn px-xxl-3 px-1  py-1 me-1">{i?.DecarbRecommendations?.origin}</a>
                                                                        </div>
                                                                        <div className=" mb-2">
                                                                            <a href={void (0)} className="text-decoration-none a-btn px-xxl-3 px-1 py-1 me-1">{i?.DecarbRecommendations?.destination}</a>
                                                                        </div>



                                                                    </div>
                                                                    <div className=" d-md-flex">

                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="quartely-wrapper p-3">
                                                                <Row>
                                                                    <Col lg="6">
                                                                        <div>
                                                                            <div className="quartely">
                                                                                <h4 className="mb-3 h-emissions">
                                                                                    Estimated cost impact
                                                                                </h4>
                                                                                <div>
                                                                                    <h5 className="d-flex align-items-center fw-semibold fs-4">

                                                                                        N/A
                                                                                    </h5>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div>
                                                                            <div className="quartely">
                                                                                <h4 className="mb-3 h-emissions">
                                                                                    Projected emissions reduction
                                                                                </h4>
                                                                                <div>
                                                                                    <h5 className="d-flex align-items-center fw-semibold fs-4"><span> <img src={Garrow} alt="icon" /></span>{i?.emission_percent || 0}%</h5>
                                                                                    <h6 className="fs-14 fw-semibold">By Q{i?.quarter} {i?.year}</h6>
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
                                    </div>}

                                {/*Alternative Fuel Usage Projects*/}
                                {(selectByLever === "" || selectByLever === "carrier_shift") &&
                                    <div className="pt-4 mb-4">
                                        <div className="pacific-overview">
                                            <div className="d-flex align-items-center">
                                                <h2 className=" fw-semibold me-3">Carrier Shift Projects</h2>
                                                <div className="total-projects-shown d-flex justify-content-center align-items-center me-3">
                                                    <span>{projectList?.data?.carrier_shift?.length}</span>
                                                </div>
                                                <a href={void (0)} onClick={() => setShowAllCarrierShift(!showAllCarrierShift)} className="text-gray m-cursor">{!showAllCarrierShift ? 'Show All' : 'Hide'}</a>
                                            </div>

                                        </div>
                                        <Row>
                                            {projectList?.data?.carrier_shift?.slice(0, showAllCarrierShift ? projectList?.data?.carrier_shift?.length : 3)?.map(i => (
                                                <Col onClick={() => navigate(`/project-detail/${i?.id}`)} xl="4" lg="6" md="6" key={i?.id} className="mb-4">
                                                    <div className="inner-data-region mt-3 h-100">
                                                        <div className="priority-btn-wrap">
                                                            <div className="priority-btn">
                                                                <label className="px-4 py-1 highest-priority">
                                                                    On Track
                                                                </label>

                                                            </div>
                                                            <div className="id-data p-3">
                                                                <div className=" ">
                                                                    <div className=" text-end">
                                                                        <a href={void (0)} onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            removeProject(i?.id)
                                                                        }} class="fs-14">Remove</a>
                                                                    </div>


                                                                    <h6 className="fs-14 fw-semibold">ID : #{i?.project_unique_id}</h6>
                                                                    <h3 className="mb-3 fs-4 fw-bold">{i?.project_name}

                                                                    </h3>
                                                                    <div className=" d-md-flex">
                                                                        <div className=" mb-2">
                                                                            <a href={void (0)} className="text-decoration-none a-btn px-xxl-3 px-1  py-1 me-1">{i?.DecarbRecommendations?.origin}</a>
                                                                        </div>
                                                                        <div className=" mb-2">
                                                                            <a href={void (0)} className="text-decoration-none a-btn px-xxl-3 px-1 py-1 me-1">{i?.DecarbRecommendations?.destination}</a>
                                                                        </div>



                                                                    </div>
                                                                    <div className=" d-md-flex">

                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="quartely-wrapper p-3">
                                                                <Row>
                                                                    <Col lg="6">
                                                                        <div>
                                                                            <div className="quartely">
                                                                                <h4 className="mb-3 h-emissions">
                                                                                    Estimated cost impact
                                                                                </h4>
                                                                                <div>
                                                                                    <h5 className="d-flex align-items-center fw-semibold fs-4">

                                                                                        N/A
                                                                                    </h5>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6">
                                                                        <div>
                                                                            <div className="quartely">
                                                                                <h4 className="mb-3 h-emissions">
                                                                                    Projected emissions reduction
                                                                                </h4>
                                                                                <div>
                                                                                    <h5 className="d-flex align-items-center fw-semibold fs-4"><span> <img src={Garrow} alt="icon" /></span>{i?.emission_percent || 0}%</h5>
                                                                                    <h6 className="fs-14 fw-semibold">By Q{i?.quarter} {i?.year}</h6>
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
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default MyProject