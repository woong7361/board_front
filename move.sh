sudo scp -i ~/workspace/key/default_key.pem ./dist/index.html ubuntu@13.125.243.251:/var/www/html
sudo scp -i ~/workspace/key/default_key.pem -r ./dist/assets ubuntu@13.125.243.251:/var/www/html
