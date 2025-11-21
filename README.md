# Sistema de Agendamento de Consultas Médicas - Frontend

Uma aplicação single-page (SPA) completa para gerenciamento de consultas médicas, construída com Angular 17. Este sistema facilita o agendamento de consultas entre pacientes, médicos e administradores de clínicas, apresentando controle de acesso baseado em papéis, agendamento em tempo real, gerenciamento de lista de espera e fluxos de registro em múltiplas etapas.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Integração com API](#integração-com-api)
- [Desenvolvimento](#desenvolvimento)
- [Build para Produção](#build-para-produção)
- [Testes](#testes)
- [Licença](#licença)

## Visão Geral

Esta aplicação frontend serve como interface de usuário para um sistema de agendamento de consultas médicas. Fornece interfaces distintas para três papéis principais de usuário: **Clientes** (pacientes), **Médicos** e **Administradores**. A aplicação se comunica com uma API backend RESTful para gerenciar usuários, consultas, horários, planos de saúde e associações de clínicas.

### Principais Capacidades

- **Autenticação Multi-papel**: Login e registro seguros para clientes, médicos e administradores
- **Gerenciamento de Consultas**: Agendar, visualizar e gerenciar consultas médicas (presenciais e online)
- **Registro de Médicos**: Fluxo de registro abrangente em múltiplas etapas para novos médicos
- **Sistema de Lista de Espera**: Criação automática de consultas quando vagas ficam disponíveis
- **Gerenciamento de Horários**: Configuração de horários semanais com validação de intervalos de tempo
- **Integração com Planos de Saúde**: Associação de médicos com planos de saúde aceitos
- **Gerenciamento de Clínicas**: Suporte multi-clínica com associações usuário-clínica
- **Notificações em Tempo Real**: Sistema de notificações toast para feedback ao usuário

## Funcionalidades

### Funcionalidades do Cliente

- **Dashboard Inicial**: Visão geral de consultas futuras e ações rápidas
- **Agendamento de Consultas**: Buscar e filtrar médicos por especialidade, plano de saúde e disponibilidade
- **Reserva de Consultas**: Agendar consultas com seleção de tipo de consulta (presencial/online)
- **Gerenciamento de Lista de Espera**: Entrar em listas de espera para médicos preferidos quando não há vagas disponíveis
- **Gerenciamento de Perfil**: Visualizar e editar informações pessoais e histórico médico
- **Histórico de Consultas**: Visualizar consultas passadas, futuras e canceladas

### Funcionalidades do Médico

- **Dashboard do Médico**: Visão geral de consultas agendadas e visualização de calendário
- **Configuração de Horários**: Definir disponibilidade semanal com seleção de dia e intervalo de tempo
- **Calendário de Consultas**: Interface de calendário visual para gerenciar consultas
- **Gerenciamento de Pacientes**: Visualizar informações de pacientes e detalhes de consultas
- **Gerenciamento de Perfil**: Gerenciar informações profissionais, especialidades e planos de saúde

### Funcionalidades do Administrador

- **Dashboard Administrativo**: Visão geral do sistema e ferramentas de gerenciamento
- **Gerenciamento de Médicos**: Registrar, editar e gerenciar contas de médicos
- **Registro de Médicos**: Fluxo de registro em múltiplas etapas incluindo:
  - Criação de conta de usuário
  - Configuração de autenticação (integração com Supabase)
  - Associação com clínica
  - Criação de perfil do médico
  - Associações com planos de saúde
  - Configuração de horários semanais

### Funcionalidades Compartilhadas

- **Design Responsivo**: Layout responsivo mobile-first usando SCSS e Angular Material
- **Notificações Toast**: Feedback em tempo real para ações do usuário
- **Validação de Formulários**: Validação abrangente no lado do cliente com Angular Reactive Forms
- **Tratamento de Erros**: Tratamento elegante de erros com mensagens amigáveis ao usuário
- **Estados de Carregamento**: Feedback visual durante operações assíncronas

## Stack Tecnológico

### Framework Principal

- **Angular 17.3.0**: Framework web moderno baseado em TypeScript
- **TypeScript 5.4.2**: Superset tipado do JavaScript
- **RxJS 7.8.0**: Biblioteca de programação reativa para operações assíncronas

### Bibliotecas de UI e Estilização

- **Angular Material 17.3.10**: Biblioteca de componentes Material Design
- **Angular CDK 17.3.10**: Component Dev Kit para construção de componentes customizados
- **Clarity Design System 17.11.8**: Componentes UI de nível empresarial
- **SCSS**: Pré-processador CSS para capacidades avançadas de estilização

### Ferramentas de Desenvolvimento

- **Angular CLI 17.3.7**: Interface de linha de comando para desenvolvimento Angular
- **Karma 6.4.0**: Executor de testes para testes unitários
- **Jasmine 5.1.0**: Framework de testes orientado a comportamento
- **ESLint**: Linting de código e garantia de qualidade

### Build e Deploy

- **Webpack**: Empacotador de módulos (via Angular CLI)
- **Zone.js 0.14.3**: Mecanismo de detecção de mudanças do Angular

## Arquitetura

### Arquitetura da Aplicação

A aplicação segue a arquitetura baseada em componentes do Angular com uma estrutura modular:

```
┌─────────────────────────────────────────────────────────┐
│                 Componente App                          │
│           (Componente Raiz e Roteador)                  │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
   │ Cliente │      │ Médico  │      │  Admin  │
   │  Page   │      │  Page   │      │   Page  │
   └─────────┘      └─────────┘      └─────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
   │Services │      │ Guards  │      │ Models  │
   └─────────┘      └─────────┘      └─────────┘
```

### Estrutura de Módulos

A aplicação usa uma abordagem híbrida combinando:

1. **Módulos de Funcionalidade**: Módulos carregados sob demanda para páginas de cliente, médico e admin
2. **Componentes Standalone**: Componentes standalone modernos do Angular para elementos de UI reutilizáveis
3. **Serviços Compartilhados**: Serviços singleton fornecidos no nível raiz
4. **Guards de Rota**: Guards de autenticação para rotas protegidas

### Fluxo de Dados

```
Componente → Serviço → Cliente HTTP → API Backend
    │                                    │
    └────────── Observable ──────────────┘
```

### Gerenciamento de Estado

- **Local Storage**: Tokens de autenticação, dados do usuário e informações de papel
- **RxJS Observables**: Gerenciamento de estado reativo para autenticação e dados do usuário
- **BehaviorSubject**: Estado atual do usuário e estado de autenticação

## Pré-requisitos

Antes de instalar e executar este projeto, certifique-se de ter o seguinte instalado:

- **Node.js**: Versão 18.x ou superior
- **Yarn**: Versão 1.x ou superior (gerenciador de pacotes utilizado no projeto)
- **Angular CLI**: Versão 17.3.7 ou superior
- **API Backend**: A API backend correspondente rodando em `http://localhost:5298`

### Instalando Pré-requisitos

```bash
# Instalar Node.js (se ainda não estiver instalado)
# Visite https://nodejs.org/ para instruções de instalação

# Instalar Yarn globalmente (se ainda não estiver instalado)
npm install -g yarn

# Instalar Angular CLI globalmente
yarn global add @angular/cli@17.3.7
```

## Instalação

> **Nota**: Este projeto utiliza **Yarn** como gerenciador de pacotes. Certifique-se de ter o Yarn instalado antes de prosseguir.

1. **Clonar o repositório**

```bash
git clone <repository-url>
cd medical-appointment-scheduling-frontend
```

2. **Instalar dependências**

```bash
yarn install
```

Isso instalará todas as dependências necessárias listadas em `package.json`, incluindo pacotes do framework Angular, bibliotecas de UI e ferramentas de desenvolvimento.

> **Alternativa**: Se preferir usar npm, você pode executar `npm install`, mas o projeto foi configurado e testado com Yarn.

3. **Verificar instalação**

```bash
ng version
```

Isso deve exibir a versão do Angular CLI e versões de pacotes relacionados.

## Configuração

### Configuração de Ambiente

A aplicação usa configuração baseada em ambiente. O arquivo de ambiente principal está localizado em `src/environment.ts`.

#### Configuração Padrão (Sem Proxy - Conexão Direta)

Por padrão, o projeto se conecta diretamente à API. Configure assim:

```typescript
export const environment: AppEnv = {
    apiUrl: 'http://localhost:5298', // URL completa da API backend
    production: false
}
```

Certifique-se de que o backend está configurado para aceitar requisições CORS da origem `http://localhost:4200`.

#### Usando Proxy (Opcional - Configuração Local)

Se você configurou proxy localmente e prefere usá-lo, configure assim:

```typescript
export const environment: AppEnv = {
    apiUrl: '', // String vazia ao usar proxy
    production: false
}
```

Veja a seção [Configuração de Proxy](#configuração-de-proxy-opcional---configuração-local) abaixo para instruções de como configurar o proxy localmente.

Para builds de produção, crie `src/environment.prod.ts`:

```typescript
export const environment: AppEnv = {
    apiUrl: 'https://seu-dominio-api.com',
    production: true
}
```

### Configuração de Proxy (Opcional - Configuração Local)

> **Nota**: Por padrão, o projeto **não possui proxy configurado**. A configuração de proxy é **opcional e local**. Use apenas se preferir evitar problemas de CORS durante o desenvolvimento.

#### Configuração Padrão (Sem Proxy)

Por padrão, o projeto está configurado para se conectar diretamente à API. Configure `src/environment.ts` com a URL completa:

```typescript
export const environment: AppEnv = {
    apiUrl: 'http://localhost:5298', // URL completa da API backend
    production: false
}
```

Certifique-se de que o backend está configurado para aceitar requisições CORS da origem `http://localhost:4200`.

#### Configurando Proxy Localmente (Opcional)

Se você quiser usar proxy para evitar problemas de CORS, siga estes passos:

1. **Criar arquivo de proxy local** (não versionado):
   
   Crie um arquivo `proxy.conf.json` na raiz do projeto:

```json
{
  "/Auth": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/Doctors": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/Appointments": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/Waitlist": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/Users": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/Clients": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/HealthPlans": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/Clinics": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/Schedules": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/DoctorHealthPlans": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/ClinicUsers": {
    "target": "http://localhost:5298",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

2. **Configurar angular.json** (localmente):

   Adicione a configuração de proxy no `angular.json` na seção `serve.options`:

```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "proxyConfig": "proxy.conf.json"
  },
  "configurations": {
    "production": {
        "buildTarget": "medical-appointment-scheduling-frontend:build:production"
    },
    "development": {
        "buildTarget": "medical-appointment-scheduling-frontend:build:development"
    }
  },
  "defaultConfiguration": "development"
  ...
}
```

3. **Configurar environment.ts**:

   Configure `src/environment.ts` com `apiUrl: ''` (string vazia):

```typescript
export const environment: AppEnv = {
    apiUrl: '', // String vazia ao usar proxy
    production: false
}
```

4. **Adicionar ao .gitignore**:

   Certifique-se de que `proxy.conf.json` está no `.gitignore` para não ser versionado.

> **Importante**: Esta configuração é **local e opcional**. Cada desenvolvedor pode escolher usar ou não o proxy. O projeto funciona normalmente sem proxy, desde que o backend esteja configurado para aceitar CORS.

### Configuração TypeScript

O projeto usa configuração TypeScript estrita (`tsconfig.json`):

- **Modo estrito**: Habilitado para segurança de tipos
- **Target**: ES2022
- **Module**: ES2022
- **Module Resolution**: Node
- **Source Maps**: Habilitado para depuração

### Configuração Angular

Configurações principais do Angular (`angular.json`):

- **Output Path**: `dist/medical-appointment-scheduling-frontend`
- **Styles**: Tema Angular Material e SCSS customizado
- **Assets**: Fontes, imagens e ícones
- **Build Budgets**: 500KB inicial, 1MB limite máximo de erro

## Estrutura do Projeto

```
medical-appointment-scheduling-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin-page/          # Módulo de funcionalidade admin
│   │   │   │   ├── admin-page.module.ts
│   │   │   │   ├── admin-page-routing.module.ts
│   │   │   │   └── components/
│   │   │   ├── client-page/          # Módulo de funcionalidade cliente
│   │   │   │   ├── client-page.module.ts
│   │   │   │   ├── client-page-routing.module.ts
│   │   │   │   └── components/
│   │   │   ├── doctor-page/          # Módulo de funcionalidade médico
│   │   │   │   ├── doctor-page.module.ts
│   │   │   │   ├── doctor-page-routing.module.ts
│   │   │   │   └── components/
│   │   │   ├── guards/               # Guards de rota
│   │   │   │   └── auth.guard.ts
│   │   │   ├── home-page/            # Página inicial pública
│   │   │   ├── models/               # Interfaces e tipos TypeScript
│   │   │   │   ├── api-models.ts     # Modelos de requisição/resposta da API
│   │   │   │   ├── appointment.model.ts
│   │   │   │   ├── authentication.model.ts
│   │   │   │   ├── doctor.model.ts
│   │   │   │   └── user.model.ts
│   │   │   ├── services/             # Serviços da aplicação
│   │   │   │   ├── api.service.ts    # Serviço HTTP da API
│   │   │   │   ├── authentication/   # Serviço de autenticação
│   │   │   │   │   └── authentication.service.ts
│   │   │   │   └── toast.service.ts  # Serviço de notificação
│   │   │   ├── shared/               # Componentes e utilitários compartilhados
│   │   │   │   ├── constants/        # Constantes da aplicação
│   │   │   │   ├── header/           # Componente de cabeçalho compartilhado
│   │   │   │   ├── interfaces/       # Interfaces TypeScript
│   │   │   │   └── utils/            # Funções utilitárias
│   │   │   └── standalone/           # Componentes standalone
│   │   │       ├── admin-dashboard/
│   │   │       ├── doctor-dashboard/
│   │   │       ├── login-modal/
│   │   │       ├── signup-modal/
│   │   │       ├── manager-doctor-register/
│   │   │       ├── manager-doctor-edit/
│   │   │       ├── manager-doctors/
│   │   │       ├── scheduling/
│   │   │       ├── scheduling-doctor-*
│   │   │       ├── perfil-*
│   │   │       └── ...
│   │   ├── app.component.ts          # Componente raiz
│   │   ├── app.config.ts              # Configuração da aplicação
│   │   └── app.routes.ts              # Configuração de rotas
│   ├── assets/                        # Assets estáticos
│   │   ├── fonts/                     # Fontes customizadas (Outfit, Metropolis)
│   │   ├── icons/                     # Ícones da aplicação
│   │   ├── images/                    # Imagens
│   │   └── style/                     # Estilos globais
│   │       ├── color-palette.scss
│   │       ├── mixins.scss
│   │       └── responsiveness.scss
│   ├── environment.ts                 # Configuração de ambiente
│   ├── environment.model.ts           # Definições de tipos de ambiente
│   ├── index.html                     # HTML de entrada da aplicação
│   ├── main.ts                        # Bootstrap da aplicação
│   └── styles.scss                    # Folha de estilos global
├── angular.json                       # Configuração do workspace Angular
├── package.json                       # Dependências e scripts
├── proxy.conf.json                    # Configuração de proxy de desenvolvimento
├── tsconfig.json                      # Configuração TypeScript
├── tsconfig.app.json                  # Config TypeScript da aplicação
├── tsconfig.spec.json                 # Config TypeScript de testes
└── README.md                          # Este arquivo
```

## Integração com API

### Arquitetura do Serviço de API

O `ApiService` (`src/app/components/services/api.service.ts`) centraliza toda a comunicação HTTP com a API backend. Ele fornece:

- **Autenticação Automática**: Injeção de token Bearer via cabeçalhos HTTP
- **Segurança de Tipos**: Respostas baseadas em Observable com tipagem TypeScript
- **Tratamento de Erros**: Capacidades centralizadas de tratamento de erros

### Endpoints da API

A aplicação se integra com os seguintes endpoints do backend:

#### Endpoints de Autenticação

- `POST /Auth/DirectLogin` - Autenticação de usuário
- `POST /Auth/Register` - Registro de usuário (integração com Supabase)
- `GET /Auth/CurrentUser` - Obter usuário autenticado atual

#### Gerenciamento de Usuários

- `POST /Users/Register` - Registrar nova conta de usuário
- `GET /Users/{id}` - Obter usuário por ID

#### Gerenciamento de Médicos

- `GET /Doctors` - Obter todos os médicos
- `GET /Doctors/GetById/{id}` - Obter médico por ID
- `GET /Doctors/GetByUserId/{userId}` - Obter médico por ID de usuário
- `POST /Doctors/GetDoctorsByFilter` - Filtrar médicos por critérios
- `POST /Doctors/Create` - Criar novo perfil de médico

#### Gerenciamento de Consultas

- `POST /Appointments/Create` - Criar nova consulta
- `GET /Appointments/{id}` - Obter consulta por ID
- `GET /Appointments/GetByClientId/{clientId}` - Obter consultas do cliente
- `GET /Appointments/GetByDoctorId/{doctorId}` - Obter consultas do médico

#### Gerenciamento de Lista de Espera

- `POST /Waitlist/JoinWaitlist` - Entrar na lista de espera de um médico
- `GET /Waitlist/GetByClientId/{clientId}` - Obter entradas de lista de espera do cliente

#### Planos de Saúde

- `GET /HealthPlans` - Obter todos os planos de saúde disponíveis
- `POST /DoctorHealthPlans/Create` - Associar médico com plano de saúde

#### Gerenciamento de Clínicas

- `GET /Clinics` - Obter todas as clínicas
- `GET /Clinics/{id}` - Obter clínica por ID
- `POST /ClinicUsers/Create` - Associar usuário com clínica
- `GET /ClinicUsers/GetByUserId/{userId}` - Obter associações de clínica para usuário

#### Gerenciamento de Horários

- `POST /Schedules/Create` - Criar horário do médico
- `GET /Schedules/GetByDoctorId/{doctorId}` - Obter horários do médico

### Modelos de Requisição/Resposta

Todos os modelos de requisição e resposta da API são definidos em `src/app/components/models/api-models.ts`:

- `User` - Informações da conta de usuário
- `Doctor` - Informações do perfil do médico
- `Appointment` - Detalhes da consulta
- `Schedule` - Horário de disponibilidade do médico
- `HealthPlan` - Informações do plano de saúde
- `Clinic` - Informações da clínica
- `ClinicUsers` - Associação usuário-clínica
- `CreateUserRequest` - DTO de registro de usuário
- `CreateDoctorRequest` - DTO de criação de médico
- `CreateScheduleRequest` - DTO de criação de horário
- `CreateClinicUserRequest` - DTO de associação clínica-usuário
- `CreateDoctorHealthPlanRequest` - DTO de associação médico-plano de saúde

### Enums

A aplicação usa enums TypeScript que correspondem aos enums do sistema do backend:

- `AppointmentType` - Presencial (1), Online (2)
- `AppointmentStatus` - Agendada (1), Concluída (2), Cancelada (3), Não Compareceu (4)
- `WaitlistStatus` - Pendente (1), Confirmada (2), Cancelada (3)
- `Speciality` - Especialidades médicas (Cardiologia, Dermatologia, etc.)
- `HealthPlans` - Provedores de planos de saúde

## Desenvolvimento

### Executando o Servidor de Desenvolvimento

```bash
yarn start
# ou
ng serve
```

A aplicação estará disponível em `http://localhost:4200`. O servidor de desenvolvimento inclui:

- **Hot Module Replacement**: Recarregamento automático da página em mudanças de arquivos
- **Source Maps**: Suporte a depuração no DevTools do navegador
- **Conexão Direta com API**: Por padrão, as requisições vão diretamente para a API configurada em `environment.ts` (requer configuração CORS no backend). Proxy pode ser configurado localmente se necessário.

### Fluxo de Desenvolvimento

1. **Configurar Ambiente**: 
   - **Padrão (Sem Proxy)**: Configure `src/environment.ts` com `apiUrl: 'http://localhost:5298'` e certifique-se de que o backend aceita CORS
   - **Com Proxy (Opcional)**: Se você configurou proxy localmente, use `apiUrl: ''` (string vazia)
2. **Iniciar API Backend**: Certifique-se de que o backend está rodando em `http://localhost:5298`
3. **Iniciar Frontend**: Execute `yarn start` na raiz do projeto
4. **Abrir Navegador**: Navegue para `http://localhost:4200`
5. **Fazer Alterações**: Edite arquivos no diretório `src/`
6. **Ver Alterações**: Navegador recarrega automaticamente ao salvar

### Estilo de Código

- **Modo Estrito TypeScript**: Todo código deve passar na verificação estrita de tipos
- **Guia de Estilo Angular**: Seguir convenções do guia de estilo Angular
- **Estrutura de Componentes**: Usar componentes standalone onde apropriado
- **Injeção de Serviços**: Usar injeção de dependência para todos os serviços
- **Padrões Observable**: Usar operadores RxJS para transformação de dados

### Tarefas Comuns de Desenvolvimento

#### Adicionando um Novo Componente

```bash
ng generate component components/standalone/meu-novo-componente --standalone
```

#### Adicionando um Novo Serviço

```bash
ng generate service components/services/meu-novo-servico
```

#### Adicionando uma Nova Rota

Edite `src/app/app.routes.ts`:

```typescript
{
  path: 'minha-rota',
  component: MeuComponente,
  canActivate: [AuthGuard] // Opcional
}
```

#### Adicionando um Novo Endpoint de API

1. Adicione método ao `ApiService`:
```typescript
getMeusDados(id: number): Observable<MeuTipoDados> {
  return this.http.get<MeuTipoDados>(
    `${this.baseUrl}/MeuEndpoint/${id}`,
    { headers: this.getHeaders() }
  );
}
```

2. Defina tipos em `api-models.ts` se necessário

## Build para Produção

### Build de Produção

```bash
yarn build
# ou
ng build --configuration production
```

Isso cria um build otimizado de produção em `dist/medical-appointment-scheduling-frontend/` com:

- **Compilação Ahead-of-Time (AOT)**: Performance de runtime mais rápida
- **Tree Shaking**: Eliminação de código não utilizado
- **Minificação**: Minificação de código e assets
- **Otimização de Bundle**: Code splitting e lazy loading
- **Geração de Source Maps**: Source maps opcionais para depuração

### Configuração de Build

Configurações de build de produção (`angular.json`):

- **Otimização**: Habilitada
- **Output Hashing**: All (para cache busting)
- **Source Maps**: Desabilitadas (podem ser habilitadas para depuração)
- **Limites de Budget**: 500KB aviso inicial, 1MB limite de erro

### Configuração de Ambiente

Antes de fazer build para produção, atualize `src/environment.prod.ts`:

```typescript
export const environment: AppEnv = {
    apiUrl: 'https://seu-api-producao.com',
    production: true
}
```

## Testes

### Executando Testes

```bash
yarn test
# ou
ng test
```

Isso inicia o executor de testes Karma com o framework de testes Jasmine.

### Configuração de Testes

- **Framework de Testes**: Jasmine 5.1.0
- **Executor de Testes**: Karma 6.4.0
- **Cobertura**: Plugin Karma Coverage configurado
- **Navegador**: Chrome (modo headless)

### Escrevendo Testes

Arquivos de teste seguem a convenção de nomenclatura `*.spec.ts` e estão localizados junto aos arquivos de origem correspondentes.

Exemplo de estrutura de teste:

```typescript
describe('MeuComponente', () => {
  let component: MeuComponente;
  let fixture: ComponentFixture<MeuComponente>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MeuComponente]
    });
    fixture = TestBed.createComponent(MeuComponente);
    component = fixture.componentInstance;
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});
```

## Licença

Este projeto é desenvolvido como parte de um curso universitário. Todos os direitos reservados.

---

## Recursos Adicionais

### Documentação Angular

- [Documentação Oficial do Angular](https://angular.io/docs)
- [Referência do Angular CLI](https://angular.io/cli)
- [Componentes Angular Material](https://material.angular.io/components)

### Ferramentas de Desenvolvimento

- [Manual TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação RxJS](https://rxjs.dev/)
- [Documentação SCSS](https://sass-lang.com/documentation)

### Documentação Relacionada

- [Documentação da API backend](https://github.com/computing-projects/medical-appointment-scheduling-api)

---

**Última Atualização**: 2025
**Versão**: 1.0.0
**Versão Angular**: 17.3.0
