import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Target, PiggyBank, TrendingUp, CircleAlert as AlertCircle } from 'lucide-react-native';
import { formatCurrency } from '../hooks/useSipCalculator';

interface ResultsCardProps {
  totalInvested: number;
  totalInterest: number;
  maturityValue: number;
  monthlyInvestment: number;
  isValid: boolean;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  totalInvested,
  totalInterest,
  maturityValue,
  monthlyInvestment,
  isValid,
}) => {
  if (!isValid) {
    return (
      <View style={styles.invalidContainer}>
        <AlertCircle size={48} color="#f59e0b" />
        <Text style={styles.invalidTitle}>Invalid Inputs</Text>
        <Text style={styles.invalidSubtitle}>
          Please correct the errors above to see your SIP calculation
        </Text>
      </View>
    );
  }

  const investmentPercentage = maturityValue > 0 ? (totalInvested / maturityValue) * 100 : 0;
  const returnsPercentage = 100 - investmentPercentage;

  return (
    <View style={styles.container}>
      {/* Main Results Card */}
      <View style={styles.mainCard}>
        <View style={styles.cardHeader}>
          <Target size={20} color="#10b981" />
          <Text style={styles.cardTitle}>Maturity Value</Text>
        </View>
        <Text style={styles.maturityValue}>{formatCurrency(maturityValue)}</Text>
        <Text style={styles.maturitySubtitle}>Final investment value</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Investment vs Returns</Text>
            <Text style={styles.progressValue}>{returnsPercentage.toFixed(1)}% Returns</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${returnsPercentage}%` }
              ]} 
            />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressSmallLabel}>Your Investment</Text>
            <Text style={styles.progressSmallLabel}>Market Returns</Text>
          </View>
        </View>
      </View>

      {/* Breakdown Cards */}
      <View style={styles.breakdownContainer}>
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownIcon}>
            <PiggyBank size={20} color="#3b82f6" />
          </View>
          <View style={styles.breakdownContent}>
            <Text style={styles.breakdownLabel}>Total Invested</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(totalInvested)}</Text>
          </View>
        </View>

        <View style={styles.breakdownCard}>
          <View style={styles.breakdownIcon}>
            <TrendingUp size={20} color="#10b981" />
          </View>
          <View style={styles.breakdownContent}>
            <Text style={styles.breakdownLabel}>Interest Earned</Text>
            <View style={styles.interestContainer}>
              <Text style={styles.interestValue}>{formatCurrency(totalInterest)}</Text>
              {totalInterest > totalInvested && (
                <View style={styles.gainBadge}>
                  <Text style={styles.gainBadgeText}>
                    {((totalInterest / totalInvested) * 100).toFixed(0)}% Gain
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Investment Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Investment Summary</Text>
        <Text style={styles.summaryText}>
          Your monthly SIP of <Text style={styles.summaryHighlight}>{formatCurrency(monthlyInvestment)}</Text> will grow to{' '}
          <Text style={styles.summaryHighlight}>{formatCurrency(maturityValue)}</Text>{' '}
          generating <Text style={styles.summaryHighlight}>{formatCurrency(totalInterest)}</Text> in returns
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  invalidContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  invalidTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 12,
    marginBottom: 8,
  },
  invalidSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  maturityValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 4,
  },
  maturitySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressSmallLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  breakdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  breakdownCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  breakdownIcon: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  breakdownContent: {
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  interestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginRight: 8,
  },
  gainBadge: {
    backgroundColor: '#dcfce7',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  gainBadgeText: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
  summaryHighlight: {
    fontWeight: '600',
    color: '#3b82f6',
  },
});