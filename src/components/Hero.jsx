import React, { useState, useEffect } from 'react';

function HeroTemplate(props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 1) % props.images.length);
        }, props.intervalTime);

        return () => clearInterval(interval);
    }, [currentImageIndex, props]);

    return (
        <div
            style={{
                width: '50%',
                height: '60vh',
                position: 'relative',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '20px'
            }}
        >
            {props.images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        opacity: index === currentImageIndex ? 1 : 0,
                        transition: 'opacity 1s ease-in-out'
                    }}
                />
            ))}
        </div>
    );
}

export default HeroTemplate;
