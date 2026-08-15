//Função responsável por dividir um texto em partes menores, chamadas de chunks, para facilitar o processamento e análise do texto.
//O tamanho de cada chunk será de 500 caracteres
//Isso é de suma importância, pois dessa forma teremos resultados mais precisos, já que o modelo de embedding utilizado foi treinado para lidar com textos menores, 
//E não com textos longos.

const maxCharacters = 500;

export function chunkText(text: string): string[] {
    const chunks: string[] = [];

    //Variável de controle, ele indica o ponto de início do próximo chunk a ser criado. Inicialmente, ele é definido como 0, ou seja, o início do texto.
    let start = 0;

    //Enquanto o ponto de início do próximo chunk for menor que o tamanho total do texto, continuamos a criar chunks.
    while (start < text.length) {
        //O primeiro chunk a ser criado terá início no ponto 0 e terá um tamanho máximo de 500 caracteres.
        let end = start + maxCharacters;

        //Se o chunk não estiver no final do texto, tentamos encontrar um espaço para não cortar uma palavra. Garantindo que o chunk terá maior legibilidade e coerência.
        if (end < text.length) {
            //A função lastIndexOf retorna o ultimo espaço encontrado antes de determinado ponto
            //No caso, estamos procurando o último espaço antes do ponto final do chunk, para evitar cortar uma palavra ao meio.
            const lastSpace = text.lastIndexOf(" ", end);

            //LastSpace armazena a posição do ultimo espaço
            //Então se a posição do último espaço for maior que o ponto de início do chunk, 
            //Atualizamos o ponto final do chunk para a posição do último espaço encontrado.
            //Por exemplo, no melhor cenário um chunk iria terminar no ponto 500, mas se houver um espaço no ponto 480, o chunk irá terminar no ponto 480, evitando assim cortar uma palavra ao meio.
            if (lastSpace > start) {
                end = lastSpace;
            }
        }

        //Gerando o chunk a partir do ponto de início até o ponto final determinado, e removendo espaços em branco no início e no final do chunk.
        //Usamos o slice para pegar o intervalo de texto e o trim para remover espaços em branco no início e no final do chunk.
        const chunk = text.slice(start, end).trim();

        //Se o chunk gerado não estiver vazio, adicionamos ele ao array de chunks.
        if (chunk.length > 0) {
            chunks.push(chunk);
        }

        //Atualizamos o ponto de início para o próximo chunk, que será o ponto final do chunk atual.
        start = end;
    }

    return chunks;
}