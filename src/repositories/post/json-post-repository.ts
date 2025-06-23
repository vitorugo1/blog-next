import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';

import { resolve } from 'path';
import { readFile } from 'fs/promises';

// --- Definição de Constantes ---

// Obtém o caminho para o diretório raiz do projeto onde o processo do Node.js foi iniciado.
// Exemplo: /home/usuario/meu-projeto
const ROOT_DIR = process.cwd();

const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

/*
 * Implementação do padrão Repository que utiliza um arquivo JSON local como fonte de dados.
 * Esta classe é responsável por ler e consultar os dados dos posts.
 */
export class JsonPostRepository implements PostRepository {
  /*
   * Método auxiliar privado para ler o arquivo JSON do disco, converter seu conteúdo
   * para um objeto JavaScript e extrair a lista de posts.
   */
  private async readFromDisk(): Promise<PostModel[]> {
    // 1. Lê o conteúdo do arquivo JSON de forma assíncrona.
    // O 'utf-8' é essencial para que o conteúdo seja interpretado como texto.
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');

    // 2. Converte a string JSON em um objeto JavaScript.
    const parsedJson = JSON.parse(jsonContent);

    // 3. Extrai o array de 'posts' do objeto principal.
    // Isso presume que o JSON tem a estrutura: { "posts": [...] }
    const { posts } = parsedJson;

    // 4. Retorna o array de posts.
    return posts;
  }

  //Busca e retorna todos os posts disponíveis na fonte de dados.
  async findAll(): Promise<PostModel[]> {
    // Chama o método interno para ler os dados do disco.
    const posts = await this.readFromDisk();
    return posts;
  }

  //Busca um único post pelo seu ID.
  async findById(id: string): Promise<PostModel> {
    // NOTA DE PERFORMANCE: Carrega TODOS os posts em memória a cada chamada.
    // Para um número pequeno de posts, isso é aceitável. Para um sistema em produção
    // com muitos dados, um banco de dados real seria muito mais eficiente.
    const posts = await this.findAll();

    // Usa o método 'find' de arrays para procurar o post com o ID correspondente.
    const post = posts.find(post => post.id === id);

    // Se o 'find' não encontrar nada, ele retorna 'undefined'.
    // Neste caso, lançamos um erro para sinalizar que o recurso não foi encontrado.
    if (!post) {
      throw new Error('Post não encontrado');
    }

    // Retorna o objeto do post que foi encontrado.
    return post;
  }
}
