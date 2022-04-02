# Study Video API
### Instalando as dependências:
Instalar as dependências do projeto rodando com o comando:
caso esteja usando o yarn: `yarn` ou  `npm i`
### Como iniciar a aplicação:
Para rodar a aplicação em modo de desenvolvimento execute o seguinte comando: `yarn dev.server` ou `npm run dev.server`
**Feito isso a api vai está rodando em http://localhost:3333.**

### Criar as tabelas no banco de dados:
Para criar as tabelas no banco de dados (SQLITE) basta executar o seguinte comando:
`yarn typeorm migration:run`

## Executar testes unitarios na aplicação:
Para rodar os testes bastar executar o seguinte comando:
`yarn test` ou `npm run test`

### EndPoints:
##### Rota para criar um usuário:
**POST** http://localhost:3333/signup

Exemplo de envio via json:
```json
{
	"name": "Hugo Mendonça",
	"email": "hugomendonca9@gmail.com",
	"password": "12345"
}
```
##### Rota para realizar login:
**POST** http://localhost:3333/login

Exemplo de envio via json:
```json
{
	"email": "hugomendonca9@gmail.com",
	"password": "12345"
}
```

## Rotas para criar, deletar e atualizar categorias, cursos e aulas deve estar logado na aplicação, passar o token obtido na rota de login na requisição.

##### Rota para criar uma categoria:
**POST** http://localhost:3333/category

Exemplo de envio via json:
```json
{
	"title": "category test"
}
```

##### Rota para listar todas as categorias criadas:
**GET** http://localhost:3333/category

##### Rota para criar um curso:
**POST** http://localhost:3333/course

Exemplo de envio via json:
```json
{
	"name": "senai",
	"image_url": "http://www.google.com",
	"user_id": "826b6c83-dbd1-4605-9dda-45ad5cdeeaee",
	"category_title": "Category test"
}
```

##### Rota para listar todos os cursos:
**GET** http://localhost:3333/course


##### Rota para deletar um curso:
**DELETE** http://localhost:3333/course/id-do-curso


##### Rota para atualizar um curso:
**PUT** http://localhost:3333/course/id-do-curso

Exemplo de envio via json:
```json
{
	"name": "senai updated",
	"image_url": "http://www.google.com/updated",
	"user_id": "826b6c83-dbd1-4605-9dda-45ad5cdeeaee",
	"category_title": "Category test"
}
```

##### Rota para criar uma aula:
**POST** http://localhost:3333/lesson

Exemplo de envio via json:
```json
{
	"title": "lesson 1",
	"video_url": "blabla",
	"course_id": "939c269d-cf1a-4098-83f1-8fb8749d4cb2"
}
```

##### Rota para listar todas as aulas:
**GET** http://localhost:3333/lesson

##### Rota para deletar um curso:
**DELETE** http://localhost:3333/lesson/id-do-curso


