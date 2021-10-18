import { IQuery } from '../types/query';

export class QueryUtils<Document> {
  GetQueries(object: IQuery.NestedFieldQuery<Document>) {
    const queries: IQuery.Query<Document>[] = [];

    for (const item of Object.entries(object)) {
      const [field, value] = item as [
        string,
        IQuery.NestedFieldQuery<Document>,
      ];

      const query = this._GetQuery(value, field);

      if (query) {
        queries.push(query);
      }
    }

    return queries;
  }

  _GetNestedQuery(
    object: IQuery.NestedFieldQuery<Document>,
    parent?: string,
  ): IQuery.Query<Document> | undefined {
    for (const item of Object.entries(object)) {
      let [field, value] = item as [string, IQuery.NestedFieldQuery<Document>];

      field = parent ? `${parent}.${field}` : field;

      return this._GetQuery(value, field);
    }
  }

  _IsQuery(value: IQuery.FieldQuery<Document>): boolean {
    return !!value.query || !!value.orderBy || !!value.orderByDirection;
  }

  _GetQuery(value: IQuery.NestedFieldQuery<Document>, field: string) {
    const isQuery = this._IsQuery(value);

    if (isQuery) {
      const query: IQuery.Query<Document> = {
        field,
        ...(value as IQuery.FieldQuery<Document>),
      };

      return query;
    }

    return this._GetNestedQuery(value, field);
  }
}
