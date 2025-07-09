# Download Snapshot from Server

Download a snapshot from a remote backup server to your local machine.

## Usage

```bash
./snapshots/scripts/download-from-server.sh <snapshot_name> <server_number>
```

## Parameters

- `snapshot_name` (required): Name of the snapshot to download (without .tar.gz extension)
- `server_number` (required): Source server (1 or 2)
  - `1`: Download from backup server 1
  - `2`: Download from backup server 2

## Examples

### Download from server 1
```bash
./snapshots/scripts/download-from-server.sh my-backup 1
```

### Download from server 2
```bash
./snapshots/scripts/download-from-server.sh snapshot_20240101_120000 2
```
