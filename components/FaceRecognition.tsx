import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

// Simulated moods for our facial recognition
const moods = [
  { id: 'happy', label: 'Happy 😃', color: '#4CAF50', confidence: 0.9 },
  { id: 'neutral', label: 'Neutral 😐', color: '#9E9E9E', confidence: 0.7 },
  { id: 'sad', label: 'Sad 😔', color: '#F44336', confidence: 0.8 },
];

const FaceRecognition = ({ onMoodDetected }: { onMoodDetected: (mood: string, confidence: number) => void }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Simulate the facial analysis process
  const startFacialAnalysis = () => {
    setAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate processing time
    setTimeout(() => {
      // Randomly choose a mood to simulate facial analysis
      const randomIndex = Math.floor(Math.random() * moods.length);
      const detectedMood = moods[randomIndex];
      
      setSelectedMood(detectedMood.id);
      setAnalyzing(false);
      setAnalysisComplete(true);
      
      // Notify parent component
      onMoodDetected(detectedMood.id, detectedMood.confidence);
    }, 2000); // Simulate 2 seconds of "analysis"
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraPreview}>
        {analyzing ? (
          <View style={styles.analyzingContainer}>
            <Text style={styles.analyzingText}>Analyzing facial expression...</Text>
          </View>
        ) : analysisComplete ? (
          <View style={[styles.resultContainer, { backgroundColor: moods.find(m => m.id === selectedMood)?.color }]}>
            <Text style={styles.resultText}>
              Detected Mood: {moods.find(m => m.id === selectedMood)?.label}
            </Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={startFacialAnalysis}
            >
              <Text style={styles.retryButtonText}>Analyze Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.startContainer}>
            <Text style={styles.instructionText}>
              Click the button below to analyze your facial expression
            </Text>
            <TouchableOpacity 
              style={styles.startButton} 
              onPress={startFacialAnalysis}
            >
              <Text style={styles.startButtonText}>Start Facial Analysis</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How It Works</Text>
        <Text style={styles.infoText}>
          Our facial analysis feature analyzes your expressions to determine your current mood.
          It looks for key facial features like smile, eye position, and brow movement to assess
          whether you're feeling happy, neutral, or sad.
        </Text>
        <Text style={styles.disclaimer}>
          Note: This is a simulation. In a real app, the camera would automatically capture and
          analyze your face.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cameraPreview: {
    height: 350,
    margin: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  startContainer: {
    padding: 20,
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  analyzingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  analyzingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
  },
});

export default FaceRecognition; 