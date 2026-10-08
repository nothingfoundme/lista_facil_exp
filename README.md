# Lista Fácil

Aplicativo mobile de lista de tarefas, feito com **React Native, Expo e TypeScript**. As tarefas ficam armazenadas no próprio dispositivo com AsyncStorage; não há login, backend, pagamentos ou biblioteca de componentes visuais.

## Funcionalidades

- Adicionar tarefas (títulos vazios ou compostos apenas por espaços são ignorados).
- Marcar tarefas como pendentes ou concluídas.
- Excluir tarefas.
- Filtrar a lista por **Todas**, **Pendentes** e **Concluídas**.
- Ver as quantidades pendentes e concluídas, além do total de tarefas.
- Carregar e salvar tarefas localmente com AsyncStorage, mantendo-as entre aberturas do app.
- Mostrar estados vazios diferentes e informar falhas de leitura/gravação local.

Os identificadores são gerados para cada tarefa e guardados junto com os dados, em vez de depender da posição na lista.

## Estrutura do projeto

```text
lista-facil/
├── .gitignore
├── App.tsx
├── LICENSE
├── app.json
├── index.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── eslint.config.js
├── assets/
│   ├── android-icon-background.png
│   ├── android-icon-foreground.png
│   ├── android-icon-monochrome.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
└── src/
    ├── components/
    │   ├── FilterTabs.tsx
    │   ├── SummaryCard.tsx
    │   └── TaskRow.tsx
    ├── hooks/
    │   └── useTasks.ts
    ├── storage/
    │   └── tasksStorage.ts
    ├── theme/
    │   └── colors.ts
    └── types/
        └── task.ts
```

## Dependências principais

As versões exatas usadas estão em `package.json` e `package-lock.json`. O projeto usa Expo SDK 57, React Native 0.86.3 e `@react-native-async-storage/async-storage` 2.2.0, selecionado pelo Expo CLI para compatibilidade com o SDK. ESLint e TypeScript são dependências de desenvolvimento.

## Instalar e executar

Requisitos: Node.js e npm instalados.

Na pasta `lista-facil`:

```bash
npm install
npm start
```

O Expo abrirá o menu do servidor de desenvolvimento. Também é possível iniciar diretamente:

```bash
npm run android  # abre no emulador/dispositivo Android configurado
npm run ios      # requer macOS e simulador/dispositivo iOS configurado
```

No Android ou iPhone físico, instale/abra o Expo Go compatível com o SDK e leia o QR code exibido por `npm start`. A primeira execução precisa de conexão para carregar o bundle; os dados das tarefas são armazenados localmente no app.

## Verificar e testar

Verificações automatizadas disponíveis:

```bash
npm run typecheck
npm run lint
npx expo install --check
npx --yes expo-doctor
```

Roteiro de teste manual no Expo Go ou simulador:

1. Inicie com a lista vazia e confirme a mensagem de estado vazio.
2. Tente enviar o campo vazio ou com espaços; nenhuma tarefa deve ser criada.
3. Adicione uma tarefa e confira o total e o contador de pendentes.
4. Marque a tarefa como concluída; os contadores e os filtros devem atualizar.
5. Confira as listas de **Todas**, **Pendentes** e **Concluídas**.
6. Exclua uma tarefa e confirme a atualização dos totais.
7. Feche completamente e reabra o app; confirme que a tarefa restante continua salva.

### Verificações executadas ao preparar este projeto

- `npm run typecheck` — concluído sem erros.
- `npm run lint` — concluído sem erros.
- `npx expo install --check` — dependências compatíveis/atualizadas.
- `npx --yes expo-doctor` — 21/21 verificações passaram.
- `npx expo export --platform android --output-dir /tmp/lista-facil-export-android` e `npx expo export --platform ios --output-dir /tmp/lista-facil-export-ios` — os bundles JavaScript de ambas as plataformas foram gerados.
- `npm audit --omit=dev --audit-level=moderate` — **não passou**: o npm reportou 22 vulnerabilidades transitivas (7 moderadas e 15 altas) na árvore Expo/Metro. A correção automática sugerida exigiria `--force` e propunha downgrade para Expo 44.0.6; não apliquei esse downgrade, pois quebraria a compatibilidade com o SDK 57.

**Ainda precisa ser feito:** abrir o app em um dispositivo ou simulador e percorrer o roteiro manual, incluindo o teste de persistência após fechar e reabrir. A geração dos bundles não substitui esse teste em runtime.
