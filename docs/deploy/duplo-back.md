## 1.Add commande start in your package.json service
```json
{
	"...",
	"scripts": {
    	"duplo:start": "tsx interfaces/http/main.ts",
		"...",
	}
}
```

## 2. Add env var file in github action secret
[Here.](https://github.com/mathcovax/seaence/settings/secrets/actions)

format name: [SERVICE_NAME]_ENV_LOCAL

The secret value is .env file content of your service. D'ONT FORGET EDIT VALUE !
D'ont forget to remove `?authSource=admin` from mongo base url.

## 3. Write .env.local file in deploy job
```yml
jobs:
  ...
  deploy:
    ...
	steps:
	  ...
	  - run: |
	  	...
		echo '${{ secrets.[SERVICE_NAME]_ENV_LOCAL }}' > ./<service_name>.env.local # simple cote is importante
```

## 3.5 (optional) Add prisma migration
```yml
jobs:
  ...
  migrate:
    ...
	steps:
	  ...
	  - run: |
	  	...
		echo '${{ secrets.[SERVICE_NAME]_ENV_LOCAL }}' > ./services/<service_name>/.env
        npm -w services/<service_name> run prisma:apply-migration
```

## 4 Add service in compose.prod.yml
```yml
services:
  <service_name>:
    image: ghcr.io/mathcovax/seaence_duplo-back:${TAG}
    command: npm -w services/<service_name> run duplo:start
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
      placement:
        constraints:
            - node.role == worker
    volumes:
      - ./<service_name>.env.local:/home/node/project/services/<service_name>/.env.local
```