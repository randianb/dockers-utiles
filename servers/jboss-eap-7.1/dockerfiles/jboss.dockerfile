FROM daggerok/jboss-eap-7.1:7.1.6-alpine

# CONFIGURACION
WORKDIR $JBOSS_HOME
COPY volumes/jboss ./volumes

RUN rm -rf ./standalone/configuration/standalone_xml_history

# USUARIO
RUN ./bin/add-user.sh leafnoise leafnoise --silent

# JAVA
# ENV JAVA_OPTS "-server \
#     -Xms64m \
#     -Xmx1024m \
#     -XX:MetaspaceSize=96M \
#     -XX:MaxMetaspaceSize=512m \
#     -Djava.net.preferIPv4Stack=true \
#     -Djboss.modules.system.pkgs=org.jboss.byteman \
#     -Djava.awt.headless=true"

EXPOSE 7000-20000

ENTRYPOINT ./bin/standalone.sh \
    -b 0.0.0.0 \
    -bmanagement 0.0.0.0\
    --debug 7080

CMD bin/bash


