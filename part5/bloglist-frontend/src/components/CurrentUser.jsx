const CurrentUser = ({ user, handleLogout }) => {
    const handleClick = (e) => {
        e.preventDefault()
        handleLogout()
    }
    return (
        <div>
            {user.name} logged in
            <button onClick={handleClick}>Log out</button>
            <br/>
            <br/>
        </div>
    )
}

export default CurrentUser