import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [faceAnalysis, setFaceAnalysis] = useState(true);
  const [voiceAnalysis, setVoiceAnalysis] = useState(true);
  const [textAnalysis, setTextAnalysis] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  
  const toggleSwitch = (setting: string, value: boolean) => {
    switch (setting) {
      case 'notifications':
        setNotifications(value);
        break;
      case 'faceAnalysis':
        setFaceAnalysis(value);
        break;
      case 'voiceAnalysis':
        setVoiceAnalysis(value);
        break;
      case 'textAnalysis':
        setTextAnalysis(value);
        break;
      case 'darkMode':
        setDarkMode(value);
        break;
      case 'dataSharing':
        setDataSharing(value);
        break;
    }
  };
  
  const showResetConfirmation = () => {
    Alert.alert(
      'Reset App Data',
      'Are you sure you want to reset all app data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: () => resetAppData(),
          style: 'destructive',
        },
      ]
    );
  };
  
  const resetAppData = () => {
    // In a real app, this would clear the user's data
    Alert.alert('Success', 'All app data has been reset');
  };
  
  const handleExportData = () => {
    // In a real app, this would export user's data
    Alert.alert('Success', 'Your data has been exported');
  };
  
  const renderSettingItem = (
    icon: string, 
    title: string, 
    description: string, 
    value: boolean, 
    settingKey: string
  ) => {
    return (
      <View style={styles.settingItem}>
        <View style={styles.settingIconContainer}>
          <FontAwesome5 name={icon} size={20} color="#2196F3" />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={(newValue) => toggleSwitch(settingKey, newValue)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#2196F3' : '#f4f3f4'}
        />
      </View>
    );
  };
  
  const renderActionButton = (icon: string, title: string, onPress: () => void, destructive = false) => {
    return (
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <FontAwesome5 
          name={icon} 
          size={20} 
          color={destructive ? '#F44336' : '#2196F3'} 
        />
        <Text style={[
          styles.actionButtonText,
          destructive && styles.destructiveText
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>General</Text>
        
        {renderSettingItem(
          'bell', 
          'Notifications', 
          'Receive reminders to track your mood', 
          notifications, 
          'notifications'
        )}
        
        {renderSettingItem(
          'moon', 
          'Dark Mode', 
          'Use dark theme throughout the app', 
          darkMode, 
          'darkMode'
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Analysis Methods</Text>
        
        {renderSettingItem(
          'smile', 
          'Facial Expression Analysis', 
          'Detect mood through facial expressions', 
          faceAnalysis, 
          'faceAnalysis'
        )}
        
        {renderSettingItem(
          'microphone', 
          'Voice Tone Analysis', 
          'Detect mood through voice patterns', 
          voiceAnalysis, 
          'voiceAnalysis'
        )}
        
        {renderSettingItem(
          'comment', 
          'Text Sentiment Analysis', 
          'Analyze mood from your text entries', 
          textAnalysis, 
          'textAnalysis'
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Privacy & Data</Text>
        
        {renderSettingItem(
          'share-alt', 
          'Anonymous Data Sharing', 
          'Help improve the app by sharing anonymous usage data', 
          dataSharing, 
          'dataSharing'
        )}
        
        <View style={styles.actionButtonsContainer}>
          {renderActionButton('file-export', 'Export My Data', handleExportData)}
          {renderActionButton('trash', 'Reset App Data', showResetConfirmation, true)}
        </View>
      </View>
      
      <View style={styles.about}>
        <Text style={styles.appVersion}>Mental Health & Emotion Tracker v1.0.0</Text>
        <Text style={styles.copyright}>© 2025 All Rights Reserved</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#424242',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
  },
  settingDescription: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  actionButtonsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#424242',
    marginLeft: 10,
  },
  destructiveText: {
    color: '#F44336',
  },
  about: {
    alignItems: 'center',
    marginVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#9E9E9E',
  },
}); 