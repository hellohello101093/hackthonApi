import firebase from 'firebase'
const hackathonDriver = firebase.initializeApp({
  apiKey: "apiKey",
  authDomain: "hackathon-facebook-30-07.firebaseapp.com",
  databaseURL: "https://hackathon-facebook-30-07.firebaseio.com/",
  storageBucket: "bucket.appspot.com",
},'Subjects');
const driverRef = hackathonDriver.database().ref("Subjects");

export const createSubject = (subjectInfo) => {
  return new Promise((resolve, reject) => {
    return driverRef.child(subjectInfo.id).set(subjectInfo).then((data) => {
      return driverRef.child(subjectInfo.id).once('value', function(snap) {
        if (snap.val()) {
          resolve(snap.val());
        } else {
          reject('No Subject Founded!');
        }
      });
    }).catch(() => {
      reject('Create Subject Failed');
    });
  })
}

export const listSubject = () => {
  return new Promise((resolve, reject) => {
    const data = [];
    let total = 0;
    return driverRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.exportVal();
        if (childData) {
          total++;
          data.push(childData);
        }
      });
      resolve({
        total: total,
        data: data
      });
    })
  })
}
