import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UfsModule } from './ufs/ufs.module';
import { CidadesModule } from './cidades/cidades.module';
import { EstudantesModule } from './estudantes/estudantes.module';
import { Uf } from './ufs/entities/uf.entity';
import { Cidade } from './cidades/entities/cidade.entity';
import { Estudante } from './estudantes/entities/estudante.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Uf, Cidade, Estudante],
      synchronize: true,
    }),
    UfsModule,
    CidadesModule,
    EstudantesModule,
  ],
})
export class AppModule {}
