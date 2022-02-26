# README

## Sobre
 _Uma solução para permitir a equipe de atendimento que tipos de serviços serão necessários para realizar a manutenção completa 
do veículo e qual a tempo previsto para cada uma dessas atividade. Assim a equipe de atendimento poderia dizer ao cliente o estado atual da manutenção, quais serviços 
já foram concluídos e quanto tempo mais precisa para ser finalizados_.  

Esta API deve ser capaz de registrar as manutenções disponíveis na empresa, também permitirá cadastrar os diversos serviços por ela oferecido e também o registro de ordens de serviço que os clientes podem solicitar. Além disso, precisamos disponibilizar um recurso que permita ao funcionário atendente as necessidades do cliente em relação ao status dos serviços de seu veículo.    

### Features
* Cadastrar Manutenção.
* Atualizar Manutenção.
* Excluir Manutenções
* Cadastro de Serviços
* Atualização de Serviços
* Exclusão de Serviços
* Cadastro de Ordem de Serviços
* Pesquisa de Ordens de Serviço por status (Pendente, em Andamento e Concluído)
* Pesquisa de Ordens de Serviço pela Placa do Veículo

### Pré-Requisitos
* Ter instalado um SGBD mysql para execução do script de criação do banco de dados.

### Clonando o Projeto
```
* git clone https://github.com/marceloprogramadoram/automecanica.git
* Acesse a pasta do projeto via terminal.
* cd automecanica
```    
### Executando o Script do Banco de Dados
```
# Acesse o o seu gerenciador de banco de dados com as credenciais abaixo:
$ User=root Password=root

# Abra e copie o conteúdo do arquivo de script na raiz do projeto
$ Arquivo: setup.sql

# Execute o script para inicializar banco
* No seu SGBD execute o script do banco de dados.
```
### Executando a aplicação Backend
```
* Acesse a pasta backend do projeto via terminal
* cd backend
* python app.py
```

### Executando a aplicação FrontEnd
```
* Retorne um nivel de diretório
* cd..
* Acesse a pasta frontend do projeto via terminal
* cd frontend
* npm start
```
