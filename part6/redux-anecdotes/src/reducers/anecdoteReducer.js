import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
/*
export const castVote = (id) => {
  return {
    type: 'CAST_VOTE',
    payload: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE_ANECDOTE',
    payload: asObject(content)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CAST_VOTE':
      const id = action.payload.id
      const toBeUpdated = state.find(a => a.id === id)
      const updated = { ...toBeUpdated, votes: toBeUpdated.votes + 1 }
      return state.map(a => a.id !== id ? a : updated)
    case 'CREATE_ANECDOTE':
      return [...state, action.payload]
    default:
      return state
  }
}
*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    castVote(state, action) {
      const id = action.payload
      const toBeUpdated = state.find(anecdote => anecdote.id === id)
      const updated = { ...toBeUpdated, votes: toBeUpdated.votes + 1 }
      return state.map(anecdote =>  anecdote.id !== id ? anecdote : updated)
    }
  }
})

export const {createAnecdote, castVote} =  anecdoteSlice.actions
export default anecdoteSlice.reducer