import { DataGrid,esES } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../interface/User';
import { startGetUsers } from '../../actions/admin';
import { RootState } from '../../store/store';


const columns = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: ' Nombre', width: 150 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'nombreArea', headerName: 'Area', width: 150 },
]

export const UsuariosAdm = () => {

  const [users, setUsers] = useState([] as User[]);
  const {Users} = useSelector( (state:RootState) => state.admin );
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(startGetUsers());
  }, [dispatch]);

  useEffect(() => {
    const user = Users.map( (user:User) => {
      const nombreArea =  user.area.nombre
      const id = user.uid                                    
      return {
        ...user,
        nombreArea,
        id
      }
    })
    setUsers(user);
  }, [Users]);
  
  


  const handleClick = (params:any) => {
    console.log(params);
  }



  return (
    <div className="UserTable">
    <DataGrid
    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
    style={ { width: '100%', height: '80%' } }
    columns={columns}
     rows={users as []}
     onRowClick={(p) => handleClick(p)}
     autoHeight={true}
     pageSize={8}
  />
  </div>
  )
}
