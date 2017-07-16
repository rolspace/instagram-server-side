## Instagram Server-Side Flow

This is a small demo project to illustrate how to authenticate the Instagram API using the server-side flow (https://www.instagram.com/developer/authentication/).

In order to try it out, just follow these steps:

1. Register a new Instagram client at https://www.instagram.com/developer/clients/manage/

	Make sure to create a Redirect URI that will match your local Express configuration

2. Clone this repo
3. Run npm install
4. Setup the environment variables

	The environment variables needed to run the application are the following:

	- INSTAGRAM_CLIENTID: Client ID assigned after creating the Instagram client
	- INSTAGRAM_SECRET: Secret string assigned after creating the Instagram client
	- EXPRESS_PORT: port for the Express server (default: 4000)
	- REDIRECT_URI: URI that Instagram will use to redirect to, after the user has authorized the application (default: http://localhost:4000/profile.html)

5. Open a Terminal at the root of the repository's folder and run npm start
6. Browse to http://localhost:4000/