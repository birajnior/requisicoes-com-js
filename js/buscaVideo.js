import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";
const inputPesquisa = document.querySelector("#pesquisar");

async function buscaVideo(event) {
  const dadosDePesquisa = inputPesquisa.value;
  const busca = await conectaApi.buscaVideo(dadosDePesquisa);

  const lista = document.querySelector("[data-lista]");

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  busca.forEach((element) =>
    lista.appendChild(
      constroiCard(
        element.titulo,
        element.descricao,
        element.url,
        element.imagem
      )
    )
  );

  if (busca.length == 0) {
    lista.innerHTML = `<hs class="mensagem__titulo">Não existem vídoes com esse termo</hs>`;
  }
}

inputPesquisa.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && inputPesquisa.value) {
    buscaVideo();
  }
});

const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");
botaoDePesquisa.addEventListener("click", (event) => {
  event.preventDefault();
  buscaVideo();
});
