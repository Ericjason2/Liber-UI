import type { Metadata } from "next";
import ForgotPasswordView from "@/views/ForgotPasswordView";

export const metadata: Metadata = {
  title: "Reset Password — Liber UI",
  description: "Reset your Liber UI account password.",
};

export default function ForgotPasswordRoute() {
  return <ForgotPasswordView />;
}
