const database = require("./../config/Database");

class Repository {

    constructor(table) {
        this._table = table;
        this._model = database(this._table);
    }

    findAll(fieldsReturn = []) {
        this._generateNewModel();
        const isEmptyFieldsReturn = fieldsReturn.length == 0;
        if (isEmptyFieldsReturn) {
            return this._model.select();
        } else {
            return this._model.select(fieldsReturn);
        }
    }

    findById(id) {
        this._generateNewModel();
        return this._model.where("id", id);
    }

    remove(id) {
        this._generateNewModel();
        return this._model.where("id", id).del();
    }

    update(id, datasModifieds) {
        this._generateNewModel();
        return this._model.where("id", id).update(datasModifieds);
    }

    create(newRegister) {
        this._generateNewModel();
        return this._model.insert(newRegister, "id");
    }

    getModel() {
        this._generateNewModel();
        return this._model;
    }

    _generateNewModel() {
        return new Promise((resolve, reject) => {
            this._model = database(this._table);
        });
    }
}

module.exports = Repository;