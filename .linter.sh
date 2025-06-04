#!/bin/bash
cd /home/kavia/workspace/code-generation/noteease-17213-5d23db58/note_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

