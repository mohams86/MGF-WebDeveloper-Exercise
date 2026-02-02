FROM php:8.4-fpm

RUN apt-get update

RUN apt-get install -y git wget redis \
    libpng-dev \
    libicu-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    libzip-dev \
    libxml2-dev \
    libxslt-dev \
    libwebp-dev \
    libjpeg62-turbo-dev \
    libxpm-dev \
    libfreetype6-dev \
    gnupg2 \
    unzip \
    curl

# Composer
RUN wget https://getcomposer.org/download/latest-2.x/composer.phar \
    && chmod +x composer.phar \
    && mv composer.phar /usr/local/bin/composer

# PHP extensions
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN docker-php-ext-configure intl \
    && docker-php-ext-install intl

RUN docker-php-ext-configure gd --with-jpeg --with-freetype \
    && docker-php-ext-install gd

RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    mysqli \
    bcmath \
    curl \
    mbstring \
    zip \
    xml \
    soap \
    simplexml \
    sockets \
    xsl

# MSSQL drivers
RUN curl -sSL https://packages.microsoft.com/keys/microsoft.asc \
    | gpg --dearmor -o /usr/share/keyrings/microsoft.gpg

RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] \
    https://packages.microsoft.com/ubuntu/22.04/prod jammy main" \
    > /etc/apt/sources.list.d/mssql-release.list

RUN apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev \
    && pecl install sqlsrv pdo_sqlsrv \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Non-root user
ARG UNAME=devuser
ARG UID=1003
ARG GID=1003
RUN groupadd -g $GID $UNAME \
    && useradd -m -u $UID -g $GID -s /bin/bash $UNAME

USER $UNAME
WORKDIR /var/www/html
