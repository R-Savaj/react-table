import React,{useState,useEffect} from 'react';
import { useTable,useGlobalFilter,useAsyncDebounce,useSortBy } from 'react-table';
import {exhibitionService} from '../../services/exhibition'
import GlobalFilter from './Filter/globalFilter';
import Pagination from "@material-ui/lab/Pagination";
const ArtInstituteList=()=>{
  const [users, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  useEffect(getData, [page]);
  const getRequestParams = (page) => {
    let params = {};
    params["limit"] = 30;
    if (page) {
      params["page"] = page;
    }
    return params;
  };
  async function getData() {
    const params = getRequestParams(page);
    exhibitionService.getExhibitionList(params).then(x=>
    {
      setUser(x.data.data);
      setCount(x.data.pagination.total_pages);
    })
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const setDescription = (data)=>{
      if(data && data.length > 200){
        return data.slice(0, 200) + '.....';
      }
     return data;
    }
    const columns = React.useMemo(
        () => [
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            id:'is_featured', 
            Header: 'Is Featured',
            accessor: 'is_featured',
            Cell: props => props.value == false ? 'No':'Yes'
          },
          {
            Header: 'Description',
            accessor: 'description',
            Cell: props => setDescription(props.value)
          },
          {
            Header: 'Gallery Title',
            accessor: 'gallery_title',
          },{
            Header: 'Type of Exhibition',
            accessor: 'type',
          },
        ],
        []
    )  
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { globalFilter },
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable({ columns, data:users },useGlobalFilter,useSortBy)

    return (
      <div>
          <div class="card ">
            <div class="card-header">
              Art Exhibition Data
            </div>
            <div class="card-body table-responsive">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
             />
              <table {...getTableProps()} class="table table-striped table-hover mx-auto w-75" style={{ border: 'solid 1px gray' }}>
                <thead>
                  {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                          <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          style={{
                              borderBottom: 'solid 3px gray',
                              background: 'aliceblue',
                              color: 'black',
                              fontWeight: 'bold',
                          }}
                          >
                          {column.render('Header')}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' ⬇️'
                                : ' ⬆️'
                              : ' ↕️'}
                          </span>
                          </th>
                      ))}
                      </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                      prepareRow(row)
                      return (
                      <tr {...row.getRowProps({style:{
                        background: row.original.is_featured === false ? '#cdeac4' : '#f4d5d5',
                        }})}
                      >
                      {row.cells.map(cell => {
                        return (
                              <td
                              {...cell.getCellProps()}
                              style={{
                                  padding: '10px',
                                  border: 'solid 1px gray',
                              }}
                              >
                              {cell.render('Cell')}
                              </td>
                          )
                          })}
                      </tr>
                      )
                  })}
                </tbody>
              </table>
              <div className="mt-3">
                <Pagination
                  className="my-3 main"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      )
}
export default ArtInstituteList;