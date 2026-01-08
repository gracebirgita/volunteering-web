#!/bin/sh

set -e

echo "Mulai deploy..."

echo "Migrasi database..."
php artisan migrate --force

echo "Menghubungkan storage..."
php artisan storage:link

echo "Optimalkan konfigurasi..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Done.."
php artisan serve --host=0.0.0.0 --port=$PORT
