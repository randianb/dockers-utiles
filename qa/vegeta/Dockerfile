FROM vegeta009/builder

ARG ATTACK_RATE = 1000
ARG ATTACK_DURATION = 10s
ARG ATTACK_TARGETS = target.txt
ARG ATTACK_BODY = body.json

COPY ./volumes .

CMD vegeta attack -rate=${ATTACK_RATE} -duration=${ATTACK_DURATION} -targets=${ATTACK_TARGETS} -body=${ATTACK_BODY} | report
