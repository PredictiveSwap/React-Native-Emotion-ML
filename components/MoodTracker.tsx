import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FaceRecognition from './FaceRecognition';
import VoiceAnalysis from './VoiceAnalysis';
import TextSentimentAnalysis from './TextSentimentAnalysis';

type AnalysisMethod = 'face' | 'voice' | 'text';
type MoodData = {
  mood: string;
  confidence: number;
  source: AnalysisMethod;
  timestamp: Date;
  details?: {
    text?: string;
    voiceTone?: string;
  };
};

const MoodTracker = () => {
  const [activeTab, setActiveTab] = useState<AnalysisMethod>('face');
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [currentMood, setCurrentMood] = useState<MoodData | null>(null);

  const handleFaceMoodDetected = (mood: string, confidence: number) => {
    const moodData: MoodData = {
      mood,
      confidence,
      source: 'face',
      timestamp: new Date(),
    };
    
    setCurrentMood(moodData);
    saveMoodToHistory(moodData);
  };

  const handleVoiceAnalyzed = (tone: string, text: string) => {
    const moodData: MoodData = {
      mood: tone,
      confidence: 0.7, // In a real app, this would come from the voice analysis
      source: 'voice',
      timestamp: new Date(),
      details: {
        text,
        voiceTone: tone,
      },
    };
    
    setCurrentMood(moodData);
    saveMoodToHistory(moodData);
  };

  const handleSentimentAnalyzed = (sentiment: string, score: number, text: string) => {
    // Convert sentiment score to confidence (0-1 scale)
    const normalizedScore = Math.abs(score);
    const confidence = normalizedScore > 1 ? 1 : normalizedScore;
    
    const moodData: MoodData = {
      mood: sentiment,
      confidence,
      source: 'text',
      timestamp: new Date(),
      details: {
        text,
      },
    };
    
    setCurrentMood(moodData);
    saveMoodToHistory(moodData);
  };

  const saveMoodToHistory = (moodData: MoodData) => {
    setMoodHistory((prevHistory) => [moodData, ...prevHistory]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'face':
        return <FaceRecognition onMoodDetected={handleFaceMoodDetected} />;
      case 'voice':
        return <VoiceAnalysis onVoiceAnalyzed={handleVoiceAnalyzed} />;
      case 'text':
        return <TextSentimentAnalysis onSentimentAnalyzed={handleSentimentAnalyzed} />;
      default:
        return null;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy':
      case 'positive':
      case 'excited':
        return '#4CAF50'; // Green
      case 'sad':
      case 'negative':
      case 'anxious':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Gray for neutral or unknown
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {/* Mood display */}
      {currentMood && (
        <View style={[styles.currentMood, { borderColor: getMoodColor(currentMood.mood) }]}>
          <Text style={styles.currentMoodTitle}>Current Mood</Text>
          <Text style={[styles.currentMoodText, { color: getMoodColor(currentMood.mood) }]}>
            {currentMood.mood.toUpperCase()}
          </Text>
          <Text style={styles.sourceText}>
            Detected via {currentMood.source === 'face' ? 'Facial Expression' : 
                          currentMood.source === 'voice' ? 'Voice Tone' : 
                          'Text Sentiment'}
          </Text>
        </View>
      )}

      {/* Tab navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'face' && styles.activeTab]} 
          onPress={() => setActiveTab('face')}
        >
          <Text style={[styles.tabText, activeTab === 'face' && styles.activeTabText]}>Face</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'voice' && styles.activeTab]} 
          onPress={() => setActiveTab('voice')}
        >
          <Text style={[styles.tabText, activeTab === 'voice' && styles.activeTabText]}>Voice</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'text' && styles.activeTab]} 
          onPress={() => setActiveTab('text')}
        >
          <Text style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}>Text</Text>
        </TouchableOpacity>
      </View>

      {/* Tab content */}
      <View style={styles.tabContent}>
        {renderTabContent()}
      </View>

      {/* Mood history */}
      {moodHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Mood History</Text>
          <ScrollView style={styles.historyList}>
            {moodHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(item.mood) }]} />
                <View style={styles.historyItemContent}>
                  <Text style={styles.historyMood}>{item.mood}</Text>
                  <Text style={styles.historyDetails}>
                    {item.source === 'face' ? 'Facial Expression' : 
                     item.source === 'voice' ? 'Voice Tone' : 
                     'Text Sentiment'} • {formatTimestamp(item.timestamp)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  currentMood: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 2,
  },
  currentMoodTitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
  },
  currentMoodText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sourceText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    color: '#757575',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  historyContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#424242',
  },
  historyList: {
    maxHeight: 200,
  },
  historyItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  moodIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  historyItemContent: {
    flex: 1,
  },
  historyMood: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  historyDetails: {
    fontSize: 12,
    color: '#9E9E9E',
  },
});

export default MoodTracker; 