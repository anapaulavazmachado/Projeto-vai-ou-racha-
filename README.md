# Projeto-vai-ou-racha-
# Vai ou Racha

Portal *One Page* do **Vai ou Racha**, um app para organizar rolês de nicho com mecânica anti-ghosting: reputação pública, fila de espera inteligente e fechamento automático de vagas.

> Sem ghosting. Vai ou racha.

Projeto desenvolvido por **Ana** para a disciplina de Desenvolvimento Front End (Engenharia de Software, Universidade Positivo).

## Sobre o projeto

O site apresenta a ideia do app em uma única página, com navegação por âncoras:

- **Como Funciona**: os três passos (criar o rolê, confirmar presença, fazer check-in).
- **Reputação**: percentual de comparecimento dos últimos 10 rolês, tabela de pontuação e regras para novatos.
- **Para quem é**: cards dos nichos (basquete 3x3, corrida, board games e trilha).
- **Galeria**: imagens dos nichos, em grid de colunas iguais.
- **Próximos rolês**: tabela de rolês abertos, com vagas e nível mínimo.
- **Planos**: Grátis e Premium (pago por evento).
- **Cadastro**: formulário com validação em JavaScript.

## Tecnologias

- HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `footer`)
- CSS3 com variáveis, Grid, Flexbox e media queries
- JavaScript puro (DOM e eventos), sem bibliotecas

## Estrutura de arquivos

```
.
├── index.html
├── style.css
├── script.js
└── img/
    ├── banner.png
    ├── basquete.png
    ├── corrida.png
    ├── boardgame.png
    ├── trilha.png
    ├── cinema.png
    └── futevolei.png
```

## Como executar

1. Baixe ou clone o projeto.
2. Confira se a pasta `img/` está ao lado do `index.html`, com os arquivos listados acima.
3. Abra o `index.html` no navegador. Não precisa de instalação nem de servidor.

Se alguma imagem não aparecer, abra o console (F12): o script avisa qual arquivo não foi encontrado.

## Funcionalidades em JavaScript

- **Validação do formulário**: confere nome, e-mail, telefone, idade (16 a 100), cidade, nicho, perfil (participante ou organizador), mensagem (mínimo de 10 caracteres) e aceite das regras. Mostra a mensagem de erro do primeiro campo inválido e, se tudo estiver certo, exibe uma mensagem de sucesso e limpa o formulário.
- **Máscara de telefone**: formata automaticamente para `(41) 99999-9999` enquanto a pessoa digita.
- **Modal reaproveitável**: um único modal, criado pelo JS, que muda título e texto conforme o uso. Fecha pelo botão ou clicando fora da caixa.
- **Lista dinâmica de planos**: os botões "Começar grátis" e "Assinar Premium" adicionam o plano a uma lista, com opções de ver detalhes, apagar um item ou apagar todos.
- **Accordion de dúvidas**: seis perguntas no card "Novatos", que abrem e fecham a resposta ao clicar.
- **Troca de cores e modo claro/escuro**: quatro cores de destaque e um botão que alterna o tema.
- **Aviso de imagem quebrada**: registra no console as imagens que não carregaram.

## Responsividade

O layout se adapta a três faixas de largura:

- até **1240px**: ganha espaçamento lateral;
- até **900px**: grids viram 1 ou 2 colunas e os planos ficam empilhados;
- até **600px**: banner, textos e tabela com tamanhos reduzidos.

## Autora

**Ana**, estudante de Engenharia de Software, Universidade Positivo.
