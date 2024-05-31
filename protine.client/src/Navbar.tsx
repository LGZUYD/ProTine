import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();

    const handleClick = (route: string) => {
        navigate(route);
    }

    return (
        <>
            <div className="bg-cyan-600 text-3xl text-center font-semibold">
                <div className="p-10 hover:bg-cyan-500">profile</div>
                <div onClick={() => handleClick('/routines')} className="p-10 hover:bg-cyan-500">routines</div>
                <div onClick={() => handleClick('/workout')} className="p-10 hover:bg-cyan-500">workout</div>
                <div className="p-10 hover:bg-cyan-500">account</div>
                <div className="p-10 hover:bg-cyan-500">logout </div>
            </div>
        </>
    );
}

export default Navbar;