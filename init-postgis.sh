set -e

until pg_isready -U postgres; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS postgis;
    -- Optionally, print the version to confirm
    SELECT PostGIS_Full_Version();
EOSQL

echo "PostGIS extension created successfully in $POSTGRES_DB."