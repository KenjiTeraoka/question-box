import { onAuthStateChanged } from "firebase/auth";
import { React, useEffect, useState } from "react";
import { auth } from "../firebase/client";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export function AuthStateChanged({ auth }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  return null;
}

export default function Login() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.displayName);
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const signout = () => {
    return signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AuthStateChanged auth={auth} />
      <button onClick={login}>sign in</button>
      <button onClick={signout}>sign out</button>
    </>
  );
}
