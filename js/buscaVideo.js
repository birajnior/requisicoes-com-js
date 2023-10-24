import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscaVideo(event) {
  event.preventDefault();

  const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
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

const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");
botaoDePesquisa.addEventListener("click", (event) => buscaVideo(event));
