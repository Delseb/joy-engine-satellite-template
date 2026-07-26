# joy-engine-satellite-template

Template de site satellite fabriqué automatiquement par **Joy Engine**.

Chaque site client généré par l'agent architecte est un fork de ce repo, puis :
1. Le code est injecté via `SATELLITE_GIT_REPO_TOKEN` (push sur `main`).
2. GitHub Actions déclenche un build.
3. Cloudflare Pages déploie le résultat (via `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`).
4. Joy Engine récupère l'URL et la stocke dans `build_jobs.preview_url`.

## Stack

- **Framework** : TanStack Start v1 (React 19 + Vite 7)
- **Style** : Tailwind CSS v4
- **Hébergement** : Cloudflare Pages (edge runtime)
- **CI/CD** : GitHub Actions

## Structure

```
├── .github/workflows/deploy.yml   # Build + deploy Cloudflare Pages
├── src/
│   ├── routes/
│   │   ├── __root.tsx             # Layout global (SEO + fonts)
│   │   └── index.tsx              # Homepage (généré par l'agent)
│   ├── components/                # Composants injectés depuis le plan JSON
│   ├── styles.css                 # Design tokens Tailwind v4
│   └── router.tsx
├── wrangler.toml                  # Config Cloudflare Pages
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Variables d'environnement attendues (GitHub Secrets)

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `JOY_ENGINE_WEBHOOK_URL` (callback pour notifier la fin du build)
- `JOY_ENGINE_WEBHOOK_SECRET` (HMAC)

## Callback vers Joy Engine

À la fin du déploiement, la CI POST :

```
POST {JOY_ENGINE_WEBHOOK_URL}
X-Signature: sha256=<hmac>
{
  "build_job_id": "...",
  "status": "deployed" | "failed",
  "preview_url": "https://<project>.pages.dev",
  "commit_sha": "..."
}
```
