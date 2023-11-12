// Função para limpar os campos do formulário e mensagens de erro/sucesso
function limpa_formulário_cep() {
    document.getElementById('txtrua').value = "";
    document.getElementById('txtbairro').value = "";
    document.getElementById('txtcidade').value = "";
    document.getElementById('txtestado').value = "";

    document.getElementById('erroCep').textContent = "";
    document.getElementById('sucessoCadastro').textContent = "";

}
// Callback para processar os resultados da consulta do CEP
function meu_callback(conteudo) {
    // Preencher campos do formulário com os resultados
    if (!("erro" in conteudo)) {
        document.getElementById('txtrua').value = conteudo.logradouro;
        document.getElementById('txtbairro').value = conteudo.bairro;
        document.getElementById('txtcidade').value = conteudo.localidade;
        document.getElementById('txtestado').value = conteudo.uf;


        // Preencher campos do formulário com os resultados
        document.getElementById('erroCep').textContent = "";
        document.getElementById('sucessoCadastro').textContent = "";

    } else {
        // Se houver erro, limpar formulário e exibir mensagem de erro

        limpa_formulário_cep();
        document.getElementById('erroCep').textContent = "CEP não encontrado. Por favor, insira um CEP válido.";
    }
}

// Função para salvar as informações na tabela

function salvarInformacoesNaTabela() {
    // Obter valores dos campos

    var rua = document.getElementById('txtrua').value;
    var bairro = document.getElementById('txtbairro').value;
    var cidade = document.getElementById('txtcidade').value;
    var estado = document.getElementById('txtestado').value;

    // Verificar se os campos obrigatórios estão preenchidos

    if (rua && bairro && cidade && estado) {
        // Criar objeto de endereço
        
        var enderecoCadastro = {
            rua: rua,
            bairro: bairro,
            cidade: cidade,
            estado: estado
        };

        // Verificar se já existe um array no localStorage
        var enderecosSalvos = JSON.parse(localStorage.getItem('enderecosSalvos')) || [];

        // Adicionar o endereço atual ao array
        enderecosSalvos.push(enderecoCadastro);

        // Salvar o array de endereços no localStorage
        localStorage.setItem('enderecosSalvos', JSON.stringify(enderecosSalvos));

        // Limpar campos do formulário
        limpa_formulário_cep();

        // Limpar mensagens de erro e sucesso
        document.getElementById('erroCep').textContent = "";
        document.getElementById('sucessoCadastro').textContent = "Item cadastrado com sucesso!";

    } else {
        // Exibir mensagem de erro se algum campo obrigatório estiver vazio
        document.getElementById('erroCep').textContent = "Preencha todos os campos obrigatórios (rua, bairro, cidade, estado) antes de cadastrar.";
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('txtrua').value = "...";
            document.getElementById('txtbairro').value = "...";
            document.getElementById('txtcidade').value = "...";
            document.getElementById('txtestado').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            document.getElementById('erroCep').textContent = "Formato de CEP inválido. Insira um CEP com 8 dígitos.";
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

