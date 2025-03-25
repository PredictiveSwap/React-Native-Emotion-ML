import React from 'react';
import { StyleSheet, View } from 'react-native';
import MoodTracker from '../../components/MoodTracker';

// Using a named function and explicitly exporting as default to fix the error
function IndexScreen() {
  return (
    <View style={styles.container}>
      <MoodTracker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Explicit default export
export default IndexScreen;
