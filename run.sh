#!/bin/bash

set -e

cd mysql

# Start back end
  echo "Starting redis & mysql services..."
  docker-compose up -d redis mysql
  echo "Sleeping for 10s"
  sleep 10

# Start Superset
echo "Starting Superset..."
docker-compose up -d superset
echo "Sleeping for 10s"
sleep 10

# Inititalize Demo
docker-compose exec superset superset-demo

echo "Navigate to http://localhost:8088 to view demo"
# echo -n "Press RETURN to bring down demo"
# read down
# docker-compose down -v
