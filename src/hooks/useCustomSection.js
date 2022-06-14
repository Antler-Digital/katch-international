import HomeSection from "../components/pageSections/HomeSection";
import React from 'react';

const useCustomSection = (path, props) => {
  console.log(path)
 switch (path) {
    case '/':
      return <HomeSection {...props} />
    default:
      return null;
  }
}

export default useCustomSection