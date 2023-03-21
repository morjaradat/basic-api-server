class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    try {
      let newRecord = await this.model.create(obj);
      return newRecord;
    } catch (e) {
      console.error("error in creating a new record in model ", this.model);
    }
  }

  getAll() {
    return this.model.findAll();
  }
  getById(id) {
    return this.model.findByPk(id);
  }

  async update(data) {
    try {
      this.model.update(data);
    } catch (error) {}
    if (!item) throw new Error(`Item with id ${id} not found`);
    return item.update(data);
  }

  async delete(data_id) {
    if (!data_id) {
      throw new Error("no id provided for model ", this.model);
    }
    try {
      let deleted = await this.model.destroy({ where: { id: data_id } });
      return deleted;
    } catch (e) {
      console.error("error in deleting record in model ", this.model);
    }
  }
}

module.exports = Collection;
