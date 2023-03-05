import { useRouter } from "next/router";
import SendQuestion from "@/components/sendQuestion";
import GetQuestion from "@/components/getQuestion";
import Link from "next/link";

export default function Post(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className="h-screen pt-8 pb-20 mx-4">
        <div className="max-w-lg mx-auto">
          <Link href="../../">← </Link>roomID : {id}
        </div>
        <div className="h-full max-w-lg mx-auto mt-2 bg-white rounded-xl">
          <div className="h-full pt-4 pb-12 mx-8 overflow-hidden">
            <GetQuestion />
          </div>

          <div className="absolute w-full max-w-lg px-8 bottom-16">
            <SendQuestion />
          </div>
        </div>
      </div>
    </>
  );
}
