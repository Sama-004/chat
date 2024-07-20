import { ChatLayout } from "@/components/chat/chat-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/nav";
import { cookies } from "next/headers";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  return (
    <>
      {session ? (
        <div>
          <Navbar />
          {/* <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex"> */}
          <div className="w-full">
            <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
          </div>
        </div>
      ) : (
        <div>Not logged in</div>
      )}
    </>
  );
}
