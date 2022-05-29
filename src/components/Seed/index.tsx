import React, { useEffect } from 'react';
import * as utils from '../../utils';

function Seed() {
  useEffect(() => {
    utils.seed();
  });

  return <div>Seed</div>;
}

export default Seed;
