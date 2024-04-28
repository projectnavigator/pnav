

import { useState } from 'react';

import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';

const StatusStatsContainer = ({statusStats}) => {
  const [barChart, setBarChart] = useState(true);
   return (
    <Wrapper>
      <h4>Project Status Report</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ?  <AreaChartComponent data={statusStats} />:<BarChartComponent data={statusStats} /> }
    </Wrapper>
  );
}

export default StatusStatsContainer