document.addEventListener ('DOMContentLoaded', function(){
    const contato = {
        numeroCelular: '5587991000000',
        nomeEmpresa: 'Biliu Queijos'
    };

    const precos = {
        queijoCoalho: 32.00,
        queijoCoalhoFuradinho: 35.00,
        cocada: 7.00
    };

    // Elementos DOM
    const qtdQueijoCoalho = document.getElementById('qtd_queijo_coalho');
    const qtdQueijoFuradinho = document.getElementById('qtd_queijo_furadinho');
    const qtdCocada = document.getElementById('qtd_cocada');
    const totalPedido = document.getElementById('totalPedido');
    const resumoConteudo = document.getElementById('resumoConteudo');
    const pedidoForm = document.getElementById('pedidoForm'); 

    // Atualizar quantidade
    document.querySelectorAll('.qtd-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const produto = this.getAttribute('data-produto');
            const input = document.getElementById(`qtd_${produto}`);
            let valor = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                valor++;
            } else if (this.classList.contains('minus') && valor > 0) {
                valor--;
            } 
            
            input.value = valor;
            atualizarResumo();
        });
    });

     // Atualizar resumo do pedido
    function atualizarResumo() {
        const qtdQC = parseInt(qtdQueijoCoalho.value);
        const qtdQF = parseInt(qtdQueijoFuradinho.value);
        const qtdC = parseInt(qtdCocada.value);
        
        let total = 0;
        let resumoHTML = '';
        
        if (qtdQC > 0) {
            const subtotal = qtdQC * precos.queijo_coalho;
            total += subtotal;
            resumoHTML += `<p>Queijo Coalho: ${qtdQC} x R$ ${precos.queijo_coalho.toFixed(2)} = R$ ${subtotal.toFixed(2)}</p>`;
        }
        
        if (qtdQF > 0) {
            const subtotal = qtdQF * precos.queijo_furadinho;
            total += subtotal;
            resumoHTML += `<p>Queijo Furadinho: ${qtdQF} x R$ ${precos.queijo_furadinho.toFixed(2)} = R$ ${subtotal.toFixed(2)}</p>`;
        }
        
        if (qtdC > 0) {
            const subtotal = qtdC * precos.cocada;
            total += subtotal;
            resumoHTML += `<p>Cocada: ${qtdC} x R$ ${precos.cocada.toFixed(2)} = R$ ${subtotal.toFixed(2)}</p>`;
        }
        
        if (total === 0) {
            resumoConteudo.innerHTML = '<p>Nenhum produto selecionado</p>';
        } else {
            resumoConteudo.innerHTML = resumoHTML;
        }
        
        totalPedido.textContent = total.toFixed(2);
    }
    
    // Enviar pedido pelo WhatsApp
    pedidoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;
        const observacoes = document.getElementById('observacoes').value;
        
        const qtdQC = parseInt(qtdQueijoCoalho.value);
        const qtdQF = parseInt(qtdQueijoFuradinho.value);
        const qtdC = parseInt(qtdCocada.value);
        
        if (qtdQC === 0 && qtdQF === 0 && qtdC === 0) {
            alert('Por favor, selecione pelo menos um produto!');
            return;
        }
        
        // Montar mensagem
        let mensagem = `*PEDIDO - ${config.nomeEmpresa}*%0A`;
        mensagem += `%0A*Cliente:* ${nome}`;
        mensagem += `%0A*Telefone:* ${telefone}`;
        mensagem += `%0A*Endereço:* ${endereco}`;
        mensagem += `%0A%0A*ITENS DO PEDIDO:*%0A`;
        
        if (qtdQC > 0) {
            mensagem += `%0A- Queijo Coalho: ${qtdQC} un. (R$ ${(qtdQC * precos.queijo_coalho).toFixed(2)})`;
        }
        
        if (qtdQF > 0) {
            mensagem += `%0A- Queijo Furadinho: ${qtdQF} un. (R$ ${(qtdQF * precos.queijo_furadinho).toFixed(2)})`;
        }
        
        if (qtdC > 0) {
            mensagem += `%0A- Cocada: ${qtdC} un. (R$ ${(qtdC * precos.cocada).toFixed(2)})`;
        }
        
        mensagem += `%0A%0A*TOTAL: R$ ${totalPedido.textContent}*`;
        
        if (observacoes.trim() !== '') {
            mensagem += `%0A%0A*Observações:* ${observacoes}`;
        }
        
        mensagem += `%0A%0A_Pedido enviado através do site_`;
        
        // Abrir WhatsApp
        const url = `https://wa.me/${config.telefoneWhatsApp}?text=${mensagem}`;
        window.open(url, '_blank');
        
        // Limpar formulário (opcional)
        // pedidoForm.reset();
        // atualizarResumo();
    });
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }
        
        e.target.value = value;
    });
});
