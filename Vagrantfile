# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  
  config.vm.box = "ubuntu/focal64"
  config.vm.network "public_network",ip:"192.168.11.21",gateway:"192.168.0.99",netmask:"255.255.240.0"
  config.vm.hostname = "tfg"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nodejs npm mysql-server

    # Ejecutar mysql_secure_installation
    mysql -e "UPDATE mysql.user SET Password = PASSWORD('OqfuLX-sC') WHERE User = 'root'"
    mysql -e "DROP USER ''@'localhost'"
    mysql -e "DROP DATABASE test"
    mysql -e "FLUSH PRIVILEGES;"

    # Crear la base de datos y las tablas
    mysql -e "CREATE DATABASE idlealchemy;"
    mysql -e "USE idlealchemy; CREATE TABLE usuario (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, progress TEXT);"
    mysql -e "USE idlealchemy; CREATE TABLE item (id INT AUTO_INCREMENT PRIMARY KEY);"
    mysql -e "USE idlealchemy; CREATE TABLE almacen (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, item_id INT, quantity INT, FOREIGN KEY (user_id) REFERENCES usuario(id), FOREIGN KEY (item_id) REFERENCES item(id));"

  SHELL
end
