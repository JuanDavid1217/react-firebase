import React, { Component } from "react";
import FisicoculturismoDataService from "../services/fisicoculturismo.service";

import "firebase/compat/storage";
import firebase  from "firebase/compat/app";
export const storage = firebase.storage();

export default class AddFisicoculturismo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveFisicoculturismo = this.saveFisicoculturismo.bind(this);
        this.newFisicoculturismo = this.newFisicoculturismo.bind(this);
        //this.onChangeURL=this.onChangeURL.bind(this);

        this.state ={
            title: "",
            description: "",
            published: false,
            url:"",
            submitted: false,
        };
    }

    onChangeFile(e) {

        console.log (e.target.files[0])
    
        this.setState({
          file : e.target.files[0]
        });
    }

    
    handleUpload(e, file) {
        e.preventDefault();
        console.log(file);
        alert(file.name);
    
        const uploadTask = storage.ref('/images/' + file.name).put(file);
    
        uploadTask.on("state_changed", console.log, console.error, () =>  {
           storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then((myurl) =>  {
                    this.setState({
                        url : myurl
                    }) 
                        //this.state.url=myurl;
                 });
    
        });
    
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
            file:"",
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
                        <br/>
                        
                        <div>
                
                            <form onSubmit={ (event) => {
                                this.handleUpload(event, this.state.file)
                            }} >
                            <input type="file" onChange={(event)=> { 
                                this.onChangeFile(event) 
                            }} />
                            { this.state.file ? <img alt="Preview" height="200" src={URL.createObjectURL(this.state.file)} /> : null }
                            <button disabled={!this.state.file}>upload to firebase</button>
                            </form>
                            
                            <br/>
                            <button onClick={this.saveFisicoculturismo} className="btn btn-success">
                            submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}