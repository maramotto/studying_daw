#!/bin/bash
docker build -t daw/harleydawson:1.0.0 -f Dockerfile .
docker push daw/harleydawson:1.0.0