import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

// Simple sentiment analysis function (no external libraries)
const analyzeSentiment = (text: string): { sentiment: string, score: number } => {
  // Simple word lists for sentiment analysis
  const positiveWords = [
    'happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic',
    'glad', 'excited', 'joy', 'love', 'positive', 'beautiful', 'nice', 'enjoy',
    'success', 'successful', 'win', 'winning', 'better', 'best', 'improved'
  ];
  
  const negativeWords = [
    'sad', 'bad', 'terrible', 'awful', 'horrible', 'disappointed', 'upset',
    'angry', 'mad', 'hate', 'dislike', 'negative', 'unfortunate', 'poor',
    'failure', 'fail', 'worst', 'worse', 'problem', 'difficult', 'hard', 'trouble'
  ];
  
  // Normalize text to lowercase
  const normalizedText = text.toLowerCase();
  const words = normalizedText.match(/\w+/g) || [];
  
  // Count positive and negative words
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveCount++;
    } else if (negativeWords.includes(word)) {
      negativeCount++;
    }
  });
  
  // Calculate score (-1 to 1 range)
  const totalWords = words.length;
  const score = totalWords > 0 
    ? (positiveCount - negativeCount) / Math.max(1, totalWords) 
    : 0;
  
  // Determine sentiment category
  let sentiment = 'neutral';
  if (score > 0.1) {
    sentiment = 'positive';
  } else if (score < -0.1) {
    sentiment = 'negative';
  }
  
  return { sentiment, score };
};

const TextSentimentAnalysis = ({ onSentimentAnalyzed }: { onSentimentAnalyzed: (sentiment: string, score: number, text: string) => void }) => {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [sentimentScore, setSentimentScore] = useState<number | null>(null);

  const handleAnalyzeSentiment = () => {
    if (!text.trim()) return;
    
    setAnalyzing(true);
    
    // Small delay to simulate processing
    setTimeout(() => {
      try {
        // Use our custom sentiment analysis function
        const result = analyzeSentiment(text);
        
        setSentiment(result.sentiment);
        setSentimentScore(result.score);
        
        // Pass back to parent component
        onSentimentAnalyzed(result.sentiment, result.score, text);
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
      } finally {
        setAnalyzing(false);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Describe your thoughts and feelings..."
        multiline
        numberOfLines={4}
      />
      
      <TouchableOpacity 
        style={styles.analyzeButton}
        onPress={handleAnalyzeSentiment}
        disabled={analyzing || !text.trim()}
      >
        <Text style={styles.buttonText}>Analyze Sentiment</Text>
      </TouchableOpacity>
      
      {analyzing && (
        <View style={styles.analyzing}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={styles.analyzingText}>Analyzing text...</Text>
        </View>
      )}
      
      {sentiment && !analyzing && (
        <View style={styles.results}>
          <Text style={styles.resultTitle}>Sentiment Analysis:</Text>
          <Text style={[
            styles.sentimentText, 
            sentiment === 'positive' ? styles.positive : 
            sentiment === 'negative' ? styles.negative : 
            styles.neutral
          ]}>
            {sentiment.toUpperCase()}
          </Text>
          
          <Text style={styles.scoreText}>
            Score: {sentimentScore !== null ? sentimentScore.toFixed(2) : 'N/A'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  analyzeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  analyzing: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  analyzingText: {
    marginLeft: 10,
    fontSize: 16,
  },
  results: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sentimentText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  neutral: {
    color: 'gray',
  },
  scoreText: {
    fontSize: 16,
  },
});

export default TextSentimentAnalysis; 