import { Module } from '@nestjs/common';
import { EstudantesService } from './estudantes.service';
import { EstudantesController } from './estudantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudante } from './entities/estudante.entity';
import { Cidade } from '../cidades/entities/cidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudante, Cidade])],
  controllers: [EstudantesController],
  providers: [EstudantesService],
  exports: [EstudantesService],
})
export class EstudantesModule {}
