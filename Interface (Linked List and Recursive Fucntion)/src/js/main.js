class Products {
    constructor(nameP, codeP, quantityP, priceP) {
        this.nameProduct = nameP;
        this.codeProduct = codeP;
        this.quantityProduct = quantityP;
        this.priceProduct = priceP;
        this.next = null;
    }

    //Return all the information from the products
    info() {
        return `Product Details: Name: ${this.nameProduct}, Code: ${this.codeProduct}, Quantity: ${this.quantityProduct}, Price: ${this.priceProduct}`;
    }
}

class Inventories {
    constructor() {
        //First product in the list
        this.first = null;
        //How many are there products?
        this._num = 0;
    }

    // Check if a product with the given code exists
    _exists(codeProduct) {
        let aux = this.first;
        while (aux !== null) {
            if (aux.codeProduct === codeProduct) {
                return true;
            }
            aux = aux.next;
        }
        return false;
    }


    // Add the product
    add(product) {
        if(this.first === null){
            this.first = product;
            //count
            this._num = this._countElements(this.first);
        }
        //Validate if the product is in the inventory
        if(!this._exists(product.codeProduct)){
            let aux = this.first;
            while (aux.next !== null) {
                aux = aux.next;
            }
            aux.next = product;
            //Count
            this._num = this._countElements(this.first);
        }
        return null;
    }

    _listing(nodeX){
        if(nodeX === null){
            return "";
        }
        //Recursively
        return nodeX.info() + this._listing(nodeX.next);
    }

    _listingRev(nodeX){
        if(nodeX === null){
            return "";
        }
        //Recursively
        return this._listingRev(nodeX.next) + nodeX.info();
    }

    // Return all the products in the inventory
    list() {
        if(this.first === null){
            return null;
        }
        return this._listing(this.first);
    }

    // Return all the products in reverse in the inventory
    listRev() {
        if(this.first === null){
            return null;
        }
        return this._listingRev(this.first);
    }

    _lookingFor(code, nodeX){
        //The product to find not exists;
        if(nodeX === null){
            return null;
        }
        //If the product is found
        if(nodeX.codeProduct === code){
            return nodeX;
        }
        //Recursively
        return this._lookingFor(code, nodeX.next);
    }

    // Return info about a specific product
    lookFor(code) {
        if (this.first === null) {
            return null;
        }
        return this._lookingFor(code, this.first);
    }

    extractFirst() {
        if (this.first === null) {
            return null;
        }
        //Store the previous first product
        let extracted = this.first;
        //Change to its following product
        this.first = this.first.next;
        //count
        this._num = this._countElements(this.first);
        console.log("There are: " + this._num);
        return extracted;
    }

    //Private method to get the Penultimate product of the list
    _getPenultimate(nodeX){
        if(nodeX.next.next === null){
            return nodeX;
        }
        return this._getPenultimate(nodeX.next);
    }

    extractLast() {
        if (this.first === null) {
            return null;
        }
        //Store the penultimate product
        let penultimate = this._getPenultimate(this.first);
        //Store the last product
        let extracted = penultimate.next;
        //Set the null value in the attribute "next" from the penultimate product;
        penultimate.next = null;
        //count
        this._num = this._countElements(this.first);
        console.log("There are: " + this._num);
        return extracted;
    }

    //Private method
    _getPrevious(code, nodeX){
        let aux = nodeX;
        if(aux.next === null){
            return null;
        }
        if(aux.next.codeProduct === code){
            return aux;
        }
        return this._getPrevious(code, aux.next);
    }

    //Delete a specific product by its code
    delete (code){
        if(this.first.next === null){
            return null;
        }
        let previous = this._getPrevious(code, this.first);
        if (!previous){
            return null;
        }else{
            previous.next = previous.next.next;

            //count
            this._num = this._countElements(this.first);
            console.log("There are: " + this._num);
            return true;
        }
    }

    //Private Method
    _countElements(nodeX){
        if(nodeX === null){
            return 0;
        }
        return 1+  this._countElements(nodeX.next);
    }

    //Add product according the position
    insert(position, product){
        //Validate if the product is in the inventory
        if(!this._exists(product.codeProduct) && position<= this._num +1){
            //Put the product in the first position
            if(position ===1){
                let mov = this.first;
                this.first = product;
                product.next = mov;
                //count
                this._num = this._countElements(this.first);
                console.log("There are: " + this._num);
                return true;
            }
            //this is 1
            let aux = this.first;
            //this should be to start with 2
            for(let i = 2; i< position;i++){
                aux = aux.next;
            }
            //To avoid losing delete other products
            let ref = aux.next;
            //Link the new product
            aux.next = product;
            //Link following products to the new product
            product.next = ref;
            //count
            this._num = this._countElements(this.first);
            return true;
        }
        //count
        this._num = this._countElements(this.first);
        return null;
    }
}
