
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import BannerAdComponent from '@/components/BannerAdComponent';
import NativeAdComponent from '@/components/NativeAdComponent';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTopics = [
    { tag: '#Technology', posts: '12.5K', color: colors.primary },
    { tag: '#Design', posts: '8.3K', color: colors.accent },
    { tag: '#Photography', posts: '15.2K', color: '#FF3B30' },
    { tag: '#Travel', posts: '9.7K', color: '#34C759' },
    { tag: '#Food', posts: '11.1K', color: '#FF9500' },
    { tag: '#Fitness', posts: '6.8K', color: '#AF52DE' },
  ];

  const featuredCreators = [
    { name: 'Sarah Design', followers: '45K', verified: true },
    { name: 'Tech Mike', followers: '32K', verified: true },
    { name: 'Travel Jane', followers: '28K', verified: false },
    { name: 'Food Master', followers: '51K', verified: true },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Search', `Searching for: ${searchQuery}`);
    }
  };

  const handleTopicPress = (tag: string) => {
    Alert.alert('Topic', `Viewing posts for ${tag}`);
  };

  const handleCreatorPress = (name: string) => {
    Alert.alert('Creator', `Viewing profile: ${name}`);
  };

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover</Text>
          <Text style={styles.headerSubtitle}>Explore trending content and creators</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics, people, or posts..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" color={colors.textSecondary} size={20} />
            </Pressable>
          )}
        </View>

        {/* Trending Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Topics</Text>
          <View style={styles.topicsGrid}>
            {trendingTopics.map((topic, index) => (
              <Pressable
                key={index}
                style={[styles.topicCard, { borderLeftColor: topic.color }]}
                onPress={() => handleTopicPress(topic.tag)}
              >
                <Text style={styles.topicTag}>{topic.tag}</Text>
                <Text style={styles.topicPosts}>{topic.posts} posts</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Native Ad */}
        <NativeAdComponent />

        {/* Featured Creators */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Creators</Text>
          <View style={styles.creatorsContainer}>
            {featuredCreators.map((creator, index) => (
              <Pressable
                key={index}
                style={styles.creatorCard}
                onPress={() => handleCreatorPress(creator.name)}
              >
                <View style={styles.creatorAvatar}>
                  <IconSymbol name="person.circle.fill" color={colors.primary} size={60} />
                  {creator.verified && (
                    <View style={styles.verifiedBadge}>
                      <IconSymbol name="checkmark.seal.fill" color={colors.primary} size={20} />
                    </View>
                  )}
                </View>
                <Text style={styles.creatorName}>{creator.name}</Text>
                <Text style={styles.creatorFollowers}>{creator.followers} followers</Text>
                <Pressable style={styles.followButton}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </Pressable>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {[
              { name: 'Art & Design', icon: 'paintbrush.fill', color: '#FF3B30' },
              { name: 'Technology', icon: 'laptopcomputer', color: colors.primary },
              { name: 'Lifestyle', icon: 'heart.fill', color: '#FF2D55' },
              { name: 'Business', icon: 'briefcase.fill', color: colors.secondary },
              { name: 'Entertainment', icon: 'play.circle.fill', color: '#AF52DE' },
              { name: 'Sports', icon: 'sportscourt.fill', color: '#34C759' },
            ].map((category, index) => (
              <Pressable
                key={index}
                style={styles.categoryCard}
                onPress={() => Alert.alert('Category', `Viewing ${category.name}`)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <IconSymbol name={category.icon as any} color="#ffffff" size={28} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </Pressable>
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
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  topicsGrid: {
    gap: 12,
  },
  topicCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  topicTag: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  topicPosts: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  creatorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  creatorCard: {
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
  creatorAvatar: {
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.card,
    borderRadius: 10,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  creatorFollowers: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  followButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
