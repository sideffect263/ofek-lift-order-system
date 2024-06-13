import React, { useRef, useEffect, useState } from 'react';
import base_platform2 from '../assets/icons/pixelArt/base_platform2.png';
import shot_platform1 from '../assets/icons/pixelArt/shot_platform1.png';
import long_platform2 from '../assets/icons/pixelArt/long_platform2.png';
import long_platform from '../assets/icons/pixelArt/long_platform.png';
import edge_platform1 from '../assets/icons/pixelArt/edge_platform1.png';

function LiftGame() {
    const canvasRef = useRef(null);
    const [height, setHeight] = useState(100); // Initial height of the lift platform
    const [xPosition, setXPosition] = useState(350); // Initial horizontal position
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Load all images once
        const imageSources = [base_platform2, shot_platform1, long_platform2, long_platform, edge_platform1];
        const loadedImages = imageSources.map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });
        setImages(loadedImages);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 600;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (height < 300) setHeight(height + 10);
                    break;
                case 'ArrowDown':
                    if (height > 100) setHeight(height - 10);
                    break;
                case 'ArrowLeft':
                    setXPosition(x => Math.max(0, x - 10));
                    break;
                case 'ArrowRight':
                    setXPosition(x => Math.min(canvas.width - (images[0]?.width * 0.5 || 0), x + 10)); // Adjust boundary for resized images
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        const draw = () => {
            // Clear the entire canvas to refresh the drawing, maintaining any transparency.
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            // Ensure all images are loaded before attempting to draw them
            if (images.length === imageSources.length) {
                // Draw the base image with resizing; the image must have a transparent background
                // This will draw the base of the lift at the specified position with the desired dimensions.
                ctx.drawImage(images[0], xPosition, 480, images[0].width * 0.5, images[0].height * 0.5);
        
                // Calculate which scissor image to use based on the current height
                // The index calculation here allows cycling through different stages of the scissor mechanism.
                const scissorIndex = Math.floor((height - 100) / 67) % images.length;
        
                // Draw the selected scissor mechanism image
                // This draws the part of the lift that moves vertically, resized and positioned according to the lift's height.
                ctx.drawImage(images[scissorIndex], xPosition, 480 - height, images[scissorIndex].width * 0.5, images[scissorIndex].height * 0.5);
        
                // Draw the platform image
                // This is typically the top part of the lift and it moves in sync with the scissor mechanism.
                ctx.drawImage(images[4], xPosition, 480 - height, images[4].width * 0.5, images[4].height * 0.5);
            }
        
            // Request to animate the next frame, continuing the animation loop
            requestAnimationFrame(draw);
        };
        
        requestAnimationFrame(draw);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [height, images, xPosition]);

    return (
        <div style={{ width: '100%', justifyContent:'center', alignContent:'center', display:"flex", marginBottom:20, overflow: 'hidden' }}>
            <canvas ref={canvasRef} />
        </div>
    );
    }

export default LiftGame;
