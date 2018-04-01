#!/bin/bash
cd app && npm run build && aws s3 sync dist/ s3://eeg3-froogl-1/dist/ && aws s3 cp index.html s3://eeg3-froogl-1/index.html
