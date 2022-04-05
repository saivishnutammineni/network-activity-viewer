# Network Debugger

Chrome devtools network tab like functionality for node apps!!!

There is no easy way to view network requests made from a node app similar to network tab in chrome devtools for ui apps.

This package solves this by tracking the network requests made from your node application and showing them in a chrome dev tools like UI !!!

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
4. Click on the reload icon to refresh the requests.

**Note: This package expects ports 6262 and 4500 to be available**

