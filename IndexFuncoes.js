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

$(document).ready(function () {
    $("#novaTarefa").keypress(function (event) {
        if (event.which === Event) { 
            let tarefa = $("#novaTarefa").val().trim(); 
            if (tarefa !== "") {
                $("#listaTarefas").append("<li>" + tarefa + "</li>");
                $("#novaTarefa").val('');
            }
        }
    });
});
