# Revisão de UI/UX — CodeEdu

Esta revisão foi feita antes da criação das próximas telas, preservando a identidade visual das referências e corrigindo problemas de fluxo, legibilidade e consistência do protótipo.

## 1. Seleção da escola

- Removido o atalho **Entrar** do canto superior direito. O fluxo correto é: introdução → seleção da escola → login.
- O botão **Continuar** inicia desabilitado quando não há escola escolhida.
- Uma escola previamente escolhida é restaurada caso o usuário volte para esta etapa.
- A busca continua funcional e o contador acompanha os resultados filtrados.
- As 12 escolas permanecem acessíveis no mobile; a versão anterior escondia parte da lista.
- Ícones provisórios em formato de caracteres foram substituídos por ícones SVG consistentes com a interface.
- Estados de foco e seleção foram mantidos visíveis para teclado e acessibilidade.

## 2. Login

- A ilustração do estudante foi reprocessada em resolução maior para reduzir serrilhado/blur quando exibida em telas maiores.
- A distribuição do painel visual foi ajustada: logo, escola, ilustração e frase motivacional têm mais equilíbrio e menos espaços artificiais.
- A assinatura **“CodeEdu • Aprenda. Pratique. Evolua.”** agora aparece uma única vez, centralizada no rodapé da tela, seguindo melhor a referência.
- Foi removida a duplicação dessa assinatura entre painel visual e formulário.
- Campos de matrícula e senha receberam ícones SVG próprios; foram removidos caracteres improvisados.
- O botão de mostrar/ocultar senha agora usa ícones visuais coerentes.
- O acesso de demonstração foi mantido, mas com menor interferência na composição principal.
- A escala dos campos e textos foi aumentada para favorecer leitura e toque.

## 3. Dashboard

O maior problema identificado era a **microtipografia**. Alguns textos estavam tecnicamente presentes, mas pequenos demais para uso confortável em um notebook comum.

Ajustes principais:

- Menu lateral: fonte ampliada para ~14 px no desktop.
- Busca: fonte ampliada para ~13 px.
- Saudação: título ampliado para ~38 px e texto auxiliar para ~15 px.
- Cards de resumo: rótulos ~12 px, valores principais maiores e textos auxiliares ~11 px.
- Módulos: títulos ~14 px, descrições ~12 px e metadados ~10,5 px.
- Atividades: títulos ~11,5 px, informações auxiliares ~10,5 px e badges maiores.
- Cards ganharam mais altura e espaçamento para que o aumento tipográfico não comprima o conteúdo.
- Tablet e mobile receberam escalas próprias, em vez de apenas reduzir o desktop.

A consequência intencional é haver um pouco mais de rolagem vertical no desktop. Isso é preferível a comprimir informações acadêmicas importantes em textos muito pequenos.

## 4. Qualidade geral

- Todos os arquivos JavaScript foram verificados sintaticamente.
- Referências locais de imagens, scripts e folhas de estilo foram verificadas e estão presentes.
- As imagens principais extraídas das referências foram ampliadas com reamostragem de alta qualidade para melhorar a apresentação em telas de maior densidade.
- A estrutura continua preparada para receber as próximas telas sem quebrar o fluxo atual.

## Revisão global de tipografia responsiva

Foi criado `readability.css`, carregado depois do CSS específico de todas as telas. O objetivo é impedir que textos importantes sejam reduzidos para 7–10 px apenas para caber no layout.

Principais decisões:
- breadcrumbs agora usam tamanho responsivo legível e, no mobile, rolagem horizontal discreta em vez de diminuir a fonte;
- textos dos cards de **Meus módulos** aumentam e os títulos deixam de ter quebras de linha rígidas;
- no mobile muito estreito, o status do módulo passa para uma segunda linha para preservar o título;
- conteúdo textual das aulas, boxes de curiosidade, metadados e botões ganhou um piso tipográfico maior;
- Dashboard, seleção de escola e login receberam o mesmo piso de legibilidade;
- componentes podem crescer verticalmente: a prioridade passa a ser leitura, não comprimir tudo na primeira viewport;
- `text-size-adjust: 100%` mantém comportamento consistente em navegadores mobile.
