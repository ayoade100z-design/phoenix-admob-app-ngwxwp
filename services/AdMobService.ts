
import { Platform } from 'react-native';
import MobileAds, {
  BannerAdSize,
  TestIds,
  InterstitialAd,
  RewardedAd,
  AdEventType,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

// Test Ad Unit IDs - Replace with your actual Ad Unit IDs in production
export const AD_UNIT_IDS = {
  banner: Platform.select({
    ios: TestIds.BANNER,
    android: TestIds.BANNER,
    default: TestIds.BANNER,
  }),
  interstitial: Platform.select({
    ios: TestIds.INTERSTITIAL,
    android: TestIds.INTERSTITIAL,
    default: TestIds.INTERSTITIAL,
  }),
  rewarded: Platform.select({
    ios: TestIds.REWARDED,
    android: TestIds.REWARDED,
    default: TestIds.REWARDED,
  }),
  native: Platform.select({
    ios: TestIds.NATIVE,
    android: TestIds.NATIVE,
    default: TestIds.NATIVE,
  }),
};

class AdMobService {
  private interstitialAd: InterstitialAd | null = null;
  private rewardedAd: RewardedAd | null = null;
  private isInitialized = false;

  async initialize() {
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
    this.interstitialAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial);
    
    this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded');
    });

    this.interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
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
    this.rewardedAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.rewarded);

    this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('Rewarded ad loaded');
    });

    this.rewardedAd.addAdEventListener(RewardedAdEventType.ERROR, (error) => {
      console.error('Rewarded ad error:', error);
    });

    this.rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
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
    return this.interstitialAd?.loaded ?? false;
  }

  isRewardedReady(): boolean {
    return this.rewardedAd?.loaded ?? false;
  }
}

export default new AdMobService();
