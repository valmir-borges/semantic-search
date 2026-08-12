import { getEmbeddings } from "./embedding/EmbeddingService";
import { cosineSimilarity } from "./similarity";

async function main() {
    const embeddings = await getEmbeddings(["Rosas Violetas", "Texto 2", "Texto 3"]);
    const similarity = cosineSimilarity(embeddings[0], embeddings[1]);
    console.log(`Similaridade entre Texto 1 e Texto 2: ${similarity}`);
}

main();