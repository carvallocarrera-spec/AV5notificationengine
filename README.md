# --- AirVantage environment ---
# Which data center your company's AirVantage account lives in.
# This changes both hostnames below automatically.
AV_ENV=eu

# Auth host normally follows the pattern https://{AV_ENV}.airvantage.net
# API host normally follows the pattern  https://{AV_ENV}.airvantage.io
# Override only if engineering tells you these differ for your account.
AV_AUTH_BASE=https://eu.airvantage.net
AV_API_BASE=https://eu.airvantage.io

# --- API Client credentials ---
# Created in AirVantage under Company > Developer > API Clients.
# The client MUST be configured with the "Client Credentials" grant type.
# Ask engineering for these if Product doesn't have its own API Client yet —
# it's good practice for Product to have its own client, separate from
# whatever engineering's backend uses, so rules/hooks made from this tool
# are clearly attributable.
AV_CLIENT_ID=
AV_CLIENT_SECRET=

# --- Company scope ---
# Most Alert API calls require a companyId. Find yours via
# AirVantage UI > Administration, or ask engineering.
AV_COMPANY_ID=

# --- Local server ---
PORT=4000
