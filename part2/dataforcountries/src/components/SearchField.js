const SearchField = ({searchString, handleSearchChanged}) => {
    return <div>
        find countries <input
            onChange={handleSearchChanged}
            value={searchString}
        />
    </div>
}

export default SearchField