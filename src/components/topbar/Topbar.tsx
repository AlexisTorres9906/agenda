import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import '../../styles/Topbar.scss';
export const Topbar = () => {
 
    
  return (
    <div className="divTopbar">
      <div className="topbar">
        <div className="toggle">
          <AiOutlineMenu />
        </div>
        {/*Search*/ }
        <div className="search">
          <label>
            <input type="text" placeholder="Buscar..." />
            <AiOutlineSearch style={{position:'absolute',top:13,left:'10px',fontSize:'1.2em'}}/>
          </label>
        </div>
        {/*UserImg*/ }
        <div className="user">
            <img src={`${process.env.PUBLIC_URL}/assets/img/user.png`}  alt="aqui va la foto" />
            </div>
      </div>
    </div>
    
  );
};
