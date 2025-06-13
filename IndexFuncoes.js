function mouseEntrarBotao() {
    const botao = document.getElementById("botao");
    botao.style.background = "black";
    botao.style.color = "white";
}

function mouseSairBotao() {
    const botao = document.getElementById("botao");
    botao.style.background = "white";
    botao.style.color = "black";
}

function mouseUmCliqueProximo() {
    const intro = document.getElementById("intro");
    const tarefas = document.getElementById("tarefas");

    intro.style.display = "none";
    tarefas.style.display = "block";
}

function AdicionarTarefa(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        const textarea = document.getElementById("listagemTarefa");
        const texto = textarea.value.trim();

        if (texto !== "") {
            const lista = document.getElementById("listaTarefas");

            const item = document.createElement("li");
            item.className = "item-tarefa";

            const conteudo = document.createElement("div");
            conteudo.className = "conteudo-tarefa";
            conteudo.textContent = texto;

            const botoes = document.createElement("div");
            botoes.className = "botoes-tarefa";

            const btnConcluir = document.createElement("button");           
            
            btnConcluir.className = "botao-concluir";
            btnConcluir.textContent = "Concluir";
            btnConcluir.onclick = function () {
                conteudo.style.textDecoration = "line-through";
                conteudo.style.opacity = "0.6";
            };

            const btnExcluir = document.createElement("button");
            btnExcluir.className = "botao-excluir";
            btnExcluir.textContent = "Excluir";
            btnExcluir.onclick = function () {
                item.remove();
            };

            botoes.appendChild(btnConcluir);
            botoes.appendChild(btnExcluir);

            item.appendChild(conteudo);
            item.appendChild(botoes);
            lista.appendChild(item);

            textarea.value = "";
            textarea.style.height = "80px";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("listagemTarefa");

    textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    });
});

$(document).ready(function () {
    $("#listagemTarefa").on("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            const texto = $(this).val().trim();
            if (texto !== "") {
                const item = $("<li>").addClass("item-tarefa");

                const conteudo = $("<div>").addClass("conteudo-tarefa").text(texto);

                const botoes = $("<div>").addClass("botoes-tarefa");
                const btnConcluir = $("<button>").addClass("botao-concluir").text("Concluir");
                const btnExcluir = $("<button>").addClass("botao-excluir").text("Excluir");

                botoes.append(btnConcluir, btnExcluir);
                item.append(conteudo, botoes);

                $("#listaTarefas").append(item);
                $(this).val("").height("auto");
            }
        }
    });

    $(document).on("click", ".botao-concluir", function () {
        const tarefa = $(this).closest("li");
        const texto = tarefa.find(".conteudo-tarefa").text();

        tarefa.find(".conteudo-tarefa").css("text-decoration", "line-through");

        const historico = JSON.parse(localStorage.getItem("tarefasConcluidas") || "[]");
        historico.push({
            texto: texto,
            dataHoraConclusao: new Date().toLocaleString("pt-BR")
        });
       
        localStorage.setItem("tarefasConcluidas", JSON.stringify(historico));
        
    });

    $(document).on("click", ".botao-excluir", function () {
        $(this).closest("li").remove();
    });
    
    $("#verHistorico").on("click", function () {
    const historico = JSON.parse(localStorage.getItem("tarefasConcluidas") || "[]");
    const container = $("#listaHistorico");
    const blocoHistorico = $("#historicoTarefas");

    container.empty(); 
    blocoHistorico.show();

        if (historico.length === 0) {
        container.append("<p>Sem tarefas concluídas ainda.</p>");
        } 
        else {
            historico.forEach((t) => {
                const item = $("<li>").addClass("item-tarefa");

                const conteudo = $("<div>").addClass("conteudo-tarefa")
                    .html(`<strong>[${t.dataHoraConclusao}]</strong><br>${t.texto.replace(/\n/g, "<br>")}`);

                item.append(conteudo);
                container.append(item);
           });
        }
    });
});


