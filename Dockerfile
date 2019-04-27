FROM mvpstudio/java-8:v01

ADD backend/build/distributions/backend.tar /home/mvp/app/

USER mvp

WORKDIR /home/mvp

ENTRYPOINT ["/home/mvp/app/backend/bin/backend"]
