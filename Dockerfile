FROM openjdk:11.0-stretch

ADD backend/build/distributions/backend.tar /home/mvp/app/

WORKDIR /home/mvp

ENTRYPOINT ["/home/mvp/app/backend/bin/backend"]
