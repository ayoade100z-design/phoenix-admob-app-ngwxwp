
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import {
  ScrollView,
  Pressable,
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import AdMobService from '@/services/AdMobService';
import BannerAdComponent from '@/components/BannerAdComponent';
import NativeAdComponent from '@/components/NativeAdComponent';

export default function HomeScreen() {
  const theme = useTheme();
  const [coins, setCoins] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    // Initialize AdMob
    AdMobService.initialize();
  }, []);

  useEffect(() => {
    // Show interstitial ad every 5 interactions
    if (interactionCount > 0 && interactionCount % 5 === 0) {
      AdMobService.showInterstitialAd();
    }
  }, [interactionCount]);

  const handleWatchRewardedAd = () => {
    AdMobService.showRewardedAd((reward) => {
      console.log('Reward earned:', reward);
      setCoins((prev) => prev + 10);
      Alert.alert('Reward Earned!', 'You earned 10 coins for watching the video!');
    });
  };

  const handleCardPress = (title: string) => {
    setInteractionCount((prev) => prev + 1);
    Alert.alert('Card Pressed', `You pressed: ${title}`);
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        setInteractionCount((prev) => prev + 1);
        Alert.alert('Coins', `You have ${coins} coins`);
      }}
      style={styles.headerButtonContainer}
    >
      <View style={styles.coinBadge}>
        <IconSymbol name="star.fill" color={colors.accent} size={16} />
        <Text style={styles.coinText}>{coins}</Text>
      </View>
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        setInteractionCount((prev) => prev + 1);
        Alert.alert('Settings', 'Settings screen coming soon!');
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="gear" color={colors.primary} size={24} />
    </Pressable>
  );

  const features = [
    {
      title: 'Social Feed',
      description: 'Share moments with friends',
      icon: 'photo.fill',
      color: colors.primary,
    },
    {
      title: 'Messages',
      description: 'Chat with your connections',
      icon: 'message.fill',
      color: colors.accent,
    },
    {
      title: 'Discover',
      description: 'Explore trending content',
      icon: 'sparkles',
      color: colors.secondary,
    },
    {
      title: 'Watch Ads',
      description: 'Earn coins by watching videos',
      icon: 'play.circle.fill',
      color: '#34C759',
      action: handleWatchRewardedAd,
    },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Phoenix',
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Banner Ad at Top */}
        <BannerAdComponent />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <IconSymbol name="flame.fill" size={80} color={colors.primary} />
            <Text style={styles.heroTitle}>Welcome to Phoenix</Text>
            <Text style={styles.heroSubtitle}>
              Connect, share, and discover amazing content
            </Text>
          </View>

          {/* Native Ad */}
          <NativeAdComponent />

          {/* Feature Cards */}
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Pressable
                key={index}
                style={styles.featureCard}
                onPress={() =>
                  feature.action ? feature.action() : handleCardPress(feature.title)
                }
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <IconSymbol name={feature.icon as any} color="#ffffff" size={32} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </Pressable>
            ))}
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>856</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>342</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>

          {/* Another Native Ad */}
          <NativeAdComponent />

          {/* Activity Feed Preview */}
          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {[1, 2, 3].map((item) => (
              <Pressable
                key={item}
                style={styles.activityItem}
                onPress={() => handleCardPress(`Activity ${item}`)}
              >
                <View style={styles.activityIcon}>
                  <IconSymbol name="person.circle.fill" color={colors.primary} size={40} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>User {item} liked your post</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  headerButtonContainer: {
    padding: 6,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  coinText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  activitySection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    gap: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  activityIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
