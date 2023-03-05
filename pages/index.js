import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/client";
import Link from "next/link";
import { firestore as db } from "../firebase/client";
import { doc, setDoc } from "firebase/firestore";

export function AuthStateChanged({ auth, setUser }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth, setUser]);

  return null;
}

export default function Index() {
  const { isLogin, isLoading } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);

  if (isLoading) {
    return null;
  }

  const randomString = Math.random().toString(36).substring(7);
  const randomLink = `/posts/${randomString}`;

  const inputLink = async () => {
    const data = {};
    await setDoc(doc(db, "question", `${randomString}`), data);
  };

  return (
    <div className="max-w-xl min-h-screen mx-auto text-center bg-white">
      <AuthStateChanged auth={auth} setUser={setUser} />
      <h2 className="text-5xl ">QuestionBox</h2>

      <Link href={randomLink} onClick={inputLink}>
        +新しい部屋を作る
      </Link>

      <div>
        <p>{user ? user.email : null}</p>
      </div>
    </div>
  );
}
