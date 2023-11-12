// Array para armazenar os endereços salvos
var enderecosSalvos = [];

// Variáveis para controle da ordenação da tabela

var ordemCrescente = true;
var colunaOrdenada = null;

// Função para atualizar a tabela de consulta com os dados salvos

function atualizarTabelaConsulta() {

    console.log("Atualizando tabela...");
    console.log("Dados do localStorage:", enderecosSalvos);
    var tableBody = document.getElementById('tabelaCorpo');

    // Limpar a tabela removendo as linhas uma a uma

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Adicionar linhas à tabela com os dados salvos

    enderecosSalvos.forEach(function (endereco, index) {
        var row = tableBody.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.textContent = endereco.rua || "";
        cell2.textContent = endereco.bairro || "";
        cell3.textContent = endereco.cidade || "";
        cell4.textContent = endereco.estado || "";

        // Adicionar botão Excluir com a referência para o índice

        var botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', function () {
            excluirEndereco(index);
        });

        cell5.appendChild(botaoExcluir);
    });
}

// Função para excluir um endereço pelo índice

function excluirEndereco(index) {
    console.log("Excluindo endereço no índice:", index);

    if (typeof (Storage) !== "undefined") {

        // Remover o endereço pelo índice

        enderecosSalvos.splice(index, 1);

        // Salvar o array de endereços atualizado no localStorage

        localStorage.setItem('enderecosSalvos', JSON.stringify(enderecosSalvos));

        // Atualizar a tabela de consulta

        atualizarTabelaConsulta();
    }
}



// Função para ordenar a tabela por uma coluna específica
function ordenarTabela(campo) {
    if (colunaOrdenada === campo) {

        // Inverter a ordem da tabela se a mesma coluna estiver sendo clicada novamente

        ordemCrescente = !ordemCrescente;
    } else {

        // Ordenar por uma nova coluna

        ordemCrescente = true;
        colunaOrdenada = campo;
    }

    // Ordenar o array de endereços com base na coluna selecionada

    enderecosSalvos.sort(function (a, b) {
        var valorA = a[campo].toUpperCase();
        var valorB = b[campo].toUpperCase();

        if (valorA < valorB) {
            return ordemCrescente ? -1 : 1;
        }
        if (valorA > valorB) {
            return ordemCrescente ? 1 : -1;
        }
        return 0;
    });

    // Atualizar a tabela de consulta

    atualizarTabelaConsulta();
}

// Adicionar eventos de clique aos cabeçalhos da tabela

var headers = document.querySelectorAll('#consultaTable th');
headers.forEach(function (header) {
    header.addEventListener('click', function () {

        // Obter o nome da coluna a partir do atributo 'data-campo'

        var campo = header.getAttribute('data-campo');
        if (campo) {
            ordenarTabela(campo);
        }
    });
});

// Carregar informações da tabela de consulta na inicialização
window.onload = function () {
    // Carregar endereços salvos do localStorage ou inicializar um array vazio

    enderecosSalvos = JSON.parse(localStorage.getItem('enderecosSalvos')) || [];

    // Atualizar a tabela de consulta
    atualizarTabelaConsulta();
};


