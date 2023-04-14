import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { cohoSetDone } from "@/modules/helpers";
import Link from "next/link";


export function TodoList(props){
    return(
        <ul className="column">
            {props.todoItems.map((todo, index)=>{
                return (
                    <li key={index}><TodoCard
                            id = {todo["_id"]}
                            done = {todo["done"]}
                            description = {todo["description"]}
                    /></li>

                )

            })}
        </ul>

    )
        

}


export function TodoCard(props){
    const [todoDone, setDone] = useState(props.done);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const toggleDone = async () => {
        const tempDone = !todoDone;
        setDone(tempDone);
        const token = await getToken({Template: "codehooks"});

        const response = cohoSetDone(token, props.id, tempDone);

        if(response.ok){
            console.log("changed");
            setData((await response).json());
        }

    }
    return(
        <div className="card">
            <header className="card-header">
                <input type="checkbox" checked = {todoDone} onChange = {toggleDone}></input>
                <Link className="card-header-title" href={"/todos/" + props.id}>{props.description}</Link>
            </header>
        </div>
    )
} 