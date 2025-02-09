function displayMessage(message, video) {
    // Create a div to display the message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.backgroundColor = '#000';
    messageDiv.style.color = '#fff';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = 9999;

    // If a video is provided, position div at the top center of the video
    if (video) {
        messageDiv.style.position = 'absolute';
        messageDiv.style.top = '0';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translateX(-50%)'; // Center the div horizontally

        video.parentElement.appendChild(messageDiv);  // Append to the video's parent element
    } else {
        // If no video is provided, position div at the center of the screen
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '50%';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translate(-50%, -50%)'; // Center the div

        document.body.appendChild(messageDiv);
    }

    // Remove the div after .5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 500);
}

document.addEventListener('keydown', function(event) {
    if (event.key === '+' || event.key === '-') {
        const videos = document.querySelectorAll('video');
        if (videos.length > 0) {
            videos.forEach(video => {
                video.playbackRate += event.key === '+' ? 0.1 : -0.1;
                console.log(`Video speed changed to ${event.key}0.1 ${video.playbackRate}`);
                displayMessage(`Video speed: ${video.playbackRate.toFixed(2)}x`, video);
            });
        } else {
            console.log('No video element found');
            displayMessage('No video found');
        }
    } else if (event.key === '/' || event.key === '*') {
        const videos = document.querySelectorAll('video');
        if (videos.length > 0) {
            videos.forEach(video => {
                video.currentTime += (event.key === '*' ? 2 : -2) * video.playbackRate;
                console.log(`Video currentTime changed to ${video.currentTime}`);
            });
        } else {
            console.log('No video element found');
            displayMessage('No video found');
        }
    }
});
