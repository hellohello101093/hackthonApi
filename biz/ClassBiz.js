import firebase from 'firebase'
const hackathonDriver = firebase.initializeApp({
  apiKey: "apiKey",
  authDomain: "hackathon-facebook-30-07.firebaseapp.com",
  databaseURL: "https://hackathon-facebook-30-07.firebaseio.com/",
  storageBucket: "bucket.appspot.com",
},'Classes');
const driverRef = hackathonDriver.database().ref("Classes");

export const createClass = (classInfo) => {
  return new Promise((resolve, reject) => {
    return driverRef.child(classInfo.id).set(classInfo).then((data) => {
      return driverRef.child(classInfo.id).once('value', function(snap) {
        if (snap.val()) {
          resolve(snap.val());
        } else {
          reject('No Class Founded!');
        }
      });
    }).catch(() => {
      reject('Create Class Failed');
    });
  })
}

export const listClass = () => {
  return new Promise((resolve, reject) => {
    const data = [];
    let total = 0;
    return driverRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
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
