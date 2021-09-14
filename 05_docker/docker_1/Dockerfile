FROM node:12

WORKDIR /app

# копируем все package.json в рабочую директорию
COPY package*.json ./

# устанавливаем зависимости
RUN npm install

# копируем все локальные файлы в рабочую директорию
COPY . .

ENV PORT=8000

EXPOSE 8080

CMD [ "npm", "start" ]