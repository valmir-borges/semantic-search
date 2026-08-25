import { chunkText } from "./embedding/Chunking";
import { getEmbeddings } from "./embedding/EmbeddingService";
import { cosineSimilarity } from "./similarity";

async function main() {

    //Texto a ser salvo como banco de dados
    const texto = `
    A inteligência artificial é uma área da computação dedicada ao desenvolvimento de sistemas capazes de realizar tarefas que normalmente exigiriam algum tipo de inteligência humana. Entre essas tarefas estão o reconhecimento de imagens, processamento de linguagem natural, reconhecimento de voz, tomada de decisões e identificação de padrões. Atualmente, a inteligência artificial está presente em diversas áreas da sociedade, como saúde, educação, indústria, finanças e entretenimento.

O aprendizado de máquina, também conhecido como machine learning, é uma das principais áreas da inteligência artificial. Em vez de programar manualmente todas as regras que um sistema deve seguir, o aprendizado de máquina permite que o computador encontre padrões a partir de dados. Um modelo pode receber milhares ou milhões de exemplos e aprender relações existentes nesses dados para posteriormente realizar previsões ou classificações.

Existem diferentes tipos de aprendizado de máquina. No aprendizado supervisionado, o modelo recebe exemplos que possuem respostas conhecidas. Um exemplo seria um sistema que recebe diversas imagens classificadas como "gato" ou "cachorro" e aprende a classificar novas imagens. No aprendizado não supervisionado, o algoritmo trabalha com dados que não possuem respostas previamente definidas, buscando encontrar padrões, grupos ou estruturas nos próprios dados.

As redes neurais artificiais são modelos computacionais inspirados, de maneira simplificada, no funcionamento dos neurônios biológicos. Elas são compostas por camadas de unidades de processamento conectadas entre si. Uma rede neural pode possuir uma camada de entrada, uma ou mais camadas intermediárias e uma camada de saída. Durante o treinamento, os pesos dessas conexões são ajustados para que a rede produza resultados cada vez mais próximos dos resultados esperados.

O deep learning, ou aprendizado profundo, utiliza redes neurais com muitas camadas para resolver problemas complexos. Esse tipo de técnica apresentou resultados importantes em áreas como reconhecimento de voz, visão computacional e processamento de linguagem natural. Modelos modernos de linguagem também utilizam arquiteturas baseadas em redes neurais profundas para compreender e gerar textos.

O processamento de linguagem natural, frequentemente chamado de NLP, é uma área responsável por permitir que computadores processem e trabalhem com linguagem humana. Sistemas de NLP podem ser utilizados para tradução automática, classificação de textos, análise de sentimentos, resumo de documentos, reconhecimento de entidades e sistemas de perguntas e respostas.

Uma técnica importante relacionada ao processamento de linguagem natural é a representação de textos por meio de embeddings. Um embedding transforma um texto em um vetor numérico que representa características semânticas daquele texto. Textos que possuem significados relacionados tendem a produzir vetores que apresentam maior proximidade no espaço vetorial.

A similaridade de cosseno pode ser utilizada para comparar embeddings. Ela mede o ângulo entre dois vetores e pode ser usada para estimar o grau de proximidade entre suas representações. Em sistemas de busca semântica, uma consulta feita pelo usuário pode ser transformada em um embedding e comparada com os embeddings de diversos trechos de documentos.

Uma busca semântica funciona de maneira diferente de uma busca baseada exclusivamente em palavras-chave. Em uma busca tradicional, uma pesquisa por "automóvel" pode não encontrar um documento que utilize somente a palavra "carro", dependendo da implementação. Em uma busca semântica, o sistema procura compreender a relação entre os significados dos textos e pode identificar que "automóvel" e "carro" representam conceitos relacionados.

Para implementar uma busca semântica, documentos grandes geralmente são divididos em partes menores chamadas chunks. Cada chunk recebe um embedding próprio. Quando o usuário realiza uma pesquisa, sua pergunta também é transformada em um embedding. O sistema então compara o embedding da pergunta com os embeddings dos chunks e ordena os resultados de acordo com sua similaridade.

O tamanho dos chunks é uma decisão importante. Chunks muito pequenos podem perder contexto e produzir representações pouco informativas. Por outro lado, chunks muito grandes podem misturar vários assuntos diferentes e dificultar a identificação do trecho mais relevante. Por esse motivo, sistemas reais costumam buscar um equilíbrio entre tamanho e quantidade de contexto.

Os embeddings também podem ser armazenados em bancos de dados para permitir que sejam reutilizados. Em uma aplicação real, o documento pode ser processado apenas uma vez. Seus chunks são transformados em embeddings e armazenados. Quando um usuário realiza uma nova pesquisa, somente a pergunta precisa ser transformada em um novo embedding, que será comparado com os vetores já armazenados.

Bancos de dados vetoriais são sistemas especializados em armazenar e consultar vetores. Eles podem utilizar diferentes técnicas para encontrar rapidamente os vetores mais próximos de uma determinada consulta. Isso é especialmente importante quando uma aplicação possui milhares ou milhões de documentos, pois comparar manualmente a consulta com todos os vetores pode se tornar computacionalmente caro.

Além da inteligência artificial, bancos de dados tradicionais continuam sendo fundamentais para aplicações modernas. Bancos relacionais organizam informações em tabelas e normalmente utilizam uma estrutura baseada em linhas e colunas. Exemplos de bancos relacionais incluem PostgreSQL, MySQL e SQL Server. Eles são muito utilizados quando a aplicação precisa de relacionamentos bem definidos e transações confiáveis.

Bancos de dados NoSQL apresentam modelos diferentes de armazenamento e podem ser úteis em aplicações que trabalham com grandes volumes de dados ou estruturas mais flexíveis. MongoDB, por exemplo, utiliza documentos semelhantes a objetos JSON para armazenar informações. Isso permite que diferentes documentos tenham estruturas relativamente flexíveis.

Sistemas distribuídos são utilizados quando uma aplicação precisa funcionar em múltiplos computadores ou servidores. Em vez de depender de uma única máquina, diferentes componentes podem ser distribuídos entre vários serviços. Essa abordagem pode melhorar escalabilidade e disponibilidade, mas também aumenta a complexidade da aplicação.

O conceito de escalabilidade está relacionado à capacidade de um sistema suportar o crescimento da quantidade de usuários, requisições ou dados. A escalabilidade vertical consiste em aumentar os recursos de uma máquina, como memória RAM e processamento. A escalabilidade horizontal consiste em adicionar novas máquinas ou instâncias para distribuir a carga.

Caches também são utilizados para melhorar o desempenho de sistemas. Um cache armazena temporariamente informações que são acessadas com frequência, evitando que a aplicação precise buscar os mesmos dados repetidamente em uma fonte mais lenta. Redis é uma tecnologia bastante utilizada para esse objetivo.

Filas de mensagens são outra ferramenta comum em sistemas distribuídos. Uma fila permite que uma aplicação envie uma tarefa para processamento posterior, em vez de realizar tudo imediatamente durante uma requisição. Isso pode ser útil para tarefas demoradas, como processamento de arquivos, envio de notificações e geração de relatórios.

A segurança também é uma preocupação importante no desenvolvimento de sistemas. Aplicações devem proteger informações sensíveis, controlar permissões e validar os dados recebidos dos usuários. Autenticação é o processo de verificar a identidade de um usuário, enquanto autorização determina quais recursos esse usuário pode acessar.

No desenvolvimento de APIs, é comum utilizar métodos HTTP como GET, POST, PUT, PATCH e DELETE. O método GET geralmente é utilizado para consultar informações, enquanto POST é utilizado para criar novos recursos. PUT e PATCH podem ser utilizados para atualizar informações, e DELETE é utilizado para removê-las.

Uma API bem estruturada também deve retornar códigos de status HTTP apropriados. O código 200 indica uma requisição bem-sucedida, enquanto 201 normalmente indica que um recurso foi criado. O código 400 representa uma requisição inválida, 401 indica falta de autenticação, 403 indica falta de permissão e 404 indica que o recurso solicitado não foi encontrado.

No desenvolvimento de software, testes automatizados são importantes para verificar se o sistema continua funcionando corretamente após alterações no código. Testes unitários verificam partes específicas da aplicação, enquanto testes de integração verificam a interação entre diferentes componentes.

O controle de versão também é essencial em projetos de software. Git permite registrar alterações realizadas no código, criar branches para desenvolver funcionalidades separadamente e posteriormente integrar essas alterações. Plataformas como GitHub e GitLab são utilizadas para armazenar repositórios e facilitar a colaboração entre desenvolvedores.

Docker é uma tecnologia utilizada para empacotar aplicações e suas dependências em containers. Um container fornece um ambiente isolado no qual a aplicação pode ser executada de maneira consistente. Docker Compose permite definir e executar múltiplos serviços relacionados, como uma API, um banco de dados e um servidor Redis.

Em projetos modernos, é comum combinar várias dessas tecnologias. Uma aplicação pode possuir um frontend responsável pela interface do usuário, uma API responsável pelas regras de negócio, um banco de dados responsável pelo armazenamento das informações, Redis para cache e filas, Docker para padronizar o ambiente e serviços especializados para processamento de dados.

No caso de uma aplicação de busca semântica, o usuário pode enviar um documento para o sistema. O backend divide o documento em chunks, gera um embedding para cada trecho e armazena essas informações. Quando o usuário realiza uma pergunta, o sistema gera um embedding para a consulta e procura os chunks semanticamente mais próximos. Dessa maneira, a aplicação consegue apresentar os trechos mais relevantes do documento sem depender exclusivamente da presença das mesmas palavras utilizadas pelo usuário.
    `;

    //Primeiro passo é dividir o texto em partes menores (chunks) para facilitar o processamento e análise do texto.
    const chunks = chunkText(texto);

    //Geramos embeddings para cada chunk do texto, que são representações numéricas que capturam o significado semântico do texto.
    const documentEmbeddings = await getEmbeddings(
        chunks,
        "passage"//O tipo "passage" indica que estamos gerando embeddings para passagens de texto, que serão salvas como banco de dados para futuras consultas.
    );

    //Pergunta do usuário
    const pergunta = "Exemplos de banco de dados relacionais";

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

    //Aplica o filtro e ordena do maior score para o menor, para mostrar os chunks mais próximos primeiro.
    const rankedResults = results
        .filter((result) => result.score > 0.8)
        .sort((a, b) => b.score - a.score);

    console.log(rankedResults);
}

main();