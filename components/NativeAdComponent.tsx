
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '@/styles/commonStyles';

// Only import AdMob on native platforms
let NativeAd: any = null;
let NativeAdView: any = null;
let AD_UNIT_IDS: any = null;

if (Platform.OS !== 'web') {
  const { NativeAd: NativeAdNative, NativeAdView: NativeAdViewNative } = require('react-native-google-mobile-ads');
  const AdMobService = require('@/services/AdMobService');
  NativeAd = NativeAdNative;
  NativeAdView = NativeAdViewNative;
  AD_UNIT_IDS = AdMobService.AD_UNIT_IDS;
}

export default function NativeAdComponent() {
  const [nativeAd, setNativeAd] = useState<any>(null);

  useEffect(() => {
    // Don't load ads on web
    if (Platform.OS === 'web') {
      return;
    }

    const ad = NativeAd.createForAdRequest(AD_UNIT_IDS.native, {
      requestNonPersonalizedAdsOnly: true,
    });

    const unsubscribeLoaded = ad.addAdEventListener('onAdLoaded', () => {
      console.log('Native ad loaded');
      setNativeAd(ad);
    });

    const unsubscribeError = ad.addAdEventListener('onAdFailedToLoad', (error: any) => {
      console.error('Native ad failed to load:', error);
    });

    ad.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeError();
    };
  }, []);

  // Don't render anything on web
  if (Platform.OS === 'web') {
    return null;
  }

  if (!nativeAd) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NativeAdView style={styles.adView}>
        <View style={styles.adContent}>
          <View style={styles.adHeader}>
            <Text style={styles.adBadge}>Ad</Text>
          </View>
          <Text style={styles.adHeadline} numberOfLines={2}>
            {nativeAd.headline || 'Advertisement'}
          </Text>
          <Text style={styles.adBody} numberOfLines={3}>
            {nativeAd.body || 'Sponsored content'}
          </Text>
          {nativeAd.callToAction && (
            <View style={styles.ctaButton}>
              <Text style={styles.ctaText}>{nativeAd.callToAction}</Text>
            </View>
          )}
        </View>
      </NativeAdView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  adView: {
    padding: 16,
  },
  adContent: {
    gap: 8,
  },
  adHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    backgroundColor: colors.highlight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adHeadline: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  adBody: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
