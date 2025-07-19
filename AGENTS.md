## Instructions for Codex

- Before running tests, ensure Deno is installed. Install using:
  ```bash
  curl -fsSL https://deno.land/install.sh | sh
  export DENO_INSTALL="/root/.deno"
  export PATH="$DENO_INSTALL/bin:$PATH"
  ```
- Run tests with:
  ```bash
  DENO_TLS_CA_STORE=system ./test.sh
  ```

