import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/PokemonProgressBar.tsx',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            sourcemap: true,
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        babel({ babelHelpers: 'bundled' })
    ],
    external: ['react', 'react-dom'],
};