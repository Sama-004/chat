import { ChatLayout } from "@/components/chat/chat-layout";
import Navbar from "@/components/nav";
import { cookies } from "next/headers";

export default function Dashboard() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  return (
    <div>
      <Navbar />
      {/* <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex"> */}
      <div className="w-full">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </div>
  );
}
