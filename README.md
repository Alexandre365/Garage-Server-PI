# 🚀 Garage-Server-PI (Back-end)
***Status do Projeto:*** 🟢 Em desenvolvimento <br>
API RESTful para gerenciamento de Serviços, e Agendamento e recursos do sistema.

## 📌Sistema de Agendamento Online
Este projeto é uma API RESTful desenvolvida como Trabalho de Conclusão de Curso. O objetivo é modernizar a gestão de barbearias, substituindo agendas físicas por uma solução digital que conecta o estabelecimento ao cliente de forma eficiente.

### Sobre o Projeto
A API permite que proprietários de barbearias gerenciem seus serviços e que clientes realizem agendamentos de forma autônoma. O sistema foca em dois pilares principais: Gestão de Catálogo (Serviços) e Controle de Agenda.

### Problema Solucionado
Evita conflitos de horários, reduz a ociosidade do barbeiro e facilita a visualização de preços e serviços por parte do cliente, eliminando a necessidade de ligações ou mensagens manuais para marcação.

## 🛠️ Tecnologias Utilizadas
- **Linguagem:** Node.js / TypeScript
- **Framework:** Fastify 
- **Banco de Dados:** SQLite 
- **ORM / Query Builder:** sqlite3, sqlite

## 📂 Estrutura do Projeto
```bash
src/
├── data/           # Banco de dados
├── db.ts           # Configurações gerais e Conexão com Banco de dados
├── index.ts        # Arquivo principal do servidor
└── utils/          # Funções genericas

```

## Como Rodar o Projeto
Pré-requisitos
- Node.j
- Gerenciador de pacotes (npm, yarn ou pip).
- Banco de dados local ou via Docker.
  
Passo a Passo
- Clone o repositório
- Configure as variáveis de ambiente:
Crie um arquivo .env na raiz seguindo o modelo
- Instale as dependências
- Inicie o servidor

## 📄 Licença
Este projeto está sob a licença ISC. Veja o arquivo  para mais detalhes.
