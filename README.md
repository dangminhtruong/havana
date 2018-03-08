<h3>In case you clone this project</h3>
<br/>
<b>Step 1</b> Open terminal then run "npm install" to install dependencies...<br/>
<b>Step 2</b> Make sure you already install successful all dependencies. Then move to <i>database/seeder </i> by comand "cd database/seeder" folder then run following comand <br/>
<ul>
   <li>"node category_seeder"</li>
   <li>"node product_seeder"</li>
   <li>"node user_seeder"</li>
   <li>"node bill_seeder"</li>
</ul>
. After this step, you have faked data...<br/>
<b>Step 3</b> Run "nodemon" at main folder, then open browser, access to "localhost:3000"... That's is
<br/>
<h3>In case you are using Docker</h3>
<br/>
<b><i>You don't neeed install nodejs, mogodb or somethings like that on you machine.. Just simply run folowing steps</i></b>
<b>Step 1</b> Open terminal and run command "docker-compose up -d" <br/>
<b>Step 2</b> Run "docker exec -it havana_web_1 /bin/bash" <br/>
<b>Step 3 </b> Move to seeder folder by run "cd databse/seeder/" then run seeder files one by one <br/>
<li>"node category_seeder"</li>
<li>"node product_seeder"</li>
<li>"node user_seeder"</li>
<li>"node bill_seeder"</li> 
<br/>
<h6>Notice !</h6>
Cause this project just a my first project using nodejs, mongodb. So, source maybe confusing !
