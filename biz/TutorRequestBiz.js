import firebase from 'firebase'
import _ from 'lodash';
const hackathonDriver = firebase.initializeApp({
  apiKey: "apiKey",
  authDomain: "hackathon-facebook-30-07.firebaseapp.com",
  databaseURL: "https://hackathon-facebook-30-07.firebaseio.com/",
  storageBucket: "bucket.appspot.com",
},'Requests');
const driverRef = hackathonDriver.database().ref("Requests");
const userRef = hackathonDriver.database().ref("Users");

export const createRequest = (requestInfo) => {
  return new Promise((resolve, reject) => {
    const DICT = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let len = 15;
    let requestId = '';
    let number = 0;
    while (len-- > 0) {
        requestId += DICT[Math.floor(Math.random() * DICT.length)]
    }
    return userRef.child(requestInfo.userId).once('value', function(snapUser) {
      if (snapUser.val()) {
        Object.assign(requestInfo,{id: requestId, createdDate: new Date(), sex: snapUser.val().sex});
        return driverRef.child(requestId).set(requestInfo).then((data) => {
          return driverRef.child(requestId).once('value', (snap) => {
            if (snap.val()) {
              resolve(snap.val());
            } else {
              reject('No Request Founded!');
            }
          });
        }).catch((err) => {
          reject('Create Request Failed');
        });
      } else {
        reject('No User Founded!');
      }
    });
  })
}

export const updateRequestById = (requestId, requestInfo) => {
  return new Promise((resolve, reject) => {
    const hopperRef = driverRef.child(requestId);
    return driverRef.child(requestId).once('value', function(snap) {
      if (snap.val()) {
        return hopperRef.update(requestInfo).then((data) => {
          resolve('Update Request Success');
        }).catch(() => {
          reject('Update Request Failed');
        });
      } else {
        reject('No Request Founded!');
      }
    });
  })
}

export const getRequestById = (requestId) => {
  return new Promise((resolve, reject) => {
    return driverRef.child(requestId).once('value', function(snap) {
      if (snap.val()) {
        resolve(snap.val());
      } else {
        reject('No Request Founded!');
      }
    });
  })
}

export const removeRequestById = (requestId) => {
  return new Promise((resolve, reject) => {
    return driverRef.child(requestId).remove((error) => {
      if (error) {
        reject('Delete Failed');
      } else {
        resolve('Delete Success');
      }
    });
  })
}

export const listRequest = (query) => {
  return new Promise((resolve, reject) => {
    const region = query.region ? query.region : '';
    const subject = query.subject ? query.subject : '';
    const classRequest = query.class ? query.class : '';
    const sex = query.sex ? query.sex : '';
    const price = query.price ? query.price : '';
    const name = query.name ? query.name : '';
    const userId = query.userId ? query.userId : '';
    const limit = query.limit ? parseInt(query.limit) : 99999999999999;
    const offset = query.offset ? parseInt(query.offset) : 0;

    const result = [];
    return driverRef.orderByChild('name').once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.exportVal();
        if (childData) {
          result.push(childData);
        }
      });
      const data = [];
      const myData = [];
      let totalResult = 0;
      let totalPage = 0;
      let activePage = 1;
      result.map((item, i) => {
        let check = true;
        if (region !== '') {
          check = _inArray(region,_.values(item.regions_id))
        }
        if (classRequest !== '') {
          check = (check && _inArray(classRequest,_.values(item.classes_id)))
        }
        if (subject !== '') {
          check = (check && _inArray(subject,_.values(item.subjects_id)))
        }
        if (price !== '') {
          check = (check && (item.price == price));
        }
        if (userId !== '') {
          check = (check && (item.userId == userId));
        }
        if (name !== '') {
          check = (check && (item.name.indexOf(name) !== -1));
        }
        if(sex !== '') {
           check = (check && (item.sex === (sex==='male')));
        }
        if (check && data.length < (limit+offset)) {
          data.push(item);
        }
       })
       for(var j = 0; j < data.length; j++) {
           if(j >= offset) {
             myData.push(data[j]);
             totalResult++;
           };
       }
       resolve({
        total: totalResult,
        data: myData
      });
    })
  })
}

function _inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}
