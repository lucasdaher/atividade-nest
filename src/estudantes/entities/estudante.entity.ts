import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cidade } from '../../cidades/entities/cidade.entity';

@Entity()
export class Estudante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  idade: number;

  @ManyToOne(() => Cidade, (cidade) => cidade.estudantes)
  cidade: Cidade;
}
