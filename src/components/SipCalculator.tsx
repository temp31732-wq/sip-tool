import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RotateCcw, TrendingUp, Calculator } from 'lucide-react';
import { useSipCalculator, formatCurrency } from '@/hooks/useSipCalculator';
import { SipChart } from './SipChart';
import { ResultsCard } from './ResultsCard';

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
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-primary/10 to-success/10 rounded-full">
          <Calculator className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">SIP Calculator</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          Plan Your Financial Future
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate your SIP returns with our professional investment calculator. 
          Start your systematic investment journey today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Investment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Monthly Investment */}
            <div className="space-y-3">
              <Label htmlFor="monthlyInvestment" className="text-sm font-medium">
                Monthly Investment
              </Label>
              <div className="space-y-2">
                <Input
                  id="monthlyInvestment"
                  type="number"
                  value={inputs.monthlyInvestment}
                  onChange={(e) => updateInput('monthlyInvestment', Number(e.target.value))}
                  className={`text-lg ${getFieldError('monthlyInvestment') ? 'border-destructive' : ''}`}
                  placeholder="Enter amount"
                />
                <Slider
                  value={[inputs.monthlyInvestment]}
                  onValueChange={(value) => updateInput('monthlyInvestment', value[0])}
                  max={100000}
                  min={500}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹500</span>
                  <span className="font-medium text-primary">
                    {formatCurrency(inputs.monthlyInvestment)}
                  </span>
                  <span>₹1L</span>
                </div>
                {getFieldError('monthlyInvestment') && (
                  <p className="text-xs text-destructive mt-1">
                    {getFieldError('monthlyInvestment')}
                  </p>
                )}
              </div>
            </div>

            {/* Expected Annual Return */}
            <div className="space-y-3">
              <Label htmlFor="annualReturn" className="text-sm font-medium">
                Expected Annual Return (%)
              </Label>
              <div className="space-y-2">
                <Input
                  id="annualReturn"
                  type="number"
                  step="0.1"
                  value={inputs.annualReturnRate}
                  onChange={(e) => updateInput('annualReturnRate', Number(e.target.value))}
                  className={`text-lg ${getFieldError('annualReturnRate') ? 'border-destructive' : ''}`}
                  placeholder="Enter rate"
                />
                <Slider
                  value={[inputs.annualReturnRate]}
                  onValueChange={(value) => updateInput('annualReturnRate', value[0])}
                  max={30}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span className="font-medium text-primary">
                    {inputs.annualReturnRate}%
                  </span>
                  <span>30%</span>
                </div>
                {getFieldError('annualReturnRate') && (
                  <p className="text-xs text-destructive mt-1">
                    {getFieldError('annualReturnRate')}
                  </p>
                )}
              </div>
            </div>

            {/* Investment Duration */}
            <div className="space-y-3">
              <Label htmlFor="duration" className="text-sm font-medium">
                Investment Duration (Years)
              </Label>
              <div className="space-y-2">
                <Input
                  id="duration"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={inputs.investmentDuration}
                  onChange={(e) => updateInput('investmentDuration', Number(e.target.value))}
                  className={`text-lg ${getFieldError('investmentDuration') ? 'border-destructive' : ''}`}
                  placeholder="Enter years"
                />
                <Slider
                  value={[inputs.investmentDuration]}
                  onValueChange={(value) => updateInput('investmentDuration', value[0])}
                  max={40}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 Year</span>
                  <span className="font-medium text-primary">
                    {inputs.investmentDuration} Years
                  </span>
                  <span>40 Years</span>
                </div>
                {getFieldError('investmentDuration') && (
                  <p className="text-xs text-destructive mt-1">
                    {getFieldError('investmentDuration')}
                  </p>
                )}
              </div>
            </div>

            {/* Reset Button */}
            <Button
              onClick={resetInputs}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Values
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <ResultsCard
            totalInvested={results.totalInvested}
            totalInterest={results.totalInterest}
            maturityValue={results.maturityValue}
            monthlyInvestment={inputs.monthlyInvestment}
            isValid={isValid}
          />
        </div>
      </div>

      {/* Chart Section */}
      {isValid && results.yearlyData.length > 0 && (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle>Investment Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <SipChart data={results.yearlyData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};