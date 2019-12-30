#PAGINA
#https://hub.docker.com/_/microsoft-mssql-server

#USO CON -it
docker run -it -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=$leafnoise%' -e 'MSSQL_PID=Express' -p 1433:1433 mcr.microsoft.com/mssql/server:2017-latest-ubuntu 
