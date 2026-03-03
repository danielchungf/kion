import Link from "next/link";

interface NavigationProps {
  activePage?: "index" | "ingredients";
}

export default function Navigation({ activePage }: NavigationProps) {
  const navItems = [
    { label: "Index", href: "/", key: "index" as const },
    { label: "Ingredients", href: "/ingredients", key: "ingredients" as const },
  ];

  return (
    <nav className="mb-[100px]">
      <div className="flex gap-12">
        {navItems.map((item) => {
          const isActive = activePage === item.key;
          const colorClass = isActive ? "text-neutral-950" : "text-neutral-500";
          const baseClass = `font-young-serif font-medium text-xl ${colorClass}`;

          return isActive ? (
            <button key={item.key} className={baseClass}>
              {item.label}
            </button>
          ) : (
            <Link key={item.key} href={item.href} className={baseClass}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
