import { redirect } from "next/navigation";

export default function Home() {
  redirect("/parking-lot");
  return <div>Home</div>;
}
