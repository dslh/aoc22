import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/fsex300-webfont.ttf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'lib/utils';

import Days from './days';
import Zero from './days/0';
import One from './days/1';
import Two from './days/2';
import Three from './days/3';
import Four from './days/4';
import Five from './days/5';
import Six from './days/6';
import Seven from './days/7';
import Eight from './days/8';
import Nine from './days/9';
import Ten from './days/10';
import Eleven from './days/11';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

const Index = () => <>Select a day from the menu above to start.</>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Index />} />

        <Route path="days" element={<Days />} >
          <Route path="0" element={<Zero />} />
          <Route path="1" element={<One />} />
          <Route path="2" element={<Two />} />
          <Route path="3" element={<Three />} />
          <Route path="4" element={<Four />} />
          <Route path="5" element={<Five />} />
          <Route path="6" element={<Six />} />
          <Route path="7" element={<Seven />} />
          <Route path="8" element={<Eight />} />
          <Route path="9" element={<Nine />} />
          <Route path="10" element={<Ten />} />
          <Route path="11" element={<Eleven />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
