import { firestore as db } from "../firebase/client";
import { useState, useEffect } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { auth } from "../firebase/client";
import { onAuthStateChanged } from "firebase/auth";

export function AuthStateChanged({ auth, setUser }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      console.log(user.displayName);
    });

    return () => {
      unsubscribe();
    };
  }, [auth, setUser]);

  return null;
}

export default function sendQuestion() {
  const [question, setQuestion] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const date = format(new Date(), "yyyyMMddHH:mm:ss");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const questionRef = collection(db, `/question/${id}/questions`);
      const data = {
        question: question,
        user: user.displayName,
      };

      await setDoc(doc(questionRef, `${date}`), data);
      setQuestion("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <AuthStateChanged auth={auth} setUser={setUser} />
      <form onSubmit={handleSubmit} className="flex justify-between w-11/12">
        <input
          className="w-full border-b-2"
          required
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button type="submit" className="flex flex-col items-end">
          <i className="ml-4 text-blue-300 material-symbols-outlined">send</i>
        </button>
      </form>
    </>
  );
}
