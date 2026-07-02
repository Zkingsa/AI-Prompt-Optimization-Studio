#!/usr/bin/env bash
set -e

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npx prisma generate

echo "Setup complete. Copy .env.example to .env.local and fill in your values."
