import React, { useState, useEffect } from 'react';
import pokemonConfig from  "./pokemonConfig.json";
const defaultPokemon = "pikachu";
interface ProgressBarProps {
    percentage: number;
    pokemonName: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ pokemonName, percentage }) => {
    let pokemon = pokemonConfig[pokemonName];
    if (!pokemon) {
        pokemon = pokemonConfig[defaultPokemon];
    }
    const [color, setColor] = useState('red');
    const [image, setImage] = useState(`https://raw.githubusercontent.com/charlieba/Pokemon-Progress-Bar/refs/heads/main/public/assets/${pokemonName}/1.png`);
    const pokemonProgress = 100/(pokemon["evolutions"]-1);

    useEffect(() => {
        for (let i = 1; i < pokemon["evolutions"]; i++) {
            if (percentage < pokemonProgress*i) {

                if(i===1){
                    setColor('red');
                }else if(i===2){
                    setColor('yellow');
                }else if(i===3){
                    setColor('green');
                }else{
                    setColor('green');
                }
                setImage(`https://raw.githubusercontent.com/charlieba/Pokemon-Progress-Bar/refs/heads/main/src/assets/${pokemonName}/${i}.png`);
                break;
            }else if (percentage >= 100){
                setColor('green');
                setImage(`https://raw.githubusercontent.com/charlieba/Pokemon-Progress-Bar/refs/heads/main/src/assets/${pokemonName}/${pokemon["evolutions"]}.png`);
            }
        }
    }, [percentage, pokemonName]);
    const progressContainerWidth = 300; // Ancho de la barra
    const imageSize = 50; // Tamaño de la imagen
    const progressWidth = (percentage / 100) * progressContainerWidth; // Ancho actual del progreso

    // 📌 Ajustamos la imagen para que esté pegada al borde derecho del progreso
    const imagePosition = Math.max(progressWidth, imageSize / 2);
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
        {/* Contenedor de la barra de progreso */}
        <div className="progress-container" style={{
            width: `${progressContainerWidth}px`,
            height: '30px',
            background: '#ddd',
            borderRadius: '15px',
            position: 'relative',
            overflow: 'visible', // 🔥 Permite que la imagen no se corte
            display: 'flex',
            alignItems: 'center',
            marginTop: '30px'
        }}>
            {/* Barra de progreso */}
            <div className="progress-bar" style={{
                height: '100%',
                width: `${percentage}%`,
                background: color,
                borderRadius: '15px',
                transition: 'width 0.5s, background 0.5s',
                position: 'absolute',
                left: 0,
                top: 0
            }} />

            {/* Imagen pegada al borde del progreso y completamente alineada verticalmente */}
            <img 
                src={image} 
                alt="Progress" 
                style={{
                    position: 'absolute',
                    top: '50%',  // 🔥 Centra la imagen en la barra de progreso
                    left: `${imagePosition}px`, // 🔥 Pegada al borde derecho del progreso
                    transform: 'translate(-50%, -50%)', // 🔥 Centra la imagen completamente
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    transition: 'left 0.5s ease-in-out'
                }} 
            />
        </div>

        {/* Texto del porcentaje */}
        <span className="progress-text" style={{
            marginTop: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#333',
            minWidth: '50px'
        }}>
            {percentage}%
        </span>
    </div>
    );
};

export default ProgressBar;