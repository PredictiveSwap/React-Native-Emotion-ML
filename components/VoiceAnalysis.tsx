import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

// Simplified version without actual voice recording
const VoiceAnalysis = ({ onVoiceAnalyzed }: { onVoiceAnalyzed: (tone: string, text: string) => void }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<{ tone: string, text: string } | null>(null);

  // Mock voice recording and analysis
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsAnalyzing(true);
      
      // Simulate voice analysis after delay
      setTimeout(() => {
        analyzeVoiceInput();
      }, 1500);
    } else {
      // Start recording
      setIsRecording(true);
      setResult(null);
    }
  };
  
  const analyzeVoiceInput = () => {
    // Use the manually entered text or a default message
    const inputText = text.trim() || "This is a simulated voice transcript.";
    
    // Simulate voice tone analysis with predefined tones
    const tones = ['happy', 'neutral', 'sad', 'excited', 'anxious'];
    const randomTone = tones[Math.floor(Math.random() * tones.length)];
    
    // Set results
    const analysisResult = { tone: randomTone, text: inputText };
    setResult(analysisResult);
    setIsAnalyzing(false);
    
    // Pass result to parent component
    onVoiceAnalyzed(randomTone, inputText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Tone Analysis</Text>
      <Text style={styles.subtitle}>
        Instead of actual voice recording, you can type what you would say
      </Text>
      
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter what you would say..."
        multiline
        numberOfLines={3}
        editable={!isRecording && !isAnalyzing}
      />
      
      <TouchableOpacity
        style={[
          styles.recordButton,
          isRecording ? styles.recordingActive : null,
          isAnalyzing ? styles.disabled : null
        ]}
        onPress={toggleRecording}
        disabled={isAnalyzing}
      >
        <Text style={styles.recordButtonText}>
          {isRecording ? 'Stop Recording' : isAnalyzing ? 'Analyzing...' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
      
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <Text style={styles.recordingText}>Recording...</Text>
          <View style={styles.pulsatingDot} />
        </View>
      )}
      
      {isAnalyzing && (
        <View style={styles.analyzing}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.analyzingText}>Analyzing voice tone...</Text>
        </View>
      )}
      
      {result && !isAnalyzing && !isRecording && (
        <View style={styles.results}>
          <Text style={styles.resultTitle}>Analysis Results:</Text>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Transcript:</Text>
            <Text style={styles.resultText}>{result.text}</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Detected Tone:</Text>
            <Text style={[
              styles.toneText,
              result.tone === 'happy' || result.tone === 'excited' ? styles.positive :
              result.tone === 'sad' || result.tone === 'anxious' ? styles.negative :
              styles.neutral
            ]}>
              {result.tone.toUpperCase()}
            </Text>
          </View>
          
          <Text style={styles.note}>
            Note: This is a simulated analysis. Real voice analysis is not available.
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    marginBottom: 20,
    fontSize: 16,
  },
  recordButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  recordingActive: {
    backgroundColor: '#f44336',
  },
  disabled: {
    backgroundColor: '#9e9e9e',
  },
  recordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  recordingText: {
    fontSize: 16,
    color: '#f44336',
    marginRight: 10,
  },
  pulsatingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f44336',
  },
  analyzing: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  analyzingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  results: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultItem: {
    marginBottom: 15,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  toneText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  neutral: {
    color: '#9E9E9E',
  },
  note: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  }
});

export default VoiceAnalysis; 