import Link from "next/link"


export default function notFound(){
    return(
        <>
        <div>
        <h1>Can't seem to find that page</h1>
        <Link href='/'>Go Home</Link> {/*eventually link to /todo*/}
        </div>
        </>
    )
}