# Deployment Strategy

This document records the deployment strategy for Firefly Restaurant.
The current implementation uses Cloudflare Pages for the static storefront and
Docker Compose on the Mac server for the API runtime.

## Active Public Target

The active public deployment target is the demo environment. Customer or
venue-specific production hostnames should stay detached until the product is
ready for production launch.

The GitHub Actions deployment workflows read deployment secrets from the
`demo` GitHub Environment. Keep Cloudflare Pages project names, custom
domains, Tunnel ids, and real API base URLs in Cloudflare and GitHub Secrets
rather than in tracked files.

## Goals

- Keep public storefront browsing fast, static-first, and Cloudflare-cacheable.
- Keep the .NET server on the Mac server, packaged with Docker.
- Keep Blazor admin protected before it is exposed on any hostname.
- Expose public API and protected admin traffic through Cloudflare Tunnel only
  when each route is explicitly required and documented.
- Stay close to the Firefly Signal deployment model so local operations remain familiar.

## Environments

### Local Development

- Run the Next.js storefront from `src/client/web` once it is scaffolded.
- Run .NET projects directly from `src/server` during normal development.
- Use local Docker only for development infrastructure such as PostgreSQL, Redis, or RabbitMQ.
- Keep the local loop optimized for source edits and tests, not local production image builds.

### Preview

- Use Cloudflare Pages preview deployments for storefront branches once `cd-web.yml` exists.
- Use local or manually deployed server previews until a future issue defines a separate preview server.
- Preview API exposure must follow the same rule as production: only publish the gateway when needed.

### Production

- Host the public storefront on Cloudflare Pages first.
- Run server containers on the Mac server with Docker Compose.
- Publish only the gateway loopback port through a machine-managed Cloudflare Tunnel when public API access is required.
- Publish the Blazor admin only as a loopback-bound service behind Cloudflare
  Tunnel and Cloudflare Access when a future issue or documented demo cutover
  defines that protected access path.

### Demo

- Use the demo Cloudflare Pages custom domain for the public storefront.
- Use the demo public API hostname only for the Cloudflare Tunnel route that
  targets the loopback-published `gateway-api`.
- Use the demo admin hostname for the server-hosted Blazor admin deployment
  through Cloudflare Tunnel after the `admin-app` runtime exists. The route
  must be protected with Cloudflare Access and the app's own authentication and
  authorization before it serves real admin operations.
- Remove old venue or customer hostnames from the Cloudflare Pages custom
  domain list, Cloudflare Tunnel public hostnames, and GitHub deployment
  secrets while this environment is serving the demo site.

## Deployment Boundaries

### Web Storefront

The storefront deploys from `src/client/web`.
The current workflow is `.github/workflows/cd-web.yml`.

Current behavior:

- install dependencies,
- run lint, tests, and build,
- upload the static output to Cloudflare Pages with Wrangler,
- keep normal visitor traffic on Cloudflare-cached HTML, assets, and media.

Cloudflare Pages is the first target.
If the storefront requires true Next.js ISR or on-demand `revalidatePath` or `revalidateTag` behavior, track the pivot to Cloudflare Workers with OpenNext in the issue that needs it.

### Server Runtime

The server deploys from `src/server`.
The current workflows are `.github/workflows/cd-server-images.yml` and `.github/workflows/deploy-server.yml`.

Production should use one Docker Compose deployment unit on the Mac server.
Only executable projects should become runtime containers:

- `gateway-api`
- `menu-api`
- `user-api`
- `admin-app`

Infrastructure containers may include:

- PostgreSQL,
- Redis when needed,
- RabbitMQ when cross-service messaging is justified.

Core libraries such as `menu.core`, `user.core`, and `common.lib` are build-time dependencies, not runtime containers.

### Public Exposure

Keep these services internal to Docker networking or loopback:

- `menu-api`
- `user-api`
- PostgreSQL
- Redis
- RabbitMQ

Publish only `gateway-api` to a loopback port such as `127.0.0.1:<port>` when public API access is required.
Publish `admin-app` only to a separate loopback port when protected admin
access is required. Cloudflare Tunnel maps public API hostnames to the local
gateway and protected admin hostnames to the local Blazor admin service.

Do not expose public router ports for the server.
Cloudflare Tunnel remains machine-managed and out of the tracked repository.
Tunnel credentials, tokens, and local config stay on the Mac server.

## Admin Access

Blazor admin is private by default.

Do not create:

- an unprotected public admin hostname,
- a Tunnel route for admin without Cloudflare Access protection,
- a default Cloudflare Access route for admin that has not been tied to the
  documented admin access model.

Use local Mac access or SSH forwarding for admin operations unless a future issue
or documented demo cutover explicitly defines the protected Cloudflare
Tunnel-backed admin access model.
If that changes, document authentication, authorization, audit logging, rate limiting, and recovery behavior in the issue and docs.

## Media And CDN Behavior

