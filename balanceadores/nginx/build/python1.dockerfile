FROM python:3.7

ARG PYTHON1_NOMBRE_CARPETA_PROYECTO
ARG PYTHON1_PUERTO

ENV FLASK_APP app.py
ENV FLASK_DEBUG 1

WORKDIR /usr/src/
COPY ./volumes/python1/${PYTHON1_NOMBRE_CARPETA_PROYECTO} /usr/src/
RUN useradd foo && chown -R foo /usr/src/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD gunicorn \
    -b 0.0.0.0:${PYTHON1_PUERTO} \
    --reload \
    --workers=${PYTHON1_GUNICORN_WORKERS} \
    --worker-connections=${PYTHON1_GUNICORN_CONNECTIONS} \
    app:application 