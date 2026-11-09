import { AppShell } from "../../components/AppShell";
import { PRODUCTS } from "../../lib/content";

export default function ProductsPage() {
  return (
    <AppShell active="products">
      <section className="hero">
        <p className="eyebrow">Shop</p>
        <h1>Products</h1>
        <p>
          CarPlay, Android Auto, navigation, and camera options available through
          Bimmerwise.
        </p>
      </section>

      <div className="content-grid section-gap">
        {PRODUCTS.map((product) => (
          <a
            key={product.title}
            className="content-card"
            href={product.href}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{product.title}</strong>
            <span className="price-tag">{product.price}</span>
            <span>{product.blurb}</span>
            <em>Buy on bimmerwise.com ↗</em>
          </a>
        ))}
      </div>

      <div className="home-actions section-gap">
        <a href="/book" className="home-action">
          <span>
            <strong>Book an install</strong>
            <span>CarPlay, camera, coding and more</span>
          </span>
          <em>→</em>
        </a>
      </div>
    </AppShell>
  );
}
