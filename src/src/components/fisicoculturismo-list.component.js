import React, { Component } from "react";
import FisicoculturismoDataService from "../services/fisicoculturismo.service";

import Fisicoculturista from "./fisicoculturismo.component";

export default class FisicoculturismoList extends Component {
  constructor(props) {

    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.miVariable;
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

    this.state.currentFisicoculturismo = fisicoculturismo;
    this.state.currentIndex = index;
    this.setState(this.state);
    console.log(this.state);
  }

  render() {
    const { fisicoculturismo, currentFisicoculturismo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Fisicoculturismo List</h4>

          <ul className="list-group">
            {fisicoculturismo &&
              fisicoculturismo.map((fisico, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveTutorial(fisico, index)}
                  key={index}
                >
                  {fisico.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
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
        </div>
      </div>
    );
  }
}