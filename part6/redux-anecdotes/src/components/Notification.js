import { useSelector } from "react-redux"

const Notification = () => {
  const { display, message } = useSelector(({ anecdotes, filter, notification }) => {
    return notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification