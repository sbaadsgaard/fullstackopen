import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    message: '',
    display: 'none'
}
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            if (state.timeoutId) {
                clearTimeout(state.timeoutId)
            }
            state.message = action.payload
            state.display = ''
        },
        clearNotification(state) {
            state.message = ''
            state.display = 'none'
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer