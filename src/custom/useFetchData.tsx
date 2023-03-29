import React, {useState, useReducer, useEffect, useCallback} from 'react'
import axios from 'axios'

export const initial = {
    fetching: false,
    error: false,
    data: undefined
}

export const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                fetching: true,
                error: false,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                fetching: false,
                error: false,
                data: action.payload
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                fetching: false,
                error: true,
            };
        case 'FETCH_CLEAR':
            return initial;
        default: 
        throw new Error()    

    }
};

const useFetchData=()=>{
    const [url, set] = useState('')

    const [state, dispatch] = useReducer(dataFetchReducer, initial);

    useEffect(()=>{
        const fetchData = async (fetchUrl)=> {
            dispatch({type: "FETCH_INIT"});
            try {
                if (Array.isArray(fetchUrl)) {
                    let promises = fetchUrl.map((x)=> axios(x));
                    let result = await Promise.all(promises)
                    let payload = result.map((x)=>x.data)
                    dispatch({ type: "FETCH_SUCCESS", payload});
                } else if (fetchUrl) {
                    let result = await axios(fetchUrl);
                    dispatch({
                        type: 'FETCH_SUCCESS',
                        payload: result.data
                    })
                }
            } catch (error) {
                dispatch({type: 'FETCH_FAILURE'})
            }
        }

        if (url) {
            fetchData(url)
        }
        return ()=> {dispatch({type:'FETCH_CLEAR'})}
    },[url]);

    const setUrl = useCallback((x)=>{
        set(x)
    },[])

    const reload = useCallback((x)=>{
        set('')
        setTimeout(()=>set(x),1000)
    }, [])

    return [
        state,{
            setUrl,
            reload
        }
    ]
}

export default useFetchData;