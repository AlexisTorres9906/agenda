import "../../styles/home.scss";
import { Head } from "./Head";
import { GridRecientes } from "./GridRecientes";
import { Contacts } from "./Contacts";

export const Home = () => {
  return (
    <div className="home">
      <div className="head">
        <Head />
      </div>
      <div className="container ">
        <div className="row inform">
          <div className="col-xl-8 col-sm-11 col-md-6 col-lg-11">
            <GridRecientes />
          </div>
          <div className="col-xl-4 col-sm-6 col-md-4 col-lg-6 contactos">
            <Contacts />
          </div>
        </div>
      </div>
      <a href="/agenda/home" className="btn-flotante">
        <span>
          <i className="fas fa-plus"></i>
        </span>
      </a>
    </div>
  );
};
