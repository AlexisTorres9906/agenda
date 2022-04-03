export const Head = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <div className="card-counter primary">
              <i className="fa fa-people-group"></i>
              <span className="count-numbers">12</span>
              <span className="count-name">Locales</span>
            </div>
          </div>

          <div className="col-md">
            <div className="card-counter success">
              <i className="fa fa-building-columns"></i>
              <span className="count-numbers">12</span>
              <span className="count-name">Estatales</span>
            </div>
          </div>
  
          <div className="col-md">
            <div className="card-counter info">
              <i className="fa fa-users"></i>
              <span className="count-numbers">35</span>
              <span className="count-name">Federales</span>
            </div>
          </div>

          <div className="col-md">
            <div className="card-counter danger">
              <i className="fa fa-exclamation"></i>
              <span className="count-numbers">10</span>
              <span className="count-name">Urgentes</span>
            </div>
          </div>

        </div>
      </div>
    );
  };
  