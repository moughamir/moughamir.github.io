import { NextConfig } from 'next';
import withTM from 'next-transpile-modules';


const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.glsl': {
          loaders: ['raw-loader', 'glslify-loader'],
          as: '*.js',
        },
      },
    },
  },
};

export default withTM(['three'])(nextConfig);
