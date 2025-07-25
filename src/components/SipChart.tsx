import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { formatCurrency } from '../hooks/useSipCalculator';

interface SipChartProps {
  data: Array<{
    year: number;
    invested: number;
    interest: number;
    total: number;
  }>;
}

const { width } = Dimensions.get('window');
const chartWidth = width - 64;
const chartHeight = 200;

export const SipChart: React.FC<SipChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.total));
  const barWidth = Math.max(20, (chartWidth - 32) / data.length - 8);

  return (
    <View style={styles.container}>
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#3b82f6' }]} />
          <Text style={styles.legendText}>Amount Invested</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#10b981' }]} />
          <Text style={styles.legendText}>Returns Generated</Text>
        </View>
      </View>

      {/* Chart */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {data.map((item, index) => {
              const investedHeight = (item.invested / maxValue) * chartHeight;
              const interestHeight = (item.interest / maxValue) * chartHeight;
              
              return (
                <View key={index} style={styles.barContainer}>
                  <View style={[styles.bar, { width: barWidth }]}>
                    <View 
                      style={[
                        styles.barSegment, 
                        { 
                          height: investedHeight,
                          backgroundColor: '#3b82f6',
                        }
                      ]} 
                    />
                    <View 
                      style={[
                        styles.barSegment, 
                        { 
                          height: interestHeight,
                          backgroundColor: '#10b981',
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.barLabel}>Y{item.year}</Text>
                </View>
              );
            })}
          </View>
          
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            <Text style={styles.yAxisLabel}>{formatCurrency(maxValue)}</Text>
            <Text style={styles.yAxisLabel}>{formatCurrency(maxValue * 0.75)}</Text>
            <Text style={styles.yAxisLabel}>{formatCurrency(maxValue * 0.5)}</Text>
            <Text style={styles.yAxisLabel}>{formatCurrency(maxValue * 0.25)}</Text>
            <Text style={styles.yAxisLabel}>₹0</Text>
          </View>
        </View>
      </ScrollView>

      {/* Tooltip for latest data */}
      {data.length > 0 && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipTitle}>Year {data[data.length - 1].year}</Text>
          <View style={styles.tooltipRow}>
            <View style={[styles.tooltipDot, { backgroundColor: '#3b82f6' }]} />
            <Text style={styles.tooltipText}>
              Invested: {formatCurrency(data[data.length - 1].invested)}
            </Text>
          </View>
          <View style={styles.tooltipRow}>
            <View style={[styles.tooltipDot, { backgroundColor: '#10b981' }]} />
            <Text style={styles.tooltipText}>
              Returns: {formatCurrency(data[data.length - 1].interest)}
            </Text>
          </View>
          <Text style={styles.tooltipTotal}>
            Total: {formatCurrency(data[data.length - 1].total)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#64748b',
  },
  chartScroll: {
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: chartHeight,
    flex: 1,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  bar: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: chartHeight,
  },
  barSegment: {
    width: '100%',
    borderRadius: 2,
  },
  barLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  yAxis: {
    justifyContent: 'space-between',
    height: chartHeight,
    paddingLeft: 8,
    width: 60,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'right',
  },
  tooltip: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tooltipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  tooltipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tooltipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tooltipText: {
    fontSize: 12,
    color: '#64748b',
  },
  tooltipTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 4,
  },
});