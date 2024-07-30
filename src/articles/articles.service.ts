import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';

@Injectable()
export class ArticlesService {
  private articles = [];

  create(createArticleDto: CreateArticleDto) {
    const article = { id: this.articles.length + 1, ...createArticleDto };
    this.articles.push(article);
    return article;
  }

  findAll(title?: string) {
    if (title) {
      return this.articles.filter((article) => article.title.includes(title));
    }
    // si no existe retornar articulo de prueba
    if (this.articles.length === 0) {
      return [
        {
          title: 'Test Article',
          author: 'Test Author',
          date: '2021-09-01',
        },
      ];
    } else {
      return this.articles;
    }
  }

  findOne(title: string) {
    return this.articles.filter((article) => article.title.includes(title));
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );
    if (articleIndex === -1) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    const updatedArticle = {
      ...this.articles[articleIndex],
      ...updateArticleDto,
    };
    this.articles[articleIndex] = updatedArticle;
    return updatedArticle;
  }

  remove(id: number) {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );
    if (articleIndex === -1) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    this.articles.splice(articleIndex, 1);
    return { message: `Article #${id} deleted` };
  }
}
