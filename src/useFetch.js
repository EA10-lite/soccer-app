import { useState, useEffect } from 'react';

const API__KEY = '41fd0c51b4mshfd1ee4d4b161260p175041jsn41760a789265';
const host = "api-football-v1.p.rapidapi.com";
const useFetch = (url)=> {
    const [data,setData] = useState(null);
    const [error,setError] = useState(false);
    const [pending,setPending] = useState(true);

    useEffect(()=>{
        const abortConst = new AbortController();
        fetch(url,{
            "method": "GET",
            "headers": {
                "x-rapidapi-host": host,
                "x-rapidapi-key": API__KEY
            }
        },{ signal : abortConst.signal } )
        .then(res => {
            return res.json()
        })
        .then(res => {
            setData(res.response)
            setPending(false)
        })
        .catch(err =>{
            setError(err)
            setPending(false)
        })
        return ()=> abortConst.abort();
    },[url])

    return {
        data,
        error, 
        pending
    }
}

export default useFetch;