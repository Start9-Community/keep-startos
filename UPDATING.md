# Updating the upstream version

Keep is built from the `keep/` git submodule (`https://github.com/privkeyio/keep.git`); the root `Dockerfile` compiles the `keep-web` crate (Rust, release, default features = wss-only) and builds its Svelte SPA. There is no `dockerTag` in the manifest — the image is built fresh from whatever commit the submodule points at.

The submodule currently tracks the `keep-web-startos` branch (where `keep-web` lives). Once that work merges to `keep`'s `main`, repoint the submodule to a tag or a `main` commit for reproducibility.

## Determining the upstream version

Keep's version is the Rust workspace version in [`keep/Cargo.toml`](https://github.com/privkeyio/keep/blob/main/Cargo.toml) (`[workspace.package] version`), which the StartOS package version mirrors (e.g. workspace `0.3.0` → StartOS `0.3.0:0`).

```bash
cd keep && awk -F'"' '/^version/ {print $2; exit}' Cargo.toml
```

## Applying the bump

1. Fast-forward the submodule to the desired upstream commit/tag and stage the new pointer:

   ```bash
   cd keep && git fetch origin && git checkout <tag-or-commit>
   cd .. && git add keep
   ```

2. Update `startos/versions/current.ts` — set `version` (and `releaseNotes`) to match. The latest version always lives in `current.ts`, so an in-place edit is all most bumps need; spin off a new version file only when the bump carries a migration (see [Versions](https://docs.start9.com/packaging/versions.html)).

3. Rebuild and sideload to smoke-test:

   ```bash
   make x86 && make install
   ```
