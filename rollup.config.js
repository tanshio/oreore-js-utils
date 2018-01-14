import path from 'path';
import glob from 'glob';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('./package.json');

const banner = `/*! @preserve ${pkg.name} v${pkg.version} - ${pkg.author} | ${pkg.license} License */`;

const entryPath = path.resolve(__dirname, 'src/')
const targets = glob.sync(entryPath+'/*.ts')

const entries = [];
targets.forEach(value => {
  const re = new RegExp(entryPath+'/')
  const filename = value.replace(re, '').replace('.ts', '')
  const obj = {
    banner,
    input: `src/${filename}.ts`,
    output: {
      name: `${filename}`,
      file: `lib/${filename}.js`,
      format: 'umd',
    },
    plugins: [
      commonjs(),
      resolve({
        jsnext: true,
        extensions: [ '.ts', '.js', '.json' ]
      }),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
  }
  entries.push(obj)
})


export default entries;
