## Integrantes

- Lucas Daher | Matrícula UC24102381
- Maria Eduarda | Matrícula UC24102958
- Rafael Canavarro | Matrícula UC24100056

## Anotações baseadas no vídeo

### Introdução

NestJS é um framework moderno para Node.js escrito em TypeScript. Possui uma estrutura modular, facilita a escalabilidade e organização do código e se integra facilmente com o TypeORM. Ideal para construir APIs RESTful robustas.

### Criando o projeto

Criar o projeto com Nest CLI:

```bash
npx -p @nestjs/cli nest new atividade-nest
```

Acesse a pasta:

```bash
cd atividade-nest
```

### Criando a API com o gerador de código

Utilize o comando abaixo e selecione "Yes" para gerar CRUD automaticamente:

```bash
nest g resource users
```

### Validação de dados

Instale os pacotes:

```bash
yarn add class-validator class-transformer
```

Exemplo de DTO com validação:

```ts
import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;

  @IsInt()
  idade: number;
}
```

### 🗄️ TypeORM e SQLite

Configuração no `app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User],
  synchronize: true,
}),
TypeOrmModule.forFeature([User]),
```

### Injeção de dependência

Exemplo de uso com repositório do TypeORM:

```ts
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
}
```

### Lógica na Service

A lógica de negócios fica no service, exemplo de criação:

```ts
create(createUserDto: CreateUserDto): Promise<User> {
  const user = this.userRepository.create(createUserDto);
  return this.userRepository.save(user);
}
```

### Bônus: boas práticas REST

- Verbo HTTP correto (GET, POST, etc)
- Rotas semânticas: `/users`, `/users/:id`
- Códigos de status apropriados: 200, 201, 404, etc

### Próximos passos

- Implementar autenticação
- Explorar outros bancos de dados
- Criar testes automatizados
