import React from "react";

function Home({ products }) {
    return (
        <div className="App">
            <h1>Produtos</h1>
            <div className="product-list">
                {products.map((produto, index) => (
                    <div key={index} className="product-card">
                        <img src={produto.foto1Produto} alt={produto.nome} />
                        <h2>{produto.nome}</h2>
                        <p>Categoria: {produto.categoriaProduto}</p>
                        <p>Preço: R${produto.precoProduto}</p>
                        <p>Tamanho: {produto.tamanhoProduto}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
