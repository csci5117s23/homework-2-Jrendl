import { SignIn } from "@clerk/nextjs";


export default function login(){
    return(
        <>
        <SignIn routing="path" path="/login" redirectUrl="/todos"/>
        </>
    )
}