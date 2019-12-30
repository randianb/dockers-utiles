docker run -it --name mydb2 --privileged=true -p 50000:50000 \
-e DB2INSTANCE=sa \
-e LICENSE=accept \
-e DB2INST1_PASSWORD=leafnoise1234 \
-e DBNAME=testdb \
-v /volumes:/database \
ibmcom/db2
