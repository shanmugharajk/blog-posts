import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';

import { PostsEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private _postsRepository: Repository<PostsEntity>;

  constructor(private _connection: Connection) {
    this._postsRepository = this._connection.getRepository(PostsEntity);
  }

  async create(createPostDto: CreatePostDto) {
    // == creates a new entity instance ==
    const newPost = this._postsRepository.create();

    newPost.title = createPostDto.title;
    newPost.content = createPostDto.content;

    // == saves the post to db ==
    await this._postsRepository.save(newPost);
    return newPost;
  }

  async findAll() {
    // == returns all records if didn't specify any options ==
    return await this._postsRepository.find();
  }

  async findOne(id: number) {
    return await this._postsRepository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // == if not throws an error ==
    const post = await this._postsRepository.findOneOrFail(id);

    post.content = updatePostDto.content;
    post.title = updatePostDto.title;

    await this._postsRepository.save(post);
    return post;
  }

  async remove(id: number) {
    await this._postsRepository.delete(id);
  }
}
