<h2>Demo site for this app here:</h2><br/>
<b> <a hef="128.199.229.75">128.199.229.75</a></b><br/>
<b> Admin account to access dashboard <b></br/>
 <b>username: dangminhtruong</b><br/>
<b> Admin account password: 777 </b><br/>
<h3>In case you clone this project</h3><br/>
<b>Step 1</b> Open terminal then run "npm install" to install dependencies...<br/>
<b>Step 2</b> Make sure you already install successful all dependencies. Then move to <i>database/seeder </i> by comand "cd database/seeder" folder then run following comand <br/>
<ul>
   <li>"node category_seeder"</li>
   <li>"node product_seeder"</li>
   <li>"node user_seeder"</li>
   <li>"node bill_seeder"</li>
   <li>"node blog_seeder"</li> 
</ul>
<b>Step 4</b> Go to helpers folder and run "node con_job.js" to run application's cron jobs<br/>
. After this step, you have faked data...<br/>
<b>Step 5</b> Run "nodemon" at main folder, then open browser, access to "localhost:3000"... That's is
<h6>Notice !</h6> Here is client React app https://github.com/dangminhtruong/havana_client

<h3>In case you are using Docker</h3><br/>
<b><i>Just simply run folowing steps</i></b><br/>
<b>Step 1</b> Open terminal at main folder and run command "docker-compose up -d" <br/>
<b>Step 2</b> Run "docker exec -it havana_web bash" <br/>
<b>Step 3</b> Run "npm install" to install dependences packages<br/>
<b>Step 4 </b> Still inside container, move to seeder folder by run "cd databse/seeder/" then run seeder files one by one to fake data<br/>
<li>"node category_seeder"</li> 
<li>"node product_seeder"</li> 
<li>"node user_seeder"</li> 
<li>"node bill_seeder"</li> 
<li>"node blog_seeder"</li> 
<b>Step 5</b> Go to helpers folder and run "node con_job.js" to run application's cron jobs<br/>
<b>Step 6</b> The app running at localhost:3000<br/>
<h6>Notice !</h6> Here is client React app https://github.com/dangminhtruong/havana_client
