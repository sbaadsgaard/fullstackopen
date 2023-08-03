const SearchField = ({searchString, handleSearchChanged}) => {
    const searchChanged = e => {
        handleSearchChanged(e.target.value)
    }
    return <div>
        find countries <input
            onChange={searchChanged}
            value={searchString}
        />
    </div>
}

export default SearchField