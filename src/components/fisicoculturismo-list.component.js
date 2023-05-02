import React, { Component } from "react";
import FisicoculturismoDataService from "../services/fisicoculturismo.service";

import Fisicoculturista from "./fisicoculturismo.component";
import Reaction from "./reactions.component";
import Com from "./comentarios.component";

export default class FisicoculturismoList extends Component {
  constructor(props) {

    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
//  this.state = this.state.bind(this);

    this.state = {
      fisicoculturismo: [],
      currentFisicoculturismo: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = FisicoculturismoDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let fisicoculturismo = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      fisicoculturismo.push({
        id: id,
        title: data.title,
        description: data.description,
        //Yo la puse
        url:data.url,
        //
        published: data.published,
      });
    });

    this.setState({
      fisicoculturismo: fisicoculturismo,
    });
  }

  refreshList() {
    this.setState({
      currentFisicoculturismo: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(fisicoculturismo, index) {
    //this.setState({
      // currentFisicoculturismo: fisicoculturismo,
        //currentIndex: index,
    //   miVariable: fisicoculturismo
    //});
    this.setState({
      currentFisicoculturismo : fisicoculturismo,
      currentIndex : index,
    })
    //this.state.currentFisicoculturismo = fisicoculturismo;
    //this.state.currentIndex = index;
    //this.setState(this.state);
    console.log(this.state);
  }

  render() {
    const { fisicoculturismo, currentFisicoculturismo} = this.state;

    return (
      <div className="row">
        <div className="col-md-6">
          <h4>Todos los Fisicoculturistas Registrados</h4>

          <ul className="list-group">
            {fisicoculturismo &&
              fisicoculturismo.map((fisico, index) => (
                <li
                  key={index}
                  className="styleItemofList"
                >
                  <div onClick={() => this.setActiveTutorial(fisico, index)}
                  >
                  <div className="styleTitlePublication">{fisico.title}</div>
                  <p>{fisico.description}</p>
                  <div>
                    {fisico.url? <img className="styleImagePublication" alt="Preview" height="300px" src={fisico.url} /> : null }
                  </div>
                  <div>
                    <hr />
                    <Reaction/>
                    <Com/>
                  </div>
                  </div>

                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="columnStatic">
          {currentFisicoculturismo ? (
            <Fisicoculturista
              fisico={currentFisicoculturismo}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Fisicoculturista...</p>
            </div>
          )}
          </ul>
        </div>
      </div>
    );
  }
}