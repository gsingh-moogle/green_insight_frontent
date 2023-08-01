import moment from "moment";
import LatestUpdate from "../../assets/images/latest-update.svg";
export default function DateTimeShow(){
    return(
        <p className="d-flex align-items-center justify-content-end">Last updated at {moment().format("hh:mm A")} on {moment().format("DD MMM YY")}<span className="ms-2"> <img src={LatestUpdate} /></span></p>
    )
}