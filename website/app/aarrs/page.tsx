import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { getBench } from "@/lib/data";

export const metadata: Metadata = {
  title: "AARRS — Act As a Real Research Scientist",
  description:
    "Fully independent research and scientific discovery with minimal supervision. Coming soon.",
};

export default function AARRSPage() {
  return <ComingSoon bench={getBench("aarrs")!} />;
}
