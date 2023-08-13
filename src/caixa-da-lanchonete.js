class CaixaDaLanchonete {
    constructor() {
        this.allowedPayments = ['dinheiro', 'credito', 'debito']
        this.menu = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.0 },
            {
                codigo: 'chantily',
                descricao: 'Chantily (extra do Café)',
                valor: 1.5,
            },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.2 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.5 },
            {
                codigo: 'queijo',
                descricao: 'Queijo (extra do Sanduíche)',
                valor: 2.0,
            },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.5 },
        ]
    }

    // Regras do caixa da lanchonete:
    verificarRegrasDoCaixa(metodoDePagamento, itens) {
        let error = false

        if (itens.includes('chantily,1') && !itens.includes('cafe,1'))
            return (error = 'Item extra não pode ser pedido sem o principal')

        if (itens.includes('queijo,1') && !itens.includes('sanduiche,1'))
            return (error = 'Item extra não pode ser pedido sem o principal')

        if (!itens || itens.length === 0)
            return (error = 'Não há itens no carrinho de compra!')

        for (let i = 0; i < itens.length; i++) {
            const [codigo, quantidade] = itens[i].split(',')

            if (!this.menu.find((itemDoMenu) => itemDoMenu.codigo === codigo))
                return (error = 'Item inválido!')

            if (quantidade <= 0) return (error = 'Quantidade inválida!')
        }

        if (!this.allowedPayments.includes(metodoDePagamento))
            return (error = 'Forma de pagamento inválida!')
    }

    formatarValor(valor) {
        return valor.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let itensComprados = [] // criado para facilitar a manipulação dos itens

        let error = this.verificarRegrasDoCaixa(metodoDePagamento, itens)

        if (error) return error

        itens.map((item) => {
            const [codigo, quantidade] = item.split(',')
            itensComprados.push({ codigo, quantidade: Number(quantidade) })
        })

        let valorTotal = itensComprados.reduce((acc, item) => {
            const { codigo, quantidade } = item

            const itemDoMenu = this.menu.find(
                (itemDoMenu) => itemDoMenu.codigo === codigo
            )

            return acc + itemDoMenu.valor * quantidade
        }, 0)

        if (metodoDePagamento === 'dinheiro')
            valorTotal = valorTotal - valorTotal * 0.05

        if (metodoDePagamento === 'credito')
            valorTotal = valorTotal + valorTotal * 0.03

        valorTotal = Number(valorTotal.toFixed(2))
        
        return this.formatarValor(valorTotal)
    }
}

export { CaixaDaLanchonete }
