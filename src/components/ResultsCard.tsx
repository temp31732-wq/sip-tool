import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, PiggyBank, Target, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/hooks/useSipCalculator';

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
      <Card className="shadow-lg border-0 bg-gradient-to-br from-warning-light to-card">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <AlertCircle className="w-12 h-12 text-warning mx-auto" />
            <h3 className="text-lg font-medium text-foreground">Invalid Inputs</h3>
            <p className="text-sm text-muted-foreground">
              Please correct the errors above to see your SIP calculation
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const investmentPercentage = maturityValue > 0 ? (totalInvested / maturityValue) * 100 : 0;
  const returnsPercentage = 100 - investmentPercentage;

  return (
    <div className="space-y-4">
      {/* Main Results Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-success-light to-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <Target className="w-5 h-5" />
            Maturity Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-success">
                {formatCurrency(maturityValue)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Final investment value
              </p>
            </div>
            
            {/* Progress Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Investment vs Returns</span>
                <span className="font-medium">{returnsPercentage.toFixed(1)}% Returns</span>
              </div>
              <Progress value={returnsPercentage} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Your Investment</span>
                <span>Market Returns</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Invested */}
        <Card className="shadow-md border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <PiggyBank className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(totalInvested)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Interest */}
        <Card className="shadow-md border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Interest Earned</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-success">
                    {formatCurrency(totalInterest)}
                  </p>
                  {totalInterest > totalInvested && (
                    <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
                      {((totalInterest / totalInvested) * 100).toFixed(0)}% Gain
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Summary */}
      <Card className="shadow-md border-0">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h4 className="font-medium text-foreground">Investment Summary</h4>
            <p className="text-xs text-muted-foreground">
              Your monthly SIP of <span className="font-medium text-primary">{formatCurrency(monthlyInvestment)}</span> will grow to{' '}
              <span className="font-medium text-success">{formatCurrency(maturityValue)}</span>{' '}
              generating <span className="font-medium text-success">{formatCurrency(totalInterest)}</span> in returns
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};