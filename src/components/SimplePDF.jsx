import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
});

const SimplePDF = ({ quote }) => {
  console.log('SimplePDF received quote:', quote);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Project Quotation</Text>
        <View style={styles.section}>
          <Text>Project: {quote?.projectTitle || 'N/A'}</Text>
        </View>
        <View style={styles.section}>
          <Text>Total Cost: {quote?.totalCost || 'N/A'}</Text>
        </View>
        <View style={styles.section}>
          <Text>Duration: {quote?.estimatedDuration || 'N/A'}</Text>
        </View>
        <View style={styles.section}>
          <Text>Services: {quote?.services?.length || 0} items</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SimplePDF;