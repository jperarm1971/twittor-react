import React from 'react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  //console.log(props);
  return (
      <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
        
        <h2>Estamos en Home</h2>
        
      </BasicLayout>

  )
}
