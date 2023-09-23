import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = e => {
        const filter = e.target.value
        dispatch(changeFilter(filter))
    }
    return <div>
        filter <input name="filter" onChange={handleChange}/>
    </div>
}

export default Filter