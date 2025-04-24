import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudante } from './entities/estudante.entity';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { Cidade } from '../cidades/entities/cidade.entity';

@Injectable()
export class EstudantesService {
  constructor(
    @InjectRepository(Estudante)
    private estudanteRepository: Repository<Estudante>,
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async create(createEstudanteDto: CreateEstudanteDto): Promise<Estudante> {
    const cidade = await this.cidadeRepository.findOne({
      where: { id: createEstudanteDto.cidadeId },
    });
    if (!cidade) {
      throw new Error('Cidade não encontrada');
    }
    const estudante = this.estudanteRepository.create({
      nome: createEstudanteDto.nome,
      idade: createEstudanteDto.idade,
      cidade: cidade,
    });
    return this.estudanteRepository.save(estudante);
  }

  findAll(): Promise<Estudante[]> {
    return this.estudanteRepository.find({ relations: ['cidade'] });
  }

  async findOne(id: number): Promise<Estudante> {
    const estudante = await this.estudanteRepository.findOne({
      where: { id },
      relations: ['cidade'],
    });
    if (!estudante) {
      throw new Error('Estudante não encontrado');
    }
    return estudante;
  }

  async update(
    id: number,
    updateEstudanteDto: UpdateEstudanteDto,
  ): Promise<Estudante> {
    await this.estudanteRepository.update(id, updateEstudanteDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.estudanteRepository.delete(id);
  }
}
