import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {useAuth} from "@clerk/nextjs";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import { fetchTodo , cohoSetDone, changeDescription} from "@/modules/helpers";

export default function todo(){
    const [jsonData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [done, setDone] = useState(false);
    const [description, setDesc] = useState(null);
    
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
                setDesc(todoObject[0]["description"]);
                setLoading(false);
            }else if(isLoaded && !userId){
                console.log("Attempting to access when not logged in");
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
            console.log("changed done value to %s", tempDone);
            setData((await response).json());
        }

    }

    const descChange = async () =>{
        const token = await getToken({Template: "codehooks"});
        const response = changeDescription(token, id, description);

        if(response.ok){
            console.log("Change description to %s", tempDesc);
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
                <SignedIn>
                    <div className="column">
                        <div className="card">
                            <header className="card-header">
                                <input type="checkbox" checked={done} onChange={toggleDone}></input>
                                <input type="text" className="card-header-title" name="newDesc" value={description} onChange={e => setDesc(e.target.value)}></input>
                                <button className="card-header-icon" onClick={descChange}>Change Description</button>
                            </header>
                        </div>
                    
                    </div>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl={"/todos/" + id}/>
                </SignedOut>
            
            </>
            
        )
    }

    
}