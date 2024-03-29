FROM node:14-alpine

# RUN mkdir myfolder myfolder가 없으면 COPY할 떄, 어차피 자동으로 만들어짐
WORKDIR /buskerLocal/
COPY ./package.json /buskerLocal/
COPY ./yarn.lock /buskerLocal/
RUN yarn install

RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY . /buskerLocal/
# RUN yarn build
CMD yarn start