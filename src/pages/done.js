import Link from "next/link";
import { fetchAllDone} from "@/modules/helpers";
import { useEffect, useState } from "react";
import {useAuth} from "@clerk/nextjs";
import {SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import {TodoList} from "@/components/todoList"

export default function TodosPage() {
    const [todoItems, setTodoItems] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function getTodos(){
            if(isLoaded && userId){
                const token = await getToken({Template: "codehooks"});

                const userTodos = await fetchAllDone(token, userId);

                setTodoItems(userTodos);
                setLoading(false);
            }else if (isLoaded){
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
        return(
            <div>
                <SignedIn>
                    <TodoList todoItems = {todoItems}></TodoList>
                    <Link href = "/todos/"> In-Progress Todos</Link>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl="/todos/"></RedirectToSignIn>
                </SignedOut>
            </div>
        )
        

        
    }

    

}