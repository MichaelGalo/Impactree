'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@/context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  percentage: string | number | undefined | null;
  primaryColor?: string;
  secondaryColor?: string;
  cutoutPercentage?: string;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  fontSize?: number;
  labelPadding?: number;
}

const DoughnutChart = ({
  percentage,
  primaryColor = '#10B981',
  secondaryColor = '#E5E7EB',
  cutoutPercentage = '70%',
  legendPosition = 'bottom',
  fontSize = 12,
  labelPadding = 20,
}: DoughnutChartProps) => {
  const { theme } = useTheme();

  // Convert percentage to number and handle undefined/null values
  const numericPercentage = Number(percentage || 0);
  
  // Ensure percentage is between 0 and 100
  const safePercentage = Math.max(0, Math.min(100, numericPercentage));

  const chartData: ChartData<'doughnut'> = {
    datasets: [{
      data: [safePercentage, 100 - safePercentage],
      backgroundColor: [primaryColor, secondaryColor],
    }]
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        display: true,
        position: legendPosition,
        labels: {
          padding: labelPadding,
          font: { size: fontSize },
          generateLabels: () => [{
            text: `Committed: ${safePercentage.toFixed(1)}%`,
            fillStyle: primaryColor,
            index: 0,
            fontColor: theme === 'dark' ? '#10B981' : '#047857'
          }, {
            text: `Remaining: ${(100 - safePercentage).toFixed(1)}%`,
            fillStyle: secondaryColor,
            index: 1,
            fontColor: theme === 'dark' ? '#E5E7EB' : '#4B5563'
          }]
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = Number(context.raw) || 0;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      }
    },
    cutout: cutoutPercentage,
    elements: {
      arc: { borderWidth: 0 }
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default DoughnutChart;