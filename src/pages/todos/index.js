import Link from "next/link";
import { fetchAllInProgress, cohoSetDone } from "@/modules/helpers";
import { useEffect, useState } from "react";
import {useAuth} from "@clerk/nextjs";

export default function todoList() {
    const [todoItems, setTodoItems] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function getTodos(){
            if(isLoaded){
                const token = await getToken({Template: "codehooks"});

                const userTodos = await fetchAllInProgress(token, userId);

                setTodoItems(userTodos);
                setLoading(false);
            }
            
        } 
        getTodos();
        
    },  [isLoaded])
    

    if(loading){
        return <>
        <div> Loading.... </div>
        </>
    }else{
        return (
            <>
                <ul>
                    {todoItems.map((todo, index)=>{
                        return <li key={index}><TodoCard
                                    id = {todo["_id"]}
                                    done = {todo["done"]}
                                    description = {todo["description"]}
                        /></li>
                    })}
                </ul>
            </>
        )

    }

    

}



function TodoCard(props){
    const [todoDone, setDone] = useState(props.done);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const toggleDone = async () => {
        const tempDone = !todoDone;
        setDone(tempDone);
        const token = await getToken({Template: "codehooks"});

        const response = cohoSetDone(token, props.id, todoDone);

        if(response.ok){
            console.log("changed");
            setData((await response).json());
        }

    }
    return(<>
    
        <input type="checkbox" checked = {todoDone} onChange = {toggleDone}></input>
        <Link href={"/todos/" + props.id}>{props.description}</Link>
    </>)
} 