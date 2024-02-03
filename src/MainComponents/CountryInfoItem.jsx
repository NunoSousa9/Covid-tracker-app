import {Link} from 'react-router-dom';
import { formatNumberWithSpaces } from '../utils';

const CountryInfoItem = ( {tabData, country} ) => {

  return (
    <li className="country-item">
      <span className='country-cases'>
        <Link to={`/countries/${country.country}`} className="country-link">
          <span className="number">{formatNumberWithSpaces(country[tabData.countryProperty])}</span> in {country.country}
        </Link>
      </span>
      <img 
        className="country-flag" 
        src={country.countryInfo.flag} 
        alt={`${country.country} Flag`} 
      />
    </li>
  );
}

export default CountryInfoItem;