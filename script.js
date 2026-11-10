// =====================================================
// MODAL REAPROVEITÁVEL (um só, o JS cria e esconde)
// =====================================================
const modal = document.createElement("div");
modal.style.cssText = "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); justify-content:center; align-items:center; z-index:100;";
modal.innerHTML = `
    <div style="background:#130c2d; color:white; padding:30px; border-radius:20px; width:400px; max-width:90%; text-align:center;">
        <h3 id="modal-titulo"></h3>
        <p id="modal-texto" style="margin:20px 0;"></p>
        <button id="fechar-modal" class="btn_entrar" style="border:none; cursor:pointer; width:100%;">Fechar</button>
    </div>
`;
document.body.appendChild(modal);

// quem chama manda o título e o texto: o conteúdo muda, o modal é o mesmo
function abrirModal(titulo, texto) {
    document.getElementById("modal-titulo").textContent = titulo;
    document.getElementById("modal-texto").textContent = texto;
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";
}

document.getElementById("fechar-modal").addEventListener("click", fecharModal);

// clicar no fundo escuro (fora da caixa) também fecha
modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        fecharModal();
    }
});


// =====================================================
// VALIDAÇÃO DO FORMULÁRIO (seção Cadastro)
// =====================================================
const form = document.getElementById("formulario");   // id correto do HTML
const msgErro = document.getElementById("msg_erro");         // parágrafos que já existem no HTML
const msgSucesso = document.getElementById("msg_sucesso");

function mostrarErro(texto) {
    msgSucesso.textContent = "";
    msgErro.textContent = texto;
}

// ---------- TELEFONE COM MÁSCARA AUTOMÁTICA ----------
// a pessoa digita só os números e o JS monta o "(41) 99999-9999" sozinho
const campoTelefone = document.getElementById("telefone");
campoTelefone.setAttribute("inputmode", "tel"); // no celular abre o teclado numérico
campoTelefone.setAttribute("maxlength", "15");  // tamanho de "(41) 99999-9999"

function formatarTelefone(valor) {
    let n = valor.replace(/\D/g, "");                 // deixa só os números
    if (n.length > 11 && n.startsWith("55")) {
        n = n.slice(2);                               // tira o +55 se a pessoa colar com ele
    }
    n = n.slice(0, 11);                               // máximo: DDD + 9 dígitos

    if (n.length === 0) return "";
    if (n.length <= 2) return "(" + n;
    if (n.length <= 6) return "(" + n.slice(0, 2) + ") " + n.slice(2);
    if (n.length <= 10) return "(" + n.slice(0, 2) + ") " + n.slice(2, 6) + "-" + n.slice(6);
    return "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7);
}

campoTelefone.addEventListener("input", function () {
    campoTelefone.value = formatarTelefone(campoTelefone.value);
});


form.addEventListener("submit", function (event) {
    event.preventDefault(); // não deixa a página recarregar

    // lendo os campos com .value
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const cidade = document.getElementById("cidade").value.trim();
    const selectNicho = document.getElementById("nicho");
    const nicho = selectNicho.value;
    const perfil = document.querySelector('input[name="perfil"]:checked'); // radio marcado (ou null)
    const mensagem = document.getElementById("mensagem").value.trim();
    const aceite = document.getElementById("aceite").checked;

    // tira parênteses, espaços e traço do telefone: "(41) 99999-9999" vira "41999999999"
    const telefoneNumeros = telefone.replace(/\D/g, "");

    // confere um por um (para no primeiro erro)
    if (nome === "") {
        mostrarErro("Digite seu nome.");
    } else if (!email.includes("@") || !email.includes(".")) {
        mostrarErro("Digite um e-mail válido.");
    } else if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
        mostrarErro("Telefone incompleto. Digite o DDD + número, ex.: (41) 99999-9999.");
    } else if (idade < 16 || idade > 100) {
        mostrarErro("A idade deve ser entre 16 e 100.");
    } else if (cidade === "") {
        mostrarErro("Digite sua cidade.");
    } else if (nicho === "") {
        mostrarErro("Escolha seu nicho preferido.");
    } else if (perfil === null) {
        mostrarErro("Escolha: participante ou organizador.");
    } else if (mensagem.length < 10) {
        mostrarErro("A mensagem precisa ter pelo menos 10 caracteres.");
    } else if (!aceite) {
        mostrarErro("Você precisa aceitar as regras de reputação.");
    } else {
        // tudo certo!
        const nomeDoNicho = selectNicho.options[selectNicho.selectedIndex].textContent; // texto bonito do select
        msgErro.textContent = "";
        msgSucesso.textContent = "Cadastro feito com sucesso!";
        abrirModal(
            "Bem-vindo(a), " + nome + "!",
            "Seu nicho preferido é " + nomeDoNicho + " e você entra como " + perfil.value + "."
        );
        form.reset(); // limpa o formulário
    }
});


// =====================================================
// LISTA DINÂMICA (seção Planos): escolher, apagar um, apagar todos
// =====================================================
const planos = {
    "Começar grátis": { nome: "Plano Grátis", info: "R$0. Até 15 vagas por rolê, fila de espera inteligente e fechamento automático das vagas." },
    "Assinar Premium": { nome: "Plano Premium", info: "Pague por evento. Vagas ilimitadas, preenchimento automático de última hora e reembolso automático." }
};
let escolhidos = []; // guarda os planos escolhidos

