// Sistema de Encomenda Biliu Queijos - Lógica Principal

// Carrinho de compras
let carrinho = {};
let carrinhoVisivel = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    inicializarSistema();
    atualizarInformacoesContato();
    configurarEventListeners();
});

function inicializarSistema() {
    carregarCarrinhoSalvo();
    renderizarQueijos();
    atualizarCarrinho();
}

// ===== FUNÇÕES DO CATÁLOGO =====
function renderizarQueijos() {
    const container = document.getElementById('cheeses-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    QUEIJOS_BILIU.forEach(queijo => {
        const quantidade = carrinho[queijo.id] || 0;
        
        const card = document.createElement('div');
        card.className = `cheese-card-biliu ${queijo.destaque ? 'destaque' : ''}`;
        card.dataset.id = queijo.id;
        card.dataset.categoria = queijo.categoria;
        
        card.innerHTML = `
            <img src="${queijo.img}" alt="${queijo.nome}" class="cheese-img-biliu">
            <div class="cheese-info-biliu">
                <div class="cheese-header-biliu">
                    <h3 class="cheese-name-biliu">${queijo.nome}</h3>
                    <span class="cheese-category-biliu">${queijo.categoria}</span>
                </div>
                <p class="cheese-desc-biliu">${queijo.descricao}</p>
                <div class="cheese-price-biliu">R$ ${queijo.preco.toFixed(2)}</div>
                
                <div class="quantity-control-biliu">
                    <button class="qty-btn-biliu" onclick="alterarQuantidade(${queijo.id}, -1)">-</button>
                    <span class="quantity-biliu" id="qty-${queijo.id}">${quantidade}</span>
                    <button class="qty-btn-biliu" onclick="alterarQuantidade(${queijo.id}, 1)">+</button>
                </div>
                
                <button class="btn-add-biliu" onclick="adicionarAoCarrinho(${queijo.id})"
                        ${!queijo.disponivel ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus"></i>
                    ${!queijo.disponivel ? 'Indisponível' : (quantidade > 0 ? 'Atualizar' : 'Adicionar')}
                </button>
                
                ${queijo.estoque < 5 && queijo.estoque > 0 ? 
                    `<p class="estoque-baixo">⚠️ Apenas ${queijo.estoque} unidades!</p>` : ''}
                ${!queijo.disponivel ? 
                    `<p class="indisponivel">⏳ Disponível em breve</p>` : ''}
            </div>
        `;
        
        container.appendChild(card);
    });
    
    configurarFiltros();
}

function configurarFiltros() {
    const filterButtons = document.querySelectorAll('.filter-btn-biliu');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filtrarQueijos(filter);
        });
    });
}

