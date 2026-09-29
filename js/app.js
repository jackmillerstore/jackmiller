const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

function formatPrice(product) {
  return `${product.moneda}${product.precio.toLocaleString("es-GT")}`;
}

function getCategories() {
  return [...new Set(products.map(product => product.categoria))].sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

function populateCategories() {
  getCategories().forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  article.innerHTML = `
    <div class="product-image-wrap">
      <img src="${product.imagenes[0]}" alt="${product.nombre}">
    </div>
    <div class="product-body">
      <span class="status ${product.estado}">${product.estado}</span>
      <div class="product-topline">
        <div>
          <h3>${product.nombre}</h3>
          <p class="product-meta">${product.categoria} · ${product.condicion}</p>
        </div>
        <span class="product-price">${formatPrice(product)}</span>
      </div>
      <div class="card-actions">
        <button class="button" type="button" data-action="details" data-id="${product.id}">
          Ver detalles
        </button>
        <button class="button primary" type="button" data-action="interest" data-id="${product.id}" ${product.estado === "vendido" ? "disabled" : ""}>
          ${product.estado === "vendido" ? "Vendido" : "Me interesa"}
        </button>
      </div>
    </div>
  `;

  return article;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter(product => {
    const matchesQuery = product.nombre.toLowerCase().includes(query);
    const matchesCategory = category === "todos" || product.categoria === category;
    return matchesQuery && matchesCategory;
  });

  productGrid.innerHTML = "";
  filtered.forEach(product => productGrid.appendChild(createProductCard(product)));

  resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? "artículo" : "artículos"}`;
  emptyState.hidden = filtered.length !== 0;
}

function openProductModal(product) {
  modalContent.innerHTML = `
    <img class="modal-image" src="${product.imagenes[0]}" alt="${product.nombre}">
    <div class="modal-body">
      <span class="status ${product.estado}">${product.estado}</span>
      <h2>${product.nombre}</h2>
      <p class="product-price">${formatPrice(product)}</p>
      <p>${product.descripcion}</p>

      <div class="modal-details">
        <div>
          <span>Categoría</span>
          <strong>${product.categoria}</strong>
        </div>
        <div>
          <span>Condición</span>
          <strong>${product.condicion}</strong>
        </div>
        <div>
          <span>Estado</span>
          <strong style="text-transform: capitalize">${product.estado}</strong>
        </div>
      </div>

      <button class="button primary" type="button" data-action="interest" data-id="${product.id}" ${product.estado === "vendido" ? "disabled" : ""}>
        ${product.estado === "vendido" ? "Artículo vendido" : "Me interesa"}
      </button>
    </div>
  `;

  productModal.showModal();
}

function handleInterest(product) {
  const message = `Hola, estoy interesado en el artículo: ${product.nombre}.`;
  console.log(message);

  alert(
    `${message}\n\nEl contacto por WhatsApp se conectará cuando tengamos el número del vendedor.`
  );
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const product = products.find(item => item.id === Number(button.dataset.id));
  if (!product) return;

  if (button.dataset.action === "details") {
    openProductModal(product);
  }

  if (button.dataset.action === "interest" && product.estado !== "vendido") {
    handleInterest(product);
  }
});

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
modalClose.addEventListener("click", () => productModal.close());

productModal.addEventListener("click", event => {
  if (event.target === productModal) {
    productModal.close();
  }
});

populateCategories();
renderProducts();