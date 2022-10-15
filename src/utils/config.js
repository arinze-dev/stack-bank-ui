export const config = {
    MODE: "",
    API_URL: "",
    config: function(){
        this.API_URL = this.MODE === 'development'? "https://localhost:4040/api/": "https://stack-bank-api.herokuapp.com/api/"
    }
}