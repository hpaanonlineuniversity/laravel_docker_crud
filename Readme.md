check .env file for database connection according to compose.yml

DB_CONNECTION=mysql

DB_HOST=mysql_db    # docker-compose.yml မှာပေးထားတဲ့ container_name နဲ့တူရမယ်

DB_PORT=3306

DB_DATABASE=laravel_db

DB_USERNAME=laravel_user

DB_PASSWORD=secret

##########################################################################################################

npm install

npm run build

docker compose up -d

docker compose exec app composer install --no-dev

docker compose exec app php artisan key:generate

docker compose exec app php artisan migrate

docker compose exec app php artisan storage:link

စမ်းသပ်ကြည့်ရန်

    Website: http://localhost:8000

Notes:

    docker compose exec app composer install
    docker compose exec app composer update
    docker compose exec app composer install --no-dev

    docker compose exec app php artisan make:migration create_products_table
    docker compose exec app php artisan make:model product
    docker compose exec app php artisan make:controller ProductController



    https://www.youtube.com/watch?v=yMTY-QlYUQM
