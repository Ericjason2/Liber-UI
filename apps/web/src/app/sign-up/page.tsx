import type { Metadata } from "next";
import SignUpView from "@/views/SignUpView";

export const metadata: Metadata = {
  title: "Create Account — Liber UI",
  description: "Create a Liber UI account to save palettes and bookmarks.",
};

export default function SignUpRoute() {
  return <SignUpView />;
}
