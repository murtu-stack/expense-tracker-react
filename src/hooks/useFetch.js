import { useEffect, useReducer } from 'react'
import axios from 'axios';
const ACTIONS = {
    API_REQUEST: 'api_request',
    FETCH_DATA: 'fetch_data',
    ERROR_DATA : 'error_data'
}


const initial_state = {
    data: [],
    loading: false,
    error: null
}
const reducer = (state,{ type, payload }) => {
    switch (type) {
        case ACTIONS.API_REQUEST:
            return { ...state,data: {} ,loading: true, error: false}
        case ACTIONS.FETCH_DATA:
            return {...state,data: payload.data, loading: false, error: false}
        case ACTIONS.ERROR_DATA:
            return {...state,loading: false, error: payload}
        default:
            return {...state}
        
    }
}
const useFetch = (url) => {

    const [state, dispatch] = useReducer(reducer, initial_state)
    
    useEffect(() => {
        dispatch({type: ACTIONS.API_REQUEST})
        axios.get(url).then((res) => {
            console.log("res", res);
            dispatch({type: ACTIONS.FETCH_DATA, payload: res.data})
        }).catch((error) => {
            // console.log(error.,'error')
            dispatch({type: ACTIONS.ERROR_DATA, payload: error})
        })
        
    },[url])

    return state
}
export default useFetch