import { notFound } from "next/navigation";
import { ArchivePage } from "../../components/ArchivePage";
import { getPostsByCategory } from "../../data/posts";
import { categories } from "../../data/taxonomy";

export function generateStaticParams() { return categories.map((item) => ({ slug: item.slug })); }

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const item = categories.find((category) => category.slug === slug);
  if (!item) notFound();
  return <ArchivePage type="Category" name={item.name} posts={getPostsByCategory(slug)} />;
}
