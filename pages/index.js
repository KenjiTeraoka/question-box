import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/client";
import Link from "next/link";
import { firestore as db } from "../firebase/client";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

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
  const [inputValue, setInputValue] = useState("");
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const postDate = collection(db, "question");
    getDocs(postDate).then((snapShot) => {
      console.log(snapShot.docs.map((doc) => doc.id));
      setPosts(snapShot.docs.map((doc) => doc.id));
    });
  }, [inputValue]);

  if (isLoading) {
    return null;
  }

  const randomString = Math.random().toString(36).substring(7);
  const randomLink = `/posts/${randomString}`;

  const inputLink = async () => {
    const data = {};
    await setDoc(doc(db, "question", `${randomString}`), data);
  };

  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.displayName);
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogout = () => {
    return signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.includes(inputValue)) {
      console.log("match!");
      router.push(`/posts/${inputValue}`);
    } else {
      console.log("no match...");
      alert("部屋がありません。");
    }
    // router.push(`/path/${inputValue}`);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-lg min-h-full py-20 mx-auto text-center bg-white rounded-xl">
        <AuthStateChanged auth={auth} setUser={setUser} />
        <h2 className="text-6xl">QuestionBox</h2>
        <p className="mt-2 text-lg">質問箱</p>

        <p className="mt-10">Welcome to the Question Box!</p>
        <div className="mt-12">
          {user ? (
            <div className="flex items-end w-2/3 h-12 mx-auto">
              <div className="w-full text-center">
                Login: {user.email}
                <span
                  onClick={handleLogout}
                  className="ml-4 text-blue-500 hover:opacity-60"
                >
                  singn out
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="block w-2/3 h-12 py-2 mx-auto text-white bg-blue-900 rounded-lg"
            >
              Login
            </button>
          )}

          {user ? (
            <div>
              <Link href={randomLink} onClick={inputLink}>
                <div className="block w-2/3 py-3 mx-auto mt-5 text-white bg-blue-900 rounded-lg hover:opacity-60">
                  +新しい部屋を作る
                </div>
              </Link>

              <form onSubmit={handleSubmit}>
                <input
                  className="block w-2/3 px-4 py-3 mx-auto mt-5 text-center text-white placeholder-white bg-blue-900 rounded-lg focus:border-0 focus:bg-opacity-80"
                  type="text"
                  placeholder="部屋の番号を入力してくだい"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </form>
            </div>
          ) : (
            <div>
              <div className="block w-2/3 py-3 mx-auto mt-5 text-white bg-blue-900 rounded-lg opacity-30">
                +新しい部屋を作る
              </div>
              <div className="block w-2/3 py-3 mx-auto mt-5 text-white bg-blue-900 rounded-lg opacity-30">
                部屋の番号を入力してくだい
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
