import { db } from './firebase';

export const todayInfo = async () => {
  const d = await db.collection(todayDate).onSnapshot((snapshot) => {
    var dArr = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  });
  console.info('hi');
  return {dArr};
};
