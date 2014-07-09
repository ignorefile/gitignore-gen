in dev now...

# .gitignore generator
type some keywords to generate a .gitignore file.

# Quick start

```sh
ignore [keyword [keyword]] ...
```

eg.

```
ignore mac node
```
will generate these:

```
.DS_Store
node_modules/*
```

# Advance usage

### `--force` or `-f`
add `--force` option to force rewrite the .gitignore

### `--custom` or `-c`
add `--custom` to append your custom ignore pattern

eg.

```
ignore node -c .DS_Store
```
it will generated below:

```
.DS_Store
# Logs
...
// the node ignore file list from GitHub's gitignore template.
...
.lock-wscript
```
