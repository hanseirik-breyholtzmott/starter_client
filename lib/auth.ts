//Nextjs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Helper functions
import axiosInstance from "./axiosInstance";

export async function getServerSideUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const accessToken = cookieStore.get("accessToken");

  if (!session) {
    redirect("/sign-in");
  }

  try {
    const { data } = await axiosInstance.post("/auth/refresh", {
      refreshToken: session.value,
    });

    if (!data.success) {
      redirect("/sign-in");
    }

    return data.user;
  } catch (error) {
    redirect("/sign-in");
  }
}
