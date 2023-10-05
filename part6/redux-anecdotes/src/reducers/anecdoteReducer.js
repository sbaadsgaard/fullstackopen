import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteServices.create(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const castVote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const toBeUpdated = anecdotes.find(anecdote => anecdote.id === id)
    const updated = { ...toBeUpdated, votes: toBeUpdated.votes + 1 }
    await anecdoteServices.update(updated)
    dispatch(setAnecdotes(anecdotes.map(anecdote => anecdote.id !== id ? anecdote : updated)))
  }
}
export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer