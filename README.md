# action-tag-dump
A GitHub Action that automatically generates software version numbers based on the Semantic Versioning (SemVer) specification and conventional commit messages.

## Usage (WIP)

Quick start :

```yaml
name: 'Release'
on:
  push:
    branches:
      - 'master'
jobs:
    release:
        runs-on: ubuntu-latest
        steps:
        -   uses: actions/checkout@v2
        -   uses: actions/setup-node@v1
        -   uses: cbout22/actions-tag-dump@v1
            id: versionning
            with:
                token: ${{ secrets.GITHUB_TOKEN }}
        -   name: Push New Tag
            run: |
            git tag ${{ steps.versioning.outputs.newVersion }}
            git push origin ${{ steps.versioning.outputs.newVersion }}
```

Possible parameters:

- '
