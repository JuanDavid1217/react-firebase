import React, { Component } from "react";
//import FisicoculturismoDataService from "../services/fisicoculturismo.service";

export default class ReactionsLike extends Component {
    
    render(){
        return(
            <select className="styleofButtom" defaultValue={"default"}>
            <option style={{display:"none"}} value="default" >Me gusta</option>
            <option className="styleoflike" value="like" >👍 Me gusta</option>
            <option className="styleofLoved" value="love" >💖 Me encanta</option>
            <option className="styleofFun" value="fun" >😂 Me divierte</option>
            <option className="styleofSad" value="sad" >😭 Me entristece</option>
            <option className="styleofAngry" value="angry" >😡 Me enoja</option>
            </select>
            //<button className="styleofButtom" onClick={()=><h1>hola</h1>}>Like</button>
        )
    }
}

