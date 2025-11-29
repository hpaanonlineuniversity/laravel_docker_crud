# Stable Debian version with China mirrors
FROM php:8.2-fpm-bullseye

# China mirrors for better connectivity in Myanmar
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list

# System dependencies တွေ Install လုပ်မယ်
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    && rm -rf /var/lib/apt/lists/*

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

# User နဲ့ Group ID တွေကိုညှိမယ်
RUN usermod -u 1000 www-data && \
    groupmod -g 1000 www-data

# Storage နဲ့ cache folders တွေကို owner ပြောင်းမယ်
RUN chown -R www-data:www-data /var/www/html/storage && \
    chown -R www-data:www-data /var/www/html/bootstrap/cache

# Permissions ပေးမယ်
RUN chmod -R 775 /var/www/html/storage && \
    chmod -R 775 /var/www/html/bootstrap/cache

# Composer dependencies install လုပ်မယ်
RUN composer install --no-dev --optimize-autoloader