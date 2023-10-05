import { useDispatch, useSelector } from "react-redux"
import { castVote } from "../reducers/anecdoteReducer"
import {setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const vote = (e, id, content) => {
        e.preventDefault()
        dispatch(castVote(id))
        dispatch(setNotification(`You voted for '${content}'`, 5))
    }
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
        return filteredAnecdotes.toSorted((first, second) => first.votes < second.votes)
    })

    return <>
        {
            anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={(e) => vote(e, anecdote.id, anecdote.content)}
                />)
        }
    </>
}

export default AnecdoteList