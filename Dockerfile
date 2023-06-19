FROM node:18-alpine
WORKDIR /app
RUN apk update
RUN apk add --no-cache zip

COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4000

RUN npm run build

CMD ["npm", "run", "start"]