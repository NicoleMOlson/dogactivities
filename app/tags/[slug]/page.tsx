import { notFound } from "next/navigation";
import { ArchivePage } from "../../components/ArchivePage";
import { getPostsByTag } from "../../data/posts";
import { tags } from "../../data/taxonomy";

export function generateStaticParams() { return tags.map((item) => ({ slug: item.slug })); }

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const item = tags.find((tag) => tag.slug === slug);
  if (!item) notFound();
  return <ArchivePage type="Tag" name={item.name} posts={getPostsByTag(slug)} />;
}
