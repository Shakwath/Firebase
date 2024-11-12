import { GoogleAuthProvider, signOut } from "firebase/auth";
import auth from "../Firebase/Firebase.init";
import App from "../../App";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { getAuth } from "firebase/auth";


const Login = () => {
    const [user ,setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = ()=>
    {
        signInWithPopup(auth,provider)
        .then((result) =>{
              console.log(result);
              setUser(result.user);
          })
          .catch((error) =>{
            console.log('ERROR',error);
            setUser(null);
          })
    }
    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                console.log(result.user);
                setUser(result.user);
            })
            .catch(error => console.log('ERROR', error))
    }

    const handleSignOut = ()=>
    {
        signOut(auth).then(() => {
            console.log(' Sign-out successful.')
          }).catch(error =>console.log(error))
    }

    return (
        <div>
           <button onClick={handleGoogleSignIn}>Login with Google</button>
        <button onClick={handleSignOut}>SignOut</button>
           {/* {user && <h4>{user.displayName}</h4>}  */}
             <button onClick={handleGithubSignIn}>Login with Github</button>
           {
            user && <div>
                <p>Email: {user.email}</p>
                <img src={user.photoURL}></img>
            </div>
           }
        </div>
    );
};

export default Login;