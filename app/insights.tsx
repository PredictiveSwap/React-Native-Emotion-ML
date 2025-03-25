import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// In a real app, this would use real data and a charting library like react-native-chart-kit
// For this demo, we'll create visual representations without an external library

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MOODS = ['Happy', 'Neutral', 'Sad', 'Anxious', 'Excited'];

// Generate mock mood data for the week
const generateWeekData = () => {
  return WEEK_DAYS.map(day => {
    return {
      day,
      // Random dominant mood for the day
      mood: MOODS[Math.floor(Math.random() * MOODS.length)],
      // Random score between 1-10
      score: Math.floor(Math.random() * 10) + 1
    };
  });
};

// Generate mock mood distribution data
const generateMoodDistribution = () => {
  const distribution: Record<string, number> = {};
  MOODS.forEach(mood => {
    distribution[mood] = Math.floor(Math.random() * 30) + 5;
  });
  return distribution;
};

const mockWeekData = generateWeekData();
const mockDistribution = generateMoodDistribution();

// Calculate total for percentage
const totalMoods = Object.values(mockDistribution).reduce((sum, count) => sum + count, 0);

export default function InsightsScreen() {
  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy':
      case 'excited':
        return '#4CAF50'; // Green
      case 'sad':
      case 'anxious':
        return '#F44336'; // Red
      case 'neutral':
        return '#9E9E9E'; // Gray
      default:
        return '#9E9E9E';
    }
  };

  const getInsightMessage = () => {
    // In a real app, this would analyze real patterns in the user's data
    const messages = [
      'You tend to feel happier in the evenings',
      'Your mood seems to improve after social interactions',
      'Text entries show more negative sentiment than facial expressions',
      'Your voice tone is generally more positive on weekends',
      'Consider practicing mindfulness when feeling anxious'
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const renderMoodBar = (mood: string, count: number) => {
    const percentage = Math.round((count / totalMoods) * 100);
    // Use flex instead of percentage string for width
    const flexValue = percentage / 100;
    
    return (
      <View key={mood} style={styles.moodBarContainer}>
        <Text style={styles.moodLabel}>{mood}</Text>
        <View style={styles.barBackground}>
          <View 
            style={[
              styles.bar, 
              { flex: flexValue, backgroundColor: getMoodColor(mood) }
            ]} 
          />
        </View>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
    );
  };

  const renderWeeklyMood = () => {
    const maxScore = 10; // Maximum score value
    
    return (
      <View style={styles.weeklyContainer}>
        <Text style={styles.weeklyTitle}>Weekly Mood Trend</Text>
        
        <View style={styles.chartContainer}>
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            <Text style={styles.axisLabel}>10</Text>
            <Text style={styles.axisLabel}>5</Text>
            <Text style={styles.axisLabel}>0</Text>
          </View>
          
          {/* Bars for each day */}
          <View style={styles.barsContainer}>
            {mockWeekData.map((day) => {
              const barHeight = (day.score / maxScore) * 150; // Scale to 150px max
              
              return (
                <View key={day.day} style={styles.dayColumn}>
                  <View style={styles.barWrapper}>
                    <View 
                      style={[
                        styles.moodBar,
                        { 
                          height: barHeight,
                          backgroundColor: getMoodColor(day.mood)
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.dayLabel}>{day.day}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mood Insights</Text>
      
      {/* Insight card */}
      <View style={styles.insightCard}>
        <View style={styles.cardHeader}>
          <FontAwesome5 name="lightbulb" size={20} color="#FFD700" />
          <Text style={styles.cardTitle}>Insight</Text>
        </View>
        <Text style={styles.insightText}>{getInsightMessage()}</Text>
      </View>
      
      {/* Weekly mood chart */}
      {renderWeeklyMood()}
      
      {/* Mood distribution */}
      <View style={styles.distributionContainer}>
        <Text style={styles.sectionTitle}>Mood Distribution</Text>
        
        {Object.entries(mockDistribution).map(([mood, count]) => 
          renderMoodBar(mood, count)
        )}
      </View>
      
      {/* Most frequent moods */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Mood Stats</Text>
        
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Object.entries(mockDistribution)
                .sort((a, b) => b[1] - a[1])[0][0]}
            </Text>
            <Text style={styles.statLabel}>Most Frequent</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {mockWeekData.reduce((sum, day) => sum + day.score, 0) / 7 > 5 ? 'Positive' : 'Neutral'}
            </Text>
            <Text style={styles.statLabel}>Overall Trend</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {WEEK_DAYS[Math.floor(Math.random() * WEEK_DAYS.length)]}
            </Text>
            <Text style={styles.statLabel}>Best Day</Text>
          </View>
        </View>
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
  insightCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#424242',
  },
  insightText: {
    fontSize: 16,
    color: '#616161',
    lineHeight: 24,
  },
  weeklyContainer: {
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
  weeklyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#424242',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'flex-end',
  },
  yAxis: {
    width: 25,
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
  },
  axisLabel: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
  },
  dayColumn: {
    alignItems: 'center',
    width: 30,
  },
  barWrapper: {
    height: 150,
    justifyContent: 'flex-end',
  },
  moodBar: {
    width: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  dayLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#757575',
  },
  distributionContainer: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#424242',
  },
  moodBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodLabel: {
    width: 70,
    fontSize: 14,
    color: '#616161',
  },
  barBackground: {
    flex: 1,
    height: 14,
    backgroundColor: '#EEEEEE',
    borderRadius: 7,
    overflow: 'hidden',
    flexDirection: 'row', // Add this to make the flex child work correctly
  },
  bar: {
    height: '100%',
  },
  percentageText: {
    width: 40,
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'right',
    marginLeft: 8,
  },
  statsContainer: {
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
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    padding: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#9E9E9E',
  }
}); 