import { firestore as db } from "../firebase/client";
import { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function sendQuestion() {
  const [question, setQuestion] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const date = format(new Date(), "yyyyMMddHH:mm:ss");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const questionRef = collection(db, `/question/${id}/questions`);
      const data = {
        question: question,
      };

      await setDoc(doc(questionRef, `${date}`), data);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          required
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