Admin uploads flow through the server path.
The server should process media into web-friendly formats and expose versioned media URLs through CDN-cacheable routes.

Public media responses should use intentional cache headers and stable versioned URLs so Cloudflare can cache aggressively.
If Mac server bandwidth or image transformation becomes a bottleneck, document a future migration to Cloudflare R2, Cloudflare Images, or another CDN-backed object store.

## Revalidation

The first Pages-first deployment path should treat public updates as static output updates.
Admin changes that affect public content should trigger one of these paths:

- a Cloudflare Pages deploy hook or rebuild,
- a GitHub Actions workflow dispatch that rebuilds and redeploys the storefront,
- timed revalidation as a fallback when supported by the chosen runtime.

If an issue requires true runtime ISR or on-demand path/tag revalidation, it must document the Workers/OpenNext deployment change and required Cloudflare cache storage.

## CI/CD Shape

Current workflow names and responsibilities:

- `ci.yml`: run pull request and main-branch checks for the web and server projects.
- `cd-web.yml`: build and deploy `src/client/web` to Cloudflare Pages.
- `cd-server-images.yml`: build server Docker images and push them to Docker Hub.
- `deploy-server.yml`: manually deploy a chosen image tag to the Mac server over SSH.

Web CI must not depend on deployment secrets. The web job leaves
`FIREFLY_MENU_API_BASE_URL` blank and validates lint, tests, static build, and
Playwright smoke coverage against deterministic fallback storefront data. Web CD
remains responsible for injecting the real build-time menu API base URL during
Cloudflare Pages deployment.

Use preflight checks for required secrets so missing deployment secrets skip deploy jobs cleanly or fail with a clear message before side effects.

Deployment workflows use the GitHub Environment named `demo`:

- `cd-web.yml` deploys the Cloudflare Pages storefront with demo environment
  secrets.
- `deploy-server.yml` deploys the Mac server runtime with demo environment
  secrets.
- `cd-server-images.yml` remains environment-neutral because it only builds
  and publishes reusable Docker images.

`deploy-server.yml` currently represents the desired GitHub-operated server
deploy path, but GitHub-hosted runner SSH reachability to the Mac server has
timed out. The durable path should be a self-hosted runner on the Mac server or
a secured Cloudflare Access/service-token SSH path.

## Secrets

Web deployment secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PAGES_PROJECT_NAME`
- `FIREFLY_MENU_API_BASE_URL`

Image publishing secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `DOCKERHUB_NAMESPACE`

Mac server deployment secrets:

- `DEPLOY_SSH_HOST`
- `DEPLOY_SSH_PORT`
- `DEPLOY_SSH_USERNAME`
- `DEPLOY_SSH_PRIVATE_KEY`
- `DEPLOY_REMOTE_PATH`

Runtime secrets:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

Future runtime secrets should be introduced only when the owning app needs them.
Examples include authentication signing keys, revalidation tokens, and provider credentials.

For the current demo cutover, store these values in the GitHub Environment
named `demo`. Replace any previous venue or customer values there instead of
adding parallel production-style secrets for the demo target.

Never commit Tunnel credentials, production `.env` files, SSH keys, API tokens, or database backups.
Do not commit production hostnames, Pages project identifiers, Tunnel ids, or API hostnames in public issue/PR text or tracked docs.

## Deploy Flow

Future server deploys should follow this sequence:

1. Build and validate the server solution.
2. Build Docker images for executable projects.
3. Push images to Docker Hub with both immutable commit SHA tags and a moving branch tag.
4. Manually dispatch the server deploy workflow with the desired image tag.
5. SSH to the Mac server, upload the production compose file and generated environment file, pull images, and restart only the changed app containers.
6. Verify gateway health through localhost before considering the deploy successful.

Future web deploys should follow this sequence:

1. Build and validate the storefront.
2. Confirm the build output is static or matches the documented Cloudflare runtime choice.
3. Deploy to Cloudflare Pages.
4. Verify key public routes and cache headers.

## Rollback

Cloudflare Pages rollbacks should use the Pages deployment history.

Server rollbacks should redeploy a previous immutable Docker image tag.
The production compose file should make image tags explicit through environment variables so rollback does not require rebuilding images.

Database rollback is not automatic.
Future migration issues must document backup, restore, and forward-fix expectations before destructive migrations are introduced.

## Backups

Before production content matters, define a backup routine for:

- PostgreSQL data,
- uploaded media if it remains on the Mac server,
- production environment files stored on the Mac server,
- Cloudflare Tunnel configuration stored outside the repository.

Backups should be restorable without relying on local developer machines.
Do not store backup artifacts in this repository.

## References

- Next.js ISR: https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
- Cloudflare Pages Next.js guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- Cloudflare static Next.js Pages guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- Cloudflare Tunnel: https://developers.cloudflare.com/tunnel/
- Cloudflare Workers Next.js guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- OpenNext Cloudflare caching: https://opennext.js.org/cloudflare/caching
