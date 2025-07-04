#!/bin/bash
cd /home/kavia/workspace/code-generation/paws--play-107385-8bc99a98/pet_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

