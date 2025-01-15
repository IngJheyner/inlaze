FROM node:20.17.0-alpine

WORKDIR /usr/src/app

# Instalar dependencias globales
RUN npm install -g typescript ts-node ts-node-dev

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Verificar la estructura
RUN ls -la && ls -la src/

EXPOSE 3000

# Usar shell form en lugar de exec form
CMD npm run dev
