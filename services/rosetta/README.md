# How to use LibreTranslate

Documentation: [link](https://github.com/LibreTranslate/LibreTranslate/tree/main)

## Docker configuration

```yaml
services:
  rosetta:
    build:
      context: ${INCLUDE_PATH}/rosetta
      # linux: linux configuration
      dockerfile: ${INCLUDE_PATH}/rosetta/docker/Dockerfile
      # macos: mac configuration
      # dockerfile: ${INCLUDE_PATH}/rosetta/docker/arm.Dockerfile
    healthcheck:
      test: [ 'CMD-SHELL', '/venv/bin/python scripts/healthcheck.py' ]
    ports:
      - "5001:5000" # delete this line if you want to use only in api mode
    command: --host 0.0.0.0
    environment:
      - LT_UPDATE_MODELS=true # update models on start (disable for production)
      - LT_LOAD_ONLY=en,fr,it,es # add more languages if you want
    volumes:
      - rosetta-data-models:/home/libretranslate/.local:rw # necessary to save time after deployment

volumes:
  rosetta-data-models:
```

## How to use

Test the service with the following command:

```bash
curl -X POST http://localhost:5001/translate -d '{"q": "Hello, world!", "source": "en", "target": "es"}'
```

Test in the browser with the following link:

```bash
http://localhost:5001/
```

Swagger documentation:

```bash
http://localhost:5001/docs
```
