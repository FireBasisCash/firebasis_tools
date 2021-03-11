import React from 'react';

import fbcLogo from '../../assets/img/fbc.svg';
import fbsLogo from '../../assets/img/fbs.svg';
import fbbLogo from '../../assets/img/fbb.svg';
import fbgLogo from '../../assets/img/fbg.svg';
import usdtLogo from '../../assets/img/USDT.png';
import HTLogo from '../../assets/img/HT.png';
import hbtcLogo from '../../assets/img/ic_hbtc.png';
import hethLogo from '../../assets/img/ic_heth.png';
import hdotLogo from '../../assets/img/ic_hdot.png';
import hfilLogo from '../../assets/img/ic_hfil.png';
import hltcLogo from '../../assets/img/ic_hltc.png';
import mdxLogo from '../../assets/img/ic_hmdx.png';

const logosBySymbol: { [title: string]: string } = {

  'FBC': fbcLogo,
  'FBB': fbbLogo,
  'FBS': fbsLogo,
  'FBG': fbgLogo,
  "USDT": usdtLogo,
  'HT': HTLogo,
  "HBTC": hbtcLogo,
  'HETH': hethLogo,
  "HDOT": hdotLogo,
  'HFIL': hfilLogo,
  "HLTC": hltcLogo,
  'MDX': mdxLogo,

  'FBC_USDT_LP': fbsLogo,
  'FBS_USDT_LP': fbsLogo,
  'FBG_USDT_LP': fbsLogo,

};

type BasisLogoProps = {
  symbol: string;
  size?: number;
}

const HomeTokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 58 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
  }
  const divWidth = 58;
  const imgMargin = (divWidth - size) / 2;
  return (
    <div style={{ width: divWidth, height: divWidth, position: 'absolute', top: 92, left: 14, borderRadius: size / 2, boxShadow: 'inset 4px 4px 8px #eeeeee, inset -6px -6px 12px #f5f5f5' }}>
      <img
        src={logosBySymbol[symbol]}
        alt={`${symbol} Logo`}
        width={size}
        height={size}
        style={{ marginLeft: imgMargin, marginTop: imgMargin }}
      />
    </div>
  )
};

export default HomeTokenSymbol;
