import { GetFirestore } from './config';
import { Firestore, CollectionReference } from '@google-cloud/firestore';
import { RecursivePartial } from '../types/utils';

export class Batch<Document> {
    private _Firestore: Firestore;

    private _Collection: CollectionReference;

    constructor(Collection: CollectionReference) {
        this._Firestore = GetFirestore();
        this._Collection = Collection;
    }

    async update(id: string, updates: RecursivePartial<Document>[]) {
        const batch = this._Firestore.batch();
  
        const document = this._Collection.doc(id);
    
        updates.forEach(update => {
          batch.update(document, update);
        });
    
        await batch.commit();
    }
}