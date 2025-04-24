import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { Uf } from '../ufs/entities/uf.entity';

@Injectable()
export class CidadesService {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
    @InjectRepository(Uf)
    private ufRepository: Repository<Uf>,
  ) {}

  async create(createCidadeDto: CreateCidadeDto): Promise<Cidade> {
    const uf = await this.ufRepository.findOne({
      where: { id: createCidadeDto.ufId },
    });
    if (!uf) {
      throw new Error('UF não encontrada');
    }
    const cidade = this.cidadeRepository.create({
      nome: createCidadeDto.nome,
      uf: uf,
    });
    return this.cidadeRepository.save(cidade);
  }

  findAll(): Promise<Cidade[]> {
    return this.cidadeRepository.find({ relations: ['uf', 'estudantes'] });
  }

  async findOne(id: number): Promise<Cidade> {
    const cidade = await this.cidadeRepository.findOne({
      where: { id },
      relations: ['uf', 'estudantes'],
    });
    if (!cidade) {
      throw new Error('Cidade não encontrada');
    }
    return cidade;
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto): Promise<Cidade> {
    await this.cidadeRepository.update(id, updateCidadeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cidadeRepository.delete(id);
  }
}
