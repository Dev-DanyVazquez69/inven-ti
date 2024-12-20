# INVEN-TI

PWA de Gerenciamento de Inventário de TI 

Este é um projeto PWA para gerenciamento de inventário de dispositivos de TI, desenvolvido com Next.js (App Router) e TypeScript. A aplicação permite a criação e o gerenciamento de dispositivos, bem como o cadastro de colaboradores, setores, proprietários, fabricantes e tipos de dispositivos.

## Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Autenticação**: [Auth.js](https://authjs.dev/) (suporte a login/senha e Google)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Back-end**: API Routes do Next.js
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validação**: [Zod](https://zod.dev/)
- **Gerenciamento de chamadas API**: [React Query](https://tanstack.com/query)

## Funcionalidades

### Principais
- Criação e gerenciamento de dispositivos de TI.

### Secundárias
- Cadastro de colaboradores.
- Cadastro de setores.
- Cadastro de proprietários.
- Cadastro de fabricantes.
- Cadastro de tipos de dispositivos para vínculo com o cadastro de dispositivos.

## Instruções de Configuração e Início do Projeto

### 1. Clonar o Repositório
```bash
# Clone o repositório para sua máquina local
git clone <URL_DO_REPOSITORIO>
```

### 2. Instalar Dependências
```bash
# Navegue para o diretório do projeto
cd <NOME_DO_PROJETO>

# Instale as dependências
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie os arquivos `.env` e `.env.local` na raiz do projeto com as seguintes variáveis:

#### Arquivo `.env`
```env
# URL do banco de dados Prisma
DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>
```

#### Arquivo `.env.local`
```env
# URL base da aplicação
NEXTAUTH_URL=http://localhost:3000

# Configuração do Google OAuth
AUTH_GOOGLE_ID=<CLIENT_ID_DO_GOOGLE>
AUTH_GOOGLE_SECRET=<CLIENT_SECRET_DO_GOOGLE>

# Segredo do NextAuth.js
AUTH_SECRET=<CHAVE_SECRETA>
```

### 4. Executar Migrações no Banco de Dados
```bash
npx prisma migrate dev
```

### 5. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`.

## Estrutura de Pastas

```
├── prisma              # Esquema do Prisma
├── public              # Arquivos públicos
├── src
│   ├── app            # App Router
│   ├── components     # Componentes reutilizáveis
│   ├── lib            # Funções utilitárias e configurações
│   └── interfaces     # Interfaces TypeScript
└── .env               # Variáveis de ambiente
```

## Comandos Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria a build para produção.
- `npm run start`: Inicia o servidor no modo de produção.
- `npx prisma studio`: Abre o Prisma Studio para gerenciar o banco de dados.

## Boas Práticas e Sugestões

- Use **TDD (Test-Driven Development)** para criar novas funcionalidades.
- Utilize o [React Query](https://tanstack.com/query) para gerenciar chamadas API e cache.
- Garanta que todas as validações estejam cobertas com **Zod** para evitar inconsistências.

## Contribuições
Contribuições são bem-vindas! Por favor, envie um Pull Request ou abra uma Issue para discussão.

---

### Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

