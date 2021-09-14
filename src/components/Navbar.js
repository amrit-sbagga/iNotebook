import React from 'react'
import PropTypes from 'prop-types';
import { Link, useLocation} from 'react-router-dom';

const Navbar = (props) => {
    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <Link className="navbar-brand" to="/">{props.title}</Link>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
         </button>

         <div className="collapse navbar-collapse" id="navbarSupportedContent">
             <ul className="navbar-nav mr-auto">
             <li className="nav-item active">
                 <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} to="/">Home <span className="sr-only">(current)</span></Link>
             </li>
             <li className="nav-item">
                 <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">{props.aboutText}</Link>
             </li>
             </ul>
             <form className="d-flex">
             {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/> */}
                <Link className="btn btn-primary" role="button" to="/login">Login</Link>
                <Link className="btn btn-primary mx-2" role="button" to="/signup">Signup</Link>
             </form>
         </div>
        </nav>            
     </div>
    )
}

Navbar.propTypes = {
    title : PropTypes.string.isRequired, //pts
    aboutText : PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title : "Set title here",
    aboutText : "Set aboutText here"
}

export default Navbar
