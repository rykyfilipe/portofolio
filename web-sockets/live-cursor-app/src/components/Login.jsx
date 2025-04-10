import {useState} from "react";

const Login = ({onSubmit}) => {
    const [username, setUsername] = useState("");

    return (
        <div>
            <h1>Welcome</h1>
            <form onSubmit={() => {
                onSubmit(username);
            }}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;