composer global require laravel/installer
mkdir dev
cd dev
composer create-project phpmyadmin/phpmyadmin
cd ..
mysqladmin -u root password 'root';
