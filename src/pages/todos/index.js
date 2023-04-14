import Link from "next/link";
import { fetchAllInProgress, addTodoObject} from "@/modules/helpers";
import { useCallback, useEffect, useState } from "react";
import {useAuth} from "@clerk/nextjs";
import {SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import {TodoList} from "@/components/todoList"

export default function TodosPage() {
    const [todoItems, setTodoItems] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [somethingChanged, triggerChange] = useState(false);


    useEffect(() => {
        async function getTodos(){
            if(userId){
                const token = await getToken({Template: "codehooks"});

                const userTodos = await fetchAllInProgress(token, userId);

                setTodoItems(userTodos);
                triggerChange(false);
                setLoading(false);
            }else{
                setLoading(false);
            }

            
        } 
        getTodos();
        
    },  [isLoaded, somethingChanged])


    async function createTodoItem(description){
        const token = await getToken({Template: "codehooks"});

        const response = await addTodoObject(token, userId, description);

        if(response.ok){
            const newTodo = response.json();

            let tempTodoList = todoItems;
            tempTodoList.push(newTodo);
            setTodoItems(tempTodoList);
            triggerChange(true);
            setLoading(true);
        }
    }


    

    if(loading){
        return <>
        <div> Loading.... </div>
        </>
    }else{
        return(
            <div>
                <SignedIn>
                    <TodoList todoItems = {todoItems}></TodoList>
                    <div className="column">
                        <AddTodo createTodoItem = {createTodoItem}/>
                    </div>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl="/todos/"></RedirectToSignIn>
                </SignedOut>
            </div>
        )
        

        
    }

    

}


function AddTodo(props){
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [description, setDescription] = useState("Add Todo");
    
    

    return(
        <div className="card">
            <header className="card-header">
                <input className= "card-header-title" type="text" value={description} onChange={e => setDescription(e.target.value)}></input>
                <button className="card-header-icon" onClick={() => props.createTodoItem(description)}>Submit Todo</button>
            </header>
            
        </div>
    )
}