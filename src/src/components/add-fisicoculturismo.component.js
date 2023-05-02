import React, { Component } from "react";
import FisicoculturismoDataService from "../services/fisicoculturismo.service";

export default class AddFisicoculturismo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveFisicoculturismo = this.saveFisicoculturismo.bind(this);
        this.newFisicoculturismo = this.newFisicoculturismo.bind(this);
        this.onChangeURL=this.onChangeURL.bind(this);

        this.state ={
            title: "",
            description: "",
            published: false,
            url:"",
            submitted: false,
        };
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value,
        });
    }
    
    onChangeURL(e){
        this.setState({
            url: e.target.value,
        });
    }

    saveFisicoculturismo(){
        let data={
            title:this.state.title,
            description: this.state.description,
            published: false,
            url: this.state.url
        };

        FisicoculturismoDataService.create(data).then(()=>{
            console.log("Created new item successfully!");
            this.setState({
                submitted: true,
            });
        })
        .catch((e) => {
            console.log(e);
        });
    }

    newFisicoculturismo(){
        this.setState({
            title: "",
            description: "",
            published: false,
            url:"",
            submitted: false,
        });
    }

    render(){
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>you submitted successfuly!</h4>
                        <button className="btn btn-success" onClick={this.newFisicoculturismo}>
                            Add
                        </button>
                    </div>
                ):(
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="url"
                                required
                                value={this.state.url}
                                onChange={this.onChangeURL}
                                name="url"
                            />
                        </div>
                        <br/>
                        <button onClick={this.saveFisicoculturismo} className="btn btn-success">
                            submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}