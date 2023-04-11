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

    
    
    useEffect( () => {

        if(router.isReady){
            console.log("getting toekn and grabbing the todo item");
            const token = getToken({Template: "codehooks"});
            const todoObject = fetchTodo(token, id);
            setData(todoObject);

            setDone(todoObject["done"]);
            console.log("got todo item");
            setLoading(false);
        }
        
        // if(userId){
        //     console.log("getting toekn and grabbing the todo item");
        //     const token = getToken({Template: "codehooks"});
        //     setData(fetchTodo(token, id));

        //     setDone(jsonData["done"]);
        //     console.log("got todo item");
        //     setLoading(false);
        // }
        
    }, [router])
    
    
    const toggleDone = async () => {
        setDone(!done);
        const token = await getToken({Template: "codehooks"});

        const response = cohoSetDone(token, id, done);

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