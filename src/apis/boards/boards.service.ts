import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../artists/entity/artist.entity';
import { Category } from '../categories/entities/categories.entity';

import { Boards } from './entites/boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private readonly boardRepository: Repository<Boards>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create({ createBoardInput }) {
    const { title, category, artist, ...boards } = createBoardInput;

    const boardCategory = await this.categoryRepository.findOne({
      where: {
        name: category,
      },
    });

    const boardArtist = await this.artistRepository.findOne({
      where: {
        active_name: artist,
      },
    });

    if (!boardArtist) {
      throw new UnprocessableEntityException(
        '아티스트 등록을 해야 게시글 등록을 할수 있습니다.',
      );
    }

    const result = await this.boardRepository.save({
      title: boardArtist.active_name,
      ...boards,
      category: boardCategory,
      artist: boardArtist,
    });
    return result;
  }

  async findAll() {
    const result = await this.boardRepository.find({
      relations: ['category'],
    });
    console.log(result);
    return result;
  }

  async findCategory({ category }) {
    const boardCategory = await this.categoryRepository.findOne({
      where: {
        name: category,
      },
    });

    const result = await this.boardRepository.find({
      where: {
        category: boardCategory,
      },
      relations: ['category', 'artist'],
    });

    if (result.length === 0) {
      throw new UnprocessableEntityException('조회된 내역이없습니다.');
    }
    return result;
  }

  async findOne({ boardId }) {
    const result = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
      relations: ['category', 'artist'],
    });

    if (!result) {
      throw new UnprocessableEntityException('잘못된 조회입니다.');
    }
    return result;
  }
}
