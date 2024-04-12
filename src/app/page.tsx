import Homepage from "@/components/pages/homepage";
import { Suspense } from "react";

export default function Home() {
  // I decided the best way to follow the technical challenge requirements was
  // by not using Next.js SSR. I disabled SSR in both pages, using React Query as
  // the fetching mechanism.

  return (
    <Suspense>
      <Homepage />
    </Suspense>
  );
}
