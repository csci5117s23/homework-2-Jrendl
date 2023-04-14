import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"

export function Header(){
    return (
        


        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className = "navbar-item" href = "/">Joe's Todo App</Link>

            </div>
            <div className="navbar-menu">
                <Link className="navbar-item" href="/todos/">Todos</Link>
                <Link className="navbar-item" href="/done/">Completed</Link>
            </div>
            <div className="navbar-end">
                <div className="buttons">
                    <SignedIn>
                        <UserButton className="button is-primary" afterSignOutUrl="/"/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton className="button is-primary" redirectUrl="/todos/">Sign In</SignInButton>
                    </SignedOut>
                </div>
            </div>
            
            
        </nav> 
        



    )   
}

{/* 


        <nav classNameName="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">Joe's Todo App</div>
            <div className="navbar-menu">
                <Link className="navbar-item" href="/todos/">Todos</Link>
                <Link className="navbar-item" href="/done/">Completed</Link>
            </div>
            <div className="navbar-end">
                <div className="buttons">
                    <SignedIn>
                        <SignOutButton className="button is-primary" redirectUrl = "/">Sign Out</SignOutButton>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton className="button is-primary" redirectUrl="/todos/">Sign In</SignInButton>
                    </SignedOut>
                </div>
            </div>
            
            
        </nav> */}


        // <nav className="navbar" role="navigation" aria-label="main navigation">
        //     <div className="navbar-brand">
        //         <a className="navbar-item" href="https://bulma.io">
        //         <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        //         </a>

        //         <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        //         <span aria-hidden="true"></span>
        //         <span aria-hidden="true"></span>
        //         <span aria-hidden="true"></span>
        //         </a>
        //     </div>

        //     <div id="navbarBasicExample" className="navbar-menu">
        //         <div className="navbar-start">
        //         <a className="navbar-item">
        //             Home
        //         </a>

        //         <a className="navbar-item">
        //             Documentation
        //         </a>

        //         <div className="navbar-item has-dropdown is-hoverable">
        //             <a className="navbar-link">
        //             More
        //             </a>

        //             <div className="navbar-dropdown">
        //             <a className="navbar-item">
        //                 About
        //             </a>
        //             <a className="navbar-item">
        //                 Jobs
        //             </a>
        //             <a className="navbar-item">
        //                 Contact
        //             </a>
        //             <hr className="navbar-divider"/>
        //             <a className="navbar-item">
        //                 Report an issue
        //             </a>
        //             </div>
        //         </div>
        //         </div>

        //         <div className="navbar-end">
        //         <div className="navbar-item">
        //             <div className="buttons">
        //             <a className="button is-primary">
        //                 <strong>Sign up</strong>
        //             </a>
        //             <a className="button is-light">
        //                 Log in
        //             </a>
        //             </div>
        //         </div>
        //         </div>
        //     </div>
        //     </nav>