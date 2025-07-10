# Create Snapshot

Create a snapshot (MongoDB, PostgreSQL) to backup your current state.

## Usage

```bash
./snapshots/scripts/create.sh [snapshot_name]
```

## Parameters

- `snapshot_name` (optional): Custom name for the snapshot. If not provided, a timestamp-based name will be generated.

## Examples

### Create snapshot with automatic name
```bash
./snapshots/scripts/create.sh
```
This will create a snapshot with name format: `snapshot_YYYYMMDD_HHMMSS`

### Create snapshot with custom name
```bash
./snapshots/scripts/create.sh my-backup
```

