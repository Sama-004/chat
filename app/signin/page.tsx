// "use client";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Signin() {
//   const router = useRouter();

//   return (
//     <div>
//       <button
//         onClick={async () => {
//           const res = await signIn("credentials", {
//             username: "test",
//             password: "",
//             redirect: false,
//           });
//           console.log(res);
//           router.push("/");
//         }}>
//         Login with email
//       </button>
//     </div>
//   );
// }
