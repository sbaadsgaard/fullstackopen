import { useState } from "react"

const SearchFilter = ({ searchString, setSearchString }) => {
    return <div>
        filter shown with <input value={searchString} onChange={e => setSearchString(e.target.value)}/>
    </div>
}

export default SearchFilter