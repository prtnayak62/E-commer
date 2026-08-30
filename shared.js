/* shared.js — PawMart Veterinary Store — product data + cart logic */

const products = [
  /* PET FOOD */
  { id:1,  name:"Royal Canin Adult Dog Food (3kg)", brand:"Royal Canin", price:1299, mrp:1799, icon:"🐕", cat:"food", rating:5, badge:"Vet", reviews:12400 },
  { id:2,  name:"Whiskas Adult Cat Food – Tuna (1.2kg)", brand:"Whiskas", price:449, mrp:599, icon:"🐱", cat:"food", rating:5, badge:"Sale", reviews:8700 },
  { id:3,  name:"Pedigree Pro Expert Nutrition – Puppy (3kg)", brand:"Pedigree", price:899, mrp:1299, icon:"🐶", cat:"food", rating:4, badge:"Hot", reviews:5600 },
  { id:4,  name:"Hill's Science Diet – Senior Cat (1.6kg)", brand:"Hill's", price:1199, mrp:1599, icon:"🐈", cat:"food", rating:5, badge:"Vet", reviews:3200 },
  { id:5,  name:"Orijen Original Dry Dog Food (2kg)", brand:"Orijen", price:2499, mrp:3299, icon:"🐕‍🦺", cat:"food", rating:5, badge:"New", reviews:1800 },
  { id:6,  name:"Me-O Persian Cat Food – Tuna & Veg (1.2kg)", brand:"Me-O", price:349, mrp:499, icon:"🐾", cat:"food", rating:4, badge:"", reviews:9100 },

  /* TREATS & SNACKS */
  { id:7,  name:"Drools Absolute Biscuits – Chicken (500g)", brand:"Drools", price:199, mrp:299, icon:"🦴", cat:"treats", rating:4, badge:"Hot", reviews:14500 },
  { id:8,  name:"Temptations Cat Treats – Tuna (85g)", brand:"Temptations", price:179, mrp:249, icon:"😺", cat:"treats", rating:5, badge:"", reviews:6200 },
  { id:9,  name:"Himalaya Healthy Treats for Dogs (250g)", brand:"Himalaya", price:249, mrp:349, icon:"🐕", cat:"treats", rating:4, badge:"Sale", reviews:3400 },
  { id:10, name:"Purina Fancy Feast Gravy – Fish (85g x 6)", brand:"Purina", price:599, mrp:799, icon:"🐠", cat:"treats", rating:5, badge:"New", reviews:2100 },

  /* ACCESSORIES */
  { id:11, name:"Adjustable Nylon Dog Collar & Leash Set", brand:"Trixie", price:499, mrp:799, icon:"🦮", cat:"accessories", rating:4, badge:"", reviews:7800 },
  { id:12, name:"Automatic Pet Water Fountain (2.5L)", brand:"PetSafe", price:1799, mrp:2499, icon:"💧", cat:"accessories", rating:5, badge:"Hot", reviews:4300 },
  { id:13, name:"Orthopedic Memory Foam Dog Bed (Medium)", brand:"Pawsome", price:2299, mrp:3299, icon:"🛏️", cat:"accessories", rating:5, badge:"New", reviews:2800 },
  { id:14, name:"Stainless Steel Dog Bowl Set (2-pack)", brand:"Petkin", price:349, mrp:599, icon:"🍽️", cat:"accessories", rating:4, badge:"", reviews:11200 },
  { id:15, name:"Cat Tree Scratching Post with Perch (4ft)", brand:"Whisker City", price:1999, mrp:2999, icon:"🌳", cat:"accessories", rating:4, badge:"Sale", reviews:3600 },
  { id:16, name:"Portable Pet Carrier Bag (Small)", brand:"Marukan", price:1299, mrp:1799, icon:"👜", cat:"accessories", rating:4, badge:"", reviews:5100 },

  /* GROOMING */
  { id:17, name:"Wahl Pet Grooming Clipper Kit", brand:"Wahl", price:2199, mrp:2999, icon:"✂️", cat:"grooming", rating:5, badge:"Vet", reviews:1900 },
  { id:18, name:"Beaphar Flea & Tick Shampoo (250ml)", brand:"Beaphar", price:449, mrp:649, icon:"🛁", cat:"grooming", rating:4, badge:"", reviews:6500 },
  { id:19, name:"Pet Head Dry Clean Waterless Shampoo", brand:"Pet Head", price:649, mrp:849, icon:"🧴", cat:"grooming", rating:4, badge:"Hot", reviews:3200 },
  { id:20, name:"Double Sided Slicker Brush for Dogs & Cats", brand:"Hertzko", price:599, mrp:899, icon:"🪮", cat:"grooming", rating:5, badge:"", reviews:8700 },

  /* MEDICINES */
  { id:21, name:"Frontline Plus Spot-On – Dogs (3 Pipettes)", brand:"Frontline", price:899, mrp:1199, icon:"💊", cat:"medicine", rating:5, badge:"Vet", reviews:22300 },
  { id:22, name:"Drontal Deworming Tablets – Dogs (2 tabs)", brand:"Bayer", price:299, mrp:449, icon:"🩺", cat:"medicine", rating:5, badge:"Vet", reviews:18700 },
  { id:23, name:"NexGard Chewables – Flea & Tick for Dogs", brand:"Merial", price:1499, mrp:1999, icon:"🦟", cat:"medicine", rating:5, badge:"New", reviews:9400 },
  { id:24, name:"Zymox Enzymatic Ear Solution for Cats & Dogs", brand:"Zymox", price:999, mrp:1399, icon:"👂", cat:"medicine", rating:4, badge:"", reviews:4200 },

  /* TOYS */
  { id:25, name:"Kong Classic Dog Toy (Medium)", brand:"Kong", price:799, mrp:999, icon:"🔴", cat:"toys", rating:5, badge:"", reviews:31000 },
  { id:26, name:"Interactive Feather Wand Cat Toy", brand:"PetFusion", price:349, mrp:499, icon:"🪶", cat:"toys", rating:4, badge:"Hot", reviews:7400 },
  { id:27, name:"Rope Tug-of-War Toy for Dogs", brand:"Mammoth", price:449, mrp:699, icon:"🧶", cat:"toys", rating:4, badge:"Sale", reviews:5800 },
  { id:28, name:"Puzzle Feeder Snack Ball for Pets", brand:"Nina Ottosson", price:699, mrp:999, icon:"🎾", cat:"toys", rating:5, badge:"New", reviews:2900 },
];

