import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin({ username, password })
        setPassword('')
        setUsername('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)} /><br />
                </div>
                <div>
                    Password <input type="text" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm