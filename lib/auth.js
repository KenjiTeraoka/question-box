import { auth } from "../firebase/client";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";

export const login = () => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const logIn = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const { refrensToken, providerData } = user;

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refrensToken));

    router.push("/");
  };

  // return signInWithPopup(auth, provider)
  //   .then((result) => {
  //     console.log(result.user.displayName);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
};

export const signout = () => {
  return signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onAuthStateChanged = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("User:", user);
  }, [user]);
};
