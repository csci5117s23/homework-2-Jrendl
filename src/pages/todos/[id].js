import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function todo(){
    const [jsonData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();

    
    const REACT_APP_API_ENDPOINT = 'https://backend-cxwm.api.codehooks.io/dev';
    const REACT_APP_API_KEY = '40d236ec-c97e-4fc8-991c-fa822109ef51';
    
    useEffect(() => {
        const fetchData = async () => {
            const {id} = router.query;
            const response = await fetch((REACT_APP_API_ENDPOINT).concat("/todos/", 1), {
                'method':'GET',
                'headers': {'x-apikey': REACT_APP_API_KEY}
            })
            console.log("getting data from %s/%s")
            const data = await response.json()
            // update state -- configured earlier.
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, [])
    
    
    const toggleDone = async () => {
        const jsonDoneOut = {"done": !jsonData['done']};
        const response = await fetch((REACT_APP_API_ENDPOINT).concat("/todos/", 1),{
            'method': 'PATCH',
            'headers': {'x-apikey': REACT_APP_API_KEY, 'Content-Type': 'application/json'},
            'body': JSON.stringify(jsonDoneOut)
        });

        if(response.ok){
            console.log("changed");
            let temp = jsonData;
            temp['done'] = !temp['done'];
            setData(temp);
        }

    }
    /*
    const summary = get summary from db
    const done = get done from db
    */

    if(loading){
        return <>
        <div> Loading.... </div>
        </>
    }else{
        return(
            <>
            <div>
                <div className="user">{jsonData['user_id']}</div>
                <div className="description">{jsonData['description']}</div>
                <input type="checkbox" checked={jsonData['done']} onChange={toggleDone}></input>
            </div>
            </>
        )
    }

    
}