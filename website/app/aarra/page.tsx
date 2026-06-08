import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { getBench } from "@/lib/data";

export const metadata: Metadata = {
  title: "AARRA — Act As a Real Research Assistant",
  description:
    "More independent contributions, critical evaluation, MCP and agent skills. Coming soon.",
};

export default function AARRAPage() {
  return <ComingSoon bench={getBench("aarra")!} />;
}
