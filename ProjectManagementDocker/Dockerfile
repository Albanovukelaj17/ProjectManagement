# Wähle ein Node.js-Image als Basis
FROM node:16

# Erstelle ein Verzeichnis für die App
WORKDIR /usr/src/app

# Kopiere die package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest der Anwendung
COPY . .

# Exponiere den Port, auf dem die App läuft
EXPOSE 3000

# Starte die Anwendung
CMD ["node", "app.js"]
