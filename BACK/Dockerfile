# Utiliser l'image Node.js officielle avec la version 18.19.1
FROM node:18.19.1-slim

## ou node:alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json dans le conteneur
COPY ./package.json ./package-lock.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
