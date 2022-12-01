import { Bar } from 'react-chartjs-2';

const OPTIONS = {
  plugins: {
    title: {
      display: true,
      text: 'Hungry hungry elves'
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  }
};

const COLOURS = [
  '#F44369', '#EA436B', '#E1426D', '#D7426F', '#CE4172',
  '#C44174', '#BB4076', '#B14078', '#A7407A', '#9E3F7C',
  '#943F7F', '#8B3E81', '#813E83', '#773E85', '#6E3D87',
  '#643D89', '#5B3C8C', '#513C8E', '#483B90', '#3E3B92'
];

const View = ({ data }) => {
  const maxSize = Math.max(...data.map(elf => elf.length));
  const datasets = new Array(maxSize).fill().map((_, i) => (
    { label: i.toString(), data: [], backgroundColor: COLOURS[i] }
  ));
  data.forEach(elf => datasets.forEach((set, i) => set.data.push(elf[i] || 0)));

  return <Bar options={OPTIONS} data={{ labels: data.map((_, i) => i.toString()), datasets }} />;
};

export default View;
