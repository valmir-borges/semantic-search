import { chunkText } from "./embedding/Chunking";
import { getEmbeddings } from "./embedding/EmbeddingService";
import { cosineSimilarity } from "./similarity";

async function main() {

    //Texto a ser salvo como banco de dados
    const texto = `
        O Brasil é um país localizado na América do Sul.
        Sua capital é Brasília.
        O Brasil possui 26 estados e o Distrito Federal.
        O país possui uma grande diversidade cultural.
    `;

    //Primeiro passo é dividir o texto em partes menores (chunks) para facilitar o processamento e análise do texto.
    const chunks = chunkText(texto);

    //Geramos embeddings para cada chunk do texto, que são representações numéricas que capturam o significado semântico do texto.
    const documentEmbeddings = await getEmbeddings(
        chunks,
        "passage"//O tipo "passage" indica que estamos gerando embeddings para passagens de texto, que serão salvas como banco de dados para futuras consultas.
    );

    //Pergunta do usuário
    const pergunta = "Qual é a capital do Brasil?";

    //Gera o embedding da pergunta
    const queryEmbedding = await getEmbeddings(
        [pergunta],
        "query"//O tipo "query" indica que estamos gerando embeddings para uma consulta do usuário, que será comparada com os embeddings das passagens de texto salvas.
    );

    //Compara a pergunta com cada chunk
    const results = documentEmbeddings.map((embedding, index) => {
        return {
            chunk: chunks[index],
            score: cosineSimilarity(
                queryEmbedding[0],
                embedding
            ),
        };
    });

    //Retornando apenas resultados com score maior que 0.8, ou seja, apenas resultados relevantes.
    results.filter((result) => result.score > 0.8);

    console.log(results);
}

main();