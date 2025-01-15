# Sistema de Gestión de Usuarios y Tareas
Este proyecto es un monorepo que contiene una aplicación fullstack para la gestión de usuarios y tareas, desarrollada con Node.js 20 y React.

## 📋Requisitos Previos
- Node.js 20.17.0 o superior
- Docker y Docker Compose
- Git
- npm (incluido con Node.js)

## Video explicativo
- Part 1
https://www.loom.com/share/c384c538b75741c590e3cd4d2c4b0a06?sid=ed8ad918-0662-4d36-8dd1-9f9b19eda790
- Parte 2
https://www.loom.com/share/ed4029a75e2a489bbc18ca3e2bfdf56b?sid=230d514d-1854-4f70-9411-64d05398848f
- Parte 3
https://www.loom.com/share/096fc6e45f3f411bbbb1222dbb16f113?sid=1df897a0-b85f-43fa-8dd5-30bf7acb1374

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/IngJheyner/inlaze
cd inlaze
```

### 2. Configuración de Variables de Entorno
1. Localiza los archivos .envExample en la raiz del proyecto.
2. Crea copias renombrándolas como .env
3. Completa las variables faltantes en cada archivo
Para la URL de MongoDB, reemplaza las variables en mayúsculas con tus valores:

```bash
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### 3. Iniciar MongoDB con Docker
```bash
docker-compose up mongo-db -d
```

### 4. Instalación de Dependencias
Como es monorepo pero tenemos dos proyectos en la configuración raíz del package.json están los workspaces, por lo que se instalan las dependencias de ambos proyectos con un solo comando:
```bash
npm install
```

### 5. Iniciar la Aplicación en Modo Desarrollo
Desde la raíz del proyecto:
```bash
npm run dev
```
Este comando iniciará tanto el servidor de desarrollo del frontend como el backend.

## 📌Puertos por Defecto
Frontend: http://localhost:5173
Backend: http://localhost:3000
MongoDB: mongodb://localhost:27017