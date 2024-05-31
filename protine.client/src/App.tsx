import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function App() {

    return (
        <>
            <div className="grid grid-cols-5 gap-4 h-screen ">
                <div className="col-span-1 bg-cyan-600">
                    <Navbar />
                </div>

                <div className="col-span-4 text-black">
                <Outlet/>
                </div>
            </div>
        </>
    );
}

export default App;