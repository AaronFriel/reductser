require('@babel/register')({
  extensions: ['.ts', '.js'],
  presets: ['module:ava/stage-4', '@babel/preset-typescript'],
});
