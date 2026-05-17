# Firefly Restaurant Infrastructure

This folder contains tracked production deployment assets for Firefly Restaurant.
It mirrors the Firefly Signal deployment shape while using Restaurant-specific
project names, image names, and ports.

## Contents

- `docker/`
  - production Dockerfiles for executable .NET server projects
- `deploy/`
  - production Docker Compose assets and a sample environment contract for the Mac server runtime

## Environment Model

- Local development infrastructure stays under `src/server`.
- Production backend packaging lives in `infra/docker`.
- Production runtime composition lives in `infra/deploy`.
- Machine-specific Cloudflare Tunnel configuration stays outside this repository.
- Production `.env` files, SSH keys, Tunnel credentials, and backups must not be committed.
- `infra/deploy/.env.example` documents required variable names only; copy values from private sources.

## Current Runtime

The current server scaffold has three executable runtime projects:

- `gateway.api`
- `menu.api`
- `admin.app`

The production compose file therefore runs:

- PostgreSQL as an internal database.
- `menu-api` as an internal API container.
- `gateway-api` as the only loopback-published API surface on `127.0.0.1:30000`.
- `admin-app` as the loopback-published Blazor admin surface on
  `127.0.0.1:30001`, intended for Cloudflare Tunnel exposure with Cloudflare
  Access protection before real admin operations are available.

Add future containers such as `user-api` only after those projects exist and a
dedicated issue defines their deployment behavior.

## Runtime Environment Contract

The production compose file expects these variables:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DOCKERHUB_NAMESPACE`
- `IMAGE_TAG`

Store real values in the Mac server deployment directory and GitHub Secrets, not in
tracked files.
