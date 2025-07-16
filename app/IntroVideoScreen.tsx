import React, { useRef, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function IntroVideoScreen({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<Video>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  const handleReady = () => {
    setReady(true);
    SplashScreen.hideAsync();
  };

  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/images/welcome.mp4')}
        style={{ width, height }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        onReadyForDisplay={handleReady}
      />
      {ready && (
        <TouchableOpacity style={styles.button} onPress={() => { onFinish(); }}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  button: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  buttonText: {
    fontSize: 20,
    color: '#d43c4f',
    fontFamily: 'Skripter', // ensure the font is loaded
  },
});
