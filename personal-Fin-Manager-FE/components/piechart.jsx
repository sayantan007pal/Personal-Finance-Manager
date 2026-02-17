'use client'
import { Pie } from '@ant-design/plots';
import { Button, Spin } from 'antd';
import { isEqual } from 'lodash';
import React, { memo, useState, useEffect } from 'react';
import api from '@/lib/api';

const DemoPie = memo(
  function DemoPie({ data, onReady }) {
    const config = {
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        text: 'value',
        position: 'outside',
      },
      onReady,
    };
    return <Pie {...config} />;
  },
  (pre, next) => {
    return isEqual(pre?.data, next?.data);
  },
);

const DemoMemo = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/transactions');
      const transactions = res.data.data || [];
      // Process transactions to get category-wise spending totals
      const categoryMap = {};
      transactions.forEach((t) => {
        const category = t.category || 'Uncategorized';
        const amount = Math.abs(parseFloat(t.amount?.$numberDecimal || t.amount || 0));
        // Only include expenses (negative amounts or all if tracking spending)
            
        if (!categoryMap[category] && t.type === 'DEBIT') {
          categoryMap[category] = 0;
        }
        categoryMap[category] += amount;
      });
      // Convert to data format for pie chart
      const newData = Object.keys(categoryMap).map((key) => ({
        type: key,
        value: categoryMap[key],
      }));
      setData(newData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          fetchTransactions();
        }}
      >
        Refresh Data
      </Button>
      {loading ? (
        <Spin tip="Loading transactions..." />
      ) : data.length > 0 ? (
        <DemoPie data={data} onReady={({ chart }) => {}} />
      ) : (
        <p>No transaction data available</p>
      )}
    </div>
  );
};

export default DemoMemo;
