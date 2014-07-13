# .gitignore generator
type some keywords to generate a .gitignore file.

# Install 
```
npm install -g gitignore-gen
```

# Quick start

```sh
ignore [keyword [keyword]] [-a PATTERN [, PATTERN]] [-f]...
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

# Future features

* view .gitignore file
* auto dected dev env.
* delete pattern
