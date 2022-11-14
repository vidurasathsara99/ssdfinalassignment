cd server
start "SERVER" cmd /k "echo Server installing modules... & npm install"
cd ..\
cd client\user
start "USER SERVICE" cmd /k "echo User Service installing modules... & npm install"
cd ..\
cd visitor
start "VISITOR SERVICE" cmd /k "echo Visitor Service installing modules... & npm install"