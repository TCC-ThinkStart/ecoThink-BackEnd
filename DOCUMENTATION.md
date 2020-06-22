# Documentação

Esta é a documentação da Utilização da API Ecothink

# Autenticação

Esta API usa 3 tipos de Tokens:
- Token de Usuário - Tem a duração de 1 dia
    - Administrador
    - Organização e Padrão
- Token de Recuperação de Senha - Tem a duração de 10 minutos
- Token de Confirmação de Conta - Tem a duração de 10 minutos

> Obs: A identificação de Usuário Administrador, Organização e Padrão será feita no backend via JWT


# Rotas da API

## Índice

- [Login](#login)
- [Recuperação de Senha](#recuperação-de-senha)
- [Confirmação de Conta](#confirmação-de-conta)
- [Estado](#estado)
- [Cidade](#cidade)
- [Endereço](#endereço)
- [Palavra Chave](#palavra-chave)
- [Foto](#foto)
- [Evento](#evento)
    - [Inscrição](#inscrição)
- [Usuário](#usuário)

## Login

<details>
  <summary>
    <b>Login</b> - <i>Logar Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /login`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Body:</b>
  
  ```
  {
	"email": "usuario@email.com",
	"senha": "senha"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "auth": true, //Boolean
    "token": "*Token de Usuário*" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Refresh Token</b> - <i>Renovar Token de Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /refreshToken`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "auth": true, //Boolean
    "token": "*Token de Usuário*" //String
  }
  ```
</details>

## Recuperação de Senha

<details>
  <summary>
    <b>Solicitar Token</b> - <i>Token será enviado ao e-mail do usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /recoveryPassword`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Body:</b>
  
  ```
  {
	"email": "usuario@email.com"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "success": "Token enviado para o e-mail do usuário" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Alterar Senha</b> - <i>Altera senha do Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /recoveryPassword`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Recuperação de Senha* 
  }
  ```

  <br />
  <b>Body:</b>
  
  ```
  {
	"senha": "senha"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "success": "Senha alterada com sucesso" //String
  }
  ```
</details>

## Confirmação de Conta

<details>
  <summary>
    <b>Solicitar Token</b> - <i>Token será enviado ao e-mail do usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /usuario/confirmacao`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Token enviado para o e-mail do usuário" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Confirmar E-mail</b> - <i>Confirma o cadastro do Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /usuario/confirmacao/confirmar`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Confirmação de Conta* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "E-mail confirmado com sucesso" //String
  }
  ```
</details>

## Estado

<details>
  <summary>
    <b>Mostrar Todos</b> - <i>Retorna os valores de todos os estados</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /estado`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Estado", //String
        "sigla": "SG" //String
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Um</b> - <i>Retorna os valores de um estado</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /estado/:codigo`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "nome": "Estado", //String
	"sigla": "SG" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Estado</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /estado`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  ```
  {
	"nome": "Estado",
	"sigla": "SG"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "nome": "Estado", //String
	"sigla": "SG" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Estado</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /estado/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.
  
  ```
  {
	"nome": "Estado",
	"sigla": "SG"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "estado": {
        "codigo": 1, //Number
        "nome": "Estado", //String
        "sigla": "SG" //String
    },
    "success": "Estado - atualizado com sucesso"
  }
  ```
</details>

<details>
  <summary>
    <b>Excluir Estado</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /estado/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Estado - excluido com sucesso"
  }
  ```
</details>

## Cidade

<details>
  <summary>
    <b>Mostrar Todos</b> - <i>Retorna os valores de todas as cidades</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /cidade`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Cidade", //String
        "idEstado": 1 //Number
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (por Estado)</b> - <i>Retorna os valores de todas as cidades de um estado</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET cidade/estado/:codigo`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Cidade", //String
        "idEstado": 1 //Number
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Um</b> - <i>Retorna os valores de uma cidade</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /cidade/:codigo`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "nome": "Estado", //String
	"idEstado": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Cidade</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /cidade`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  ```
  {
	"nome": "Cidade",
	"idEstado": 1
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "nome": "Cidade", //String
	"idEstado": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Cidade</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /cidade/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.
  
  ```
  {
	"nome": "Estado",
	"idEstado": 1
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "cidade": {
        "codigo": 1, //Number
        "nome": "Estado", //String
        "idEstado": 1 //Number
    },
    "success": "Cidade - atualizado com sucesso"
  }
  ```
</details>

<details>
  <summary>
    <b>Excluir Cidade</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /cidade/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Cidade - excluido com sucesso"
  }
  ```
</details>

## Endereço

<details>
  <summary>
    <b>Mostrar Todos (Usuários)</b> - <i>Retorna os endereços de todos os usuários</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /endereco/usuario`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "cep": "12345678", //String
        "logradouro": "Logradouro", //String
        "bairro": "Bairro", //String
        "numero": 1, //Number
        "idCidade": 1, //Number
        "usuario": {
            "codigo": 1, //Number
            "nome": "Usuario" //String
        }
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (Eventos)</b> - <i>Retorna os endereços de todos os eventos</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /endereco/evento`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "cep": "12345678", //String
        "logradouro": "Logradouro", //String
        "bairro": "Bairro", //String
        "numero": 1, //Number
        "idCidade": 1, //Number
        "usuario": {
            "codigo": 1, //Number
            "nome": "Usuario" //String
        }
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Um</b> - <i>Retorna os valores de um endereco</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /endereco/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "cep": "12345678", //String
    "logradouro": "Logradouro", //String
    "bairro": "Bairro", //String
    "numero": 1, //Number
    "idCidade": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Endereço (Usuário)</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /endereco/usuario/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  ```
  {
    "cep": "12345678",
    "logradouro": "Logradouro",
    "bairro": "Bairro",
    "numero": 1, // Opcional
    "idCidade": 1
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "cep": "12345678", //String
    "logradouro": "Logradouro", //String
    "bairro": "Bairro", //String
    "numero": 1, //Number
    "idCidade": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Endereço (Usuário)</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /endereco/usuario/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.
  
  ```
  {
    "cep": "12345678",
    "logradouro": "Logradouro",
    "bairro": "Bairro",
    "numero": 1, // Opcional
    "idCidade": 1
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "cep": "12345678", //String
    "logradouro": "Logradouro", //String
    "bairro": "Bairro", //String
    "numero": 1, //Number
    "idCidade": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Endereço (Evento)</b> - <i>Acesso Permitido somente ao Usuário Organizador do Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /endereco/evento/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.
  
  ```
  {
    "cep": "12345678",
    "logradouro": "Logradouro",
    "bairro": "Bairro",
    "numero": 1, // Opcional
    "idCidade": 1
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "cep": "12345678", //String
    "logradouro": "Logradouro", //String
    "bairro": "Bairro", //String
    "numero": 1, //Number
    "idCidade": 1 //Number
  }
  ```
</details>

## Palavra Chave

<details>
  <summary>
    <b>Mostrar Todos</b> - <i>Retorna os valores de todas as Palavras Chave</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /palavrachave`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "palavra": "Palavra" //String
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Um</b> - <i>Retorna os valores de uma Palavra Chave</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /palavrachave/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "palavra": "Palavra" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Palavra Chave</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /palavrachave`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  ```
  {
    "palavra": "Palavra"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "palavra": "Palavra" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Palavra Chave</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /palavrachave/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.
  
  ```
  {
    "palavra": "Palavra"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "palavra": {
        "codigo": 1, //Number
        "palavra": "Palavra" //String
    },
    "success": "Palavra Chave - atualizado com sucesso"
  }
  ```
</details>

<details>
  <summary>
    <b>Excluir Palavra Chave</b> - <i>Acesso Permitido somente à Administradores</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /palavrachave/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Palavra Chave - excluido com sucesso"
  }
  ```
</details>

## Foto

<details>
  <summary>
    <b>Mostrar Todos (por Evento)</b> - <i>Retorna os valores de todas as Fotos</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /foto/evento/:codigo`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "url": "*URL da Foto*", //String
        "idUsuario": 1, //Number
        "idEvento": 1 //Number
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Um</b> - <i>Retorna os valores de uma Foto</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /foto/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "url": "*URL da Foto*", //String
    "idUsuario": 1, //Number
    "idEvento": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Foto (Evento)</b> - <i>Acesso Permitido somente ao Usuário Organizador do Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /foto/usuario/:cdUsuario/evento/:cdEvento`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  ```
  {
    "base64": "*Foto em Base64*"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "url": "*URL da Foto*", //String
    "idUsuario": 1, //Number
    "idEvento": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Foto de Perfil (Usuário)</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /foto/usuario/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  ```
  {
    "base64": "*Foto em Base64*"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "url": "*URL da Foto*", //String
    "idUsuario": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Foto de Perfil (Usuário)</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /foto/usuario/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.
  
  ```
  {
    "base64": "*Foto em Base64*"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "success": "Foto de Perfil - atualizado com sucesso"
  }
  ```
</details>

<details>
  <summary>
    <b>Excluir Foto (Evento)</b> - <i>Acesso Permitido somente ao Usuário Organizador do Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /foto/:cdFoto/usuario/:cdUsuario/evento/:cdEvento`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Foto - excluido com sucesso"
  }
  ```
</details>

<details>
  <summary>
    <b>Excluir Foto de Perfil (Usuário)</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /foto/usuario/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Foto de Perfil - excluido com sucesso"
  }
  ```
</details>

## Evento

<details>
  <summary>
    <b>Mostrar Todos</b> - <i>Retorna os valores de todos os Eventos</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /evento`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Em Ordem Aleátoria:</b> `?random=true`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Evento", //String
        "dataInicio": "*Data Formato ISO*", //String
        "dataFinal": "*Data Formato ISO*", //String
        "descricao": "Descrição", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "idOrganizador": 1, //Number
        "idEndereco": 1, //Number
        "status": "aberto", //Ou "fechado" //String
        "palavra": [
            {
                "codigo": 1, //Number
                "palavra": "Palavra" //String
            },
            ...
        ]
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (por Cidade)</b> - <i>Retorna os valores de todos os Eventos de uma Cidade</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /evento/cidade/:codigo`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Evento", //String
        "dataInicio": "*Data Formato ISO*", //String
        "dataFinal": "*Data Formato ISO*", //String
        "descricao": "Descrição", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "idOrganizador": 1, //Number
        "idEndereco": 1, //Number
        "status": "aberto", //Ou "fechado" //String
        "palavra": [
            {
                "codigo": 1, //Number
                "palavra": "Palavra" //String
            },
            ...
        ]
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (por Usuário)</b> - <i>Retorna os valores de todos os Eventos de um Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /evento/usuario/:codigo`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Evento", //String
        "dataInicio": "*Data Formato ISO*", //String
        "dataFinal": "*Data Formato ISO*", //String
        "descricao": "Descrição", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "idOrganizador": 1, //Number
        "idEndereco": 1, //Number
        "status": "aberto", //Ou "fechado" //String
        "palavra": [
            {
                "codigo": 1, //Number
                "palavra": "Palavra" //String
            },
            ...
        ]
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (por Palavra Chave)</b> - <i>Retorna os valores de todos os Eventos com determinada Palavra Chave</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /evento/palavrachave/:codigo`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Evento", //String
        "dataInicio": "*Data Formato ISO*", //String
        "dataFinal": "*Data Formato ISO*", //String
        "descricao": "Descrição", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "idOrganizador": 1, //Number
        "idEndereco": 1, //Number
        "status": "aberto", //Ou "fechado" //String
        "palavra": [
            {
                "codigo": 1, //Number
                "palavra": "Palavra" //String
            },
            ...
        ]
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (Inscrito)</b> - <i>Retorna os valores de todos os Eventos em que o Usuário está Inscrito</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /evento/usuario/:codigo/inscrito`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Evento", //String
        "dataInicio": "*Data Formato ISO*", //String
        "dataFinal": "*Data Formato ISO*", //String
        "descricao": "Descrição", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "idOrganizador": 1, //Number
        "idEndereco": 1, //Number
        "status": "aberto", //Ou "fechado" //String
        "palavra": [
            {
                "codigo": 1, //Number
                "palavra": "Palavra" //String
            },
            ...
        ]
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (Pesquisa)</b> - <i>Retorna os valores de todos os Eventos com o nome pesquisado</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /evento/pesquisa/:pesquisa`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Evento", //String
        "dataInicio": "*Data Formato ISO*", //String
        "dataFinal": "*Data Formato ISO*", //String
        "descricao": "Descrição", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "idOrganizador": 1, //Number
        "idEndereco": 1, //Number
        "status": "aberto", //Ou "fechado" //String
        "palavra": [
            {
                "codigo": 1, //Number
                "palavra": "Palavra" //String
            },
            ...
        ]
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Um</b> - <i>Retorna os valores de um Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /evento/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
      "codigo": 1, //Number
      "nome": "Evento", //String
      "dataInicio": "*Data Formato ISO*", //String
      "dataFinal": "*Data Formato ISO*", //String
      "descricao": "Descrição", //String
      "dataCadastro": "*Data Formato ISO*", //String
      "dataAlteracao": "*Data Formato ISO*", //String
      "idOrganizador": 1, //Number
      "idEndereco": 1, //Number
      "status": "aberto", //Ou "fechado" //String
      "palavra": [
          {
              "codigo": 1, //Number
              "palavra": "Palavra" //String
          },
          ...
      ]
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Evento</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /evento`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  ```
  {
    "nome": "Evento",
	"dataInicio": "AAAA-MM-DD",
	"dataFinal": "AAAA-MM-DD",
	"descricao": "Descrição", //Opcional
	"idOrganizador": 1,
	"cep": "12345678",
	"logradouro": "Logradouro",
	"bairro": "Bairro",
	"numero": 1, //Opcional
	"idCidade": 1
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "nome": "Evento", //String
    "dataInicio": "*Data Formato ISO*", //String
    "dataFinal": "*Data Formato ISO*", //String
    "descricao": "Descrição", //String
    "dataCadastro": "*Data Formato ISO*", //String
    "dataAlteracao": "*Data Formato ISO*", //String
    "idOrganizador": 1, //Number
    "endereco": {
        "codigo": 1, //Number
        "cep": "12345678", //String
        "logradouro": "Logradouro", //String
        "bairro": "Bairro", //String
        "numero": 1, //Number
        "idCidade": 1 //Number
    }
  }
  ```
</details>

<details>
  <summary>
    <b>Adicionar Palavra Chave</b> - <i>Acesso Permitido somente ao Usuário Organizador do Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /evento/:cdEvento/palavrachave/:cdPalavra`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Palavra Chave - Adicionada"
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Evento</b> - <i>Acesso Permitido somente ao Usuário Organizador do Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /evento/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.
  
  ```
  {
    "nome": "Evento",
	"dataInicio": "AAAA-MM-DD",
	"dataFinal": "AAAA-MM-DD",
	"descricao": "Descrição",
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "evento": {
        "codigo": 1, //Number
        "nome": "Evento", //String
        "dataInicio": "*Data Formato ISO*", //String
        "dataFinal": "*Data Formato ISO*", //String
        "descricao": "Descrição", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "idOrganizador": 1, //Number
        "idEndereco": 1, //Number
        "status": "aberto", //String
    },
    "success": "Evento - atualizado com sucesso"
  }
  ```
</details>

<details>
  <summary>
    <b>Remover Palavra Chave</b> - <i>Acesso Permitido somente ao Usuário Organizador do Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /evento/:cdEvento/palavrachave/:cdPalavra`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Palavra Chave - Removida"
  }
  ```
</details>

<details>
  <summary>
    <b>Excluir Evento</b> - <i>Acesso Permitido somente ao Usuário Organizador do Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /evento/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Evento - excluido com sucesso"
  }
  ```
</details>

### Inscrição

<details>
  <summary>
    <b>Inscrição no Evento</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /evento/:cdEvento/usuario/:cdUsuario`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Inscrição Bem Sucedida"
  }
  ```
</details>

<details>
  <summary>
    <b>Cancelar Inscrição</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /evento/:cdEvento/usuario/:cdUsuario`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Inscrição Cancelada"
  }
  ```
</details>

## Usuário

<details>
  <summary>
    <b>Mostrar Todos</b> - <i>Retorna os valores de todos os Usuários</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /usuario`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Usuario", //String
        "email": "usuario@email.com", //String
        "celular": "1234567890", //String
        "dataNascimento": "AAAA-MM-DD", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "nivel": "USU", //String
        "idEndereco": 1, //Number
        "idFotoPerfil": 1 //Number
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (Padrão)</b> - <i>Retorna os valores de todos os Usuários - Padrão</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /usuario/usuarios`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Usuario", /String
        "email": "usuario@email.com", /String
        "celular": "1234567890", /String
        "dataNascimento": "AAAA-MM-DD", /String
        "dataCadastro": "*Data Formato ISO*", /String
        "dataAlteracao": "*Data Formato ISO*", /String
        "nivel": "USU", /String
        "idEndereco": 1, //Number
        "idFotoPerfil": 1 //Number
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (Organizações)</b> - <i>Retorna os valores de todos os Usuários - Organização</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /usuario/organizacoes`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Usuario", //String
        "email": "usuario@email.com", //String
        "celular": "1234567890", //String
        "dataNascimento": "AAAA-MM-DD", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "nivel": "ORG", //String
        "idEndereco": 1, //Number
        "idFotoPerfil": 1 //Number
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Todos (Pesquisa)</b> - <i>Retorna os valores de todos os Usuários com o nome pesquisado</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /usuario/pesquisa/:pesquisa`
  <br />
  <b>Paginação (10 por página):</b> `?page=`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  [
    {
        "codigo": 1, //Number
        "nome": "Usuario", //String
        "email": "usuario@email.com", //String
        "celular": "1234567890", //String
        "dataNascimento": "AAAA-MM-DD", //String
        "dataCadastro": "*Data Formato ISO*", //String
        "dataAlteracao": "*Data Formato ISO*", //String
        "nivel": "ORG", //String
        "idEndereco": 1, //Number
        "idFotoPerfil": 1 //Number
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Mostrar Um</b> - <i>Retorna os valores de um Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /usuario/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "nome": "Usuario", //String
    "email": "usuario@email.com", //String
    "celular": "1234567890", //String
    "dataNascimento": "AAAA-MM-DD", //Somente se Nível: "USU" //String
    "dataCadastro": "*Data Formato ISO*", //String
    "dataAlteracao": "*Data Formato ISO*", //String
    "nivel": "USU", //String
    "idEndereco": 1, //Number
    "idFotoPerfil": 1 //Number
  }
  ```
</details>

<details>
  <summary>
    <b>Perfil</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `GET /usuario/perfil/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "codigo": 1, //Number
    "nome": "Usuario", //String
    "email": "usuario@email.com", //String
    "celular": "1234567890", //String
    "dataNascimento": "AAAA-MM-DD", //Somente se Nível: "USU" //String
    "dataCadastro": "*Data Formato ISO*", //String
    "dataAlteracao": "*Data Formato ISO*", //String
    "cpf": "12345678901", //Somente se Nível: "USU" //String
    "cnpj": "12345678901234", //Somente se Nível: "ORG" //String
    "nivel": "USU", //String
    "idEndereco": 1, //Number
    "idFotoPerfil": 1, //Number
    "confirmacao": "confirmado" //Ou "pendente" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Usuário</b> - <i>Cadastra um Usuário Padrão</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /usuario`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Body:</b>
  
  ```
  {
    "nome": "Usuario",
    "email": "usuario@email.com",
    "celular": "1234567890", //Opcional
    "dataNascimento": "AAAA-MM-DD",
    "cpf": "12345678901", //Opcional
    "senha": "senha"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "usuario": {
        "codigo": 1, //Number
        "nome": "Usuario", //String
        "email": "usuario@email.com", //String
        "celular": "1234567890", //String
        "dataNascimento": "AAAA-MM-DD", //String
        "cpf": "12345678901" //String
    }
    "token": "*Token de Usuário*"
  }
  ```
</details>

<details>
  <summary>
    <b>Cadastrar Organizador</b> - <i>Cadastra um Usuário Organizador</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `POST /usuario/organizacao`
  <br />
  <b>Autenticação:</b> Não
  <br />
  <b>Body:</b>
  
  ```
  {
    "nome": "Usuario",
    "email": "usuario@email.com",
    "celular": "1234567890", //Opcional
    "cnpj": "12345678901234",
    "senha": "senha"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "usuario": {
        "codigo": 1, //Number
        "nome": "Usuario", //String
        "email": "usuario@email.com", //String
        "celular": "1234567890", //String
        "cnpj": "12345678901234", //String
    }
    "token": "*Token de Usuário*" // String
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Usuário</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /usuario/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.

  ```
  {
    "nome": "Usuario",
    "email": "usuario@email.com",
    "celular": "1234567890",
    "dataNascimento": "AAAA-MM-DD",
    "cpf": "12345678901",
    "senha": "senha"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "usuario": {
        "codigo": 1, //Number
        "nome": "Usuario", //String
        "email": "usuario@email.com", //String
        "celular": "1234567890",
        "dataNascimento": "AAAA-MM-DD", //String
        "cpf": "12345678901" //String
    },
    "success": "Usuário - atualizado com sucesso", //String
    "token": "*Token de Usuário*" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Atualizar Organizador</b> - <i>Acesso Permitido somente ao Usuário</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `PUT /usuario/organizacao/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Body:</b>
  
  Só serão atualizados os dados presentes na requisição.

  ```
  {
    "nome": "Usuario",
    "email": "usuario@email.com",
    "celular": "1234567890", //Opcional
    "cnpj": "12345678901234",
    "senha": "senha"
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    "usuario": {
        "codigo": 1, //Number
        "nome": "Usuario", //String
        "email": "usuario@email.com", //String
        "celular": "1234567890", //String
        "cnpj": "12345678901234", //String
    },
    "success": "Usuário - atualizado com sucesso", //String
    "token": "*Token de Usuário*" //String
  }
  ```
</details>

<details>
  <summary>
    <b>Excluir Evento</b> - <i>Acesso Permitido somente ao Usuário Organizador do Evento</i>
  </summary>
  <br/>
  
  <b>Rota:</b> `DELETE /usuario/:codigo`
  <br />
  <b>Autenticação:</b> Sim
  <br />
  <b>Header:</b>
  
  ```
  { 
    Authorization: Bearer *Token de Usuário* 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "success": "Usuário - excluido com sucesso" //String
  }
  ```
</details>