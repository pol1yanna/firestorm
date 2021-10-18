import { Query } from './query';
import { GetStore, InitializeFirestorm } from './config';
import { IQuery } from '../types/query';
import { RecursivePartial } from '../types/utils';

export class Collection<Document> {
    private Query: Query<Document>;

    constructor(collectionName: string) {
        this.Query = new Query(collectionName);
    }

    async add(data: Document) {
        const { id } = this.Query.Collection.doc();

        await this.Query.Collection.doc(id).set({ ...data, id }, { merge: true });
    }

    async findOne(query: IQuery.NestedFieldQuery<Document>, options?: IQuery.Options) {
        const documents = await this.Query.Find(query, options);

        if (!documents.length) return undefined;

        const [document] = documents;

        return document;
    }

    async findById(id: string, options?: IQuery.Options) {
        const document = await this.Query.FindById(id, options);

        return document;
    }

    async findMany(query: IQuery.NestedFieldQuery<Document>, options?: IQuery.Options) {
        const documents = await this.Query.Find(query, options);

        if (!documents.length) return undefined;

        return documents;
    }

    async deleteOne(query: IQuery.NestedFieldQuery<Document>) {
        const documents = await this.Query.Find(query);

        if (!documents.length) return undefined;

        const [document] = documents;

        await this.Query.Delete(document.id);

        return document;
    }

    async deleteById(id: string) {
        const document = await this.Query.FindById(id);

        if (!document) return undefined;

        await this.Query.Delete(document.id);

        return document;
    }

    async deleteMany(query: IQuery.NestedFieldQuery<Document>) {
        const documents = await this.Query.Find(query);

        if (!documents.length) return { count: 0 };

        const deletePromise = documents.map(document => this.Query.Delete(document.id));

        await Promise.all(deletePromise);

        return { count: documents.length };
    }

    async updateOne({ query, data }: { query: IQuery.NestedFieldQuery<Document>; data: RecursivePartial<Document> }) {
        const documents = await this.Query.Find(query);

        if (!documents.length) return undefined;

        const [document] = documents;

        await this.Query.Update(document.id, data);

        return document;
    }

    async updateById({ id, data }: { id: string; data: RecursivePartial<Document> }) {
        const document = await this.Query.FindById(id);

        if (!document) return undefined;

        await this.Query.Update(document.id, data);

        return document;
    }

    async updateMany({ query, data }: { query: IQuery.NestedFieldQuery<Document>; data: RecursivePartial<Document> }) {
        const documents = await this.Query.Find(query);

        if (!documents.length) return { count: 0 };

        const updatePromise = documents.map(document => this.Query.Update(document.id, data));

        await Promise.all(updatePromise);

        return { count: documents.length };
    }
}

export function init(firestore: FirebaseFirestore.Firestore) {
    InitializeFirestorm(firestore);

    const { firestorm } = GetStore();

    firestorm.firestore = firestore;
}
