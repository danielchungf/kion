import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function NotFound() {
  return (
    <PageLayout activePage="index">
      <h1 className="font-young-serif font-medium text-neutral-800 mb-6 text-[36px] md:text-6xl">
        Recipe not found
      </h1>
      <p className="font-source-serif text-[16px] tracking-tight text-neutral-700 mb-8">
        We couldn't find that recipe. It may have been moved or doesn't exist
        yet.
      </p>
      <Link
        href="/"
        className="font-young-serif font-medium text-xl text-neutral-800 hover:text-neutral-950 transition-colors"
      >
        Back to Index
      </Link>
    </PageLayout>
  );
}
