import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { TrendingUp, RotateCcw } from 'lucide-react-native';
import { SipInputs, formatCurrency } from '../hooks/useSipCalculator';

interface InputSectionProps {
  inputs: SipInputs;
  updateInput: (field: keyof SipInputs, value: number) => void;
  resetInputs: () => void;
  getFieldError: (field: keyof SipInputs) => string | undefined;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputs,
  updateInput,
  resetInputs,
  getFieldError,
}) => {
  const handleReset = () => {
    Alert.alert(
      'Reset Values',
      'Are you sure you want to reset all values to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetInputs },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TrendingUp size={20} color="#3b82f6" />
        <Text style={styles.headerText}>Investment Details</Text>
      </View>

      {/* Monthly Investment */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Monthly Investment</Text>
        <TextInput
          style={[
            styles.input,
            getFieldError('monthlyInvestment') && styles.inputError
          ]}
          value={inputs.monthlyInvestment.toString()}
          onChangeText={(text) => updateInput('monthlyInvestment', Number(text) || 0)}
          keyboardType="numeric"
          placeholder="Enter amount"
        />
        <Slider
          style={styles.slider}
          minimumValue={500}
          maximumValue={100000}
          step={500}
          value={inputs.monthlyInvestment}
          onValueChange={(value) => updateInput('monthlyInvestment', value)}
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#e2e8f0"
          thumbStyle={styles.sliderThumb}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>₹500</Text>
          <Text style={styles.sliderValue}>{formatCurrency(inputs.monthlyInvestment)}</Text>
          <Text style={styles.sliderLabel}>₹1L</Text>
        </View>
        {getFieldError('monthlyInvestment') && (
          <Text style={styles.errorText}>{getFieldError('monthlyInvestment')}</Text>
        )}
      </View>

      {/* Expected Annual Return */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Expected Annual Return (%)</Text>
        <TextInput
          style={[
            styles.input,
            getFieldError('annualReturnRate') && styles.inputError
          ]}
          value={inputs.annualReturnRate.toString()}
          onChangeText={(text) => updateInput('annualReturnRate', Number(text) || 0)}
          keyboardType="numeric"
          placeholder="Enter rate"
        />
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={30}
          step={0.5}
          value={inputs.annualReturnRate}
          onValueChange={(value) => updateInput('annualReturnRate', value)}
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#e2e8f0"
          thumbStyle={styles.sliderThumb}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>1%</Text>
          <Text style={styles.sliderValue}>{inputs.annualReturnRate}%</Text>
          <Text style={styles.sliderLabel}>30%</Text>
        </View>
        {getFieldError('annualReturnRate') && (
          <Text style={styles.errorText}>{getFieldError('annualReturnRate')}</Text>
        )}
      </View>

      {/* Investment Duration */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Investment Duration (Years)</Text>
        <TextInput
          style={[
            styles.input,
            getFieldError('investmentDuration') && styles.inputError
          ]}
          value={inputs.investmentDuration.toString()}
          onChangeText={(text) => updateInput('investmentDuration', Number(text) || 0)}
          keyboardType="numeric"
          placeholder="Enter years"
        />
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={40}
          step={1}
          value={inputs.investmentDuration}
          onValueChange={(value) => updateInput('investmentDuration', value)}
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#e2e8f0"
          thumbStyle={styles.sliderThumb}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>1 Year</Text>
          <Text style={styles.sliderValue}>{inputs.investmentDuration} Years</Text>
          <Text style={styles.sliderLabel}>40 Years</Text>
        </View>
        {getFieldError('investmentDuration') && (
          <Text style={styles.errorText}>{getFieldError('investmentDuration')}</Text>
        )}
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <RotateCcw size={16} color="#64748b" />
        <Text style={styles.resetButtonText}>Reset Values</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 8,
  },
  sliderThumb: {
    backgroundColor: '#3b82f6',
    width: 20,
    height: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  resetButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
});