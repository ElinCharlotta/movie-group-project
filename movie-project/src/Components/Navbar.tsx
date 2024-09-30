import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <>
            <div className="navbar-header"></div>
            <Link to="/">Home</Link>
            <Link to="/bookmarked">Bookmarked</Link>
            <Link to="/categories">Categories</Link>
        </>
    );
};

export default Navbar;
