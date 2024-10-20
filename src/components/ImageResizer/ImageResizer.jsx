import React, { useState, useEffect } from 'react';

function ImageResizer({ image, imagetitle }) {
    const [resizedImageUrl, setResizedImageUrl] = useState('');
    const [quality, setQuality] = useState(0.9); // Increase default quality
    const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio || 1);

    useEffect(() => {
        if (image) {
            const img = new Image();
            img.crossOrigin = 'anonymous'; // To prevent CORS issues
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Dynamic scaling based on devicePixelRatio
                const scale = devicePixelRatio;
                const maxImageWidth = Math.min(800 * scale, window.innerWidth * 0.8); // Scaled for larger size
                const aspectRatio = img.width / img.height;
                const canvasWidth = maxImageWidth;
                const canvasHeight = canvasWidth / aspectRatio;

                // Set canvas dimensions
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                // Higher quality for smooth scaling
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // Draw resized image
                ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

                // Convert to WebP for better performance
                setResizedImageUrl(canvas.toDataURL('image/webp', quality));
            };
            img.src = image;
        }
    }, [image, quality, devicePixelRatio]);

    return (
        <div style={{ height: '100%' }}>
            {resizedImageUrl && (
                <img
                    src={resizedImageUrl}
                    alt={`${imagetitle} resized`}
                    loading="lazy"
                    className="rounded-t-lg w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                    srcSet={`
                        ${resizedImageUrl} 1x, 
                        ${resizedImageUrl} 2x
                    `}
                />
            )}
        </div>
    );
}

export default ImageResizer;
