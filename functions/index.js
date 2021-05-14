const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


// auth trigger for new user signup
exports.newUserSignup = functions.auth.user().onCreate((user) => {
  console.log("user created", user.email, user.uid);
  return admin.firestore().collection("users").doc(user.uid).set({
    id: user.uid,
    email: user.email,
    appointments: [],
    newApt: [],
  });
});

// auth trigger for user deleted
exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log("user deleted", user.email, user.uid);
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

// get logged in user appointment data
exports.getUserData = functions.https.onCall((data, context) => {
  const id = context.auth.uid;
  const promise = admin.firestore().collection("users").doc(id).get();
  return promise
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
          return {response: "Not Found"};
        }
        console.log(doc.data());
        console.log("worked");
        return doc.data();
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
});

// get all users
exports.getUsers = functions.https.onCall((data, context) => {
  const promise = admin.firestore().collection("users").get();
  return promise
      .then((doc) => {
        const users = [];
        doc.forEach((doc) => {
          users.push(doc.data());
        });
        return users;
      });
});

// add a new appointment request
exports.addNewAppointment = functions.https.onCall((data, context) => {
  const userRef = admin.firestore().collection("users").doc(data.id);
  return userRef.update({
    newApt: admin.firestore.FieldValue.arrayUnion(data.apt),
  })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
});

// update users appointments
exports.updateAppointments = functions.https.onCall((data, context) => {
  const userRef = admin.firestore().collection("users").doc(data.id);
  return userRef.update({
    appointments: admin.firestore.FieldValue.arrayUnion(data.apt),
  })
      .then(() => {
        console.log("Appointments successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
});

// update logged in users appointment requests
exports.updateNewAppointments = functions.https.onCall((data, context) => {
  const userRef = admin.firestore().collection("users").doc(data.id);
  return userRef.update({
    newApt: data.newApt,
  })
      .then(() => {
        console.log("Appointments successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
});
