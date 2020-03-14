FROM daggerok/jboss-eap-7.1:7.1.6-alpine

# CONFIGURACION
WORKDIR $JBOSS_HOME
COPY volumes/jboss/dependencias /volumes/dependencias

RUN rm -rf ./standalone/configuration/standalone_xml_history

# USUARIO
RUN ./bin/add-user.sh leafnoise leafnoise --silent


EXPOSE 7000-20000

ENTRYPOINT ./bin/standalone.sh \
    -b 0.0.0.0 \
    -bmanagement 0.0.0.0\
    --debug 7080

CMD bin/bash


