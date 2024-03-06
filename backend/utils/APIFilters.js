class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // kis/nagy betuket nemszamitanak
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCope = { ...this.queryStr };

    const removeFields = ["keyword", "page"];
    removeFields.forEach((el) => delete queryCope[el]);

    console.log(queryCope);

    let output = {};
    let prop = "";

    for (let key in queryCope) {
      console.log("key", key);
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
      } else {
        prop = key.split("[")[0];

        let operator = key.match(/\[(.*)\]/)[1];

        if (!output[prop]) {
          output[prop] = {};
        }
        output[prop][`$${operator}`] = queryCope[key];
      }
    }

    this.query = this.query.find(output);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
