
import { Platform } from 'react-native';

// Only import AdMob modules on native platforms
let MobileAds: any = null;
let TestIds: any = null;
let InterstitialAd: any = null;
let RewardedAd: any = null;
let AdEventType: any = null;
let RewardedAdEventType: any = null;

if (Platform.OS !== 'web') {
  const AdMobModule = require('react-native-google-mobile-ads');
  MobileAds = AdMobModule.default;
  TestIds = AdMobModule.TestIds;
  InterstitialAd = AdMobModule.InterstitialAd;
  RewardedAd = AdMobModule.RewardedAd;
  AdEventType = AdMobModule.AdEventType;
  RewardedAdEventType = AdMobModule.RewardedAdEventType;
}

// Test Ad Unit IDs - Replace with your actual Ad Unit IDs in production
export const AD_UNIT_IDS = {
  banner: Platform.OS !== 'web' ? Platform.select({
    ios: TestIds?.BANNER,
    android: TestIds?.BANNER,
    default: TestIds?.BANNER,
  }) : '',
  interstitial: Platform.OS !== 'web' ? Platform.select({
    ios: TestIds?.INTERSTITIAL,
    android: TestIds?.INTERSTITIAL,
    default: TestIds?.INTERSTITIAL,
  }) : '',
  rewarded: Platform.OS !== 'web' ? Platform.select({
    ios: TestIds?.REWARDED,
    android: TestIds?.REWARDED,
    default: TestIds?.REWARDED,
  }) : '',
  native: Platform.OS !== 'web' ? Platform.select({
    ios: TestIds?.NATIVE,
    android: TestIds?.NATIVE,
    default: TestIds?.NATIVE,
  }) : '',
};

class AdMobService {
  private interstitialAd: any = null;
  private rewardedAd: any = null;
  private isInitialized = false;

  async initialize() {
    // Don't initialize on web
    if (Platform.OS === 'web') {
      console.log('AdMob not available on web platform');
      return;
    }

    if (this.isInitialized) {
      console.log('AdMob already initialized');
      return;
    }

    try {
      await MobileAds().initialize();
      this.isInitialized = true;
      console.log('AdMob initialized successfully');
      
      // Preload ads
      this.loadInterstitialAd();
      this.loadRewardedAd();
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  // Interstitial Ad Methods
  loadInterstitialAd() {
    if (Platform.OS === 'web') {
      return;
    }

    this.interstitialAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial);
    
    this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded');
    });

    this.interstitialAd.addAdEventListener(AdEventType.ERROR, (error: any) => {
      console.error('Interstitial ad error:', error);
    });

    this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Interstitial ad closed');
      // Preload next ad
      this.loadInterstitialAd();
    });

    this.interstitialAd.load();
  }

  async showInterstitialAd() {
    if (Platform.OS === 'web') {
      console.log('Interstitial ads not available on web');
      return;
    }

    if (this.interstitialAd?.loaded) {
      try {
        await this.interstitialAd.show();
      } catch (error) {
        console.error('Failed to show interstitial ad:', error);
      }
    } else {
      console.log('Interstitial ad not loaded yet');
      this.loadInterstitialAd();
    }
  }

  // Rewarded Ad Methods
  loadRewardedAd() {
    if (Platform.OS === 'web') {
      return;
    }

    this.rewardedAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.rewarded);

    this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('Rewarded ad loaded');
    });

    this.rewardedAd.addAdEventListener(RewardedAdEventType.ERROR, (error: any) => {
      console.error('Rewarded ad error:', error);
    });

    this.rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward: any) => {
      console.log('User earned reward:', reward);
    });

    this.rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Rewarded ad closed');
      // Preload next ad
      this.loadRewardedAd();
    });

    this.rewardedAd.load();
  }

  async showRewardedAd(onRewarded?: (reward: any) => void) {
    if (Platform.OS === 'web') {
      console.log('Rewarded ads not available on web');
      // On web, simulate reward for testing
      if (onRewarded) {
        onRewarded({ amount: 10, type: 'coins' });
      }
      return;
    }

    if (this.rewardedAd?.loaded) {
      try {
        if (onRewarded) {
          this.rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, onRewarded);
        }
        await this.rewardedAd.show();
      } catch (error) {
        console.error('Failed to show rewarded ad:', error);
      }
    } else {
      console.log('Rewarded ad not loaded yet');
      this.loadRewardedAd();
    }
  }

  isInterstitialReady(): boolean {
    if (Platform.OS === 'web') {
      return false;
    }
    return this.interstitialAd?.loaded ?? false;
  }

  isRewardedReady(): boolean {
    if (Platform.OS === 'web') {
      return false;
    }
    return this.rewardedAd?.loaded ?? false;
  }
}

export default new AdMobService();
