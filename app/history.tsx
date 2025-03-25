import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// In a real app, this would fetch real data from a database or storage
const generateMockData = () => {
  const moods = ['happy', 'sad', 'neutral', 'anxious', 'excited'];
  const sources = ['face', 'voice', 'text'];
  const data = [];
  
  // Generate data for the past 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate 1-3 entries per day
    const entriesCount = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < entriesCount; j++) {
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      
      // Random hour of the day
      const hours = Math.floor(Math.random() * 12) + 8; // Between 8 AM and 8 PM
      date.setHours(hours);
      
      data.push({
        id: `${i}-${j}`,
        mood: randomMood,
        source: randomSource,
        timestamp: new Date(date),
      });
    }
  }
  
  return data;
};

const mockHistoryData = generateMockData();

export default function HistoryScreen() {
  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy':
      case 'excited':
        return '#4CAF50'; // Green
      case 'sad':
      case 'anxious':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Gray for neutral
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'face':
        return 'smile';
      case 'voice':
        return 'microphone';
      case 'text':
        return 'comment';
      default:
        return 'question';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Group history by date
  const groupedHistory: Record<string, typeof mockHistoryData> = {};
  mockHistoryData.forEach(item => {
    const dateKey = formatDate(item.timestamp);
    if (!groupedHistory[dateKey]) {
      groupedHistory[dateKey] = [];
    }
    groupedHistory[dateKey].push(item);
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Mood History</Text>
      
      {Object.entries(groupedHistory).map(([date, entries]) => (
        <View key={date} style={styles.dateGroup}>
          <Text style={styles.dateHeader}>{date}</Text>
          
          {entries.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(entry.mood) }]} />
              <View style={styles.entryContent}>
                <Text style={styles.moodText}>{entry.mood}</Text>
                <View style={styles.entryDetails}>
                  <FontAwesome5 name={getSourceIcon(entry.source)} size={14} color="#757575" />
                  <Text style={styles.sourceText}>
                    {entry.source === 'face' ? 'Facial Expression' : 
                     entry.source === 'voice' ? 'Voice Tone' : 
                     'Text Sentiment'}
                  </Text>
                  <Text style={styles.timeText}>{formatTime(entry.timestamp)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
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
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#555',
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 4,
  },
  entryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  moodIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 16,
  },
  entryContent: {
    flex: 1,
  },
  moodText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  entryDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 5,
    marginRight: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
}); 