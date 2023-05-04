import SpinnerGif from "../assets/SpinnerGif.gif"
const Spinner = ()=>{
    return(
        <>
        <img src={SpinnerGif}
            alt="spinner"
            className="d-block m-auto"
            style={{width:"200px"}}
             />
        </>
    )
}

export default Spinner;