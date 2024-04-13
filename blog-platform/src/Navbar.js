import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "./UserContext";

const Navbar = () => {

    const {setUserInfo, userInfo} = useContext(UserContext);
    const history = useHistory();


    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        })
        .then((res) => {
            res.json().then((userInfo) => {
                setUserInfo(userInfo);
            });
        })


    }, [setUserInfo]);

    const logout = () => {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
        history.push('/');
    };

    const username = userInfo?.username;

    return (
        <nav className="navbar">
            <Link to="/"><h1>Blog</h1></Link>
            <div className="links">
                <Link to="/">Home</Link>
                { username && (
                    <>
                        <Link to="/create">New Blog</Link>   
                        <a href="#" onClick={logout}>Log Out</a> 
                    </>
                )}
                { !username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}


            </div>
        </nav>
    );
}

export default Navbar;