import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: getAppId(),
  appName: '2048 Duel',
  webDir: 'build',
  bundledWebRuntime: false,
  // server: {
  //   url: 'http://192.168.0.28:3000',
  //   cleartext: true
  // },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

function getAppId() {
  // Check the environment variable to determine the platform
  const isAndroid = process.env.ANDROID === 'true';

  // Return the appropriate app ID for production builds (currently broken)
  // return isAndroid ? 'com.play2048duel' : 'com.2048duel';
  // return 'com.play2048duel';
  return 'com.2048duel';
}

export default config;
