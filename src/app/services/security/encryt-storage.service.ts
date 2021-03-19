import { Injectable } from '@angular/core';
var secureLs = require("secure-ls");

@Injectable({
  providedIn: 'root'
})
export class EncrytStorageService {


    secureStorage: any;

    constructor() {
        this.secureStorage = new secureLs(
            {encodingType: 'des',
            isCompression: false, 
            encryptionSecret: 'saige@xampy#2000'}
        );
    }



    setdata(key, data) {
        this.secureStorage.set(key, data);
    }


    getData(key) {
        return this.secureStorage.get(key);
    }

    clear() {
        this.secureStorage.removeAll()
    }

    remove(key) {
        this.secureStorage.remove(key);
    }
}
