const user = {};

function set(data){
    Object.assign(user, data);
};

function get(){
    if(user){
        return user;
    }
    null;
}

export default {
    set,
    get
}