// o JS cria a área da lista dentro da seção #planos
const areaPlanos = document.createElement("div");
areaPlanos.innerHTML = `
    <h3 style="margin-top:30px;">Planos escolhidos</h3>
    <ul id="lista-planos" style="list-style:none; max-width:500px; margin:15px auto;"></ul>
    <button id="apagar-planos" class="btn_enviar" style="max-width:200px; width:100%; margin:0 auto; display:block;">Apagar todos</button>
`;
document.getElementById("planos").appendChild(areaPlanos);

const listaPlanos = document.getElementById("lista-planos");

function mostrarPlanos() {
    listaPlanos.innerHTML = ""; // limpa e desenha de novo

    escolhidos.forEach(function (chave, i) {
        const li = document.createElement("li");
        li.style.cssText = "display:flex; justify-content:space-between; align-items:center; gap:8px; padding:10px; border-bottom:1px solid #302040;";
        li.innerHTML = "<span>" + planos[chave].nome + "</span> <button>Detalhes</button> <button>Apagar</button>";

        // Detalhes abre o modal com o texto desse plano
        li.children[1].addEventListener("click", function () {
            abrirModal(planos[chave].nome, planos[chave].info);
        });
        // Apagar remove só este
        li.children[2].addEventListener("click", function () {
            escolhidos.splice(i, 1);
            mostrarPlanos();
        });

        listaPlanos.appendChild(li);
    });
}

// os botões "Começar grátis" e "Assinar Premium" adicionam o plano na lista
document.querySelectorAll(".planos_cards .btn_plano").forEach(function (botao) {
    botao.addEventListener("click", function (event) {
        event.preventDefault(); // não pula pro cadastro
        const chave = botao.textContent.trim();

        if (planos[chave] && !escolhidos.includes(chave)) { // só adiciona se ainda não estiver na lista
            escolhidos.push(chave);
            mostrarPlanos();
        }
    });
});

document.getElementById("apagar-planos").addEventListener("click", function () {
    escolhidos = [];
    mostrarPlanos();
});


// =====================================================
// ACCORDION (card Novatos): 6 itens
// =====================================================
const duvidas = [
    ["Quem é novato?", "Quem ainda não completou 3 rolês."],
    ["O que é Em Observação?", "Um status temporário, até você completar 3 rolês."],
    ["Como saio da observação?", "Comparecendo e fazendo check-in em 3 rolês."],
    ["Novato ganha pontos?", "Ganha. Comparecer vale +2 e cancelar com 4h+ vale +1."],
    ["E se eu faltar?", "Você perde pontos normalmente (-1 ou -2)."],
    ["Posso cancelar minha vaga?", "Pode. Cancelando com 4h+ de antecedência você ainda ganha +1."]
];

// o card Novatos é o 3º .card_reputacao (índice 2)
const cardNovatos = document.querySelectorAll(".card_reputacao")[2];

duvidas.forEach(function (item) {
    const pergunta = document.createElement("button");
    pergunta.textContent = item[0];
    pergunta.style.cssText = "display:block; width:100%; margin-top:8px; padding:8px; text-align:left; cursor:pointer; background:transparent; color:inherit; border:1px solid #302040; border-radius:10px;";

    const resposta = document.createElement("p");
    resposta.textContent = item[1];
    resposta.style.cssText = "display:none; font-size:13px; padding:6px 8px;"; // começa fechada

    // clicou na pergunta: abre ou fecha a resposta
    pergunta.addEventListener("click", function () {
        resposta.style.display = resposta.style.display === "none" ? "block" : "none";
    });

    cardNovatos.appendChild(pergunta);
    cardNovatos.appendChild(resposta);
});


// =====================================================
// TROCA DE CORES + MODO CLARO/ESCURO
// =====================================================
const tema = document.createElement("div");
tema.style.cssText = "display:flex; gap:8px; align-items:center;";

// 4 cores: cada uma vira uma bolinha clicável
["#a505a5", "#2563eb", "#16a34a", "#ea580c"].forEach(function (cor) {
    const bolinha = document.createElement("button");
    bolinha.style.cssText = "width:24px; height:24px; border-radius:50%; border:none; cursor:pointer; background:" + cor;
    bolinha.addEventListener("click", function () {
        document.querySelectorAll(".texto_roxo").forEach(function (el) { el.style.color = cor; });
        document.querySelectorAll(".btn_entrar, .btn_principal, .btn_enviar").forEach(function (el) { el.style.backgroundColor = cor; });
    });
    tema.appendChild(bolinha);
});

const btnModo = document.createElement("button");
btnModo.textContent = "🌙 / ☀️";
btnModo.style.cursor = "pointer";
tema.appendChild(btnModo);

// coloca no header, antes do botão "Entrar"
const header = document.querySelector("header");
header.insertBefore(tema, header.querySelector(".btn_entrar"));

btnModo.style.cssText = "cursor:pointer; padding:4px 10px; border-radius:999px; border:1px solid #302040; background:transparent; color:inherit;";

// o modo claro é uma classe no body; as cores ficam no style.css (body.claro)
btnModo.addEventListener("click", function () {
    document.body.classList.toggle("claro");
});


// =====================================================
// AVISO DE IMAGEM QUEBRADA (aparece no console, F12)
// =====================================================
document.querySelectorAll("img").forEach(function (img) {
    function avisar() {
        console.warn("Imagem não encontrada: " + img.getAttribute("src") + " (confira pasta e nome do arquivo)");
    }
    if (img.complete && img.naturalWidth === 0) {
        avisar(); // já falhou antes do script rodar
    }
    img.addEventListener("error", avisar);
});