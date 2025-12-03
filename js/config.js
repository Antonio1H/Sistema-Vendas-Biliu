// Configurações da Biliu Queijos
const CONFIG_BILIU = {
    // Identidade Biliu
    MARCA: {
        nome: "Biliu Queijos",
        slogan: "Sabor artesanal em cada barra",
        cores: {
            azul: "#1A365D",
            laranja: "#C05621",
            branco: "#FFFFFF",
            creme: "#FAF9F6"
        }
    },
    
    // SEUS DADOS - EDITE AQUI!
    SEUS_DADOS: {
        nome: "Antônio",  // Seu nome
        telefone: "5511999999999", // Apenas números, com DDD e código do país
        cidade: "São Paulo",
        regiao: "Zona Sul"
    },
    
    // Entrega
    ENTREGA: {
        dias: "Terça e Sexta-feira",
        horario: "14h às 18h",
        taxa: 0, // 0 para gratuito
        regiao: "Toda a cidade"
    },
    
    // Template da mensagem do WhatsApp
    MENSAGEM_WHATSAPP: `*🧀 BILIU QUEIJOS - ENCOMENDA* 🧀

*Cliente:* {NOME}
*Telefone:* {TELEFONE}
*Endereço:* {ENDERECO}
*Referência:* {REFERENCIA}
*Data preferida:* {DATA_ENTREGA}

*📋 PEDIDO BILIU:*
{ITENS}

*💰 VALORES:*
Subtotal: R$ {SUBTOTAL}
Entrega: {TAXA_ENTREGA}
*TOTAL: R$ {TOTAL}*

*📦 INFORMAÇÕES BILIU:*
• Queijos artesanais premium
• Barras de 500g fresquinhas
• Entregas: {DIAS_ENTREGA}
• Horário: {HORARIO_ENTREGA}
• Região: {REGIAO_ENTREGA}
• Pagamento: 💰 Dinheiro ou PIX

*🍃 Produção sustentável
*⭐ Qualidade garantida

_Olá {NOME_VENDEDOR}! Gostaria de fazer esta encomenda da Biliu._
`.trim(),
    
    // Mensagens automáticas
    MENSAGENS: {
        confirmacao: "✅ Pedido Biliu registrado! Entraremos em contato para confirmar a entrega.",
        lembrete: "🔔 Lembrete Biliu: Sua entrega está programada para amanhã!",
        agradecimento: "🙏 Obrigado por escolher Biliu Queijos!"
    }
};

// Função para formatar valores
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para formatar telefone
function formatarTelefone(numero) {
    const num = numero.toString().replace(/\D/g, '');
    if (num.length === 13) { // Com código do país
        return num.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
    } else if (num.length === 11) { // Apenas DDD + número
        return num.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return numero;
}