let cart = [];

/* ── RENDER PRODUCTS ── */
function renderProducts(list, gridId) {
  const grid = document.getElementById(gridId || 'product-grid');
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = '<p style="color:var(--muted);padding:40px 0;grid-column:1/-1">No products found.</p>';
    return;
  }
  const badgeMap = { Vet:'badge-vet', Hot:'badge-hot', Sale:'badge-sale', New:'badge-new' };
  const badgeLabel = { Vet:'🩺 Vet Approved', Hot:'🔥 Hot', Sale:'Sale', New:'New' };
  grid.innerHTML = list.map(p => {
    const discount = Math.round((1 - p.price / p.mrp) * 100);
    const stars = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);
    const bc = badgeMap[p.badge] || '';
    const bl = badgeLabel[p.badge] || p.badge;
    return `
      <div class="product-card">
        <div class="product-img">${p.icon}</div>
        <div class="product-info">
          ${p.badge ? `<span class="product-badge ${bc}">${bl}</span>` : ''}
          <div class="product-name">${p.name}</div>
          <div class="product-brand">${p.brand}</div>
          <div class="stars">${stars} <span style="color:var(--muted);font-size:.78rem">(${p.reviews.toLocaleString()})</span></div>
          <div class="product-price">
            ₹${p.price.toLocaleString()}
            <del>₹${p.mrp.toLocaleString()}</del>
            <span class="discount-tag">${discount}% off</span>
          </div>
          <button class="add-cart-btn" id="btn-${p.id}" onclick="addToCart(${p.id})">Add to Cart 🛒</button>
        </div>
      </div>`;
  }).join('');
}

/* ── CART ── */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...product, qty: 1 }); }
  updateCartUI();
  showToast(`🐾 "${product.name}" added to cart!`);
  const btn = document.getElementById('btn-' + id);
  if (btn) {
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = 'Add to Cart 🛒'; btn.classList.remove('added'); }, 1500);
  }
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = totalItems;

  const container = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!container) return;

  if (!cart.length) {
    container.innerHTML = '<div class="cart-empty"><div>🐾</div>Your cart is empty</div>';
    if (summary) summary.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-icon">${c.icon}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-price">₹${(c.price * c.qty).toLocaleString()}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
          <span>${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${c.id},1)">+</button>
        </div>
        <div class="remove-item" onclick="removeFromCart(${c.id})">Remove</div>
      </div>
    </div>`).join('');

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = subtotal >= 599 ? 0 : 59;
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal + shipping - discount;

  document.getElementById('subtotal').textContent = '₹' + subtotal.toLocaleString();
  document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : '₹' + shipping;
  document.getElementById('discount').textContent = '-₹' + discount.toLocaleString();
  document.getElementById('total').textContent = '₹' + total.toLocaleString();
  if (summary) summary.style.display = 'block';
}

function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
}

function checkout() {
  showToast('🎉 Order placed! Your pet supplies are on the way. Thank you for shopping with PawMart!');
  cart = [];
  updateCartUI();
  toggleCart();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
