import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    message: '',
    display: 'none',
}
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        set(state, action) {
            state.message = action.payload
            state.display = ''
        },
        clear(state) {
            state.message = ''
            state.display = 'none'
        }
    }
})

export const { set, clear } = notificationSlice.actions
export const setNotification = (message, durationSeconds) => {
    return (dispatch, getState) => {
        //shoddy fix for stacking timeouts when voting several times in quick succession. could perhaps store the timeoutid and reset it
        if (getState().notification.display === 'none') {
            dispatch(set(message))

            setTimeout(() => {
                dispatch(clear())
            }, durationSeconds * 1000)
        }
    }
}

export default notificationSlice.reducer