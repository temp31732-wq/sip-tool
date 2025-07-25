import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calculator, TrendingUp } from 'lucide-react-native';
import { useSipCalculator } from '../hooks/useSipCalculator';
import { InputSection } from './InputSection';
import { ResultsCard } from './ResultsCard';
import { SipChart } from './SipChart';

const { width } = Dimensions.get('window');

export const SipCalculator: React.FC = () => {
  const {
    inputs,
    results,
    errors,
    isValid,
    updateInput,
    resetInputs,
    getFieldError,
  } = useSipCalculator();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Calculator size={20} color="#3b82f6" />
          <Text style={styles.headerBadgeText}>SIP Calculator</Text>
        </View>
        <Text style={styles.title}>Plan Your Financial Future</Text>
        <Text style={styles.subtitle}>
          Calculate your SIP returns with our professional investment calculator. 
          Start your systematic investment journey today.
        </Text>
      </View>

      {/* Input Section */}
      <InputSection
        inputs={inputs}
        updateInput={updateInput}
        resetInputs={resetInputs}
        getFieldError={getFieldError}
      />

      {/* Results Section */}
      <ResultsCard
        totalInvested={results.totalInvested}
        totalInterest={results.totalInterest}
        maturityValue={results.maturityValue}
        monthlyInvestment={inputs.monthlyInvestment}
        isValid={isValid}
      />

      {/* Chart Section */}
      {isValid && results.yearlyData.length > 0 && (
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <TrendingUp size={20} color="#3b82f6" />
            <Text style={styles.chartTitle}>Investment Growth Over Time</Text>
          </View>
          <SipChart data={results.yearlyData} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  headerBadgeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width - 64,
  },
  chartSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
});