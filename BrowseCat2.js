import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import { db } from './App';

const category="FASHION";
retailerscat2=[];

//console.log(retailerscat2);

class BrowseCat2 extends Component {
   constructor(props) {
      super(props)
      this.state = {
         names: retailerscat2, 
      }

      this.setupFirebaseListener()
   }
   setupFirebaseListener = () => {
      db
      .ref('Retailers/')
      .once('value')
      .then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
               //var key=childSnapshot.key;
               var val=childSnapshot.val();
               //console.log(key)
               if (val.storetype=='Fashion') {
                  retailerscat2.push(val);
               }
               //console.log(retailerscat2);
               
      });
  });
   }
   render() {
      return (
         <View>
            <View style={styles.header}>
               <Text style={styles.title}>{category}</Text>
            </View>
            
            
            <View>
               <ScrollView>
                  {
                     this.state.names.map((item, index) => (
                        <View key = {item.key} style = {styles.item}>
                           <Text onPress={() => console.log(item.storename)}>{item.storename}</Text>
                        </View>
                     ))
                  }
               </ScrollView>
            </View>
         </View>
      )
   }
}
export default BrowseCat2

const styles = StyleSheet.create ({
   header: {
      justifyContent: 'center', 
      margin: 5, 
   },

   title: {
      marginTop: 5,
      marginBottom: 5,
      fontSize: 20,
      textAlign: 'center',
   },

   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#FFFF'
   }
})