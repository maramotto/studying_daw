cd ./frontend && npm run build
cd ..

mkdir -p ./backend/java/src/main/resources/static/spa/
rm -rf ./backend/java/src/main/resources/static/spa/*
cp -r ./frontend/build/client/* ./backend/java/src/main/resources/static/spa/

mkdir -p ./backend/node/public/spa/
rm -rf ./backend/node/public/spa/*
cp -r ./frontend/build/client/* ./backend/node/public/spa/