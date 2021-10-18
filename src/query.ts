import { GetFirestore } from './config';
import { QueryUtils } from './query.utils';
import { Firestore, CollectionReference } from '@google-cloud/firestore';

import { IQuery } from '../types/query';
import { RecursivePartial } from '../types/utils';

export class Query<Document> {
    Firestore: Firestore;
    Collection: CollectionReference;
    QueryUtils: QueryUtils<Document>;

    constructor(collection: string) {
        this.Firestore = GetFirestore();
        this.Collection = this.Firestore.collection(collection);
        this.QueryUtils = new QueryUtils();
    }

    private async _GetDocuments(queries: IQuery.Query<Document>[], options: IQuery.Options = { meta: false }) {
        let collection: IQuery.CollectionQuery = this.Collection;

        queries.forEach(({ field, query, orderBy, orderByDirection }) => {
            if (query) {
                collection = collection.where(field, query.operator, query.value);
            }

            if (orderBy) {
                orderByDirection = orderByDirection || 'asc';

                collection = collection.orderBy(field, orderByDirection);
            }
        });

        if (options.limit) collection = collection.limit(options.limit);

        const documents = (await collection.get()).docs;

        if (!documents.length) return [];

        return documents.map(document => {
            const doc = { id: document.id, ...document.data() } as Document & IQuery.DocumentExtend;

            if (options.meta) {
                const meta = this._getMeta(document);

                doc._meta = meta;
            }

            return doc;
        });
    }

    private _getMeta(document: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) {
        const meta: IQuery.Meta = {
            _meta: {
                ref: document.ref,
                time: {
                    read: document.readTime,
                    create: document.createTime,
                    update: document.updateTime,
                },
            },
        };

        return meta;
    }

    async Delete(id: string) {
        return this.Collection.doc(id).delete();
    }

    async FindById(id: string, options: IQuery.Options = { meta: false }) {
        const document = await this.Collection.doc(id).get();

        if (!document.exists) return undefined;

        const doc = { id: document.id, ...document.data() } as Document & IQuery.DocumentExtend;

        if (options.meta) {
            const meta = this._getMeta(document);

            doc._meta = meta;
        }

        return doc;
    }

    async Update(id: string, data: RecursivePartial<Document>) {
        return this.Collection.doc(id).set(data, { merge: true });
    }

    async Find(query: IQuery.NestedFieldQuery<Document>, options?: IQuery.Options) {
        const queries = this.QueryUtils.GetQueries(query);

        const documents = this._GetDocuments(queries, options);

        return documents;
    }
}
