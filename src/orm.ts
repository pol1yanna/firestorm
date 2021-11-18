import { Query } from './query';
import { GetStore, InitializeFirestorm } from './config';
import { IQuery } from '../types/query';
import { RecursivePartial } from '../types/utils';

export class Collection<Document> {
  private _Query: Query<Document>;

  constructor(collectionName: string) {
    this._Query = new Query(collectionName);
  }

  generateId() {
    const { id } = this._Query.Collection.doc();

    return id;
  }

  async add(data: Omit<Document, 'id'>, customId?: string) {
    const id = customId || this.generateId();

    const dataToAdd = {
      ...data,
      id,
    };

    await this._Query.Collection.doc(dataToAdd.id).set(dataToAdd, { merge: true });

    return dataToAdd;
  }

  async findOne(
    query?: IQuery.NestedFieldQuery<Document>,
    options?: IQuery.Options,
  ) {
    const documents = await this._Query.find(query, options);

    if (!documents.length) return undefined;

    const [document] = documents;

    return document;
  }

  async findById(id: string, options?: IQuery.Options) {
    const document = await this._Query.findById(id, options);

    return document;
  }

  async findMany(
    query?: IQuery.NestedFieldQuery<Document>,
    options?: IQuery.Options,
  ) {
    const documents = await this._Query.find(query, options);

    if (!documents.length) return undefined;

    return documents;
  }

  async deleteOne(query?: IQuery.NestedFieldQuery<Document>) {
    const documents = await this._Query.find(query);

    if (!documents.length) return undefined;

    const [document] = documents;

    await this._Query.delete(document.id);

    return document;
  }

  async deleteById(id: string) {
    const document = await this._Query.findById(id);

    if (!document) return undefined;

    await this._Query.delete(document.id);

    return document;
  }

  async deleteMany(query?: IQuery.NestedFieldQuery<Document>) {
    const documents = await this._Query.find(query);

    if (!documents.length) return { count: 0 };

    const deletePromise = documents.map((document) => this._Query.delete(document.id));

    await Promise.all(deletePromise);

    return { count: documents.length };
  }

  async updateOne({
    query,
    data,
  }: {
    query?: IQuery.NestedFieldQuery<Document>;
    data: RecursivePartial<Document>;
  }) {
    const documents = await this._Query.find(query);

    if (!documents.length) return undefined;

    const [document] = documents;

    await this._Query.update(document.id, data);

    return document;
  }

  async updateById({
    id,
    data,
  }: {
    id: string;
    data: RecursivePartial<Document>;
  }) {
    const document = await this._Query.findById(id);

    if (!document) return undefined;

    await this._Query.update(document.id, data);

    return document;
  }

  async updateMany({
    query,
    data,
  }: {
    query?: IQuery.NestedFieldQuery<Document>;
    data: RecursivePartial<Document>;
  }) {
    const documents = await this._Query.find(query);

    if (!documents.length) return { count: 0 };

    const updatePromise = documents.map((document) => this._Query.update(document.id, data));

    await Promise.all(updatePromise);

    return { count: documents.length };
  }
}

export function init(firestore: FirebaseFirestore.Firestore) {
  InitializeFirestorm(firestore);

  const { firestorm } = GetStore();

  firestorm.firestore = firestore;
}
