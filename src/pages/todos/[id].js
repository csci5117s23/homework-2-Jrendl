import { useState } from "react";
import { useRouter } from "next/router";

export default function todo(){
    
    const router = useRouter();

    const {id} = router.query

    /*
    const summary = get summary from db
    const done = get done from db
    */


    return(
        <>
        <div>
            {id}
        </div>
        </>
    )
}