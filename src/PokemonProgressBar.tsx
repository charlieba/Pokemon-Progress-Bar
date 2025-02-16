import React, { useState, useEffect } from 'react';
import pokemonConfig from  "./pokemonConfig.json";
const defaultPokemon = "pikachu";
interface ProgressBarProps {
    percentage: number;
    pokemonName: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ pokemonName, percentage }) => {
    let pokemon = pokemonConfig[pokemonName];
    console.log(pokemonConfig);
    console.log(pokemon);
    if (!pokemon) {
        pokemon = pokemonConfig[defaultPokemon];
    }

    console.log("pokemonName", pokemonName);
    const [color, setColor] = useState('red');
    const [image, setImage] = useState(`/assets/${pokemonName}/1.png`);
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
                setImage(`./assets/${pokemon}/${i}.png`);
                break;
            }
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