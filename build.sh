
# echo "Building project packages..."
# python3 -m pip install -r requirements.txt

# echo "Migrating Databases..."
# python3 manage.py makemigrations --noinput
# python3 manage.py migrate --noinput

# echo "Collecting static files..."
# python3 manage.py collectstatic --noinput

#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install

python manage.py collectstatic --no-input
python manage.py migrate