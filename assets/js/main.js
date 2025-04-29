// Verificar autenticação antes de executar qualquer coisa
if (localStorage.getItem('authenticated') !== 'true') {
  window.location.href = 'login.html';
}

// Dados dos produtos 
let products = [
  { id: "1", name: "Mouse gamer sem fio", description: "Ótimo mouse para jogos, bateria excelente.", category: "Eletrônicos", price: 512.91, stockLevel: 12, sku: "Logitech G703", createdAt: new Date("2025-02-10"), updatedAt: new Date("2025-02-10"), imageUrl: "https://images1.kabum.com.br/produtos/fotos/102651/mouse-gamer-sem-fio-logitech-g703-lightspeed-rgb-lightsync-6-botoes-programaveis-hero-25k-recarregavel-compativel-powerplay-910-005639_1644413882_g.jpg" },
  { id: "2", name: "Mouse gamer sem fio", description: "Mouse gamer com ótima qualidade, bateria excelente.", category: "Eletrônicos", price: 803.00, stockLevel: 5, sku: "Logitech G PRO X Superlight", createdAt: new Date("2025-01-15"), updatedAt: new Date("2025-03-05"), imageUrl: "https://images9.kabum.com.br/produtos/fotos/149989/mouse-sem-fio-gamer-logitech-g-pro-x-superlight-lightspeed-25000-dpi-5-botoes-preto-910-005879_1727272012_g.jpg" },
  { id: "3", name: "Teclado com switch magnético", description: "Teclado com switch magnético focado para jogos.", category: "Eletrônicos", price: 452.00, stockLevel: 8, sku: "E-YOOSO hz61", createdAt: new Date("2025-02-20"), updatedAt: new Date("2025-02-20"), imageUrl: "https://ae01.alicdn.com/kf/S9c3ef16d01a343dfb8d8ea78ca26b17aq.jpg" },
  { id: "4", name: "Headset Gamer", description: "Headset de alta qualidade para jogos.", category: "Eletrônicos", price: 199.99, stockLevel: 23, sku: "Redragon Mento H270-RGB ", createdAt: new Date("2025-01-05"), updatedAt: new Date("2025-03-12"), imageUrl: "https://cdn.awsli.com.br/2500x2500/1318/1318167/produto/139818943/e250672186.jpg" },
  { id: "5", name: "Monitor para jogos", description: "Monitor com 165hz, 1ms, IPS, HDMI e DisplayPort", category: "Eletrônicos", price: 1277.77, stockLevel: 4, sku: "Asus 165hz, 1ms, IPS", createdAt: new Date("2025-03-01"), updatedAt: new Date("2025-03-15"), imageUrl: "https://images6.kabum.com.br/produtos/fotos/406136/monitor-asus-tuf-gaming-27-led-165hz-1ms-ips-hdmi-e-displayport-freesync-premium-vesa-vg279q1a_1673529973_g.jpg" },
  { id: "6", name: "Mousepad estendido 90x40", description: "Mousepad estendido com ótimo deslize, perfeito para jogos.", category: "Acessórios", price: 332.21, stockLevel: 7, sku: "Fallen Pantera Max Speed++", createdAt: new Date("2025-03-01"), updatedAt: new Date("2025-03-15"), imageUrl: "https://images6.kabum.com.br/produtos/fotos/618816/mousepad-gamer-fallen-pantera-max-estendido-90x40-mp-pa-mx-es_1729160293_g.jpg" }
];
let removedProducts = [];

// Função que carrega os produtos salvos no localStorage (armazenamento do navegador)
function loadData() {
  const storedProducts = localStorage.getItem('products'); // Busca os dados salvos no localStorage com a chave 'products'
  if (storedProducts) { // Se encontrar algo
      const parsedProducts = JSON.parse(storedProducts);
      parsedProducts.forEach(product => {      // Percorre por cada produto do array carregado
          product.createdAt = new Date(product.createdAt);  // Converte a string da data de criação para um objeto Date
          product.updatedAt = new Date(product.updatedAt);  // Converte a string da data de atualização para um objeto Date
      });
      products.length = 0;   // Limpa o array original
      products.push(...parsedProducts);  // Trás os produtos carregados para o Array Original
  }

  const storedRemovedProducts = localStorage.getItem('removedProducts');
  if (storedRemovedProducts) {      // Faz o mesmo acima, só que com os produtos removidos
      const parsedRemovedProducts = JSON.parse(storedRemovedProducts);
      parsedRemovedProducts.forEach(product => {
          product.createdAt = new Date(product.createdAt);
          product.updatedAt = new Date(product.updatedAt);
      });
      removedProducts = parsedRemovedProducts;
  }
}

// Função que salva os produtos
function saveData() {
  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('removedProducts', JSON.stringify(removedProducts));
}

