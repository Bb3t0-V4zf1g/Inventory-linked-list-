class Student{
    constructor(name, numAccount) {
        this.name = name;
        this._numAccount = numAccount;
        this._following = null;
    }
    info(){
        return `${this.name}, ${this._numAccount}; `;
    }

    set setFollowing(student){
        this._following = student;
    }

    get getFollowing(){
        return this._following;
    }

    get getNumAccount(){
        return this._numAccount;
    }
}

class Group{
    constructor() {
        this.first = null;
        this.last = null;
    }

    add(student){
        if(this.first === null){
            this.first = student;
            this.last = student;
        }else{
            this.last.setFollowing = student;
            this.last = student;
        }
    }

    list(){
        let result = "";
        let aux = this.first;
        while(aux !== null){
            result += aux.info();
            aux = aux.getFollowing;
        }
        return result;
    }

    //With recursive function
}class Group2{
    constructor() {
        this.first = null;
        this.last = null;
    }

    add(student){
        if(this.first === null){
            this.first = student;
        }else{
            //Recursive method
            this._adding(student, this.first);
        }
    }

    //Private recursive method
    _adding(freshstd, nodoX){
        if(nodoX.getFollowing === null){
            nodoX.setFollowing = freshstd;
        }else{
            this._adding(freshstd, nodoX.getFollowing);
        }
    }

    list(){
        let result = "";
        let aux = this.first;
        while(aux !== null){
            result += aux.info();
            aux = aux.getFollowing;
        }
        return result;
    }

    lookFor(num){
        let aux = this.first;
        while(aux !== null){
            if(aux.getNumAccount === num){
                return aux;
            }
            //Change to the following nested element
            aux = aux.getFollowing;
        }
        return aux;
    }

    //Recursive
    _listing(nodoX) {
        if (nodoX.getFollowing === null) {
            return nodoX.info();
        } else {
            return nodoX.info() + this._listing(nodoX.getFollowing);
        }
    }

    //To list in reverse
    _listing2(nodoX) {
        if (nodoX.getFollowing === null) {
            return nodoX.info();
        } else {
            return this._listing2(nodoX.getFollowing) + nodoX.info();
        }
    }


    list2(){
        let aux = this.first;
        if(aux === null){
            return "";
        }else{
            return this._listing2(aux);
        }
    }

    pullFirst(){
        let extracted = this.first;
        //Now the first element is its following nested element
        this.first = this.first.getFollowing;
        return extracted;
    }

    pullLast(){
        let extracted;
        let aux = this.first;
        while(aux.getFollowing.getFollowing !== null){
            aux = aux.getFollowing;
        }
        extracted = aux.getFollowing;
        aux.setFollowing = null;
        return extracted;
    }


    linkWith(num, student){
        let foundedStd = this.lookFor(num);
        let olderFllNested = foundedStd.getFollowing;
        // Link as following element to the element to be inserted
        foundedStd.setFollowing = student;
        student.setFollowing = olderFllNested;
    }
}