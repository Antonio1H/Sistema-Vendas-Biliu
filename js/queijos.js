// Catálogo de queijos Biliu
const QUEIJOS_BILIU = [
    {
        id: 1,
        nome: "Biliu Frescal",
        descricao: "Nosso carro-chefe! Suave, cremoso e perfeito para o dia a dia.",
        preco: 21.90,
        categoria: "tradicional",
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80",
        disponivel: true,
        estoque: 25,
        destaque: true,
        ingredientes: ["Leite fresco pasteurizado", "Sal marinho", "Fermento lácteo"]
    },
    {
        id: 2,
        nome: "Biliu Gold",
        descricao: "Mussarela premium que derrete perfeitamente. Ideal para pizzas gourmet.",
        preco: 26.50,
        categoria: "tradicional",
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=400&q=80",
        disponivel: true,
        estoque: 18,
        destaque: true,
        ingredientes: ["Leite integral", "Sal grosso", "Fermentação natural"]
    },
    {
        id: 3,
        nome: "Biliu Prato Especial",
        descricao: "Sabor intenso e textura firme. O preferido dos conhecedores.",
        preco: 28.90,
        categoria: "tradicional",
        img: "https://images.unsplash.com/photo-1486297076363-6f57b7d8c804?auto=format&fit=crop&w=400&q=80",
        disponivel: true,
        estoque: 15,
        destaque: false,
        ingredientes: ["Leite de vaca", "Sal marinho", "Maturação controlada"]
    },
    {
        id: 4,
        nome: "Biliu Provolone",
        descricao: "Defumado artesanalmente. Sabor marcante que conquista paladares exigentes.",
        preco: 32.90,
        categoria: "especial",
        img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
        disponivel: true,
        estoque: 10,
        destaque: true,
        ingredientes: ["Leite integral", "Defumação natural", "Maturação longa"]
    },
    {
        id: 5,
        nome: "Biliu Gouda",
        descricao: "Holandês autêntico com notas de caramelo e nozes. Cremosidade inigualável.",
        preco: 36.50,
        categoria: "especial",
        img: "https://images.unsplash.com/photo-1603561596118-0a132b757442?auto=format&fit=crop&w=400&q=80",
        disponivel: true,
        estoque: 8,
        destaque: true,
        ingredientes: ["Leite holandês", "Especiarias selecionadas", "Maturação de 6 meses"]
    },
    {
        id: 6,
        nome: "Biliu Brie",
        descricao: "Francês aveludado com interior cremoso. Sofisticação em cada fatia.",
        preco: 38.90,
        categoria: "cremoso",
        img: "https://images.unsplash.com/photo-1563723483537-6e7e664a8ef1?auto=format&fit=crop&w=400&q=80",
        disponivel: true,
        estoque: 6,
        destaque: false,
        ingredientes: ["Leite tipo Brie", "Fungos nobres", "Casca branca natural"]
    },
    {
        id: 7,
        nome: "Biliu Coalho Premium",
        descricao: "Tradição nordestina com toque Biliu. Perfeito para grelhados.",
        preco: 24.90,
        categoria: "tradicional",
        img: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=400&q=80",
        disponivel: true,
        estoque: 12,
        destaque: false,
        ingredientes: ["Leite coalho", "Ervas finas", "Técnica artesanal"]
    },
    {
        id: 8,
        nome: "Biliu Cream",
        descricao: "Ricota leve e saudável. Baixo teor de gordura, alto sabor.",
        preco: 19.90,
        categoria: "cremoso",
        img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80",
        disponivel: true,
        estoque: 20,
        destaque: true,
        ingredientes: ["Soro de leite", "Leite desnatado", "Zero conservantes"]
    }
];

// Categorias Biliu
const CATEGORIAS_BILIU = [
    { id: 'all', nome: 'Todos', icon: 'fa-star' },
    { id: 'tradicional', nome: 'Tradicionais', icon: 'fa-heart' },
    { id: 'especial', nome: 'Especiais', icon: 'fa-crown' },
    { id: 'cremoso', nome: 'Cremosos', icon: 'fa-cloud' }
];