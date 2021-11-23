import Firestore from '@google-cloud/firestore';
import { IQueries } from './queries';

export namespace IQuery {
    export type Options = {
        meta?: boolean;
        limit?: number;
        startAfter?: FirebaseFirestore.DocumentSnapshot;
    };

    export interface DocumentExtend {
        id: string;
        _meta?: Meta;
    }

    export interface Meta {
        _meta?: {
            ref: FirebaseFirestore.DocumentReference;
            time: {
                read: FirebaseFirestore.Timestamp;
                create?: FirebaseFirestore.Timestamp;
                update?: FirebaseFirestore.Timestamp;
            };
        };
    }

    export type Queries<Value> =
        | IQueries.Equal<Value>
        | IQueries.Greater<Value>
        | IQueries.GreaterOrEqual<Value>
        | IQueries.Less<Value>
        | IQueries.LessOrEqual<Value>
        | IQueries.ArrayContains<Value>
        | IQueries.ArrayContainsAny<Value>
        | IQueries.In<Value>
        | IQueries.NotIn<Value>;

    export interface FieldQuery<Value> extends IQueries.Options {
        query?: Queries<Value>;
    }

    export interface FieldQueries<Value> extends IQueries.Options {
        queries?: Queries<Value>[];
    }

    export type NestedFieldQuery<Document> = {
        [Field in keyof Document]?: NestedFieldQuery<Document[Field]> | FieldQuery<Document[Field]> | FieldQueries<Document[Field]>;
    };

    export type FieldQueryOrNestedFieldQuery<Value> = NestedFieldQuery<Value> | FieldQuery<Value>;

    export interface Query<Value> extends IQueries.Options, FieldQuery<Value> {
        field: string;
    }

    export type CollectionQuery = Firestore.CollectionReference<Firestore.DocumentData> | Firestore.Query;
}
