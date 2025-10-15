
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import BannerAdComponent from '@/components/BannerAdComponent';
import AdMobService from '@/services/AdMobService';

export default function ProfileScreen() {
  const [followers, setFollowers] = useState(1234);
  const [following, setFollowing] = useState(856);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing coming soon!');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings screen coming soon!');
  };

  const handleWatchAd = () => {
    AdMobService.showRewardedAd((reward) => {
      console.log('Reward earned:', reward);
      Alert.alert('Boost Applied!', 'Your profile has been boosted for 24 hours!');
    });
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', icon: 'person.fill', action: handleEditProfile },
        { label: 'Privacy', icon: 'lock.fill', action: handleSettings },
        { label: 'Notifications', icon: 'bell.fill', action: handleSettings },
      ],
    },
    {
      title: 'Content',
      items: [
        { label: 'Saved Posts', icon: 'bookmark.fill', action: handleSettings },
        { label: 'Liked Posts', icon: 'heart.fill', action: handleSettings },
        { label: 'Collections', icon: 'folder.fill', action: handleSettings },
      ],
    },
    {
      title: 'Premium',
      items: [
        {
          label: 'Boost Profile (Watch Ad)',
          icon: 'star.fill',
          action: handleWatchAd,
          highlight: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      {/* Banner Ad at Top */}
      <BannerAdComponent />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={100} color={colors.primary} />
            <Pressable style={styles.editAvatarButton}>
              <IconSymbol name="camera.fill" size={20} color="#ffffff" />
            </Pressable>
          </View>
          <Text style={styles.name}>John Phoenix</Text>
          <Text style={styles.username}>@johnphoenix</Text>
          <Text style={styles.bio}>
            Digital creator 🎨 | Tech enthusiast 💻 | Coffee lover ☕
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>342</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Pressable style={styles.primaryButton} onPress={handleEditProfile}>
              <Text style={styles.primaryButtonText}>Edit Profile</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={handleSettings}>
              <IconSymbol name="gear" color={colors.text} size={20} />
            </Pressable>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <Pressable
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    item.highlight && styles.menuItemHighlight,
                  ]}
                  onPress={item.action}
                >
                  <View style={styles.menuItemLeft}>
                    <View
                      style={[
                        styles.menuIcon,
                        item.highlight && styles.menuIconHighlight,
                      ]}
                    >
                      <IconSymbol
                        name={item.icon as any}
                        color={item.highlight ? colors.accent : colors.primary}
                        size={20}
                      />
                    </View>
                    <Text
                      style={[
                        styles.menuLabel,
                        item.highlight && styles.menuLabelHighlight,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                  <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {[
              { icon: 'trophy.fill', label: 'Top Creator', color: colors.accent },
              { icon: 'star.fill', label: '100 Posts', color: colors.primary },
              { icon: 'heart.fill', label: '1K Likes', color: '#FF3B30' },
              { icon: 'flame.fill', label: '7 Day Streak', color: '#FF9500' },
            ].map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View
                  style={[styles.achievementIcon, { backgroundColor: achievement.color }]}
                >
                  <IconSymbol name={achievement.icon as any} color="#ffffff" size={24} />
                </View>
                <Text style={styles.achievementLabel}>{achievement.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginTop: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.card,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  username: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.highlight,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: colors.highlight,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  menuItemHighlight: {
    backgroundColor: colors.accent + '20',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconHighlight: {
    backgroundColor: colors.accent + '30',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  menuLabelHighlight: {
    color: colors.text,
    fontWeight: '700',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
