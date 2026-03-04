import Image from "next/image";
import Link from "next/link";
import { typography, colors, spacing } from "@/lib/tokens";

interface NavigationProps {
  activePage?: "index" | "ingredients";
}

export default function Navigation({ activePage }: NavigationProps) {
  const navItems = [
    { label: "Index", href: "/", key: "index" as const },
    { label: "Ingredients", href: "/ingredients", key: "ingredients" as const },
  ];

  return (
    <nav className={spacing.navMb}>
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image src="/kion-logo.png" alt="Kion" width={40} height={40} />
        </Link>
        <div className="flex gap-6">
        {navItems.map((item) => {
          const isActive = activePage === item.key;
          const colorClass = isActive ? colors.text.active : colors.text.muted;
          const baseClass = `${typography.navLink} ${colorClass}`;

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
      </div>
    </nav>
  );
}
