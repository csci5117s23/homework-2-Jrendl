import { fetchAllInProgress, addTodoObject} from "@/modules/helpers";
import {useEffect, useState } from "react";
import {useAuth} from "@clerk/nextjs";
import {SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import {TodoList, } from "@/components/todoList"

export default function TodosPage() {
    const [todoItems, setTodoItems] = useState([]);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function getTodos(){
            if(userId){
                const token = await getToken({Template: "codehooks"});

                const userTodos = await fetchAllInProgress(token, userId);

                setTodoItems(userTodos);
                setLoading(false);
            }else if(isLoaded && !userId){
                console.log("Attempting to access when not logged in");
                setLoading(false);
            }

            
        } 
        getTodos();
        
    },  [userId, isLoaded])


    async function createTodoItem(description){
        console.log("I've been called");
        const token = await getToken({Template: "codehooks"});

        const newTodo = await addTodoObject(token, userId, description);
        setTodoItems(todoItems.concat(newTodo));

    }


    

    if(loading){
        return <>
        <div> Loading.... </div>
        </>
    }else{
       
        return(
            <div>
                <SignedIn>
                    <ul className="column">
                        <TodoList todoItems = {todoItems}/>
                    </ul>
                    <div className="column">
                        <AddTodo createTodoItem = {createTodoItem}/>
                    </div>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl="/todos"></RedirectToSignIn>
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
                <input 
                    className= "card-header-title" 
                    type="text" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}/>
                <button 
                    className="card-header-icon" 
                    onClick={
                        () => {
                            props.createTodoItem(description); 
                            setDescription("Add Todo");
                            }}
                >Submit Todo</button>
            </header>
            
        </div>
    )
}