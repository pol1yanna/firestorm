import { IQuery } from '../types/query';

export class QueryUtils<Document> {
  getQueries(object?: IQuery.NestedFieldQuery<Document>) {
    const queries: IQuery.Query<Document>[] = [];

    if(!object) return queries;

    for (const item of Object.entries(object)) {
      const [field, value] = item as [
        string,
        IQuery.NestedFieldQuery<Document>,
      ];

      const fieldQueries = this._getQueries(value, field);

      if (fieldQueries) {
        queries.push(...fieldQueries);
      }
    }

    return queries;
  }

  private _getNestedQueries(
    object: IQuery.NestedFieldQuery<Document>,
    parent?: string,
  ): IQuery.Query<Document>[] | undefined {
    for (const item of Object.entries(object)) {
      let [field, value] = item as [string, IQuery.NestedFieldQuery<Document>];

      field = parent ? `${parent}.${field}` : field;

      return this._getQueries(value, field);
    }
  }

  private _isQuery(value: IQuery.FieldQuery<Document> | IQuery.FieldQueries<Document>): boolean {
    return !!(value as IQuery.FieldQuery<Document>).query || !!(value as IQuery.FieldQueries<Document>).queries || !!value.orderBy || !!value.orderByDirection;
  }

  private _getQueries(value: IQuery.NestedFieldQuery<Document>, field: string) {
    const isQuery = this._isQuery(value);

    if (isQuery) {
      const queriesValue = (value as IQuery.FieldQueries<Document>).queries;
      if(queriesValue) {
        const queries = queriesValue.map(query => ({
            field,
            query,
        }));

        return queries;
      }

      const query: IQuery.Query<Document> = {
        field,
        ...(value as IQuery.FieldQuery<Document>),
      };

      return [query];
    }

    return this._getNestedQueries(value, field);
  }
}
