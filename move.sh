sudo scp -i ~/workspace/key/default_key.pem ./dist/index.html ubuntu@15.165.133.6:/var/www/html
sudo scp -i ~/workspace/key/default_key.pem -r ./dist/assets ubuntu@15.165.133.6:/var/www/html
