import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestore as db } from "../firebase/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function getQuestion() {
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState([]);
  const getDataLink = `/question/${id}/questions`;

  useEffect(() => {
    const postDate = collection(db, getDataLink);
    getDocs(postDate).then((snapShot) => {
      console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });

    onSnapshot(postDate, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
    });
  }, [id]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.question}>
          <p>{post.question}</p>
        </div>
      ))}
    </div>
  );
}
