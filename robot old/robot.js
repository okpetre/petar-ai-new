import { Application } from './runtime.js';

if (window.outerWidth > 768) { // Load only on desktop (screens wider than 768px)
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas3d';
  canvas.width = 1200; // Example fixed width
  canvas.height = 800; // Example fixed height
  document.body.appendChild(canvas);

  const app = new Application(canvas);
  app.load('./scene.splinecode');

  // Listen for messages from the parent window
  window.addEventListener('message', (event) => {
    // Ensure the message is from a trusted origin if possible, or check event.origin
    // For now, we'll allow all origins ('*') as per the postMessage in parent

    if (event.data && event.data.type === 'mousemove') {
      const { clientX, clientY } = event.data;

      // Get the canvas element
      const canvas = document.getElementById('canvas3d');

      // Create a new MouseEvent based on the received coordinates
      // Adjust coordinates relative to the canvas position if necessary
      const canvasRect = canvas.getBoundingClientRect();
      const mouseX = clientX - canvasRect.left;
      const mouseY = clientY - canvasRect.top;

      const simulatedMouseEvent = new MouseEvent('mousemove', {
        clientX: mouseX,
        clientY: mouseY,
        bubbles: true,   // Allow the event to bubble up the DOM tree
        cancelable: true // Allow the event to be cancelled
      });

      // Dispatch the simulated event on the canvas
      canvas.dispatchEvent(simulatedMouseEvent);
    }
  });
}
