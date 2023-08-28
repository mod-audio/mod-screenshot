#!/bin/sh
# SPDX-FileCopyrightText: 2014-2023 MOD Audio UG
# SPDX-License-Identifier: AGPL-3.0-or-later

if [ -z "${PLUGIN_URI}" ]; then
    echo "missing PLUGIN_URI env var"
    exit 1
fi

set -e
node screenshot.js "${PLUGIN_URI}" "${MOD_BASE_URL}"
python3 thumbnail.py
mv screenshot.png thumbnail.png /tmp/output/
