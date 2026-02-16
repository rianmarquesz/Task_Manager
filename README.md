# Task Manager

Uma aplicação simples e elegante para gerenciar tarefas diárias com suporte a tema claro/escuro e armazenamento local.

## 📋 Características

- ✅ **Gerenciamento de Tarefas**: Adicione, complete e delete tarefas
- 🎨 **Tema Claro/Escuro**: Alternar entre temas com persistência de preferência
- 📱 **Design Responsivo**: Interface otimizada para dispositivos móveis e desktops
- ♿ **Acessibilidade**: Suporte completo com aria-labels e screen reader
- 💾 **Armazenamento Local**: Suas tarefas são salvas automaticamente no localStorage
- 🏷️ **Filtros**: Visualize todas as tarefas, apenas ativas ou apenas concluídas
- 📊 **Estatísticas**: Acompanhe o progresso com contadores em tempo real

## 🚀 Quick Start

### Pré-requisitos

- Um navegador moderno (Chrome, Firefox, Safari, Edge)
- Um servidor HTTP local para desenvolvimento (opcional, mas recomendado)

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/task-manager.git
cd task-manager
```

2. Inicie um servidor local (escolha uma opção):

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (com http-server):**
```bash
npx http-server
```

**VS Code:**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html` → "Open with Live Server"

3. Abra seu navegador em `http://localhost:8000`

## 📁 Estrutura do Projeto

```
task-manager/
├── index.html              # Página principal
├── scripts/
│   ├── app.js             # Lógica principal da aplicação
│   └── theme.js           # Gerenciador de tema (claro/escuro)
├── styles/
│   └── main.css           # Estilos da aplicação
├── .github/
│   └── copilot-instructions.md  # Diretrizes do projeto
├── README.md              # Este arquivo
└── .gitignore             # Arquivos ignorados pelo Git
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Responsivo com variáveis CSS (CSS Custom Properties)
- **JavaScript (ES6+)**: Lógica da aplicação
- **localStorage**: Persistência de dados

## 📖 Como Usar

### Adicionar uma Tarefa
1. Digite o texto da tarefa no campo de entrada
2. Pressione Enter ou clique em "Add Task"

### Completar uma Tarefa
- Clique no checkbox à esquerda da tarefa

### Deletar uma Tarefa
- Clique no ícone de lixeira no lado direito da tarefa

### Filtrar Tarefas
- Clique nos botões de filtro: **All**, **Active** ou **Completed**

### Alternar Tema
- Clique no botão de lua (🌙) no header superior direito

## 🎨 Convenções de Código

### HTML
- Estrutura semântica com elementos HTML5 (`<header>`, `<main>`, `<section>`, etc.)
- Indentação: 2 espaços
- Use `aria-label` e `aria-live` para acessibilidade

### CSS
- Convenção BEM: `.block__element--modifier`
- Variáveis CSS para cores e espaçamento
- Media queries para design responsivo
- Preferência do sistema: `prefers-color-scheme`

### JavaScript
- ES6+: use `const` por padrão, `let` quando necessário
- Classes para organização de código
- Métodos privados com `#` (quando suportado)
- Closures e event delegation para performance

### Nomenclatura
- Arquivos: kebab-case (`main.js`, `main.css`)
- Classes CSS: kebab-case com BEM
- Variáveis JS: camelCase
- Constantes: UPPER_SNAKE_CASE

## 📊 Detalhes da Implementação

### TaskManager (app.js)
Classe responsável pela lógica central:
- Gerenciar array de tarefas
- Carregar/salvar no localStorage
- Renderizar interface
- Lidar com eventos de usuário

```javascript
class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentFilter = 'all';
    this.init();
  }
  // ... métodos
}
```

### ThemeManager (theme.js)
Classe responsável pelo tema:
- Detectar preferência do sistema
- Persistir escolha do usuário
- Aplicar tema ao DOM

```javascript
class ThemeManager {
  constructor() {
    this.STORAGE_KEY = 'app-theme';
    this.DARK_THEME = 'dark';
    this.LIGHT_THEME = 'light';
    this.init();
  }
  // ... métodos
}
```

## 🌐 Compatibilidade

| Navegador | Versão Mínima |
|-----------|----------------|
| Chrome    | 90+            |
| Firefox   | 88+            |
| Safari    | 14+            |
| Edge      | 90+            |

## ♿ Acessibilidade

O projeto segue as diretrizes WCAG 2.1:
- ✅ Suporte a leitores de tela
- ✅ Navegação por teclado
- ✅ Contraste adequado de cores
- ✅ Semântica HTML apropriada
- ✅ ARIA labels nos elementos interativos

## 📝 Dados Armazenados

As tarefas são armazenadas no `localStorage` com a estrutura:

```javascript
{
  id: 1707502400000,              // Timestamp do navegador
  text: "Título da tarefa",
  completed: false,
  createdAt: "16/02/2026 10:00:00"
}
```

**Chave do localStorage**: `app-tasks`
**Chave do tema**: `app-theme`

## 🚀 Roadmap Futuro

- [ ] Adicionar categorias/tags para tarefas
- [ ] Sincronização com backend (Firebase, etc.)
- [ ] Exportar tarefas em PDF/CSV
- [ ] Notificações de tarefas
- [ ] Subtarefas
- [ ] Prioridades
- [ ] Data de vencimento
- [ ] Busca e ordenação avançada

## 🐛 Relatório de Bugs

Se encontrar um bug, abra uma [issue](https://github.com/seu-usuario/task-manager/issues/new) com:
- Descrição clara do problema
- Passos para reproduzir
- Screenshot/vídeo se possível
- Navegador e versão

## 💻 Desenvolvimento

### Estrutura de um Commit

```bash
git commit -m "tipo(escopo): descrição concisa

Descrição detalhada se necessário.
- Ponto 1
- Ponto 2

Fixes #123"
```

**Tipos de commit:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações em documentação
- `style`: Formatação (sem alteração lógica)
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Testes
- `chore`: Tarefas de manutenção

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

Desenvolvido com ❤️ por Rian M.

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## ❓ Dúvidas?

Sinta-se livre para abrir uma discussão ou issue no repositório.

---

**Última atualização:** Fevereiro 2026
