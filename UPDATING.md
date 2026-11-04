# Updating the upstream version

Keep is built from the `keep/` git submodule (`https://github.com/privkeyio/keep.git`); the root `Dockerfile` compiles the `keep-web` crate (Rust, release, default features = wss-only) and builds its Svelte SPA. There is no `dockerTag` in the manifest — the image is built fresh from whatever commit the submodule points at.

The submodule tracks `main` and is pinned to a release tag for reproducibility.

## Determining the upstream version

The latest release tag, and the tag the submodule is pinned to now:

```bash
git -C keep fetch --tags origin && git -C keep tag --sort=-v:refname | head -1
git -C keep describe --tags
```

Keep's version is the Rust workspace version in `keep/Cargo.toml` (`[workspace.package] version`), which the StartOS package version mirrors (e.g. workspace `0.3.0` → StartOS `0.3.0:0`). Read it after checking out the new tag:

```bash
awk -F'"' '/^version/ {print $2; exit}' keep/Cargo.toml
```

## Applying the bump

1. Fast-forward the submodule to the desired upstream commit/tag and stage the new pointer:

   ```bash
   cd keep && git fetch origin && git checkout <tag-or-commit>
   cd .. && git add keep
   ```
