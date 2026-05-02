# Personal portfolio

This repository holds the source used to deploy my portfolio, a web app built with Svelte and SvelteKit. It contains an admin panel to create new content dynamically. I have also added some goodies such as containerization and passkey authentication.

## Build

### Example env files

Each file uses a `.env.servicename` convention, with a matching `.env.servicename.prod` file used in production :

```bash
# .env.postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=example_postgres_password
POSTGRES_DB=portfolio

# .env.sveltekit
SECRET_KEY=example_secret_key
RP_ID=example_domain # prod-only
ORIGIN=https://example_domain # prod-only
BODY_SIZE_LIMIT=20971520 # prod-only

# .env.prisma
DATABASE_URL=postgresql://postgres:example_postgres_password@portfolio-postgres:5432/portfolio # Replace portfolio-postgres with portfolio-postgres-prod in .env.prisma.prod
PRISMA_CLIENT_ENGINE_TYPE=library

# .env.passkey.prod (prod-only)
PORT=8080
RP_ID=example_domain
ORIGIN=https://example_domain
```

### Development environment :

```bash
docker compose up --build
docker exec -it portfolio-sveltekit npx prisma db push
```

### Production environment :

```bash
docker compose -f compose-prod.yaml up --build
docker exec -it portfolio-sveltekit-prod npx prisma db push
```

### Passkey configuration (one-time setup) :

```bash
docker compose --profile passkey up # Add -f flag for production
```

This will spin up the passkey configuration web server on `http://localhost:8080/passkey/` (dev) or `https://example_domain/passkey/` (prod). Don't forget the trailing slash ! After registering your passkeys, you can stop the passkey server :

```bash
docker compose stop passkey # Add -f flag for production
```
