import transformers = require("@huggingface/transformers");
//Biblioteca usada para executar modelos de Machine Learning localmente.

//Carrega o pipeline de extração de características usando o modelo de embedding.
const pipe = transformers.pipeline("feature-extraction", "Xenova/multilingual-e5-small");

//Recebe uma lista de textos e retorna suas representações numéricas.
export async function getEmbeddings(texts: string[]) : Promise<number[][]> {

    //Executa o modelo sobre os textos. O resultado inicial é um Tensor no formato:
    //[quantidade de textos inputados, quantidade de tokens gerado para cada texto inputado, quantidade de números necessários para representar cada token].
    const embeddings = await (await pipe)(texts, {
        //O Pooling entra no seguinte problema: O modelo gera um vetor para cada token do texto, mas queremos um vetor único para cada texto. O pooling resolve isso.
        //Utilizamos o pooling mean para calcular a média dos vetores de cada token, formando assim um vetor único para cada texto.
        pooling: "mean", //Média dos vetores de cada token para formar um vetor único por texto.
        normalize: true, //Normaliza o vetor e ajusta para que a magnitude do vetor seja 1, o que é útil para cálculos de similaridade.
    });
    
    //Transforma o Tensor em um array de arrays de números para facilitar o uso na aplicação.
    return embeddings.tolist();
}

