import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='90%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='_id' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#6e4aee' fill='#967fea' />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;