import Link from "next/link";

export function BrandLogo({
  size = "nav",
  href = "/",
}: {
  size?: "nav" | "hero";
  href?: string | null;
}) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/bimmerwise-logo.png"
      alt="Bimmer Wise"
      className={size === "hero" ? "brand-logo brand-logo-hero" : "brand-logo"}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} className="brand" aria-label="BimmerWise home">
      {img}
    </Link>
  );
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/bimmerwise-mark.png"
      alt=""
      className={`brand-mark-img ${className}`.trim()}
      aria-hidden
    />
  );
}
