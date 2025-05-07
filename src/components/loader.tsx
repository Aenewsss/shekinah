import { CircleLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center z-30">
            <div className="bg-[rgba(0,0,0,0.6)] absolute top-0 left-0 z-10 w-full h-full"></div>
            <CircleLoader color="white" className="relative z-20" />
        </div>
    )
}