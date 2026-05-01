#!/bin/bash
docker build -t daw/tiempos:1.0.0 -f Dockerfile .
docker push daw/tiempos:1.0.0