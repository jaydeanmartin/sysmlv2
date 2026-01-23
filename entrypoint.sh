#!/bin/bash --login
# The --login ensures the bash configuration is loaded,
# enabling Conda.

# Enable strict mode.
set -euo pipefail
# ... Run whatever commands ...

# Temporarily disable strict mode and activate conda:
set +euo pipefail
conda activate sysmlv2

# Re-enable strict mode:
set -euo pipefail

# exec the final command:
# exec tail -f /dev/null
exec jupyter lab --ip sysmljupyter --config ./jupyter_server_config.py --allow-root