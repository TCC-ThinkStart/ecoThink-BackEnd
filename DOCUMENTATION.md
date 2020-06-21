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
    "auth": true,
    "token": "*Token de Usuário*"
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
    "auth": true,
    "token": "*Token de Usuário*"
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
    "success": "Token enviado para o e-mail do usuário"
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
    "success": "Senha alterada com sucesso"
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
    "success": "Token enviado para o e-mail do usuário"
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
    "success": "E-mail confirmado com sucesso"
  }
  ```
</details>