# List Snapshots

Display available snapshots in different locations (local, remote servers).

## Usage

```bash
./snapshots/scripts/list.sh [location]
```

## Parameters

- `location` (optional): Where to list snapshots from
  - `local` (default): List snapshots in local directory
  - `server1`: List snapshots on backup server 1
  - `server2`: List snapshots on backup server 2

## Examples

### List local snapshots
```bash
./snapshots/scripts/list.sh
# or explicitly
./snapshots/scripts/list.sh local
```

### List remote snapshots
```bash
./snapshots/scripts/list.sh server1
./snapshots/scripts/list.sh server2
```
