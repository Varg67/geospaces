# Kindroid Apps e GeoSpace — contexto técnico para o Codex

Data da análise: 16 de novembro de 2026. Versão deste documento: 1.0.

## 1. Objetivo e situação do trabalho

Este documento transfere para outra sessão do Codex o que foi aprendido sobre a plataforma Kindroid Apps, a partir do guia oficial e da leitura estática de seu cliente de linha de comando. O usuário foi selecionado para o alpha e está investigando as possibilidades antes de implementar uma integração.

**Leia este arquivo como contexto de pesquisa e planejamento. Ele não aprova uma arquitetura, não solicita implementação e não autoriza conectar uma conta, publicar ou ativar um programa.** A próxima instrução do usuário define o trabalho a executar.

Não foram realizados testes autenticados, chamadas ao Kin, implantações nem medições de desempenho. Recursos encontrados no cliente não foram confirmados em execução na conta do usuário.

## 2. Fontes e grau de certeza

Fontes oficiais consultadas nesta conversa:

- **[G] Guia de desenvolvimento:** https://downloads.kinusercontent.com/workshop/GUIDE.md
- **[C] Cliente oficial:** https://downloads.kinusercontent.com/workshop/kin.mjs

Os links são mutáveis. Este documento registra a leitura realizada na data acima; não representa uma versão fixada por hash nem substitui a documentação atual.

Use quatro categorias ao discutir o projeto:

| Categoria | Significado |
| --- | --- |
| Documentado | O guia descreve o recurso; ainda pode faltar verificar seu comportamento real. |
| Presente no cliente | Há código ou comentário correspondente em `kin.mjs`; isso não prova disponibilidade ou garantia do servidor. |
| Hipótese | Aplicação possível ao GeoSpace, proposta por nós. |
| A verificar | Falta documentação suficiente ou evidência experimental. |

Não transforme uma hipótese em capacidade confirmada. Não deduza comportamento do servidor apenas da existência de um comando no cliente.

## 3. Contexto do GeoSpace Weak

O GeoSpace é uma proposta de motor independente de coerência espacial, temporal e comportamental para personagens baseados em LLMs. O Weak deve explorar lugares e conexões abstratos, duração de deslocamentos, rotinas, persistência e relações do personagem com os lugares. Mapas reais e simulação social extensa pertencem a etapas posteriores.

A divisão conceitual em discussão é:

- O mundo estabelece possibilidades e restrições.
- O personagem apresenta objetivos, necessidades e preferências.
- Uma política de decisão propõe ações.
- O motor valida as ações, aplica consequências e mantém o estado canônico.

O personagem pode narrar uma intenção; uma frase como “cheguei ao café” não deve, por si só, modificar a localização registrada pelo motor.

A hipótese temporal preferida é autonomia simulada com atualização sob demanda. Ao avançar o relógio, o motor processaria os eventos relevantes em ordem, sem exigir inferências contínuas de um LLM. Atividades prolongadas, decisões em momentos definidos e checkpoints evitariam avaliações a cada minuto.

Propriedades desejadas, ainda sujeitas a avaliação:

1. Processar 24 horas, 7 dias e 30 dias com a mesma lógica causal.
2. Obter resultados equivalentes ao avançar o mesmo período de uma vez ou em partes, mantendo iguais as condições externas e as decisões.
3. Preservar a ordem dos eventos simultâneos e a reprodutibilidade de escolhas aleatórias.
4. Usar as condições correspondentes ao momento simulado, sem aplicar retroativamente informações futuras.
5. Registrar até quando o estado foi atualizado quando o processamento precisar parar.
6. Distinguir fatos simulados de elaboração narrativa. Permanecer em um café não implica ter encontrado alguém ali.

Esta seção resume a discussão da conversa; não substitui nem pretende revisar os planos completos anteriores de Weak, Mid e Strong.

## 4. Capacidades relevantes da plataforma

O guia [G] apresenta programas em Git, configurados por `kin.json`, com execução em contêineres Node 22/Python 3. Há ações, agendamentos, webhooks, execução contínua autorizada, arquivos persistentes e painéis estáticos. `kin ask` consulta o Kin; `kin tell` comunica fatos. O uso depende das permissões aplicáveis.

As correspondências abaixo são hipóteses de aplicação, não uma arquitetura aprovada:

