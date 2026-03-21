/* =====================
   SAAGWAAN — script.js
   All page logic lives here.
   ===================== */

// ===================== NAV =====================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

function toggleMenu() {
  document.querySelector('.nav-links')?.classList.toggle('open');
  document.querySelector('.nav-toggle')?.classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.remove('open');
    document.querySelector('.nav-toggle')?.classList.remove('open');
  });
});

// ===================== SCROLL REVEAL =====================
const revealEls = document.querySelectorAll('.cat-card, .product-card, .offer-col li, .stat-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// ===================== CONTACT PAGE =====================
function sendViaWhatsApp() {
  const name = document.getElementById('cName')?.value.trim();
  const phone = document.getElementById('cPhone')?.value.trim();
  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }
  const interest = document.getElementById('cInterest')?.value || 'furniture';
  const msg = document.getElementById('cMessage')?.value.trim();
  const text = `Hello SAAGWAAN!\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${interest}${msg ? '\n\nMessage: ' + msg : ''}`;
  window.open('https://wa.me/919829061062?text=' + encodeURIComponent(text), '_blank');
  const success = document.getElementById('formSuccess');
  if (success) {
    success.classList.remove('flex-hidden');
    success.classList.add('flex-visible');
  }
}

// ===================== PRODUCTS PAGE =====================
const CATEGORY_ICONS = {
  bedroom: `<svg viewBox="0 0 80 60" fill="none"><rect x="5" y="30" width="70" height="22" rx="2" stroke="#c8c0b0" stroke-width="1.2"/><rect x="10" y="20" width="26" height="14" rx="2" stroke="#c8c0b0" stroke-width="1"/><rect x="44" y="20" width="26" height="14" rx="2" stroke="#c8c0b0" stroke-width="1"/><rect x="5" y="48" width="6" height="8" rx="1" stroke="#c8c0b0" stroke-width="1"/><rect x="69" y="48" width="6" height="8" rx="1" stroke="#c8c0b0" stroke-width="1"/></svg>`,
  living:  `<svg viewBox="0 0 80 60" fill="none"><rect x="5" y="28" width="70" height="22" rx="3" stroke="#c8c0b0" stroke-width="1.2"/><rect x="5" y="22" width="15" height="30" rx="2" stroke="#c8c0b0" stroke-width="1"/><rect x="60" y="22" width="15" height="30" rx="2" stroke="#c8c0b0" stroke-width="1"/><rect x="20" y="10" width="40" height="14" rx="2" stroke="#c8c0b0" stroke-width="1"/></svg>`,
  dining:  `<svg viewBox="0 0 80 60" fill="none"><rect x="15" y="20" width="50" height="10" rx="2" stroke="#c8c0b0" stroke-width="1.2"/><line x1="20" y1="30" x2="20" y2="52" stroke="#c8c0b0" stroke-width="1.2"/><line x1="60" y1="30" x2="60" y2="52" stroke="#c8c0b0" stroke-width="1.2"/><rect x="30" y="8" width="8" height="14" rx="1" stroke="#c8c0b0" stroke-width="1"/><rect x="42" y="8" width="8" height="14" rx="1" stroke="#c8c0b0" stroke-width="1"/></svg>`,
  storage: `<svg viewBox="0 0 80 60" fill="none"><rect x="15" y="8" width="50" height="48" rx="2" stroke="#c8c0b0" stroke-width="1.2"/><line x1="40" y1="8" x2="40" y2="56" stroke="#c8c0b0" stroke-width="0.8"/><line x1="15" y1="32" x2="65" y2="32" stroke="#c8c0b0" stroke-width="0.8"/><circle cx="37" cy="20" r="2" stroke="#c8c0b0" stroke-width="0.8"/><circle cx="43" cy="20" r="2" stroke="#c8c0b0" stroke-width="0.8"/></svg>`,
  furnishings: `<svg viewBox="0 0 80 60" fill="none"><rect x="8" y="12" width="28" height="36" rx="1" stroke="#c8c0b0" stroke-width="1.2"/><rect x="44" y="12" width="28" height="36" rx="1" stroke="#c8c0b0" stroke-width="1.2"/><path d="M8 24 Q22 18 36 24" stroke="#c8c0b0" stroke-width="0.8" fill="none"/><path d="M44 24 Q58 18 72 24" stroke="#c8c0b0" stroke-width="0.8" fill="none"/></svg>`,
  soft:    `<svg viewBox="0 0 80 60" fill="none"><ellipse cx="40" cy="30" rx="30" ry="18" stroke="#c8c0b0" stroke-width="1.2"/><ellipse cx="40" cy="30" rx="20" ry="12" stroke="#c8c0b0" stroke-width="0.6"/><ellipse cx="40" cy="30" rx="10" ry="6" stroke="#c8c0b0" stroke-width="0.6"/></svg>`,
  default: `<svg viewBox="0 0 80 60" fill="none"><rect x="15" y="15" width="50" height="35" rx="2" stroke="#c8c0b0" stroke-width="1.2"/><line x1="15" y1="28" x2="65" y2="28" stroke="#c8c0b0" stroke-width="0.8"/></svg>`
};

