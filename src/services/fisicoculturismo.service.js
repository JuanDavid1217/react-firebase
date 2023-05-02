import firebase from "../firebase";

const db = firebase.collection("/Fisicoculturismo");

class FisicoculturismoDataService{
    getAll(){
        return db;
    }

    create(fisicoculturismo){
        return db.add(fisicoculturismo);
    }

    update(id, value){
        return db.doc(id).update(value);
    }

    delete(id){
        return db.doc(id).delete();
    }
}

const FDS=new FisicoculturismoDataService();
export default FDS;