| Capacidade | Possível uso no GeoSpace | Verificação necessária |
| --- | --- | --- |
| Ações | Consultar estado e solicitar deslocamentos | Quando o Kin chama ações e como recebe seus resultados |
| Agendamentos | Resolver compromissos e atualizações periódicas | Atrasos, custo e comportamento após falhas |
| Webhooks | Receber mudanças externas | Autenticação, duplicatas e tratamento de entregas |
| Arquivos persistentes | Guardar estados, eventos e checkpoints | Atomicidade, limites e recuperação |
| Painel estático | Observar lugares, conexões e histórico | Comunicação com o motor e atualização da tela |
| Consulta ao Kin | Experimentar decisões propostas pelo personagem | Contexto recebido e formato da resposta |
| Comunicação de fatos | Atualizar a informação espacial fornecida ao Kin | Visibilidade, prioridade e duração dessa informação |

Execução contínua é uma opção documentada, não uma necessidade já estabelecida para o Weak. Nossa hipótese sob demanda deve ser avaliada antes de adotar um processo permanente.

## 5. Descobertas adicionais no cliente

Na leitura de `kin.mjs` [C], foram encontrados:

| Elemento | Evidência encontrada |
| --- | --- |
| `kin tell --key` | Comentário descreve substituição do fato enviado anteriormente sob a mesma chave. |
| `kin tell --ttl` | O cliente envia uma validade em horas como `ttl_hours`. |
| `kin tell --reach-out` | O cliente aceita `soon` e `today` e envia `reach_out`. |
| `kin chat --days` | Comando solicita mensagens recentes; comentário indica `chat:read:<days>`. |
| `kin ask` | Comentário descreve uma resposta separada; o cliente imprime o texto retornado. |

Não presumir que `--reach-out` garanta uma mensagem em determinado horário. Não presumir que `--ttl` apague memórias ou mensagens antigas. Não presumir que `kin ask` receba toda a conversa habitual.

### Aplicação possível de uma informação com chave

Uma chave conceitual como `geospace_estado_atual` poderia identificar uma informação substituível contendo personagem, localização, atividade, instante simulado e revisão do estado.

Isso serviria como projeção resumida do estado canônico, não como substituto do armazenamento do motor. Precisamos verificar se o Kin recebe o fato atualizado, se distingue instantes e se continua evocando informações anteriores incompatíveis.

Uma atualização deveria descrever o que o motor efetivamente confirmou. Não deveria preencher intervalos não simulados com uma narrativa plausível.

## 6. Chave de desenvolvimento, execução e MCP

O cliente [C] distingue a chave de desenvolvimento `kk_` das chamadas de um programa em execução. Fora de uma execução, bloqueia comandos como `tell`, `ask` e `chat`; permite operações de código e arquivos. O MCP oferecido pelo cliente expõe ferramentas de desenvolvimento: `guide`, `programs`, `get`, `send` e `files`.

Consequências para a análise:

- A limitação da chave de desenvolvimento não prova que um programa autorizado seja incapaz de ler conversas.
- A existência de um comando de leitura não autoriza seu uso nem demonstra que a permissão esteja disponível no alpha do usuário.
- O MCP documentado não prova que o Kin possa consumir qualquer servidor MCP externo.
- Os arquivos do programa podem conter informações pessoais; acesso a arquivos não equivale a um ambiente sem dados privados.

Segundo [G], a autorização inicial acontece no Kindroid Apps. Atualizações podem ser implantadas sem nova aprovação quando não acrescentam permissões e a chave permite isso. Portanto, não tratar todo envio futuro como uma operação que necessariamente ficará pendente.

## 7. A questão decisiva: autoridade na conversa

**Um motor consistente e um personagem que consulta e respeita esse motor são dois resultados diferentes.**

Os materiais examinados não estabeleceram uma garantia de execução do GeoSpace antes de toda resposta normal do Kin, uma obrigação de chamar determinada ação ou um mecanismo capaz de impedir respostas narrativas incompatíveis com o estado.

Não afirmar que esses mecanismos inexistem: registrar que não foram confirmados nas fontes lidas.

Para nossa hipótese de atualização sob demanda, há três situações a investigar:

| Situação | Consequência possível |
| --- | --- |
| O Kin consulta o motor antes de responder | O motor pode atualizar o estado e fornecer uma posição temporalmente válida. |
| O Kin responde sem consulta | Pode usar um fato desatualizado ou completar a situação pela narrativa. |
| Um agendamento atualiza o estado periodicamente | Pode reduzir a defasagem, mas não demonstra consulta obrigatória ou obediência ao resultado. |

Uma descrição clara da ação pode ajudar o modelo a utilizá-la. Essa ajuda é uma hipótese comportamental, não uma garantia de execução.

Também precisamos descobrir como uma recusa chega ao Kin. A interface do painel documenta um resumo de resultado, mas não devemos assumir que isso descreva integralmente o contexto entregue ao modelo quando ele próprio inicia uma ação.

