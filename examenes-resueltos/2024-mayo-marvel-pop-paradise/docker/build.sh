#!/bin/bash
docker build -t daw/marvel-pop-paradise:1.0.0 -f Dockerfile .
docker push daw/marvel-pop-paradise:1.0.0
