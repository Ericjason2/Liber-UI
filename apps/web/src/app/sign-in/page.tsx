import type { Metadata } from "next";
import SignInView from "@/views/SignInView";

export const metadata: Metadata = {
  title: "Sign In — Liber UI",
  description: "Sign in to your Liber UI account.",
};

export default function SignInRoute() {
  return <SignInView />;
}
