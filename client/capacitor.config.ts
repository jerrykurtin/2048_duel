import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.2048_duel',
  appName: '2048_duel',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.0.28:3000',
    cleartext: true
  }
};

export default config;
