# Product Requirements

This document is the project-facing source of truth for Firefly Restaurant product direction.

## Problem

Restaurants need a fast, reliable public storefront that keeps working during traffic spikes while giving staff a private admin experience for menu, shop, media, and account management.

Firefly Restaurant should make public browsing feel instant and resilient by serving cached pages and media from Cloudflare instead of making every visitor hit the origin API.

## Users

- Guests: browse restaurant information, view the current menu, and eventually place orders or manage an account.
- Restaurant staff: update menu availability, shop details, opening hours, media, and order/admin workflows.
- Admins: manage users, staff permissions, restaurant content, and operational settings.
- Developers and agents: deliver scoped issue-driven changes through documented project guidance.

## Goals

- Build a polished restaurant storefront with strong SEO and fast first loads.
- Keep normal public browsing static-first and CDN-cacheable.
- Provide a Blazor admin app for trusted content and operational management.
- Keep the .NET API hidden from normal public browsing unless a specific issue documents an exception.
- Establish durable docs, local `AGENTS.md` files, and skills before scaffolding production code.

## Non-Goals

- Do not treat `docs/demo-ui` as production code.
- Do not make the demo restaurant identity canonical Firefly product content.
- Do not scaffold mobile clients in the initial setup.
- Do not expose public runtime APIs by default.
- Do not implement ordering, payments, or mobile contracts until separate issues define them.

## Core Workflows

### Guest Browsing

Guests can load the home page, view restaurant details, inspect the menu, and see media without directly calling the .NET API from the browser during normal browsing.

### Staff Content Updates

Staff can use the admin app to update menu items, shop copy, hours, and media.
Changes persist through the server and trigger storefront revalidation when public content changes.

### Media Management

Staff upload media through admin workflows.
The server processes images into web-friendly formats and exposes CDN-cacheable URLs for the storefront.

### Issue-Driven Delivery

Developers and agents create or refine GitHub issues, follow the documented mode, work on issue branches, validate changes, and push work for review.

## Acceptance Notes

- Storefront issues must state whether the change is static, ISR, server-side only, or browser dynamic.
- Any normal browser-to-API dependency must be explicit and justified.
- Server issues must state the owning project boundary and whether shared code belongs in `common.lib`.
- Admin issues must state whether public storefront revalidation is required.
- Docs and skills should be updated when project architecture, workflow, validation, or deployment assumptions change.
