#!/bin/bash
set -e

MESSAGE="${1:-deploy: update}"

git add .
git commit -m "$MESSAGE"
git push origin main

echo "🚀 Deploying... check GitHub Actions for progress"