// Elementos do prompt personalizado
const customPromptOverlay = document.getElementById('custom-prompt-overlay');
const customPromptModal = document.getElementById('custom-prompt-modal');
const customPromptTitle = document.getElementById('custom-prompt-title');
const customPromptMessage = document.getElementById('custom-prompt-message');
const customPromptInput = document.getElementById('custom-prompt-input');
const customPromptOkBtn = document.getElementById('custom-prompt-ok-btn');
const customPromptCancelBtn = document.getElementById('custom-prompt-cancel-btn');

let customPromptCallback = null; // Função para lidar com o resultado do prompt

function showCustomPrompt(title, message, defaultValue, callback) {
    customPromptTitle.textContent = title;
    customPromptMessage.textContent = message;
    customPromptInput.value = defaultValue;
    customPromptOverlay.style.display = 'flex';
    customPromptCallback = callback;

    // Focar no input quando o modal aparece
    setTimeout(() => {
        customPromptInput.focus();
    }, 100);
}

// Event listener para o botão OK do prompt personalizado
customPromptOkBtn.addEventListener('click', () => {  // Listener esperando o click 
    const value = customPromptInput.value;  // Pega o valor digitado no prompt
    customPromptOverlay.style.display = 'none';  // Some a janela do prompt
    if (customPromptCallback) {  // Verifica se existe função de callback definida
        customPromptCallback(value); // Chama o callback com o valor diitado
    }
});

// Event listener para o botão Cancelar do prompt personalizado
customPromptCancelBtn.addEventListener('click', () => {
    customPromptOverlay.style.display = 'none';
    if (customPromptCallback) {
        customPromptCallback(null); // Retorna null como o prompt padrão
    }
});

// Alert personalizado (notificação Toast)
const toastNotification = document.getElementById('toast-notification');
const toastMessage = document.getElementById('toast-message');

function showToast(message, type = 'success') {
    toastMessage.textContent = message;

    toastNotification.classList.remove('success', 'error');  // Remove qualquer classe de tipo anterior
    toastNotification.classList.add('show', type); // Adiciona a classe de tipo atual

    setTimeout(() => {
        toastNotification.classList.remove('show', type);
    }, 3000); // Exibir por 3 segundos
}

// Função para adicionar estoque
function increaseStock(productId) {
    const product = products.find(p => p.id === productId); // Procura o produto na lista com base no ID
    if (product) {  // Se o produto for encontrado
        const currentQuantity = product.stockLevel; // Pega a quantidade atual em estoque
        const title = 'Editar Estoque';  // Titulo do prompt
        const message = `Digite a nova quantidade para o produto "${product.name}":`; // Mensagem do prompt

        showCustomPrompt(title, message, currentQuantity, (newValue) => {
            if (newValue !== null) {
                const newQuantity = parseInt(newValue);
                if (!isNaN(newQuantity) && newQuantity >= 0) {
                    product.stockLevel = newQuantity;
                    product.updatedAt = new Date();
                    saveData();
                    navigateTo(document.querySelector('.nav-item.active .nav-link').dataset.page);

                    // Retiri o "alert" e coloquei o "showToast"
                    showToast(`Estoque do produto "${product.name}" atualizado para ${newQuantity}.`);
                } else {
                    showToast('Por favor, digite uma quantidade válida (número maior ou igual a zero).', 'error');
                }
            } else {
                console.log('Edição de estoque cancelada pelo usuário.');
            }
        });
    }
}

// Função para remover os produtos
function removeProduct(productId) {
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
      const removedProduct = products.splice(index, 1)[0];
      removedProducts.push(removedProduct);
      saveData();
      navigateTo(document.querySelector('.nav-item.active .nav-link').dataset.page);
      showToast(`Produto "${removedProduct.name}" removido com sucesso.`); // NÃO TA FUNCIONANDO ESSA BOSTA
  }
}

