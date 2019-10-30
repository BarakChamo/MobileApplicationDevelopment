import React from 'react'
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native'

// Import initialized store singleton
import store from './store'
import { firestore } from './firebase'

// Import components
import MyButtonComponent from './MyButtonComponent'
import MyLabelComponent from './MyLabelComponent'
// import UserComponent from './UserComponent'
import MyList from './MyListComponent'

// Hydrate state from async storage
// AsyncStorage.getItem('STATE')
  // .then(state => store.dispatch('HYDRATE', JSON.parse(state)))

// Load complete collection of items from Firebase
// firestore.collection("items").get()
//   // wait for promise to resolve
//   .then(function(data) {

//     const items = []
//     data.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         items.push({...doc.data(), id: doc.id})
//     });

//     store.dispatch('ADD_ITEMS', items)
//   });

firestore.collection('items').onSnapshot((snapshot) => {
  const items = []
  snapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      items.push({...doc.data(), id: doc.id})
  });

  store.dispatch('SET_ITEMS', items)
});

export default function App() {
  return (
    <store.Provider>
      <View style={styles.container}>
        {/* <MyLabelComponent /> */}
        {/* <MyButtonComponent /> */}
        <MyList />
      </View>
    </store.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