## 8. Persistência e integridade do estado

O guia [G] define `kin files` como armazenamento entre execuções. O painel também possui um mecanismo de escrita de arquivos. Não há, nas fontes examinadas, informação suficiente para presumir transações ou coordenação entre todas as formas de escrita.

Hipótese inicial: o painel solicita alterações por ações, e o motor valida e grava o estado. Isso concentra a aplicação das regras e evita que um controle visual altere uma localização sem verificar trajeto e tempo.

Questões para experimentação:

- Uma gravação individual é atômica? E uma atualização de vários arquivos?
- Como detectar e tratar uma requisição repetida?
- O que acontece se o processo parar depois de aplicar um evento, mas antes de registrar seu término?
- Há possibilidade de sobreposição entre execuções ou entre painel e programa?
- Como retomar um checkpoint sem aplicar novamente as mesmas consequências?
- Quais são os limites práticos de arquivos, memória, CPU, duração e custo?

Não confundir envio de código versionado em Git com histórico transacional dos dados da simulação. São responsabilidades distintas.

## 9. Experimentos prioritários propostos

Estes são planos de teste, ainda não executados. Cada experimento deve registrar condições iniciais, instante, revisão do estado, ação solicitada, resultado do motor e resposta observada do Kin. Repetir cenários comportamentais antes de concluir que há uma garantia.

| Ordem | Experimento | Evidência procurada |
| --- | --- | --- |
| 1 | Enviar um fato espacial e depois substituí-lo com a mesma chave | Quando o novo fato passa a orientar respostas e se o anterior ainda interfere |
| 2 | Expor uma ação de consulta de localização | Se o Kin a utiliza espontaneamente e com que tipos de pergunta |
| 3 | Recusar um deslocamento impossível | Se o Kin reconhece a recusa ou narra uma chegada não registrada |
| 4 | Comparar uma consulta por `kin ask` com a conversa normal | Quais informações contextuais cada interação demonstra possuir |
| 5 | Interromper e retomar uma atualização de estado | Ausência de eventos perdidos ou duplicados |
| 6 | Simular o mesmo intervalo em diferentes tamanhos de atualização | Equivalência do estado e dos acontecimentos relevantes |

Nos testes 2 e 3, separar o resultado técnico da ação do comportamento narrativo. O motor pode recusar corretamente enquanto o personagem responde de maneira incoerente.

O modo de simulação local mencionado em [G] ajuda a testar o programa sem efeitos reais. Ele não comprova permissões, latência, custos ou comportamento do Kin na plataforma.

## 10. Hipótese de integração para discutir

Uma organização possível, ainda não aprovada:

1. **Núcleo GeoSpace:** regras espaciais e temporais, validação e transições de estado, sem dependência direta do Kindroid.
2. **Persistência:** estados, eventos, revisões e checkpoints, com a estratégia de recuperação a definir.
3. **Adaptador Kindroid:** tradução entre ações da plataforma, consultas ao núcleo e fatos comunicados ao Kin.
4. **Painel de observação:** apresentação do estado e solicitação de ações ao núcleo.

Fluxo a experimentar: receber uma solicitação → atualizar cronologicamente até o instante pertinente → validar a ação → persistir o resultado → comunicar apenas o estado confirmado.

Não fechar agora o formato dos arquivos, o mecanismo de concorrência, o banco de dados ou a política de decisão. As limitações reais da plataforma e os resultados dos experimentos devem orientar essas escolhas.

## 11. Orientação para a próxima sessão do Codex

Ao receber este documento:

- Preserve a separação entre fatos documentados, código encontrado, hipóteses e resultados de testes.
- Use o contexto do Weak para avaliar possibilidades, sem converter este arquivo em especificação final.
- Revalide as fontes antes de uma implementação que dependa de detalhes do alpha.
- Não presuma acesso à conta nem peça credenciais para uma discussão que pode continuar sem elas.
- Não presuma acesso irrestrito a memória, conversa, instruções internas ou ferramentas do Kin.
- Não considere que um texto enviado por `kin tell` se torna automaticamente a autoridade definitiva sobre a narrativa.
- Quando solicitado a testar, comece pela comunicação e pelo respeito ao resultado das ações antes de ampliar o mundo simulado.

**Pergunta técnica central:** conseguimos fazer o Kin consultar um estado espacial atual e respeitar as consequências validadas pelo motor com consistência suficiente para a experiência desejada?

O documento fornece base para investigar essa pergunta. Não afirma que ela já foi respondida.
