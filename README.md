# DarshanVis

Darshan (A Scalable HPC I/O Characterization Tool) Data Visualization Tool

## Requirements

- Docker Engine 1.13.0+
- Docker Compose 1.15.0+

## Installation

Clone the current branch:
```bash
git clone -b 2017 https://github.com/Aleyasen/DarshanVis-UI DarshanVis
```

Run the `run.sh` file

```bash
cd DarshanVis
bash run.sh
```

You will be prompted to set up an admin user.

When finished navigate to [http://localhost:8088/](http://localhost:8088/) to see the UI.

Log in with the credentials you just created.

Here is a more detailed explanation of what the script is doing:

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
```

To bring everything down and remove the volumes:
```bash
docker-compose down -v
```


## Getting Started

- Add the database credential at `Sources -> Databases -> Add Record`
- Import the `dashboards.pickle` by using `Manage -> Import Dashboard`. 