function getCatLabel(slug, cats) {
  return (cats || []).find(c => c.slug === slug)?.name || slug;
}

function productCardHTML(p, cats, i) {
  return `
    <a href="product.html?id=${p.id}" class="product-card" style="--delay:${i * 0.08}s">
      <div class="product-img-wrap">
        ${p.photo_url
          ? `<img src="${p.photo_url}" alt="${p.name}" loading="lazy"/>`
          : `<div class="product-img-placeholder"><span>SAAGWAAN</span></div>`}
        <div class="product-overlay"><span class="btn-ghost small">View Details</span></div>
      </div>
      <div class="product-info">
        <span class="product-cat">${getCatLabel(p.category, cats)}</span>
        <h3>${p.name}</h3>
        ${p.material ? `<p class="product-desc">${p.material}</p>` : ''}
        ${p.description ? `<p class="product-desc">${p.description}</p>` : ''}
        ${p.price ? `<span class="product-price">Rs. ${Number(p.price).toLocaleString('en-IN')}</span>` : ''}
        <div class="product-actions">
          <button class="btn-ghost small" onclick="enquireProduct('${p.name.replace(/'/g, "\\'")}'); event.preventDefault(); event.stopPropagation();">Enquire</button>
        </div>
      </div>
    </a>`;
}

// ===================== INDEX PAGE =====================
if (document.getElementById('featuredGrid')) {
  (async () => {
    const catGrid = document.getElementById('categoriesGrid');
    const featuredGrid = document.getElementById('featuredGrid');
    const footerCats = document.getElementById('footerCatLinks');

    // Guard: if Supabase isn't configured, show empty states immediately
    if (typeof sb === 'undefined' || !sb) {
      if (catGrid) catGrid.innerHTML = `<p class="empty-inline">Configure Supabase to load collections.</p>`;
      if (featuredGrid) featuredGrid.innerHTML = `<p class="empty-inline">No featured products yet.</p>`;
      return;
    }

    try {
      const [{ data: cats, error: catErr }, { data: featured, error: featErr }] = await Promise.all([
        sb.from('categories').select('*').order('name'),
        sb.from('products').select('*').eq('featured', true).limit(6)
      ]);

      // Categories grid
      if (catGrid) {
        catGrid.innerHTML = (!catErr && cats && cats.length)
          ? cats.map((c, i) => `
              <a href="products.html?cat=${c.slug}" class="cat-card" style="--delay:${i * 0.08}s">
                <div class="cat-icon">${CATEGORY_ICONS[c.slug] || CATEGORY_ICONS.default}</div>
                <h3>${c.name}</h3>
                <p>View collection</p>
                <span class="cat-arrow">&rarr;</span>
              </a>`).join('')
          : `<p class="empty-inline">No collections added yet.</p>`;
      }

      // Footer category links
      if (footerCats && !catErr && cats && cats.length) {
        footerCats.innerHTML = cats.map(c => `<li><a href="products.html?cat=${c.slug}">${c.name}</a></li>`).join('');
      }

      // Featured grid
      if (featuredGrid) {
        featuredGrid.innerHTML = (!featErr && featured && featured.length)
          ? featured.map((p, i) => productCardHTML(p, cats, i)).join('')
          : `<p class="empty-inline">No featured products yet.</p>`;
      }
    } catch (e) {
      if (catGrid) catGrid.innerHTML = `<p class="empty-inline">No collections added yet.</p>`;
      if (featuredGrid) featuredGrid.innerHTML = `<p class="empty-inline">No featured products yet.</p>`;
    }
  })();
}

