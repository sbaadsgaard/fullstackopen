import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContextDispatch } from './components/AnecdotesContext'

const App = () => {
  const dispatch = useContextDispatch()
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      queryClient.setQueryData(['anecdotes'],
        (anecdotes) => anecdotes.map(anecdote => anecdote.id !== updated.id ? anecdote : updated))
    },
  })

  const showNotification = (message, durationSeconds = 5) => {
    dispatch({
      type: 'SET_MESSAGE',
      message: message
    })
    setTimeout(() => {
      dispatch({type: 'CLEAR_MESSAGE'})
    }, durationSeconds*1000);
  }
  const handleVote = (anecdote) => {
    showNotification(`You voted for '${anecdote.content}'`)
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <>loading...</>
  if (error) return <>{`Anecdote service unavailable due to server issues: ${error.message}`}</>
  const anecdotes = data
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm showNotification={showNotification}/>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
