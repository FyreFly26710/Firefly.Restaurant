# Firefly Restaurant Infrastructure

This folder contains tracked production deployment assets for Firefly Restaurant.
It mirrors the Firefly Signal deployment shape while using Restaurant-specific
project names, image names, and ports.

## Contents

- `docker/`
  - production Dockerfiles for executable .NET server projects
- `deploy/`
  - production Docker Compose assets for the Mac server runtime

## Environment Model

- Local development infrastructure stays under `src/server`.
- Production backend packaging lives in `infra/docker`.
- Production runtime composition lives in `infra/deploy`.
- Machine-specific Cloudflare Tunnel configuration stays outside this repository.
- Production `.env` files, SSH keys, Tunnel credentials, and backups must not be committed.

## Current Runtime

The current server scaffold only has two executable runtime projects:

- `gateway.api`
- `menu.api`

The production compose file therefore runs:

- PostgreSQL as an internal database.
- `menu-api` as an internal API container.
- `gateway-api` as the only loopback-published API surface on `127.0.0.1:30000`.

Add future containers such as `user-api` or `admin-app` only after those projects exist
and a dedicated issue defines their deployment behavior.
