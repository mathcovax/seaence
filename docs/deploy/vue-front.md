## 1. Check build script scripts/build.sh
Check if your service build command is in `scripts/build.sh`.

## 2. Add env var you need
Envs var is globals with all front service. If you want add var to build new service, add then in BUILD_FRONT_ENV secret.
D'ont forget envs var of all front services.

## 3. Add nginx conf in github action secret
[Here.](https://github.com/mathcovax/seaence/settings/secrets/actions)

format name: [SERVICE_NAME]_NGINX_CONF

value
```conf
server {
	listen 80;

	root /home/nginx/project/services/<service_name>/dist;

	location / {
		index index.html;
		try_files $uri $uri/ /index.html;
	}
}
```

## 4. Write .nginx.conf file in deploy job
```yml
jobs:
  ...
  deploy:
    ...
	steps:
	  ...
	  - run: |
	  	...
		echo '${{ secrets.[SERVICE_NAME]_NGINX_CONF }}' > ./<service_name>.nginx.conf # simple cote is importante
```

## 5. Add service in compose.prod.yml
```yml
services:
  <service_name>:
    image: ghcr.io/mathcovax/seaence_vue-front:${TAG}
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
      placement:
        constraints:
            - node.role == worker
    volumes:
      - ./<service_name>.nginx.conf:/etc/nginx/conf.d/default.conf
    ports:
      - published: <custom_port>
        target: 80
```

