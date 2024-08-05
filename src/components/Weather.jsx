import './Weather.css'
import SearchIcon from '@mui/icons-material/Search';

const Weather = () => {
  return (
    <div className="weather">
    <div className="">
      <input type="text" placeholder="City" className="searchToggle" />
    </div>
      <button type="button" className="btn" >
         <SearchIcon />
      </button>
</div>
  )
}

export default Weather