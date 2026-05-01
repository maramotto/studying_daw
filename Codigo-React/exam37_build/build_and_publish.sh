cd ./frontend && npm run build 
cd ..

mkdir -p ./backend/java/src/main/resources/static/
rm -rf ./backend/java/src/main/resources/static/* 
cp -r ./frontend/build/client/* ./backend/java/src/main/resources/static/

mkdir -p ./backend/node/public/
rm -rf ./backend/node/public/*
cp -r ./frontend/build/client/* ./backend/node/public/