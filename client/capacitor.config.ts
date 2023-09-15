import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.2048_duel',
  appName: '2048_duel',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
