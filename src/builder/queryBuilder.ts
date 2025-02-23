import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, any>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchFiled: string[]) {
    const searchTerm = this.query?.searchTerm || "";
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFiled.map((filed) => ({
          [filed]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      "page",
      "sortby",
      "sortorder",
      "limit",
      "searchTerm",
      "fields",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }
  paginate() {
    const page = this.query?.page || 1;
    const limit = this.query?.limit || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  sort() {
    if (this.query?.sortby && this.query?.sortorder) {
      const sortby = this.query?.sortby;
      const sortorder = this.query?.sortorder;
      const sort = sortorder === "desc" ? -1 : 1;
      this.modelQuery = this.modelQuery.sort({ [sortby]: sort });
    }
    return this;
  }
  limitFields() {
    if (this.query?.fields) {
      const fileds = this.query?.fields.split(",").join(" ");
      this.modelQuery = this.modelQuery.select(fileds);
    } else {
      this.modelQuery = this.modelQuery.select("-__v");
    }
    return this;
  }
  
}

export default QueryBuilder;
