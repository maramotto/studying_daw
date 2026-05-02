#!/bin/bash
# Script para construir y publicar la imagen Docker.
# Se ejecuta desde la raiz del proyecto (donde estan backend/ y frontend/).
docker build -t daw/tiempos:1.0.0 -f Dockerfile .
docker push daw/tiempos:1.0.0
