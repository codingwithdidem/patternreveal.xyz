# Tinybird Commands Reference

This file contains the most commonly used Tinybird commands for development and data management.

## Project Management

### `tb build`

**What it does:** Builds the entire Tinybird project locally, including all datasources, pipes, and endpoints. This command:

- Validates all `.datasource` and `.pipe` files
- Ingests data from `.ndjson` files into datasources
- Creates/updates all endpoints
- Shows any errors or warnings in your project

**When to use:** After making changes to any `.datasource`, `.pipe`, or `.ndjson` files

```bash
tb build
```

### `tb --cloud deploy`

**What it does:** Deploys your project to Tinybird Cloud (production environment)

- Uploads all datasources and pipes to the cloud
- Creates endpoints in production
- Promotes changes to live environment

**When to use:** When ready to deploy changes to production

```bash
tb --cloud deploy
```

### `tb --cloud deployment create --wait --auto`

**What it does:** Creates a new deployment and automatically promotes it

- Creates a deployment with a unique ID
- Waits for deployment to complete
- Automatically promotes to production

**When to use:** For automated deployments or when you want to ensure deployment completes

```bash
tb --cloud deployment create --wait --auto
```

## Data Management

### `tb datasource append <datasource_name> <file_name>`

**What it does:** Appends data from a file to an existing datasource

- Reads data from the specified file (usually `.ndjson`)
- Adds the data to the datasource without overwriting existing data
- Useful for adding new data incrementally

**When to use:** When you want to add new data to an existing datasource

```bash
tb datasource append patterns patterns.ndjson
```

### `tb datasource data <datasource_name>`

**What it does:** Shows all data in a datasource

- Displays all rows in the specified datasource
- Shows data in a readable format
- Useful for debugging and verifying data ingestion

**When to use:** To check what data is in a datasource

```bash
tb datasource data patterns
```

### `tb datasource truncate <datasource_name>`

**What it does:** Removes all data from a datasource

- Deletes all rows in the specified datasource
- **Warning:** This action cannot be undone
- Useful for clearing test data or starting fresh

**When to use:** When you want to clear all data from a datasource

```bash
tb datasource truncate patterns
```

### `tb datasource ls`

**What it does:** Lists all datasources in your project

- Shows all available datasources
- Displays their schemas and row counts
- Useful for project overview

**When to use:** To see all datasources in your project

```bash
tb datasource ls
```

## Endpoint Testing

### `tb endpoint data <pipe_name> [--param1 value1 --param2 value2]`

**What it does:** Tests an endpoint by running the pipe with specified parameters

- Executes the pipe query with the given parameters
- Returns the actual data that would be returned by the API
- Shows query performance metrics (time, rows read, bytes read)

**When to use:** To test endpoints and see what data they return

```bash
tb endpoint data workspace_summary --workspace_id workspace1
tb endpoint data reflection_trends --workspace_id workspace1 --days_filter 30
```

### `tb endpoint url <pipe_name>`

**What it does:** Shows the HTTP URL for an endpoint

- Displays the full URL including authentication token
- Shows the endpoint that can be called via HTTP
- Useful for testing endpoints from external tools

**When to use:** To get the URL for calling an endpoint via HTTP

```bash
tb endpoint url workspace_summary
```

## Testing

### `tb test run`

**What it does:** Runs all test files in your project

- Executes all `.yaml` test files
- Validates that endpoints return expected results
- Shows test results and any failures

**When to use:** To run automated tests for your endpoints

```bash
tb test run
```

## Cloud Management

### `tb --cloud datasource ls`

**What it does:** Lists all datasources in the cloud environment

- Shows datasources deployed to production
- Displays schemas and row counts
- Useful for monitoring production data

**When to use:** To see what's deployed in production

```bash
tb --cloud datasource ls
```

### `tb --cloud datasource data <datasource_name>`

**What it does:** Shows data from a cloud datasource

- Displays data from the production environment
- Useful for debugging production issues

**When to use:** To check production data

```bash
tb --cloud datasource data patterns
```

### `tb --cloud datasource append <datasource_name> <file_name>`

**What it does:** Appends data to a cloud datasource

- Adds data to the production datasource
- Useful for adding data to production

**When to use:** To add data to production

```bash
tb --cloud datasource append patterns patterns.ndjson
```

## Token Management

### `tb token ls`

**What it does:** Lists all available tokens

- Shows all tokens for your project
- Displays token permissions and scopes
- Useful for managing authentication

**When to use:** To see available tokens

```bash
tb token ls
```

## Troubleshooting

### `tb datasource data <datasource_name>_quarantine`

**What it does:** Shows data that failed to ingest (quarantined)

- Displays rows that couldn't be ingested due to schema issues
- Shows the specific errors for each row
- Useful for debugging data ingestion problems

**When to use:** When you see "there are rows in quarantine" messages

```bash
tb datasource data patterns_quarantine
```

## Common Workflows

### Development Workflow

1. **Make changes** to `.datasource`, `.pipe`, or `.ndjson` files
2. **Build locally** to test: `tb build`
3. **Test endpoints** to verify: `tb endpoint data <pipe_name>`
4. **Deploy to cloud** when ready: `tb --cloud deploy`

### Data Ingestion Workflow

1. **Prepare data** in `.ndjson` format
2. **Append to datasource**: `tb datasource append <name> <file>`
3. **Verify ingestion**: `tb datasource data <name>`
4. **Test endpoints** to see data in analytics

### Testing Workflow

1. **Create test files** in `.yaml` format
2. **Run tests**: `tb test run`
3. **Fix any failures** and re-run tests
4. **Deploy** when all tests pass

## Environment Flags

- **Local development**: No flag needed (default)
- **Cloud/production**: Use `--cloud` flag before commands
- **Example**: `tb --cloud datasource ls` vs `tb datasource ls`

## Tips

- Always run `tb build` after making changes to see errors early
- Use `tb endpoint data` to test endpoints before deploying
- Check quarantine data when ingestion fails
- Use `--cloud` flag to work with production data
- Keep test files updated as you modify endpoints
