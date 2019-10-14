FROM python:3.7

ARG NOMBRE_CARPETA_PROYECTO
ARG PYTHON_PUERTO

ENV FLASK_APP app.py
ENV FLASK_DEBUG 1

WORKDIR /usr/src/
COPY ./volumes/python/${NOMBRE_CARPETA_PROYECTO} /usr/src/
RUN useradd foo && chown -R foo /usr/src/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD python -m flask run --port ${PYTHON_PUERTO} --host 0.0.0.0
# CMD gunicorn \
#     -b 0.0.0.0:${PYTHON_PUERTO} \
#     --reload \
#     --workers=5 \
#     --worker-connections 1001 \
#     app:server 