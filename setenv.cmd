@echo off

set PATH="C:\Program Files\MongoDB\Server\3.4\bin";%PATH%
set MONGODB_IP=localhost
set MONGODB_PORT=27017
set MONGODB_NAME=nodepop
set APISERVER_PORT=8080

goto finish

pause

:finish