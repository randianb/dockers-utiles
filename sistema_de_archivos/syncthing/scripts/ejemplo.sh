docker run -d \
  --name=syncthing1 \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -e UMASK_SET=022 \
  -p 8384:8384 \
  -p 22000:22000 \
  -p 21027:21027/udp \
  -v $(pwd)/volumes/syncthing1/appdata/config:/config \
  --restart unless-stopped \
  --network docker \
  linuxserver/syncthing


docker run -d \
  --name=syncthing2 \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -e UMASK_SET=022 \
  -p 8385:8384 \
  -p 22001:22000 \
  -p 21028:21027/udp \
  -v $(pwd)/volumes/syncthing2/appdata/config:/config \
  --restart unless-stopped \
  --network docker \
  linuxserver/syncthing