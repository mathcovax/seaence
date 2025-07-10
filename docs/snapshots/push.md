# Push Snapshot to Server

Upload a local snapshot to a remote backup server for safe storage.

## Usage

```bash
./snapshots/scripts/push-on-server.sh <snapshot_name> <server_number>
```

## Parameters

- `snapshot_name` (required): Name of the local snapshot to push
- `server_number` (required): Target server (1 or 2)
  - `1`: Backup server 1
  - `2`: Backup server 2

## Examples

### Push to server 1
```bash
./snapshots/scripts/push-on-server.sh my-backup 1
```

### Push to server 2
```bash
./snapshots/scripts/push-on-server.sh snapshot_20240101_120000 2
```