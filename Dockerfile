###############################
# BUILD FOR LOCAL DEVELOPMENT##
###############################

FROM node:22-bullseye-slim AS development
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node package.json ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

USER node

########################
# BUILD FOR PRODUCTION##
########################

FROM node:22-bullseye-slim AS build
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node package.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV=production

RUN pnpm install --prod --frozen-lockfile

USER node

###################
# PRODUCTION ######
###################

FROM node:22-bullseye-slim AS production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/index.js" ]