// ===================== PRODUCTS PAGE =====================
if (document.getElementById('productsGrid')) {
  let allProducts = [];
  let allCategories = [];
  let currentCat = 'all';

  (async () => {
    const [{ data: cats, error: catErr }, { data: products, error: prodErr }] = await Promise.all([
      sb.from('categories').select('*').order('name'),
      sb.from('products').select('*').order('created_at', { ascending: false })
    ]);

    if (catErr || prodErr) return;

    allCategories = cats || [];
    allProducts = products || [];

    // Build filter buttons
    const scroll = document.getElementById('filterScroll');
    scroll.innerHTML = `<button class="filter-btn active" data-cat="all">All</button>` +
      allCategories.map(c => `<button class="filter-btn" data-cat="${c.slug}">${c.name}</button>`).join('');

    scroll.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        scroll.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCat = btn.dataset.cat;
        renderProductsGrid();
      });
    });

    const urlCat = new URLSearchParams(window.location.search).get('cat');
    if (urlCat) {
      const match = scroll.querySelector(`[data-cat="${urlCat}"]`);
      if (match) { match.click(); return; }
    }
    renderProductsGrid();
  })();

  function renderProductsGrid() {
    const filtered = currentCat === 'all' ? allProducts : allProducts.filter(p => p.category === currentCat);
    const grid = document.getElementById('productsGrid');
    const empty = document.getElementById('emptyState');

    if (filtered.length === 0) {
      grid.className = 'products-grid grid-hidden';
      empty.className = 'empty-state flex-visible';
      return;
    }
    empty.className = 'empty-state flex-hidden';
    grid.className = 'products-grid grid-visible';
    grid.innerHTML = filtered.map((p, i) => productCardHTML(p, allCategories, i)).join('');
  }
}

// ===================== ENQUIRE MODAL (products page) =====================
let currentEnquireProduct = '';

function enquireProduct(name) {
  currentEnquireProduct = name;
  const nameEl = document.getElementById('enquireProductName');
  if (nameEl) nameEl.textContent = name;
  document.getElementById('enquireModal')?.classList.add('open');
  document.getElementById('enquireOverlay')?.classList.add('open');
}

function closeEnquireModal() {
  document.getElementById('enquireModal')?.classList.remove('open');
  document.getElementById('enquireOverlay')?.classList.remove('open');
}

function sendEnquiry() {
  const name = document.getElementById('eqName')?.value.trim() || 'a customer';
  const phone = document.getElementById('eqPhone')?.value.trim();
  const msg = `Hello SAAGWAAN!\n\nI am interested in: *${currentEnquireProduct}*\n\nName: ${name}\nPhone: ${phone}`;
  window.open(`https://wa.me/919829061062?text=${encodeURIComponent(msg)}`, '_blank');
  closeEnquireModal();
}

