# Deployment Instructions

Date: 8 November 2026
Replaces: previous instructions in this same file; no separate document added.
Superseded by: nothing.

## Existing hosting workflow

This project uses the existing Hetzner host at `2.28.18.138`, with nginx behind
Coolify/Traefik for `vairify.io` and `www.vairify.io`.

`deploy-vairify.sh` is the combined deployment script: the React application at
`/`, a selected static release at `/splash`, and its FAQ at `/faq`. Its header
supersedes `deploy-splash.sh` and `deploy-landing.sh`; those remain for rollback.
Only one container should own these domains at a time.

The hosting scripts described here are maintained in the existing local operations
checkout and are not tracked in this repository. A fresh clone does not contain
them; use the maintained operations checkout rather than inventing a replacement.

This guide reflects local script inspection on 7 November 2026. It is not proof
of a new deployment or the current live release. Check the maintained
operations live-state record before publishing. Review the release directory
explicitly instead of assuming a script's older default is the desired release.

## Local install and validation

```bash
npm ci
npm run build
npm run preview
```

No hosting CLI or hosting dashboard connection is required to install or build.
The React build requires the intended `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` values in the local `.env`. These are browser-visible
build-time settings; never put a service-role key or other server secret in
`VITE_*` variables. Do not commit `.env` or print its values.

## Publishing an approved release

Publishing changes the live site. Run the existing script only when authorized
and after confirming the release, host, SSH access, environment, and rollback.
The script requires the configured SSH key, `ssh`, `rsync`, and `python3` locally,
plus the existing Node, Docker, Coolify network, and Traefik setup on the host.

```bash
./deploy-vairify.sh releases/<approved-release-directory>
```

The script validates the static release, checks domain ownership, builds the
application on the host, checks that the Supabase URL reached the build, and
checks the published routes over HTTPS. Review all output. A successful build
alone does not establish that reservation capture or other application flows work.

## Verification and rollback

- Verify `/`, `/splash`, `/splash/`, and `/faq` load over HTTPS.
- Check the intended content and assets on desktop and mobile.
- Test reservation capture and confirm the corresponding backend record.
- Review browser errors and Supabase access policies.
- Do not change DNS, routing, or other services as part of routine source cleanup.

When an authorized deployment needs rollback and the previous image exists:

```bash
./deploy-vairify.sh --back
```

## Troubleshooting

- Missing dependencies: run `npm ci` and verify the lockfile matches `package.json`.
- Missing build settings: verify `.env` contains the intended public Supabase
  settings, then rebuild. Never expose secrets in logs.
- Domain ownership preflight failure: investigate the existing router; do not
  launch a competing container or remove another service without authorization.
- Supabase failures: inspect browser errors, schema, and RLS policies; do not
  loosen production access policies merely to make a test pass.
