# Alpine Linux သုံးမယ် - China mirrors အတွက်ပိုကောင်းတယ်
FROM php:8.2-fpm-alpine


# China mirrors for Alpine
RUN echo "https://mirrors.ustc.edu.cn/alpine/v3.19/main" > /etc/apk/repositories && \
    echo "https://mirrors.ustc.edu.cn/alpine/v3.19/community" >> /etc/apk/repositories

# System dependencies တွေ Install လုပ်မယ်
RUN apk update && apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libwebp-dev

# PHP Extensions တွေ Install လုပ်မယ်
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# China Composer Mirror သုံးမယ်
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

# Working directory သတ်မှတ်မယ်
WORKDIR /var/www/html

# Project files တွေ Copy ထည့်မယ်
COPY . .

# User နဲ့ Group ID တွေကိုညှိမယ် (Fixed Version)
RUN apk add --no-cache shadow && \
    usermod -u 1000 www-data && \
    groupmod -g 1000 www-data

# Storage နဲ့ cache folders တွေကို owner ပြောင်းမယ်
RUN chown -R www-data:www-data /var/www/html/storage
RUN chown -R www-data:www-data /var/www/html/bootstrap/cache

# Permissions ပေးမယ်
RUN chmod -R 775 /var/www/html/storage
RUN chmod -R 775 /var/www/html/bootstrap/cache

# Composer dependencies install လုပ်မယ်
RUN composer install --no-dev --optimize-autoloader