function filtrarQueijos(categoria) {
    const cards = document.querySelectorAll('.cheese-card-biliu');
    
    cards.forEach(card => {
        if (categoria === 'all' || card.dataset.categoria === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== FUNÇÕES DO CARRINHO =====
function carregarCarrinhoSalvo() {
    const carrinhoSalvo = localStorage.getItem('carrinhoBiliu');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }
}

function salvarCarrinho() {
    localStorage.setItem('carrinhoBiliu', JSON.stringify(carrinho));
}

function alterarQuantidade(id, mudanca) {
    if (!carrinho[id]) {
        carrinho[id] = 0;
    }
    
    const queijo = QUEIJOS_BILIU.find(q => q.id === id);
    const novaQuantidade = carrinho[id] + mudanca;
    
    // Verifica estoque
    if (novaQuantidade > queijo.estoque) {
        alert(`Desculpe, só temos ${queijo.estoque} unidades de ${queijo.nome} disponíveis.`);
        return;
    }
    
    carrinho[id] = Math.max(0, novaQuantidade);
    
    // Atualiza display
    document.getElementById(`qty-${id}`).textContent = carrinho[id];
    atualizarCarrinho();
    salvarCarrinho();
}

function adicionarAoCarrinho(id) {
    const queijo = QUEIJOS_BILIU.find(q => q.id === id);
    if (!queijo.disponivel) return;
    
    if (!carrinho[id]) {
        carrinho[id] = 1;
    } else {
        carrinho[id]++;
    }
    
    atualizarCarrinho();
    salvarCarrinho();
    mostrarNotificacao(`${queijo.nome} adicionado ao carrinho!`);
}

function removerDoCarrinho(id) {
    delete carrinho[id];
    atualizarCarrinho();
    salvarCarrinho();
}

function atualizarCarrinho() {
    atualizarContadorCarrinho();
    atualizarListaCarrinho();
    atualizarResumoCarrinho();
    atualizarBotaoWhatsApp();
}

function atualizarContadorCarrinho() {
    const totalItens = Object.values(carrinho).reduce((total, qtd) => total + qtd, 0);
    document.getElementById('cart-count').textContent = totalItens;
}

function atualizarListaCarrinho() {
    const container = document.getElementById('cart-items');
    const itens = Object.entries(carrinho).filter(([id, qtd]) => qtd > 0);
    
    if (itens.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-biliu">
                <i class="fas fa-cheese"></i>
                <p>Seu carrinho está vazio</p>
                <small>Adicione queijos deliciosos!</small>
            </div>
        `;
        return;
    }
    
    let html = '';
    itens.forEach(([id, qtd]) => {
        const queijo = QUEIJOS_BILIU.find(q => q.id === parseInt(id));
        const subtotal = queijo.preco * qtd;
        
        html += `
            <div class="cart-item-biliu">
                <img src="${queijo.img}" alt="${queijo.nome}" class="cart-item-img-biliu">
                <div class="cart-item-info-biliu">
                    <div class="cart-item-name-biliu">${queijo.nome}</div>
                    <div class="cart-item-price-biliu">R$ ${subtotal.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls-biliu">
                    <button class="qty-btn-biliu" onclick="alterarQuantidade(${queijo.id}, -1)">-</button>
                    <span class="cart-item-qty-biliu">${qtd}</span>
                    <button class="qty-btn-biliu" onclick="alterarQuantidade(${queijo.id}, 1)">+</button>
                    <button class="cart-item-remove-biliu" onclick="removerDoCarrinho(${queijo.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function atualizarResumoCarrinho() {
    let subtotal = 0;
    
    Object.entries(carrinho).forEach(([id, qtd]) => {
        const queijo = QUEIJOS_BILIU.find(q => q.id === parseInt(id));
        subtotal += queijo.preco * qtd;
    });
    
    const taxaEntrega = CONFIG_BILIU.ENTREGA.taxa;
    const total = subtotal + taxaEntrega;
    
    document.getElementById('cart-subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('cart-final').textContent = `R$ ${total.toFixed(2)}`;
    
    const deliveryInfo = document.querySelector('.delivery-info');
    if (taxaEntrega === 0) {
        deliveryInfo.textContent = 'Grátis';
    } else {
        deliveryInfo.textContent = `R$ ${taxaEntrega.toFixed(2)}`;
    }
}

function atualizarBotaoWhatsApp() {
    const btn = document.getElementById('btn-whatsapp');
    const temItens = Object.values(carrinho).some(qtd => qtd > 0);
    
    if (temItens) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

// ===== WHATSAPP =====
function enviarPedidoWhatsApp() {
    const itens = Object.entries(carrinho)
        .filter(([id, qtd]) => qtd > 0)
        .map(([id, qtd]) => {
            const queijo = QUEIJOS_BILIU.find(q => q.id === parseInt(id));
            return `${qtd}x ${queijo.nome} - R$ ${(queijo.preco * qtd).toFixed(2)}`;
        });
    
    if (itens.length === 0) return;
    
    const subtotal = Object.entries(carrinho)
        .filter(([id, qtd]) => qtd > 0)
        .reduce((total, [id, qtd]) => {
            const queijo = QUEIJOS_BILIU.find(q => q.id === parseInt(id));
            return total + (queijo.preco * qtd);
        }, 0);
    
    const taxaEntrega = CONFIG_BILIU.ENTREGA.taxa;
    const total = subtotal + taxaEntrega;
    
    // Substitui placeholders na mensagem
    let mensagem = CONFIG_BILIU.MENSAGEM_WHATSAPP
        .replace('{ITENS}', itens.join('\n'))
        .replace('{SUBTOTAL}', subtotal.toFixed(2))
        .replace('{TAXA_ENTREGA}', taxaEntrega === 0 ? 'Grátis' : `R$ ${taxaEntrega.toFixed(2)}`)
        .replace('{TOTAL}', total.toFixed(2))
        .replace('{DIAS_ENTREGA}', CONFIG_BILIU.ENTREGA.dias)
        .replace('{HORARIO_ENTREGA}', CONFIG_BILIU.ENTREGA.horario)
        .replace('{REGIAO_ENTREGA}', CONFIG_BILIU.ENTREGA.regiao)
        .replace('{NOME_VENDEDOR}', CONFIG_BILIU.SEUS_DADOS.nome);
    
    // Codifica para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Abre WhatsApp
    const urlWhatsApp = `https://wa.me/${CONFIG_BILIU.SEUS_DADOS.telefone}?text=${mensagemCodificada}`;
    window.open(urlWhatsApp, '_blank');
    
    // Limpa carrinho após envio
    limparCarrinho();
    mostrarNotificacao('Pedido enviado para o WhatsApp!');
}

function limparCarrinho() {
    carrinho = {};
    atualizarCarrinho();
    salvarCarrinho();
    QUEIJOS_BILIU.forEach(q => {
        const qtyElement = document.getElementById(`qty-${q.id}`);
        if (qtyElement) qtyElement.textContent = '0';
    });
}

// ===== CONFIGURAÇÕES DE CONTATO =====
function atualizarInformacoesContato() {
    document.getElementById('contact-whatsapp').textContent = 
        formatarTelefone(CONFIG_BILIU.SEUS_DADOS.telefone);
    document.getElementById('contact-city').textContent = 
        CONFIG_BILIU.SEUS_DADOS.cidade;
    document.getElementById('contact-delivery').textContent = 
        CONFIG_BILIU.ENTREGA.dias;
    
    // Configura link do WhatsApp no footer
    const whatsappLink = document.getElementById('whatsapp-footer');
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/${CONFIG_BILIU.SEUS_DADOS.telefone}`;
    }
}

// ===== EVENT LISTENERS =====
function configurarEventListeners() {
    // Carrinho flutuante
    document.getElementById('cart-float').addEventListener('click', function() {
        document.getElementById('cart-sidebar').classList.add('open');
        carrinhoVisivel = true;
    });
    
    // Fechar carrinho
    document.getElementById('close-cart').addEventListener('click', function() {
        document.getElementById('cart-sidebar').classList.remove('open');
        carrinhoVisivel = false;
    });
    
    // Botão WhatsApp
    document.getElementById('btn-whatsapp').addEventListener('click', enviarPedidoWhatsApp);
    
    // Fechar carrinho ao clicar fora (se necessário)
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('cart-sidebar');
        const floatBtn = document.getElementById('cart-float');
        
        if (carrinhoVisivel && 
            !sidebar.contains(event.target) && 
            !floatBtn.contains(event.target)) {
            sidebar.classList.remove('open');
            carrinhoVisivel = false;
        }
    });
}

// ===== UTILITÁRIOS =====
function mostrarNotificacao(mensagem) {
    // Cria notificação simples
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--biliu-orange);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Adiciona estilos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);