cd server
start "SERVER" cmd /k "echo Running Server test suites... & npm test"
cd ..\
cd client\user
start "USER SERVICE" cmd /k "echo Running User Service test suites... & npm test"
cd ..\
cd visitor
start "VISITOR SERVICE" cmd /k "echo Running Visitor Service test suites... & npm test"