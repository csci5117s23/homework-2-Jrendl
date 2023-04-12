import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {useAuth} from "@clerk/nextjs";

import { fetchTodo , cohoSetDone} from "@/modules/helpers";

export default function todo(){
    const [jsonData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [done, setDone] = useState(false);
    
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const router = useRouter();
    const {id} = router.query;

    
    
    useEffect(()=>{
        async function doThings(){
            if(router.isReady && userId){
                console.log("getting toekn and grabbing the todo item");
                const token = await getToken({Template: "codehooks"});
                const todoObject = await fetchTodo(token, id, userId);
                await setData(todoObject[0]);
    
                setDone(todoObject[0]["done"]);
                setLoading(false);
            }
        }
        doThings();
    }, [router, isLoaded])
    
    
    const toggleDone = async () => {
        let tempDone = done;
        setDone(!tempDone);
        const token = await getToken({Template: "codehooks"});
        console.log("changed done from %s to %s", tempDone, !tempDone);
        tempDone = !tempDone;

        const response = cohoSetDone(token, id, tempDone);

        if(response.ok){
            console.log("changed");
            setData((await response).json());
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
                <div className="user">{jsonData["user_id"]}</div>
                <div className="description">{jsonData["description"]}</div>
                <input type="checkbox" checked={done} onChange={toggleDone}></input>
            </div>
            </>
        )
    }

    
}