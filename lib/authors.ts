import { Author } from "./types";

export const authors: Author[] = [
  { id: "cabbages-world", name: "Cabbages World", avatar: "/authors/cabbages-world.webp" },
  { id: "camila-farias", name: "Camila Farias", avatar: "/authors/camila-farias.webp" },
  { id: "daniel-chung", name: "Daniel Chung", avatar: "/authors/daniel-chung.webp" },
  { id: "giacomo-bocchio", name: "Giacomo Bocchio", avatar: "/authors/giacomo-bocchio.webp" },
  { id: "juan-andres-chung", name: "Juan Andres Chung", avatar: "/authors/juan-andres-chung.webp" },
  { id: "juan-chung", name: "Juan Chung", avatar: "/authors/juan-chung.webp" },
  { id: "maria-perez", name: "Maria Perez", avatar: "/authors/maria-perez.webp" },
  { id: "paulina-cocina", name: "Paulina Cocina", avatar: "/authors/paulina-cocina.webp" },
  { id: "sandra-plevisani", name: "Sandra Plevisani", avatar: "/authors/sandra-plevisani.avif" },
];

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}
