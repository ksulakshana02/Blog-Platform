import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleRegister = (e) =>{
        e.preventDefault();
        fetch('http://localhost:4000/register',{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({username,password}) 
        })
        .then((res) => {
            if(res.status === 200){
                alert("registration successful")
            console.log("Registered")
            history.push('/login')
            } else {
                alert("registration failed")
            }
        });
    }

    return ( 
        <div className="register-page">
            <h2>Register</h2>
            <form className="register" onSubmit={handleRegister}>
                <label htmlFor="">Username:</label>
                <input type="text" placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                />
                <label htmlFor="">Password:</label>
                <input type="password" placeholder="Password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button>Register</button>
            </form>
        </div>
     );
}
 
export default Register;