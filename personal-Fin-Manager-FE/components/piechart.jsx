'use client'
import { Pie } from '@ant-design/plots';
import { Button } from 'antd';
import { isEqual } from 'lodash';
import React, { memo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const DemoPie = memo(
  function DemoPie({ data, onReady }) {
    var config = {
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
  const [count, setCount] = useState(0);
  const [data, setData] = useState([
    {
      type: 'Category One',
      value: 27,
    },
    {
      type: 'Category Two',
      value: 25,
    },
    {
      type: 'Category Three',
      value: 18,
    },
    {
      type: 'Category Four',
      value: 15,
    },
    {
      type: 'Category Five',
      value: 10,
    },
    {
      type: 'Other',
      value: 5,
    },
  ]);

  return (
    <div>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Do not Re-render
      </Button>
      <Button
        style={{ margin: '0 10px' }}
        type="primary"
        onClick={() => {
          setData(data.map((d) => ({ ...d, value: Math.floor(Math.random() * 100) })));
        }}
      >
        Re-render
      </Button>
      <span>{count}</span>
      <DemoPie data={data} onReady={({ chart }) => {}} />
    </div>
  );
};

export default DemoMemo;
