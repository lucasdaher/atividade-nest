import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Uf } from './entities/uf.entity';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';

@Injectable()
export class UfsService {
  constructor(
    @InjectRepository(Uf)
    private ufRepository: Repository<Uf>,
  ) {}

  create(createUfDto: CreateUfDto): Promise<Uf> {
    const uf = this.ufRepository.create(createUfDto);
    return this.ufRepository.save(uf);
  }

  findAll(): Promise<Uf[]> {
    return this.ufRepository.find({ relations: ['cidades'] });
  }

  async findOne(id: number): Promise<Uf> {
    const uf = await this.ufRepository.findOne({
      where: { id },
      relations: ['cidades'],
    });
    if (!uf) {
      throw new Error('UF não encontrada');
    }
    return uf;
  }

  async update(id: number, updateUfDto: UpdateUfDto): Promise<Uf> {
    await this.ufRepository.update(id, updateUfDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ufRepository.delete(id);
  }
}
