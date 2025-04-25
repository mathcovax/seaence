## 1. Check build script scripts/build.sh
Check if your service build command is in `scripts/build.sh`.

## 2. Add nginx conf in github action secret
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

## 3. Add env var needed to build
```yml
jobs:
  ...
    build-vue-front:
    ...
	steps:
	  ...
	  - run: npm run build
        env: 
          VITE_[NAME]: ${{ secrets.[NAME] }}
```

## 4. Add service in compose.prod.yml
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

