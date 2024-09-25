import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import Form from "./Pages/Form"
import LinkedAIValue from './Pages/LinkedAIValue';
import Result from "components/Result/Result";
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
              <Form/>
          }
        />
        <Route
          path="linked-ai-value"
          element={
              <LinkedAIValue />
          }
        />
        <Route
          path="ai-responsible-use"
          element={
              <Result step={2}/>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
