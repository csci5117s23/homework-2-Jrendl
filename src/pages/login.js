import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import Router from "next/router";


export default function login(){
    const { isLoaded, userId, sessionId, getToken } = useAuth();


    useEffect(() => {

        if(userId){
            Router.push("/todos/");
        }
    }, []);

    
    return(
        <>
        <SignUp routing="path" path="/login" redirectUrl="/todos/" homeUrl="/todos/"/>
        </>
    )
}