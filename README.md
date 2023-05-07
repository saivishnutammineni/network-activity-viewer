# Network Activity Viewer

Chrome devtools network tab like functionality for node apps!!!

There is no easy way to view network requests made from a node app similar to network tab in chrome devtools for ui apps.

This project solves this by tracking the network requests made from your node application and showing them in a chrome dev tools like UI !!!

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/saivishnutammineni/network-activity-viewer/master/libs/network-debugger/static/images/network-log-viewer.png" 
width="100%" alt="Nx - Smart, Fast and Extensible Build System"></p>

## Usage

1. Install the package
    >npm i network-activity-viewer
2. Start network tracking
   ```Typescript
   // Add this code in a main js / ts file 
   import { initNetworkLogging } from 'network-activity-viewer';

   initNetworkLogging();
   ```
3. See the requests made by navigating to http://localhost:4500 in the browser!

## Code base
This is a nx monorepo with the following projects

### Network log viewer
The Angular UI application which shows the network logs.
This project uses angular material and bootstrap.

Dev: Run `ng serve` to start the dev ui server.
Build: Run the prod build from projects.json of the project.

### Network debugger
The node package which tracks http, https requests, and starts the UI and logs server.

This project has the static folder which contains the UI bundle built from `Network log viewer` Project.

Currently this package will start two servers when network logging is initialized.
1. Logs Server: Serves Logs over http port 6262
2. UI server: Serves the UI code over http port 4500

Publish command: `npm publish --access public --otp={otp from authenticator}` (run inside the dist folder of `network-debugger` library)

## Contributing
This application was built as a quick solution for a project i was working on.

This application is at a early stage where the basic functionality is available but a lot of good to have things can be built around.

 I would appreciate any contributions (including suggestions) especially in the following areas:
 1. Review current approach of network requests tracking and any suggestions.
 2. Review current approach of integrating with a node application and any suggestions.
 3. Creating a better UI for the network log viewing.
 4. Auto port selection for UI and logs servers as per availability.
 5. Auto open the network log viewing page in browser once server is started
 6. Use sockets communication between UI and logs server so that UI can be updated as and when a new request is captured.
 7. Add functionality to filter, block requests.
 8. Export the requests as har file.
 9. Better workflow for copying built UI code to npm package
