docker run -it \
-p 6379:6379 \
-v /volumes/data:/data \
-v /volumes/config/:/usr/local/etc/redis/ \
--name redis \
redis redis-server \
/usr/local/etc/redis/ \
--appendonly yes \