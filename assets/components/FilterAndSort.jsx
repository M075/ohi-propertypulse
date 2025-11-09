import React from 'react';
import ProductCard from '@/assets/components/ProductCard';

// Reusable FilterAndSort component
// Props:
// - products: array of product objects
// - renderResults?: optional function(filteredProducts) -> JSX to render results (default: grid of ProductCard)
export default function FilterAndSort({ products = [], renderResults }) {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [sort, setSort] = React.useState('latest');

  const categories = React.useMemo(() => {
    if (!products) return ['all'];
    const setCats = new Set(
      products.map((p) => (p.category ? String(p.category) : 'Uncategorized'))
    );
    return ['all', ...Array.from(setCats)];
  }, [products]);

  const filteredProducts = React.useMemo(() => {
    if (!products) return [];

    let list = products.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || p.name || '')
            .toString()
            .toLowerCase()
            .includes(q) ||
          (p.description || '')
            .toString()
            .toLowerCase()
            .includes(q)
      );
    }

    if (category !== 'all') {
      list = list.filter((p) => (p.category || 'Uncategorized') === category);
    }

    if (sort === 'price-asc') {
      list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sort === 'price-desc') {
      list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else {
      list.sort(
        (a, b) =>
          new Date(b.createdAt || b._createdAt || 0) -
          new Date(a.createdAt || a._createdAt || 0)
      );
    }

    return list;
  }, [products, query, category, sort]);

  // Default renderer: grid of ProductCard
  const defaultRender = (items) => {
    if (!items || items.length === 0) {
      return (
        <div className="py-8 text-center text-gray-400">No products match your filters.</div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6">
        {items.map((p, i) => (
          <ProductCard key={p.id || p._id || i} product={p} />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-6">
        <input
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or description"
          className="w-full md:w-1/3 px-3 py-2 rounded border bg-gray-800 text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/6 px-3 py-2 rounded border bg-gray-800 text-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-1/6 px-3 py-2 rounded border bg-gray-800 text-white"
        >
          <option value="latest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>

        <button
          type="button"
          onClick={() => {
            setQuery('');
            setCategory('all');
            setSort('latest');
          }}
          className="px-4 py-2 rounded bg-gray-700 text-white"
        >
          Reset
        </button>
      </div>

      {/* Render results using provided render function or default grid */}
      {renderResults ? renderResults(filteredProducts) : defaultRender(filteredProducts)}
    </div>
  );
}
