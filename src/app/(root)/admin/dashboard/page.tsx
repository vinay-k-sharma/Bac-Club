import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  const { sessionClaims } = auth();


  if (sessionClaims?.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the Admin role.</p>
    </>
  );
}