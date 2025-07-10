# Restore Snapshot

Restore databases from a snapshot to revert to a previous state.

## Usage

```bash
./snapshots/scripts/restore.sh <snapshot_name>
```

## Parameters

- `snapshot_name` (required): Name of the snapshot to restore from

## Examples

### Restore from directory snapshot
```bash
./snapshots/scripts/restore.sh my-backup
```

### Restore from compressed snapshot
```bash
./snapshots/scripts/restore.sh snapshot_20240101_120000
```