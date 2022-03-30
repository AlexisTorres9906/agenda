import "../../styles/home.scss";
import { Head } from "./Head";
export const Home = () => {
  return (
    <div className="home">
      <div className="head">
        <Head />
      </div>
      <div className="container ">
        <div className="row inform">
          <div className="col">1 of 2</div>
          <div className="col-4">2 of 2</div>
        </div>
      </div>

      <a href="#" className="btn-flotante">
        <span>
          <i className="fas fa-plus"></i>
        </span>
      </a>
    </div>
  );
};
