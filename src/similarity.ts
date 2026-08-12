//Função para calcular a similaridade do cosseno entre dois vetores
//Quanto mais próximo de 1, mais semelhantes são os vetores, ou seja, menor o ângulo entre eles
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
    //Verificando se os vetores têm o mesmo tamanho
    if (vecA.length !== vecB.length) {
        throw new Error("Os vetores devem ter o mesmo tamanho");
    }

    //Primeiro, calculamos o produto escalar dos dois vetores
    let produtoEscalar = 0;
    for (let i = 0; i < vecA.length; i++) {
        produtoEscalar += vecA[i] * vecB[i];
    }

    //Em seguida, calculamos a magnitude de cada vetor
    let magnitudeA = 0;
    let magnitudeB = 0;
    for (let i = 0; i < vecA.length; i++) {
        magnitudeA += vecA[i] * vecA[i];
        magnitudeB += vecB[i] * vecB[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    return produtoEscalar / (magnitudeA * magnitudeB);
}