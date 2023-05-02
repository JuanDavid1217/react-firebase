import React, { Component } from "react";
import FisicoculturismoDataService from "../services/fisicoculturismo.service";

export default class Fisicoculturismo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescripton = this.onChangeDescripton.bind(this);
        this.updatePublished = this.updatePublished.bind(this);

        this.state = {
            currentFisicoculturismo: {
                id: null,
                title:"",
                description:"",
                published: false,
            },
            message:"",
        };

    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fisico } = nextProps;
        if (prevState.currentFisicoculturismo.id !== fisico.id){
            return{
                currentFisicoculturismo: fisico,
                message:""
            };
        }

        return prevState.currentFisicoculturismo;
    }

    componentDisMount(){
        this.setState({
            currentFisicoculturismo: this.props.fisico,
        });
    }

    onChangeTitle(e){
        const title = e.target.value;

        this.setState(function (prevState){
            return {
                currentFisicoculturismo: {
                    ...prevState.currentFisicoculturismo,
                    title:title,
                },
            };
        });
    }

    onChangeDescripton(e){
        const description = e.target.value;

        this.setState(function (prevState){
            return {
                currentFisicoculturismo:{
                    ...prevState.currentFisicoculturismo,
                    description:description,
                },
            };
        });
    }


    updatePublished(status){
        FisicoculturismoDataService.update(this.state.currentFisicoculturismo.id, {
            published: status,
        }).then(()=>{
            this.setState((prevState)=>({
                currentFisicoculturismo: {
                    ...prevState.currentFisicoculturismo,
                    published: status,
                },
                message: "The status was update successfully!",
            }));
        }).catch((e)=>{
            console.log(e);
        });
    }

    updateFisicoculturismo(){
        //const onDataChange={
        //    title: this.state.currentFisicoculturismo.title,
        //    description: this.state.currentFisicoculturismo.description
        //};

        FisicoculturismoDataService.update(this.state.currentFisicoculturismo.id, {
            title: this.state.currentFisicoculturismo.title,
            description: this.state.currentFisicoculturismo.description
        }).then(()=>{
            this.setState({
                message: "The tutorial was updated successfully!",
            });
        }).catch((e)=>{
            console.log(e);
        });
    }

    deleteFisicoculturismo(){
        FisicoculturismoDataService.delete(this.state.currentFisicoculturismo.id)
        .then(()=>{
            this.props.refreshList();
        }).catch((e)=>{
            console.log(e);
        });
    }

    render(){
        const { currentFisicoculturismo } = this.state;
        return (
            <div>
                <br/>
                <h4>Fisicoculturista Seleccionado</h4>
                {currentFisicoculturismo ? (
                    <div className="edit-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentFisicoculturismo.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value = {currentFisicoculturismo.description}
                                    onChange={this.onChangeDescripton}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentFisicoculturismo.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentFisicoculturismo.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={()=> this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ):(
                            <button
                                className="badge badge-primary mr-2"
                                onClick={()=> this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={()=>this.deleteFisicoculturismo()}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={()=>this.updateFisicoculturismo()}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ):(
                    <div>
                        <br />
                        <p>Please click on a Fisicoculturista</p>
                    </div>
                )}
            </div>
        );
    }
}