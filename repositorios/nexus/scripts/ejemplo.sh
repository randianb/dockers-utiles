docker run -d \
  --name=nexus1 \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -e UMASK_SET=022 \
  -p 8384:8384 \
  -p 22000:22000 \
  -p 21027:21027/udp \
  -v $(pwd)/volumes/nexus1/appdata/config:/config \
  --restart unless-stopped \
  --network docker \
  linuxserver/nexus


docker run -d \
  --name=nexus2 \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -e UMASK_SET=022 \
  -p 8385:8384 \
  -p 22001:22000 \
  -p 21028:21027/udp \
  -v $(pwd)/volumes/nexus2/appdata/config:/config \
  --restart unless-stopped \
  --network docker \
  linuxserver/nexus