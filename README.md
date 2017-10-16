# DarshanVis

Darshan (A Scalable HPC I/O Characterization Tool) Data Visualization Tool

## Installation

```bash
bash demo.sh
```

You will be prompted to set up an admin user.

When finished navigate to [http://localhost:8088/](http://localhost:8088/) to see the UI.

Log in with the credentials you just created.

Here is a more detailed explanation of what the demo script is doing:

```bash
cd mysql

# Start Redis & MySQL services
docker-compose up -d redis mysql
# Wait for services to come up fully...

# Start Superset
docker-compose up -d superset
# Wait for Superset to come up fully...

# Initialize Superset DB
docker-compose exec superset superset-demo
# or `docker-compose exec superset superset-init` if no demo data needed

# Play around in demo...

# Bring everything down
docker-compose down -v
```

## Getting Started

- Import the `dashboards.pickle` by using `Manage -> Import Dashboard`. 
- Modify the database SQLAlchemy URI at `Sources -> Databases -> Edit Record`



