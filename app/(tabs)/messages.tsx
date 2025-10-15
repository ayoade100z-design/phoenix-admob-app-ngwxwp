
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

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'Hey! How are you doing?',
      time: '2m ago',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'Mike Chen',
      lastMessage: 'Thanks for the help!',
      time: '1h ago',
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      lastMessage: 'See you tomorrow 👋',
      time: '3h ago',
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: 'Alex Brown',
      lastMessage: 'That sounds great!',
      time: '5h ago',
      unread: 1,
      online: false,
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      lastMessage: 'Can you send me the file?',
      time: '1d ago',
      unread: 0,
      online: false,
    },
  ];

  const handleConversationPress = (name: string) => {
    Alert.alert('Chat', `Opening conversation with ${name}`);
  };

  const handleNewMessage = () => {
    Alert.alert('New Message', 'Start a new conversation');
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      {/* Banner Ad at Top */}
      <BannerAdComponent />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
          <Pressable style={styles.newMessageButton} onPress={handleNewMessage}>
            <IconSymbol name="square.and.pencil" color={colors.primary} size={24} />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" color={colors.textSecondary} size={20} />
            </Pressable>
          )}
        </View>

        {/* Conversations List */}
        <ScrollView
          style={styles.conversationsList}
          contentContainerStyle={[
            styles.conversationsContent,
            Platform.OS !== 'ios' && styles.conversationsContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {filteredConversations.map((conversation) => (
            <Pressable
              key={conversation.id}
              style={styles.conversationItem}
              onPress={() => handleConversationPress(conversation.name)}
            >
              <View style={styles.avatarContainer}>
                <IconSymbol name="person.circle.fill" color={colors.primary} size={56} />
                {conversation.online && <View style={styles.onlineIndicator} />}
              </View>

              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>{conversation.name}</Text>
                  <Text style={styles.conversationTime}>{conversation.time}</Text>
                </View>
                <View style={styles.conversationFooter}>
                  <Text
                    style={[
                      styles.lastMessage,
                      conversation.unread > 0 && styles.lastMessageUnread,
                    ]}
                    numberOfLines={1}
                  >
                    {conversation.lastMessage}
                  </Text>
                  {conversation.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{conversation.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          ))}

          {filteredConversations.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="message.fill" color={colors.textSecondary} size={64} />
              <Text style={styles.emptyStateTitle}>No messages found</Text>
              <Text style={styles.emptyStateText}>
                {searchQuery
                  ? 'Try searching with different keywords'
                  : 'Start a conversation to see your messages here'}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  newMessageButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  conversationsList: {
    flex: 1,
  },
  conversationsContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  conversationsContentWithTabBar: {
    paddingBottom: 100,
  },
  conversationItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: colors.card,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  conversationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
  lastMessageUnread: {
    fontWeight: '600',
    color: colors.text,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
