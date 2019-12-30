service nginx stop

envsubst < ./src/config/proxy.conf > ./conf.d/default.conf

nginx-debug -g 'daemon off;'