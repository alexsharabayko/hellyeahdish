class Config {
    constructor () {
        this.routes = {
            dishesCatalog: '/dishes-catalog',
            createDish: '/create-dish',
            home: '/'
        }
    }
}

var config = new Config();

export default config;