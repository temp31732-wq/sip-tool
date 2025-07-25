import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/hooks/useSipCalculator';

interface SipChartProps {
  data: Array<{
    year: number;
    invested: number;
    interest: number;
    total: number;
  }>;
}

export const SipChart: React.FC<SipChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{`Year ${label}`}</p>
          <div className="space-y-1">
            <p className="text-sm text-chart-investment">
              <span className="inline-block w-3 h-3 bg-chart-investment rounded mr-2"></span>
              Invested: {formatCurrency(payload[0]?.value || 0)}
            </p>
            <p className="text-sm text-chart-returns">
              <span className="inline-block w-3 h-3 bg-chart-returns rounded mr-2"></span>
              Returns: {formatCurrency(payload[1]?.value || 0)}
            </p>
            <p className="text-sm font-medium text-chart-total">
              Total: {formatCurrency((payload[0]?.value || 0) + (payload[1]?.value || 0))}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="year" 
            className="text-xs text-muted-foreground"
            tickFormatter={(value) => `Y${value}`}
          />
          <YAxis 
            className="text-xs text-muted-foreground"
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="invested"
            stackId="1"
            stroke="hsl(var(--chart-investment))"
            fill="hsl(var(--chart-investment))"
            fillOpacity={0.8}
            name="Amount Invested"
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="hsl(var(--chart-returns))"
            fill="hsl(var(--chart-returns))"
            fillOpacity={0.8}
            name="Returns Generated"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};