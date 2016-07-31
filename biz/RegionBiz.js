import firebase from 'firebase'
const hackathonDriver = firebase.initializeApp({
  apiKey: "apiKey",
  authDomain: "hackathon-facebook-30-07.firebaseapp.com",
  databaseURL: "https://hackathon-facebook-30-07.firebaseio.com/",
  storageBucket: "bucket.appspot.com",
},'Regions');
const driverRef = hackathonDriver.database().ref("Regions");

export const createRegion = (regionInfo) => {
  return new Promise((resolve, reject) => {
    return driverRef.child(regionInfo.id).set(regionInfo).then((data) => {
      return driverRef.child(regionInfo.id).once('value', function(snap) {
        if (snap.val()) {
          resolve(snap.val());
        } else {
          reject('No Region Founded!');
        }
      });
    }).catch(() => {
      reject('Create Region Failed');
    });
  })
}

export const listRegion = () => {
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
