import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cidade } from '../../cidades/entities/cidade.entity';

@Entity()
export class Uf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @OneToMany(() => Cidade, (cidade) => cidade.uf)
  cidades: Cidade[];
}
