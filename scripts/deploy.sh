#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════
# Nexus Landing Page — One-Shot Deploy Script
# Usage: bash scripts/deploy.sh
# ════════════════════════════════════════════════════════════════
set -e

export PATH="$HOME/.npm-global/bin:$PATH"

BOLD="\033[1m"; GREEN="\033[0;32m"; YELLOW="\033[0;33m"; CYAN="\033[0;36m"; RED="\033[0;31m"; RESET="\033[0m"

echo -e "${BOLD}${CYAN}  Nexus Landing Page — Deploy${RESET}"
echo -e "  ─────────────────────────────"
echo ""

# Check Vercel CLI
if ! command -v vercel &>/dev/null; then
  echo -e "${YELLOW}⚡ Installing Vercel CLI...${RESET}"
  npm install -g vercel
fi

# Check Vercel login
if ! vercel whoami &>/dev/null; then
  echo -e "${YELLOW}⚡ Please log in to Vercel:${RESET}"
  vercel login
fi
echo -e "${GREEN}✓ Vercel: $(vercel whoami 2>/dev/null)${RESET}"

# Build
echo -e "${CYAN}  Building...${RESET}"
npm run build
echo -e "${GREEN}✓ Build successful${RESET}"

# Deploy
echo -e "${CYAN}  Deploying to Vercel...${RESET}"
DEPLOY_OUTPUT=$(vercel --prod --yes 2>&1)
echo "$DEPLOY_OUTPUT"
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oE 'https://[a-zA-Z0-9.-]+\.vercel\.app' | tail -1)

echo ""
echo -e "${BOLD}${GREEN}  ✅ Landing Page DEPLOYED!${RESET}"
[ -n "$DEPLOY_URL" ] && echo -e "  🌐 URL: ${CYAN}${DEPLOY_URL}${RESET}"
echo ""
