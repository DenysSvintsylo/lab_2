import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Test1 from './components/Test1';
import Test2 from './components/Test2';
import Test3 from './components/Test3';

function Test() {
    return (
      <MemoryRouter>
        <Routes>
          <Route path='/test1' element={<Test1 />} />
          <Route path='/test2' element={<Test2 />} />
          <Route path='/test3' element={<Test3 />} />
        </Routes>
      </MemoryRouter>
    );
  }

export default Test;
