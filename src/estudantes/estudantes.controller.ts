import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudantesService } from './estudantes.service';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';

@Controller('estudantes')
export class EstudantesController {
  constructor(private readonly estudantesService: EstudantesService) {}

  @Post()
  create(@Body() createEstudanteDto: CreateEstudanteDto) {
    return this.estudantesService.create(createEstudanteDto);
  }

  @Get()
  findAll() {
    return this.estudantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudantesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudanteDto: UpdateEstudanteDto) {
    return this.estudantesService.update(+id, updateEstudanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudantesService.remove(+id);
  }
}
