FROM 172.30.10.185:15000/common/nodejs:8-ubuntu

ENV APP_HOME /dianyi/app/media/
WORKDIR $APP_HOME

RUN locale-gen en_US.UTF-8

COPY . $APP_HOME/
#COPY ./.* $APP_HOME/
ENV TERM=xterm

CMD ["bash", "-c", "/dianyi/app/media/docker/start.sh"]
