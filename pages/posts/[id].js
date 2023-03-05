import { useRouter } from "next/router";
import SendQuestion from "@/components/sendQuestion";
import GetQuestion from "@/components/getQuestion";

export default function Post(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>ルームナンバー{id}</div>

      <GetQuestion />
      <SendQuestion />
    </>
  );
}
