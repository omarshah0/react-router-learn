# PostgreSQL Configuration
PG_CONTAINER_NAME=react-router-db
PG_DB=react-router-db
PG_USER=postgres
PG_PASSWORD=postgres
PG_PORT=22121
PG_VOLUME=rr7-data

# Redis Configuration
REDIS_CONTAINER_NAME=react-router-redis
REDIS_PORT=6879
REDIS_VOLUME=rr7-redis

# Start PostgreSQL
postgres:
	@docker run --name $(PG_CONTAINER_NAME) \
		-e POSTGRES_USER=$(PG_USER) \
		-e POSTGRES_PASSWORD=$(PG_PASSWORD) \
		-e POSTGRES_DB=$(PG_DB) \
		-v $(PG_VOLUME):/var/lib/postgresql/data \
		-p $(PG_PORT):5432 \
		-d postgres:latest

# Start Redis
redis:
	@docker run --name $(REDIS_CONTAINER_NAME) \
		-v $(REDIS_VOLUME):/data \
		-p $(REDIS_PORT):6379 \
		-d redis:latest

# Initialize all containers
init:
	@make postgres
	@make redis
	@echo "All containers started successfully"
	@echo "PostgreSQL is running on port $(PG_PORT)"
	@echo "Redis is running on port $(REDIS_PORT)"

# Stop and remove all containers
stop:
	@docker stop $(PG_CONTAINER_NAME) $(REDIS_CONTAINER_NAME) || true
	@docker rm $(PG_CONTAINER_NAME) $(REDIS_CONTAINER_NAME) || true
	@echo "All containers stopped and removed"

# Run development server
run:
	@pnpm run dev