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
add `--custom` to append your custom ignore pattern, use comma to separate items.

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

### `ignore view`
view current .gitignore file's content

### `ignore -r keyword` or `ignore --remove keyword`
remove some pattern which matched the args you provided

# Future features

* view .gitignore file
* auto dected dev env.
* delete pattern