function restoreProduct(productId) {
  const index = removedProducts.findIndex(p => p.id === productId);
  if (index !== -1) {
      const restoredProduct = removedProducts.splice(index, 1)[0];
      restoredProduct.stockLevel = 1; // Definir o estoque de volta para 1
      products.push(restoredProduct);
      saveData();

      // Atualizar a interface na página atual
      navigateTo(document.querySelector('.nav-item.active .nav-link').dataset.page);

      showToast(`Produto "${restoredProduct.name}" restaurado com sucesso e adicionado ao estoque com quantidade 1.`);
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(amount);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

function getStockLevelClass(level) {
  if (level <= 5) return 'low';
  if (level <= 10) return 'medium';
  return 'high';
}

function renderProductRow(product) {
  const stockLevelClass = getStockLevelClass(product.stockLevel);
  const imageUrl = product.imageUrl || 'https://placehold.co/50x50?text=Sem+Imagem';
  return `
      <tr data-id="${product.id}">
          <td>
              <div class="product-info">
                  <img src="${imageUrl}" alt="${product.name}" class="product-image">
                  <span class="product-details">${product.name}</span>
              </div>
          </td>
          <td>${product.sku}</td>
          <td>${product.category}</td>
          <td>${formatCurrency(product.price)}</td>
          <td>
              <div class="stock-level ${stockLevelClass}">
                  ${product.stockLevel}
              </div>
          </td>
          <td class="action-buttons">
              <button class="action-button edit-product" title="Editar Estoque">✏️</button>
              <button class="action-button delete-product" title="Remover Produto">🗑️</button>
          </td>
      </tr>
  `;
}

function renderProductList(productList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = productList.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem;">Nenhum produto encontrado</td></tr>` : productList.map(renderProductRow).join('');
}

function renderRemovedProductRow(product) {
  const imageUrl = product.imageUrl || 'https://placehold.co/50x50?text=Sem+Imagem';
  return `
      <tr data-id="${product.id}">
          <td>
              <div class="product-info">
                  <img src="${imageUrl}" alt="${product.name}" class="product-image">
                  <span class="product-details">${product.name}</span>
              </div>
          </td>
          <td>${product.sku}</td>
          <td>${product.category}</td>
          <td>${formatCurrency(product.price)}</td>
          <td>${formatDate(product.updatedAt)}</td>
          <td class="action-buttons">
              <button class="action-button restore-product" title="Restaurar Produto">↩️</button>
          </td>
      </tr>
  `;
}

function renderRemovedProductList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = removedProducts.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem;">Nenhum produto removido</td></tr>` : removedProducts.map(renderRemovedProductRow).join('');

  container.querySelectorAll('.restore-product').forEach(button => {
      button.addEventListener('click', () => {
          const productId = button.closest('tr').dataset.id;
          restoreProduct(productId);
      });
  });
}

function renderDashboard() {
  const template = document.getElementById('dashboard-template');
  const clone = template.content.cloneNode(true);
  pageContent.innerHTML = '';
  pageContent.appendChild(clone);
  document.getElementById('total-products').textContent = products.length;
  document.getElementById('low-stock').textContent = products.filter(p => p.stockLevel <= 10).length;
  document.getElementById('inventory-value').textContent = formatCurrency(products.reduce((sum, product) => sum + (product.price * product.stockLevel), 0));
  renderProductList(products, 'product-list');
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
      searchInput.addEventListener('input', (e) => {
          const searchTerm = e.target.value.toLowerCase();
          const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm) || product.sku.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm));
          renderProductList(filteredProducts, 'product-list');
      });
  }
}

function renderProducts() {
  const template = document.getElementById('products-template');
  const clone = template.content.cloneNode(true);
  pageContent.innerHTML = '';
  pageContent.appendChild(clone);

      // Renderizar a lista de produtos em estoque
  renderProductList(products, 'product-list');

     // Criar um container para a lista de produtos removidos

     // Renderizar a lista de produtos removidos na nova tabela
  renderRemovedProductList('removed-products-list');

     // Adicionar event listener para pesquisa (já existente)
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
      searchInput.addEventListener('input', (e) => {
          const searchTerm = e.target.value.toLowerCase();
          const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm) || product.sku.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm));
          renderProductList(filteredProducts, 'product-list');
      });
  }

      // Adicionar event listener para adicionar produto
  const addButton = document.getElementById('add-product-btn');
  if (addButton) {
      addButton.addEventListener('click', () => {
          alert('Adicionar novo produto (Funcionalidade em desenvolvimento)');
      });
  }
}

function renderSettings() {
  const template = document.getElementById('settings-template');
  const clone = template.content.cloneNode(true);
  pageContent.innerHTML = '';
  pageContent.appendChild(clone);
}

function navigateTo(page) {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
  const activeLink = Array.from(navLinks).find(link => link.dataset.page === page);
  if (activeLink) {
      activeLink.parentElement.classList.add('active');
  }
  switch (page) {
      case 'dashboard': renderDashboard(); break;
      case 'products': renderProducts(); break;
      case 'analytics': renderAnalytics(); break;
      case 'settings': renderSettings(); break;
      default: renderDashboard();
  }
}

function logout() {
  localStorage.removeItem('authenticated');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
}

const navLinks = document.querySelectorAll('nav a');
const pageContent = document.getElementById('page-content');

navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();
      navigateTo(this.dataset.page);
  });
});

// Event listener para click de eventos 
document.addEventListener('click', function(event) { 
  if (event.target.classList.contains('edit-product')) { // Se clicar no edit product
      const productId = event.target.closest('tr').dataset.id;
      increaseStock(productId);  // Realiza esta função
  } else if (event.target.classList.contains('delete-product')) {  // Senao se clicar no delete product
      const productId = event.target.closest('tr').dataset.id;
      removeProduct(productId);  // Realiza esta função
  }
});

// Configurar o botão de logout assim que o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
      logoutButton.addEventListener('click', function(event) {
          event.preventDefault();
          logout();
      });
  } else {
      console.error('ERRO: Botão de logout não encontrado no DOM. Seletor: #logout-btn');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  const usernameElement = document.getElementById('username-display');
  if (usernameElement) {
      usernameElement.textContent = localStorage.getItem('username') || 'Usuário';
  }
  navigateTo('dashboard');
});