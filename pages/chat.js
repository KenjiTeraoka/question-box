import { firestore as db } from "../firebase/client";
import { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Form() {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const citiesRef = collection(db, "test");
      const data = {
        name: name,
      };

      await setDoc(doc(citiesRef, "test"), data);
      console.log(name);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
