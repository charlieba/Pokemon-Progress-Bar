import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const [color, setColor] = useState('red');
    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/1828/1828665.png');

    useEffect(() => {
        if (percentage < 50) {
            setColor('red');
            setImage('https://cdn-icons-png.flaticon.com/512/1828/1828665.png');
        } else if (percentage < 80) {
            setColor('orange');
            setImage('https://cdn-icons-png.flaticon.com/512/1828/1828662.png');
        } else {
            setColor('green');
            setImage('https://cdn-icons-png.flaticon.com/512/845/845646.png');
        }
    }, [percentage]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
                width: '300px',
                height: '30px',
                background: '#ddd',
                borderRadius: '15px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: color,
                    borderRadius: '15px',
                    transition: 'width 0.5s, background 0.5s',
                    position: 'absolute',
                    left: 0,
                    top: 0
                }} />
                <img src={image} alt="Progress" style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '25px',
                    height: '25px',
                    transition: 'left 0.5s ease-in-out',
                    left: `${(percentage / 100) * 300}px`
                }} />
            </div>
            <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                {percentage}%
            </span>
        </div>
    );
};

export default ProgressBar;