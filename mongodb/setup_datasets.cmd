SETLOCAL
@echo off

mongoimport --host %MONGODB_IP% --port %MONGODB_PORT% --db %MONGODB_NAME% --collection tags --drop --file ./tags-dataset.json
mongoimport --host %MONGODB_IP% --port %MONGODB_PORT% --db %MONGODB_NAME% --collection ads --drop --file ./ads-dataset.json

ENDLOCAL
