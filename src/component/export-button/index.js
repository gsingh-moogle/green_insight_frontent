import Export from "../../assets/images/export.svg";

const ExportButton = () => {


    return (
        <>
            <div className="pt-3 dropdown-comp opacity-1">
                <button type="button" className="export border-0 d-flex justify-content-end">
                    <span className="me-2">
                        <img src={Export} alt="ico" />
                    </span>
                    Export
                </button>
            </div>
        </>
    );
}

export default ExportButton