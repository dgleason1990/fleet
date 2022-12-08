
export class ApiOperations {
    endpoint: string
    init:     any
    constructor(method) {
        this.endpoint = "http://127.0.0.1:8000"
        this.init = {
            method: method,
            headers:{
                'content-type': 'application/json',
            }
        }
    }

    getRequest(path){
        return fetch(this.endpoint+ path, this.init)
        .then(res => {
            if (res.status > 300){
                throw res.status
            } else 
            return res.json();
        })
    }


    postRequest(path, data){
        let init = {...this.init}

        init['body'] = JSON.stringify(data)

        return fetch(this.endpoint + path, init)
        .then(res => {if (res.status > 300){
            throw res.status
        } else 
        return res.json();})

        
    }

    putRequest(path){
        return fetch(this.endpoint + path, this.init)
        .then(res => {
           return res.json();
        })
    }

    deleteRequest(path) {
        return fetch(this.endpoint+ path, this.init)
        .then(res => {
            if (res.status > 300){
                throw res.status
            } else 
            return res.json();
        })
    }


}