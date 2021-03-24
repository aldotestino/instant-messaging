#!/bin/bash

sleep 15
echo "--> Running migration..."
npm run migrate --name init
echo "--> Running generation..."
npm run generate
echo "--> Server starting..."
npm run dev
