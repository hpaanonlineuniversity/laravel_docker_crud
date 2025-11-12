docker compose up -d

docker compose exec app php artisan key:generate

docker compose exec app php artisan migrate

docker compose exec app php artisan storage:link

စမ်းသပ်ကြည့်ရန်

    Website: http://localhost:8000