// ===================== PRODUCT DETAIL PAGE =====================
if (document.getElementById('productDetailGrid') !== undefined && document.getElementById('productDetailGrid') !== null || window.location.pathname.includes('product.html')) {
  (async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const loading = document.getElementById('loadingState');
    const notFound = document.getElementById('notFoundState');
    const grid = document.getElementById('productDetailGrid');

    if (!id) { showNotFound(); return; }

    const [{ data: product, error }, { data: categories }] = await Promise.all([
      sb.from('products').select('*').eq('id', id).single(),
      sb.from('categories').select('*')
    ]);

    if (error || !product) { showNotFound(); return; }

    document.title = `${product.name} — SAAGWAAN`;
    const catName = (categories || []).find(c => c.slug === product.category)?.name || product.category;
    const breadcrumbName = document.getElementById('breadcrumbName');
    if (breadcrumbName) breadcrumbName.textContent = product.name;
    if (loading) { loading.classList.add('display-none'); }
    if (grid) {
      grid.style.display = 'grid';
      grid.innerHTML = `
        <div class="product-detail-img">
          <div class="product-detail-img-main">
            ${product.photo_url
              ? `<img src="${product.photo_url}" alt="${product.name}" />`
              : `<span class="product-detail-img-placeholder">SAAGWAAN</span>`}
          </div>
        </div>
        <div class="product-detail-info">
          <span class="product-detail-cat">${catName}</span>
          <h1 class="product-detail-name">${product.name}</h1>
          ${product.price ? `<div class="product-detail-price">Rs. ${Number(product.price).toLocaleString('en-IN')}</div>` : ''}
          <div class="product-detail-divider"></div>
          ${product.description ? `<p class="product-detail-desc">${product.description}</p>` : ''}
          <table class="product-spec-table">
            ${product.material ? `<tr><td>Material</td><td>${product.material}</td></tr>` : ''}
            <tr><td>Category</td><td>${catName}</td></tr>
            <tr><td>Production</td><td>Made to order</td></tr>
            <tr><td>Origin</td><td>Jaipur, Rajasthan</td></tr>
          </table>
          <div class="product-detail-actions">
            <a href="contact.html" class="btn-primary">Request a Quote</a>
            <a href="https://wa.me/919829061062?text=${encodeURIComponent('Hello SAAGWAAN! I am interested in: ' + product.name)}" target="_blank" class="btn-whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.847L.057 23.5l5.816-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.381l-.372-.22-3.449.905.921-3.36-.241-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Enquire on WhatsApp
            </a>
            <a href="products.html?cat=${product.category}" class="btn-ghost">View More ${catName}</a>
          </div>
        </div>`;
    }

    // Related products
    const { data: related } = await sb.from('products')
      .select('*').eq('category', product.category).neq('id', id).limit(3);

    if (related && related.length > 0) {
      const relSec = document.getElementById('relatedSection');
      const relGrid = document.getElementById('relatedGrid');
      if (relSec) { relSec.classList.remove('display-none'); }
      if (relGrid) {
        relGrid.innerHTML = related.map((p, i) => `
          <a href="product.html?id=${p.id}" class="product-card" style="--delay:${i * 0.08}s">
            <div class="product-img-wrap">
              ${p.photo_url ? `<img src="${p.photo_url}" alt="${p.name}" loading="lazy"/>` : `<div class="product-img-placeholder"><span>SAAGWAAN</span></div>`}
              <div class="product-overlay"><span class="btn-ghost small">View Details</span></div>
            </div>
            <div class="product-info">
              <span class="product-cat">${catName}</span>
              <h3>${p.name}</h3>
              ${p.price ? `<span class="product-price">Rs. ${Number(p.price).toLocaleString('en-IN')}</span>` : ''}
            </div>
          </a>`).join('');
      }
    }

    function showNotFound() {
      if (loading) { loading.classList.add('display-none'); }
      if (notFound) { notFound.classList.remove('display-none'); }
    }
  })();
}