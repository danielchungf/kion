import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { typography, colors } from "@/lib/tokens";

export default function NotFound() {
  return (
    <PageLayout activePage="index">
      <h1 className={`${typography.h1} mb-6`}>
        Recipe not found
      </h1>
      <p className={`${typography.body} mb-8`}>
        We couldn't find that recipe. It may have been moved or doesn't exist
        yet.
      </p>
      <Link
        href="/"
        className={`${typography.h2} hover:${colors.text.active} transition-colors`}
      >
        Back to Index
      </Link>
    </PageLayout>
  );
}
