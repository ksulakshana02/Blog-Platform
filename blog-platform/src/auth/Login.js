import { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../UserContext";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUserInfo} = useContext(UserContext);
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/login',{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({username, password}),
            credentials: 'include',
        })
        .then((res) => {
            if(res.status === 200){
                console.log("login successful");
                res.json().then(userInfo => {
                    setUserInfo(userInfo);
                })
                history.push("/");
            } else{
                alert("Login failed");
            }
        });
    }

    return ( 
        <div className="login-page">
            <h2>Login</h2>
            <form action="" className="login" onSubmit={handleLogin}>
                <label htmlFor="">Username:</label>
                <input type="text" placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="">Password:</label>
                <input type="password" placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
        </div>
     );
}
 
export default Login;