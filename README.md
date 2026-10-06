# CodeEdu — Protótipo funcional (Telas 1 a 4)

## Fluxo
1. `index.html` — Introdução
2. `selecao-escola.html` — Seleção da escola
3. `login.html` — Login do aluno
4. `dashboard.html` — Dashboard após autenticação

## Login demonstrativo
- Matrícula: `20260001`
- Senha: `123456`

Na tela de login há um botão **Preencher** para inserir automaticamente os dados demonstrativos.

## Correções e melhorias aplicadas
- A escola selecionada agora mantém nome, cidade e unidade nas telas seguintes.
- A busca de escolas funciona e o contador é atualizado.
- A lista contém 12 escolas, coerente com o contador da referência.
- Validação acessível no formulário de login.
- Senha pode ser exibida/ocultada.
- Sessão demonstrativa sem armazenar a senha.
- Dashboard protegido: sem sessão, retorna ao login.
- Menu lateral responsivo no tablet.
- Navegação inferior no mobile.
- Busca do dashboard filtra módulos e atividades.
- Notificações e menu de usuário funcionais.
- Logout funcional.
- Estados de foco, hover e feedback preservam acessibilidade e usabilidade.
- Conteúdo mobile não é escondido; continua acessível por rolagem.

A interface ignora molduras, rótulos Desktop/Tablet/Mobile e demais elementos externos usados apenas para apresentar as referências.


## Revisão de UI/UX — legibilidade
Foi aplicada uma segunda passagem de refinamento visual no Dashboard:
- aumento das fontes de navegação, cards, módulos e atividades;
- maior contraste e altura de linha nos textos secundários;
- cards e áreas clicáveis maiores;
- melhor hierarquia entre título, rótulos, valores e descrições;
- espaçamento ampliado sem alterar a composição de referência;
- ajustes específicos para Desktop, Tablet e Mobile;
- suporte a `prefers-reduced-motion`.


## Revisão final antes das próximas telas
- removido o atalho redundante “Entrar” da seleção de escola;
- seleção inicial agora fica vazia em primeira visita e o botão Continuar só habilita após escolha;
- todas as 12 escolas permanecem acessíveis também no mobile;
- ícones provisórios de caracteres foram substituídos por SVGs coerentes;
- login redistribuído para se aproximar da referência, com ilustração maior e assinatura única no rodapé;
- acesso demonstrativo mantido de forma discreta;
- Dashboard recebeu nova escala tipográfica: textos informativos principais em desktop ficam, em geral, entre 11 e 15px, títulos e valores maiores, e cards ganharam mais altura para não comprimir conteúdo;
- preservada a estrutura responsiva e os estados de foco para teclado.

## Tela 5 — Meus módulos
A tela `meus-modulos.html` foi adicionada ao fluxo autenticado.

Principais recursos:
- item **Meus módulos** do menu lateral agora abre a tela real;
- link **Ver todos os módulos** no dashboard abre a nova tela;
- busca por módulos, aulas e conteúdos;
- quatro módulos com status, progresso e metadados;
- layout fiel à referência em Desktop, Tablet e Mobile;
- tipografia mantida em tamanho confortável, evitando microtexto;
- menu lateral responsivo, navegação inferior mobile, notificações, perfil e logout;
- sessão autenticada obrigatória e preservação do aluno/escola selecionados.

## Tela 6 — Aula
Foi adicionada `aula.html`, com navegação a partir dos cards de **Meus módulos**.

- O módulo **Introdução à Computação** abre a Aula 01 “O que é Computação?”, seguindo a referência enviada.
- Os demais módulos também abrem uma primeira aula coerente com seu assunto para demonstrar o fluxo.
- A página adapta título, conteúdo, quantidade de aulas e progresso conforme o módulo.
- Há navegação Anterior/Próxima aula, breadcrumb, menu responsivo e sessão protegida.
- No tablet/mobile, as seções do conteúdo funcionam como blocos expansíveis.
- O card “Próximo conteúdo” do Dashboard também abre a aula real.

## Atualização de legibilidade responsiva
Todas as telas agora carregam `readability.css`. Esse arquivo centraliza a escala tipográfica responsiva e evita microtextos, especialmente em breadcrumbs, cards de módulos, metadados e conteúdo das aulas. O layout pode crescer verticalmente quando necessário para preservar conforto de leitura.
