import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { CreateEstudanteDto } from '../estudantes/dto/create-estudante.dto';
import { EstudantesService } from '../estudantes/estudantes.service';

@Controller('cidades')
export class CidadesController {
  constructor(
    private readonly cidadesService: CidadesService,
    private readonly estudantesService: EstudantesService,
  ) {}

  @Post()
  create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadesService.create(createCidadeDto);
  }

  @Post(':id/estudantes')
  async addEstudantes(
    @Param('id') id: string,
    @Body() estudantes: CreateEstudanteDto[],
  ) {
    return Promise.all(
      estudantes.map((estudante) =>
        this.estudantesService.create({ ...estudante, cidadeId: +id }),
      ),
    );
  }

  @Get()
  findAll() {
    return this.cidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCidadeDto: UpdateCidadeDto) {
    return this.cidadesService.update(+id, updateCidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cidadesService.remove(+id);
  }
}
