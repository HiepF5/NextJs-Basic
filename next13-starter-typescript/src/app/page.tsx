import Link from "next/link";
import x from "@/styles/app.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOME",
  description: "haha",
};
export default function Home() {
  return (
    <div>
      <ul>
        <li className={x["red"]}>
          <Link href={"/facebook"}>Facebook</Link>
        </li>
        <li>
          <Link href={"/youtube"}>Youtube</Link>
        </li>
        <li>
          <Link href={"/tiktok"}>Tiktok</Link>
        </li>
      </ul>
    </div>
  );
}
