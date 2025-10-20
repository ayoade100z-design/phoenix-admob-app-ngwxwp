
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { AD_UNIT_IDS } from '@/services/AdMobService';

interface BannerAdComponentProps {
  size?: BannerAdSize;
}

export default function BannerAdComponent({ size = BannerAdSize.BANNER }: BannerAdComponentProps) {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_UNIT_IDS.banner}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error) => {
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
