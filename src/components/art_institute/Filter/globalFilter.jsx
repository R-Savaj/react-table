import {useState} from 'react';
import { useAsyncDebounce } from 'react-table';
import './globalFiltert.css';
const TWO_HUNDRED_MS = 200;
const GlobalFilter=({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  })=>{
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, TWO_HUNDRED_MS);

  return (
    <div class="main">
        <div class="form-group has-search row">
            <span class="fa fa-search form-control-feedback"></span>
            <input class="form-control form-rounded" value={value || ""} onChange={e => {setValue(e.target.value);onChange(e.target.value);}} placeholder={`Search Table`}/>
        </div>
    </div>  
  )
}
export default GlobalFilter;

