# Rules

## Git Convention

- Les noms des commits doivent être semblables à : `feat(${issueNumber}): subject`, `fix(${issueNumber}): subject`, `docs(${issueNumber}): subject` ...

- Vous pouvez également préfixer vos de cette manière : `feat:serviceName(${issueNumber}): subject`, `fix:serviceName(${issueNumber}): subject`, `docs:serviceName(${issueNumber}): subject` ... De cette manière, vous pouvez savoir à quel service appartient le commit.

- Les noms des branches doivent être semblables à : `feat/${issueNumber}`, `fix/${issueNumber}`, `docs/${issueNumber}` ...

## Git Workflow

- Créer une nouvelle branche à partir de `main` avec le nom de la branche qui correspond à la feature que vous allez développer.

- Faire un commit pour chaque fonctionnalité ou bug fix.

## Convetions de code

### Convention pour la CLEAN

### Convention pour DUPLO

Les routes doivent toutes etre importé dans le fichier `interfaces/routes/index.ts` et exporté dans le fichier `src/routes/index.ts`.

Le nom des methodes, fonction et variable doivent être en `camelCase`.

### Convention pour VUE

- Le texte doit **impérativement** passer par i18n et non directement dans le markup.

- Les noms des composants doivent être en `PascalCase` et être minimum composés de 2 mots. Si vous n'en trouvez qu'un seul, vous pouvez le prefixer par `The`. Exemple : `Button` -> `TheButton`.

- Le dossier `src/components` contient uniquement des composants globaux. Ils ont pour but d'être flexibles et de pouvoir être utilisés à plusieurs endroits. Si vous souhaitez créer des composants qui ne seront utilisés qu'à un seul endroit, vous devez les créer dans le dossier `components` d'un domaine. Exemple de location du dossier composants d'un domaine : `src/domains/product/components`.

- Les noms des pages doivent être en `PascalCase` et être minimum composés de 2 mots. Si vous n'en trouvez qu'un seul, vous pouvez le sufixer par `Page`. Exemple : `Login` -> `LoginPage`.

- Les noms des layouts doivent être en `PascalCase` et être minimum composés de 2 mots. Si vous n'en trouvez qu'un seul, vous pouvez le sufixer par `Layout`. Exemple : `Base` -> `BaseLayout`.

- Les routes doivent être en `kebab-case`.

- Les arguments des routes doivent être en `camelCase`.

- La création d'un nouveau domain doit être disctuté en amont.

- Les pages doivent être systématiquement associées à un domaine. Exemple de location du dossier de pages d'un domaine : `src/domains/product/pages`.

- Le dossier `src/composables` contient uniquement des composables globaux. Ils ont pour but d'être flexibles et de pouvoir être utilisés à plusieurs endroits. Si vous souhaitez créer des composables qui ne seront utilisés qu'à un seul endroit, vous devez les créer dans le dossier `composables` d'un domaine. Exemple de location du dossier composables d'un domaine : `src/domains/product/composables`.

- Le dossier `src/stores` contient uniquement des stores globaux. Ils ont pour but d'être flexibles et de pouvoir être utilisés à plusieurs endroits. Si vous souhaitez créer un store qui ne sera utilisé que dans un seul domain, vous devez le créer dans le dossier `stores` d'un domaine. Exemple de location du dossier stores d'un domaine: `src/domains/product/stores`.

- Les noms des fichiers `typescript` doivent être en `camelCase`.

- Quand une fonction est bind a un event de component, la fonction doit être une `function`.
