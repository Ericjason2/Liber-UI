import type { Metadata } from "next";
import VerifyEmailView from "@/views/VerifyEmailView";

export const metadata: Metadata = {
  title: "Verify Email — Liber UI",
  description: "Verify your email address to activate your Liber UI account.",
};

export default function VerifyEmailRoute() {
  return <VerifyEmailView />;
}
