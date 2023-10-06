import { createContext, useContext, useReducer } from "react"

const anecdotesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'CLEAR_MESSAGE':
            return ''
            case 'NOTIFICATION': 
        default:
            return state
    }
}

const AnecdoteContext = createContext()
export const AnecdoteContextProvider = (props) => {
    const [message, dispatch] = useReducer(anecdotesReducer, '')
    return (
        <AnecdoteContext.Provider value={[message, dispatch]}>
            {props.children}
        </AnecdoteContext.Provider>
    )
}

export const useContextValue = () => useContext(AnecdoteContext)[0]
export const useContextDispatch = () => useContext(AnecdoteContext)[1]


export default AnecdoteContext