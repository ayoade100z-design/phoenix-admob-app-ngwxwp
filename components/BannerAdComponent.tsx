
import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { colors } from '@/styles/commonStyles';

interface BannerAdComponentProps {
  size?: any;
}

// Only import AdMob on native platforms
let BannerAd: any = null;
let BannerAdSize: any = null;
let AD_UNIT_IDS: any = null;

if (Platform.OS !== 'web') {
  const { BannerAd: BannerAdNative, BannerAdSize: BannerAdSizeNative } = require('react-native-google-mobile-ads');
  const AdMobService = require('@/services/AdMobService');
  BannerAd = BannerAdNative;
  BannerAdSize = BannerAdSizeNative;
  AD_UNIT_IDS = AdMobService.AD_UNIT_IDS;
}

export default function BannerAdComponent({ size }: BannerAdComponentProps) {
  // Don't render anything on web
  if (Platform.OS === 'web') {
    return null;
  }

  // Render banner ad on native platforms
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_UNIT_IDS.banner}
        size={size || BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error: any) => {
          console.error('Banner ad failed to load:', error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
