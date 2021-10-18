export interface IFirestorm {
  firestorm: {
    firestore: FirebaseFirestore.Firestore;
  };
}

export function GetStore(): IFirestorm {
  return global as unknown as IFirestorm;
}

export function InitializeFirestorm(firestore: FirebaseFirestore.Firestore) {
  const store = GetStore();

  store.firestorm = { firestore };
}

export function GetFirestore() {
  const store = GetStore();

  if (!store.firestorm || !store.firestorm.firestore) throw new Error('Firestore не запущен');

  return store.firestorm.firestore;
}
