import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "../../styles/Topbar.scss";
export const Topbar = () => {
  //make event click on toggle
  const inputRef = React.useRef<HTMLDivElement>(null);
  //click when is renderd
  useEffect(() => {
    //click after 1s
    setTimeout(() => {
      inputRef.current?.click();
    }, 1500);
  }, []);

  return (
    <div className="divTopbar">
      <div className="topbar">
        <div className="toggle" ref={inputRef}>
          <AiOutlineMenu />
        </div>
        {/*
        <div className="search">
          <label>
            <input type="text" placeholder="Buscar..." />
            <AiOutlineSearch style={{position:'absolute',top:13,left:'10px',fontSize:'1.2em'}}/>
          </label>
        </div>
        {/*UserImg*/}
        <div className="user">
            
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/user.png`}
            alt="aqui va la foto"
          />
        </div>
      </div>
    </div>
  );
};
