import firebase from 'firebase'
const hackathonDriver = firebase.initializeApp({
  apiKey: "apiKey",
  authDomain: "hackathon-facebook-30-07.firebaseapp.com",
  databaseURL: "https://hackathon-facebook-30-07.firebaseio.com/",
  storageBucket: "bucket.appspot.com",
},'Users');
const usersRef = hackathonDriver.database().ref("Users");

export const createUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    return usersRef.child(userInfo.facebookId).set(userInfo).then((data) => {
      return usersRef.child(userInfo.facebookId).once('value', function(snap) {
        if (snap.val()) {
          resolve(snap.val());
        } else {
          reject('No User Founded!');
        }
      });
    }).catch(() => {
      reject('Create User Failed');
    });
  })
}

export const updateUserById = (userId, userInfo) => {
  return new Promise((resolve, reject) => {
    const hopperRef = usersRef.child(userId);
    return usersRef.child(userId).once('value', function(snap) {
      if (snap.val()) {
        return hopperRef.update(userInfo).then((data) => {
          resolve('Update User Success');
        }).catch(() => {
          reject('Update User Failed');
        });
      } else {
        reject('No User Founded!');
      }
    });
  })
}

export const getUserById = (facebookId) => {
  return new Promise((resolve, reject) => {
    return usersRef.child(facebookId).once('value', function(snap) {
      if (snap.val()) {
        resolve(snap.val());
      } else {
        reject('No User Founded!');
      }
    });
  })
}
